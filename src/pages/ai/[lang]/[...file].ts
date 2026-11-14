// Files for the AI tutor: /ai/<lang>/protocol.md, index.md, concepts.md, lessons/<id>.md, lessons/<id>-key.md.
import type { APIRoute } from 'astro';
import { LANGUAGES } from '../../../i18n/ui';
import { conceptsText, indexText, keyText, lessonPackText, protocolText, publishedLessons } from '../../../lib/tutor';

export function getStaticPaths() {
	const paths = [];
	for (const { code: lang } of LANGUAGES) {
		paths.push({ params: { lang, file: 'protocol.md' }, props: { body: () => protocolText(lang) } });
		paths.push({ params: { lang, file: 'index.md' }, props: { body: () => indexText(lang) } });
		paths.push({ params: { lang, file: 'concepts.md' }, props: { body: () => conceptsText(lang) } });
		for (const l of publishedLessons()) {
			paths.push({ params: { lang, file: `lessons/${l.id}.md` }, props: { body: () => lessonPackText(l.id, lang) } });
			paths.push({ params: { lang, file: `lessons/${l.id}-key.md` }, props: { body: () => keyText(l.id, lang) } });
		}
	}
	return paths;
}

export const GET: APIRoute = ({ props }) =>
	new Response((props as { body: () => string }).body(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
