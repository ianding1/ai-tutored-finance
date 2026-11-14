// Build-time generation of the files the AI tutor reads (served under /ai/<lang>/): the teaching rules,
// a course index, a concept list, and for each published lesson a lesson pack (the lesson as plain
// Markdown, with check questions and exercises in place) and a key file (answers, grading points,
// common errors). The website stores nothing about the learner; the AI keeps track of progress.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { t, type Lang } from '../i18n/ui';
import {
	lessons,
	lesson,
	lessonKey,
	concepts,
	absolute,
	lessonPath,
	plainRich,
	refPlain,
	type Lesson,
	type Question,
} from './course';

const ROOT = process.cwd();
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') + '/';

/** Absolute URL of an AI file, e.g. aiUrl('zh-cn', 'lessons/5.3.md'). */
export function aiUrl(lang: Lang, file: string): string {
	return absolute(`${BASE}ai/${lang}/${file}`);
}

/** Absolute URL of the static preview image of a figure. */
export function figureImageUrl(lang: Lang, lessonId: string, figId: string): string {
	return absolute(`${BASE}ai/fig/${lang}/${lessonId}-${figId}.png`);
}

export function figureImageExists(lang: Lang, lessonId: string, figId: string): boolean {
	return existsSync(join(ROOT, `public/ai/fig/${lang}/${lessonId}-${figId}.png`));
}

export function publishedLessons(): Lesson[] {
	return lessons().filter((l) => l.published);
}

const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');

const LABELS: Record<string, Record<string, string>> = {
	'zh-cn': {
		check: '随堂题',
		checkNote: '（在这里提问。先让学习者作答，再按答案文件判断；答错时不要直接说出答案。）',
		figure: '图',
		figPage: '网页上的交互图',
		figImage: '静态图片（默认参数）',
		figSpec: '图的内容（可据此做交互图）',
		figObserve: '让学习者观察',
		exercises: '练习题',
		exercisesNote: '讲完后布置。答案和批改要点在答案文件中。',
		quizNote: '这是综合测验。按页面的说明和公式表进行；作答期间不给提示，全部答完后再按答案文件批改。',
		judge: '判断题（判断真假并说明理由）',
		problems: '问题',
		options: '选项',
		keyTitle: '答案文件（只供 AI 老师使用）',
		keyNote: '学习者作答之前，不要说出这里的任何内容。',
		context: '与题目有关的课程要点',
		errors: '常见错误',
		answer: '参考答案',
		rubric: '批改要点',
		correct: '正确答案',
		why: '错误原因（学习者选这个选项时告诉他）',
		hint: '提示（判断题答错时给出，不说结论）',
		expected: '数值答案',
		indexTitle: '「AI 辅导学金融」AI 老师用的课程索引',
		indexIntro: '先阅读教学规则，再按课号读取教案包和答案文件。只列出已发布的课。',
		rules: '教学规则',
		conceptsFile: '概念表',
		pack: '教案包',
		key: '答案文件',
		page: '网页',
		conceptsTitle: '概念表',
		conceptsIntro: '每个概念：名称、简短说明，以及定义它的课。',
		definedIn: '定义于',
		prerequisite: '预备知识',
	},
	en: {
		check: 'Check question',
		checkNote: '(Ask it here. Let the learner answer first, then judge with the key file; do not give away the answer when it is wrong.)',
		figure: 'Figure',
		figPage: 'Interactive figure on the web page',
		figImage: 'Static image (default parameters)',
		figSpec: 'What the figure shows (enough to build an interactive version)',
		figObserve: 'What the learner should observe',
		exercises: 'Exercises',
		exercisesNote: 'Assign them after the lesson. Answers and grading points are in the key file.',
		quizNote: 'This is a comprehensive quiz. Follow the instructions and formula sheet of the page; give no hints while the learner is answering, and grade with the key file when all answers are in.',
		judge: 'True or false (with reasons)',
		problems: 'Problems',
		options: 'Options',
		keyTitle: 'Key file (for the AI tutor only)',
		keyNote: 'Do not reveal anything here before the learner has answered.',
		context: 'Lesson facts relevant to the questions',
		errors: 'Common errors',
		answer: 'Reference answer',
		rubric: 'Grading points',
		correct: 'Correct answer',
		why: 'Why it is wrong (tell the learner when they choose this option)',
		hint: 'Hint (give it after a wrong answer, without the verdict)',
		expected: 'Numeric answers',
		indexTitle: '"AI-Tutored Finance": course index for the AI tutor',
		indexIntro: 'Read the teaching rules first, then read the lesson pack and key file of a lesson by its number. Only published lessons are listed.',
		rules: 'Teaching rules',
		conceptsFile: 'Concept list',
		pack: 'Lesson pack',
		key: 'Key file',
		page: 'Web page',
		conceptsTitle: 'Concept list',
		conceptsIntro: 'Each concept: its name, a short description, and the lesson that defines it.',
		definedIn: 'Defined in',
		prerequisite: 'prerequisite',
	},
};
const L = (lang: Lang) => LABELS[lang] ?? LABELS.en;
/** Label separator: full-width colon in Chinese. */
const C = (lang: Lang) => (lang.startsWith('zh') ? '：' : ': ');

