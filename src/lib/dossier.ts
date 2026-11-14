// Build-time access to the household files of the capstone project (course/project/<id>.yaml):
// HTML for the page (Dossier.astro) and plain text for discussion prompts.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { Lang, Localized } from '../i18n/ui';
import { plainRich } from './course';

export type Cell = number | string | Localized;

export interface DossierSection {
	id: string;
	title: Localized;
	columns?: Localized[];
	align?: ('l' | 'r')[];
	rows?: Cell[][];
	/** text after the table */
	after?: Localized;
	/** a text section (no table) */
	text?: Localized;
}

export interface Dossier {
	id: string;
	title: Localized;
	note: Localized;
	sections: DossierSection[];
}

const cache = new Map<string, Dossier>();
export function dossier(id: string): Dossier {
	if (!cache.has(id)) {
		cache.set(id, parse(readFileSync(join(process.cwd(), `course/project/${id}.yaml`), 'utf8')));
	}
	return cache.get(id)!;
}

/** Display text of a cell: numbers with thousands separators, localized text in the page language. */
export function cellText(c: Cell, lang: Lang): string {
	if (typeof c === 'number') return c.toLocaleString('en-US');
	if (typeof c === 'string') return c;
	return c[lang] ?? '';
}

/** The whole file as plain text (Markdown tables), for prompts. */
export function dossierPlain(id: string, lang: Lang): string {
	const d = dossier(id);
	const out: string[] = [`# ${d.title[lang]}`, plainRich(d.note[lang], lang)];
	for (const s of d.sections) {
		out.push(`## ${s.title[lang]}`);
		if (s.rows && s.columns) {
			const cells = (r: Cell[]) => `| ${r.map((c) => plainRich(cellText(c, lang), lang).replace(/\|/g, '/')).join(' | ')} |`;
			out.push(cells(s.columns), `| ${s.columns.map((_, i) => (s.align?.[i] === 'r' ? '---:' : '---')).join(' | ')} |`);
			for (const r of s.rows) out.push(cells(r));
		}
		if (s.text) out.push(plainRich(s.text[lang], lang));
		if (s.after) out.push(plainRich(s.after[lang], lang));
	}
	return out.join('\n\n');
}