// ---------- teaching rules ----------

export function protocolText(lang: Lang): string {
	const data = parse(read('course/ai/protocol.yaml'));
	return data.protocol[lang].replaceAll('{base}', aiUrl(lang, ''));
}

// ---------- index and concepts ----------

export function indexText(lang: Lang): string {
	const lb = L(lang);
	const out = [`# ${lb.indexTitle}`, lb.indexIntro, `- ${lb.rules}${C(lang)}${aiUrl(lang, 'protocol.md')}`, `- ${lb.conceptsFile}${C(lang)}${aiUrl(lang, 'concepts.md')}`];
	let stage = '';
	for (const l of publishedLessons()) {
		if (l.stage.id !== stage) {
			stage = l.stage.id;
			out.push(`\n## ${l.stage.title[lang]}`);
		}
		const summary = l.summary?.[lang] ? ` ${l.summary[lang]}` : '';
		out.push(
			`- ${l.id} ${l.title[lang]}${summary ? C(lang) + summary.trim() : ''}\n  ${lb.pack}${C(lang)}${aiUrl(lang, `lessons/${l.id}.md`)}\n  ${lb.key}${C(lang)}${aiUrl(lang, `lessons/${l.id}-key.md`)}\n  ${lb.page}${C(lang)}${absolute(lessonPath(l, lang))}`,
		);
	}
	return out.join('\n') + '\n';
}

export function conceptsText(lang: Lang): string {
	const lb = L(lang);
	const published = new Set(publishedLessons().map((l) => l.id));
	const out = [`# ${lb.conceptsTitle}`, lb.conceptsIntro, ''];
	for (const c of Object.values(concepts())) {
		if (c.defined_in !== 'prerequisite' && !published.has(c.defined_in)) continue;
		const where = c.defined_in === 'prerequisite' ? lb.prerequisite : `${c.defined_in} ${lesson(c.defined_in).title[lang]}`;
		const short = c.short?.[lang] ? `${C(lang)}${plainRich(c.short[lang], lang)}` : '';
		out.push(`- **${c[lang]}** (${c.id})${short}${lang.startsWith('zh') ? '（' : ' ('}${lb.definedIn} ${where}${lang.startsWith('zh') ? '）' : ')'}`);
	}
	return out.join('\n') + '\n';
}

// ---------- lesson pack ----------

function attrs(s: string): Record<string, string> {
	const out: Record<string, string> = {};
	for (const m of s.matchAll(/(\w+)="([^"]*)"/g)) out[m[1]] = m[2];
	for (const m of s.matchAll(/\s(\w+)(?=\s|\/|$)(?!=)/g)) if (!(m[1] in out)) out[m[1]] = 'true';
	return out;
}

const letters = 'ABCDEFGH';

function questionText(q: Question, lang: Lang, lessonId: string, label: string): string {
	const parts = [`**${label}**`, plainRich(q.question[lang], lang, lessonId)];
	if (q.choices?.length) parts.push(q.choices.map((c, i) => `(${letters[i]}) ${plainRich(c[lang], lang, lessonId)}`).join('\n'));
	else if (q.kind === 'check' && typeof q.correct === 'boolean') parts.push(lang.startsWith('zh') ? '（判断真假）' : '(True or false)');
	return parts.join('\n\n');
}

let _figs: Record<string, Record<string, string>> | undefined;
/** What a figure shows (course/ai/figures.yaml), enough for an assistant to rebuild it. */
function figureSpec(lessonId: string, figId: string, lang: Lang): string {
	_figs ??= parse(read('course/ai/figures.yaml')) ?? {};
	return _figs![`${lessonId}/${figId}`]?.[lang] ?? '';
}

/** The lesson as plain Markdown for the AI tutor, with check questions, figures and exercises in place. */
export function lessonPackText(lessonId: string, lang: Lang): string {
	const l = lesson(lessonId);
	const lb = L(lang);
	const key = lessonKey(lessonId);
	const src = read(`src/content/docs/${lang}/lessons/${l.slug}.mdx`);
	const fm = /^---\n([\s\S]*?)\n---\n/.exec(src);
	const meta = fm ? parse(fm[1]) : {};
	let body = fm ? src.slice(fm[0].length) : src;
	const q = (id: string) => key?.questions.find((x) => x.id === id);
	let exNo = 0;

	body = body
		.replace(/^import .*\n/gm, '')
		.replace(/^(#{2,6}[ \t]+.*?)[ \t]*\[#[a-z0-9-]+\][ \t]*$/gm, '$1')
		.replace(/<Figure([^>]*)>([\s\S]*?)<\/Figure>/g, (_, a) => {
			const at = attrs(a);
			const lines = [`**${lb.figure} ${at.id}** ${plainRich(at.title ?? '', lang, lessonId)}`];
			lines.push(`- ${lb.figPage}${C(lang)}${absolute(lessonPath(l, lang, `fig-${at.id}`))}`);
			if (figureImageExists(lang, lessonId, at.id)) lines.push(`- ${lb.figImage}${C(lang)}${figureImageUrl(lang, lessonId, at.id)}`);
			const spec = figureSpec(lessonId, at.id, lang);
			if (spec) lines.push(`- ${lb.figSpec}${C(lang)}${plainRich(spec, lang, lessonId)}`);
			lines.push(`- ${lb.figObserve}${C(lang)}${plainRich(at.observe ?? '', lang, lessonId)}`);
			return lines.join('\n');
		})
		.replace(/<Check id="([^"]+)"\s*\/>/g, (_, id) => {
			const x = q(id);
			if (!x) return '';
			return `> ${questionText(x, lang, lessonId, `${lb.check} ${id}`).replace(/\n/g, '\n> ')}\n>\n> ${lb.checkNote}`;
		})
		.replace(/<CheckAll\s*\/>/g, '')
		.replace(/<Exercises\s*\/>/g, () => {
			const ex = (key?.questions ?? []).filter((x) => x.kind === 'exercise');
			return [lb.exercisesNote, ...ex.map((x) => questionText(x, lang, lessonId, `${t(lang, 'exerciseItem', { n: ++exNo })} (id: ${x.id})`))].join('\n\n');
		})
		.replace(/<Quiz\s*\/>/g, () => {
			const qs = (key?.questions ?? []).filter((x) => x.kind === 'quiz');
			const judge = qs.filter((x) => x.part === 'judge');
			const prob = qs.filter((x) => x.part !== 'judge');
			const fmt = (x: Question) => questionText(x, lang, lessonId, `${x.id}`);
			return [lb.quizNote, judge.length ? `## ${lb.judge}` : '', ...judge.map(fmt), prob.length ? `## ${lb.problems}` : '', ...prob.map(fmt)]
				.filter(Boolean)
				.join('\n\n');
		})
		.replace(/<Def id="[^"]+">([\s\S]*?)<\/Def>/g, '**$1**')
		.replace(/<Ref([^>]*)\/>/g, (_, a) => refPlain(attrs(a), lang, lessonId))
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	const head = [`# ${meta.title ?? `${l.id} ${l.title[lang]}`}`];
	if (meta.description) head.push(String(meta.description));
	head.push(`${lb.key}${C(lang)}${aiUrl(lang, `lessons/${l.id}-key.md`)}`);
	return head.join('\n\n') + '\n\n' + body + '\n';
}

// ---------- key file ----------

export function keyText(lessonId: string, lang: Lang): string {
	const l = lesson(lessonId);
	const lb = L(lang);
	const key = lessonKey(lessonId);
	const out = [`# ${l.id} ${l.title[lang]}: ${lb.keyTitle}`, lb.keyNote];
	if (!key) return out.join('\n\n') + '\n';
	const rich = (s: string) => plainRich(s, lang, lessonId);
	if (key.context.length) out.push(`## ${lb.context}`, key.context.map((c) => `- ${rich(c[lang])}`).join('\n'));
	let exNo = 0;
	for (const q of key.questions) {
		const label =
			q.kind === 'check'
				? `${lb.check} ${q.id}`
				: q.kind === 'exercise'
					? `${t(lang, 'exerciseItem', { n: ++exNo })} (id: ${q.id})`
					: q.id;
		const parts = [`## ${label}`, rich(q.question[lang])];
		if (q.choices?.length) {
			parts.push(
				q.choices
					.map((c, i) => {
						const right = String(q.correct) === letters[i];
						const why = !right && c.why ? `\n  ${lb.why}${C(lang)}${rich(c.why[lang])}` : '';
						return `- (${letters[i]}) ${rich(c[lang])}${right ? ` ← ${lb.correct}` : ''}${why}`;
					})
					.join('\n'),
			);
		} else if (q.correct !== undefined) {
			parts.push(`${lb.correct}${C(lang)}${q.correct === true ? t(lang, 'choiceTrue') : q.correct === false ? t(lang, 'choiceFalse') : String(q.correct)}`);
			if (q.hint) parts.push(`${lb.hint}${C(lang)}${rich(q.hint[lang])}`);
		}
		parts.push(`**${lb.answer}**\n\n${rich(q.answer[lang])}`);
		const rubric = q.rubric?.[lang] ?? [];
		if (rubric.length) parts.push(`**${lb.rubric}**\n\n${rubric.map((r) => `- ${rich(r)}`).join('\n')}`);
		const exp = (q as any).expected as Record<string, string> | undefined;
		if (exp) parts.push(`${lb.expected}${C(lang)}${Object.entries(exp).map(([k, v]) => `${k} = ${v}`).join(', ')}`);
		const errs = key.common_errors.filter((e) => e.questions.includes(q.id));
		if (errs.length) parts.push(`**${lb.errors}**\n\n${errs.map((e) => `- ${rich(e[lang])}`).join('\n')}`);
		out.push(parts.join('\n\n'));
	}
	return out.join('\n\n') + '\n';
}

/** Short prompt that starts a tutoring session for one lesson. */
export function startPrompt(lessonId: string, lang: Lang): string {
	const l = lesson(lessonId);
	return t(lang, 'startPrompt', {
		id: l.id,
		title: l.title[lang],
		rules: aiUrl(lang, 'protocol.md'),
		pack: aiUrl(lang, `lessons/${l.id}.md`),
		key: aiUrl(lang, `lessons/${l.id}-key.md`),
		index: aiUrl(lang, 'index.md'),
	});
}
