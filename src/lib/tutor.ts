// Build-time generation of the files the AI tutor reads (served under /ai/<lang>/): the teaching rules,
// a course index, a concept list, and for each published lesson a lesson pack (the lesson as plain
// Markdown, with check questions and exercises in place) and a key file (answers, grading points,
// common errors). The website stores nothing about the learner; the AI keeps track of progress.
import { existsSync, readFileSync } from 'node:fs';
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

export function publishedLessons(): Lesson[] {
	return lessons().filter((l) => l.published);
}

const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');

const LABELS: Record<string, Record<string, string>> = {
	'zh-cn': {
		check: '随堂题',
		checkNote: '（在这里提问。学习者只需给出选项，不需要理由；按答案文件判断，答错时不要直接说出答案。）',
		figure: '图',
		figPage: '网页上的交互图（学习者也可以自己打开）',
		figDraw: '绘图说明：请你自己画出这张图。能在对话中显示交互式 HTML 时，做成带滑块的交互图；否则按默认参数画一张静态 SVG。不要只给链接或文字描述。',
		figNoSpec: '这张图还没有绘图说明：请给学习者网页链接，并告诉他要调什么、观察什么。',
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
		goals: '本课目标',
		prereq: '用到的前面的概念',
		planNote: '这是讲课计划，不是讲稿。按小节的顺序，用你自己的话讲解；必须讲到“要点”中的每一条，术语用这里给出的名称；例子的数字必须与“例子”一致（随堂题、练习题和后面的课程要用到）。“讲法”是建议，可以根据学习者的反应调整；其中要学习者自己算或自己说的，先让他做，不要替他做。“不要讲”中的内容留给练习题，讲课时不要说出。不要补充本课要点之外的结论；补充的例子要说明是补充的。',
		planConcepts: '本节定义的概念',
		planPoints: '要点',
		planExamples: '例子（数字固定）',
		planApproach: '讲法',
		planPitfalls: '常见误解（讲解时留意）',
		planLeave: '不要讲',
	},
	en: {
		check: 'Check question',
		checkNote: '(Ask it here. The learner only gives an option, without reasons; judge with the key file, and do not give away the answer when it is wrong.)',
		figure: 'Figure',
		figPage: 'Interactive figure on the web page (the learner can also open it)',
		figDraw: 'Drawing instructions: draw this figure yourself. If you can show interactive HTML in the conversation, make it an interactive figure with sliders; otherwise draw a static SVG at the default parameters. Do not give only a link or a description in words.',
		figNoSpec: 'This figure has no drawing instructions yet: give the learner the link to the web page and say what to change and what to observe.',
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
		goals: 'Goals of the lesson',
		prereq: 'Concepts from earlier lessons',
		planNote: 'This is a teaching plan, not a script. Teach the sections in order in your own words; cover every item under "Points", use the terms given here, and keep the numbers of the examples exactly as given (check questions, exercises and later lessons use them). "Approach" is a suggestion; adapt it to the learner, but what it asks the learner to compute or say, let the learner do first instead of doing it for them. What is under "Do not teach" is left to the exercises: do not say it. Do not add conclusions beyond the points of the lesson; say so when you add an example.',
		planConcepts: 'Concepts defined in this section',
		planPoints: 'Points',
		planExamples: 'Examples (fixed numbers)',
		planApproach: 'Approach',
		planPitfalls: 'Common misconceptions (watch for them)',
		planLeave: 'Do not teach',
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

function figureBlock(lessonId: string, lang: Lang, id: string, title: string, observe: string): string {
	const lb = L(lang);
	const l = lesson(lessonId);
	const lines = [`**${lb.figure} ${id}** ${plainRich(title, lang, lessonId)}`.trim()];
	const spec = figureSpec(lessonId, id, lang);
	lines.push(spec ? `- ${lb.figDraw}\n  ${plainRich(spec, lang, lessonId).replace(/\n/g, '\n  ')}` : `- ${lb.figNoSpec}`);
	if (observe) lines.push(`- ${lb.figObserve}${C(lang)}${plainRich(observe, lang, lessonId)}`);
	lines.push(`- ${lb.figPage}${C(lang)}${absolute(lessonPath(l, lang, `fig-${id}`))}`);
	return lines.join('\n');
}

function checkBlock(lessonId: string, lang: Lang, id: string): string {
	const lb = L(lang);
	const x = lessonKey(lessonId)?.questions.find((y) => y.id === id);
	if (!x) return '';
	return `> ${questionText(x, lang, lessonId, `${lb.check} ${id}`).replace(/\n/g, '\n> ')}\n>\n> ${lb.checkNote}`;
}

function exercisesBlock(lessonId: string, lang: Lang): string {
	const lb = L(lang);
	let n = 0;
	const ex = (lessonKey(lessonId)?.questions ?? []).filter((x) => x.kind === 'exercise');
	return [lb.exercisesNote, ...ex.map((x) => questionText(x, lang, lessonId, `${lb.exercises} ${t(lang, 'exerciseItem', { n: ++n })} (id: ${x.id})`))].join('\n\n');
}

// ---------- lesson plan (course/plans/<id>.yaml) ----------

type Text = Record<string, string>;
type List = Record<string, string[]>;
interface PlanSection {
	id: string;
	title: Text;
	concepts?: string[];
	points?: List;
	examples?: List;
	approach?: Text;
	leave?: Text;
	pitfalls?: List;
	figures?: { id: string; title?: Text; observe?: Text }[];
	checks?: string[];
}
interface Plan {
	lesson: string;
	goals?: List;
	prerequisites?: string[];
	sections: PlanSection[];
}

export function lessonPlan(lessonId: string): Plan | undefined {
	const p = join(ROOT, `course/plans/${lessonId}.yaml`);
	if (!existsSync(p)) return undefined;
	return parse(readFileSync(p, 'utf8')) as Plan;
}

/** Lesson pack built from a lesson plan: structure and content for the tutor to teach in its own words. */
function planPackText(lessonId: string, lang: Lang, plan: Plan): string {
	const l = lesson(lessonId);
	const lb = L(lang);
	const rich = (s: string) => plainRich(s, lang, lessonId);
	const list = (xs?: string[]) => (xs ?? []).map((x) => `- ${rich(x)}`).join('\n');
	const cs = concepts();
	const term = (id: string) => (cs[id] ? `${cs[id][lang]} (${id})` : id);
	const out = [`# ${l.id} ${l.title[lang]}`, lb.planNote, `${lb.key}${C(lang)}${aiUrl(lang, `lessons/${l.id}-key.md`)}`];
	if (plan.goals?.[lang]?.length) out.push(`## ${lb.goals}`, list(plan.goals[lang]));
	if (plan.prerequisites?.length) out.push(`${lb.prereq}${C(lang)}${plan.prerequisites.map(term).join(lang.startsWith('zh') ? '、' : ', ')}`);
	for (const s of plan.sections) {
		const parts = [`## ${s.title[lang]}`];
		if (s.concepts?.length) parts.push(`${lb.planConcepts}${C(lang)}${s.concepts.map(term).join(lang.startsWith('zh') ? '、' : ', ')}`);
		if (s.points?.[lang]?.length) parts.push(`**${lb.planPoints}**\n\n${list(s.points[lang])}`);
		if (s.examples?.[lang]?.length) parts.push(`**${lb.planExamples}**\n\n${list(s.examples[lang])}`);
		if (s.approach?.[lang]) parts.push(`**${lb.planApproach}**${C(lang)}${rich(s.approach[lang])}`);
		if (s.pitfalls?.[lang]?.length) parts.push(`**${lb.planPitfalls}**\n\n${list(s.pitfalls[lang])}`);
		if (s.leave?.[lang]) parts.push(`**${lb.planLeave}**${C(lang)}${rich(s.leave[lang])}`);
		for (const f of s.figures ?? []) parts.push(figureBlock(lessonId, lang, f.id, f.title?.[lang] ?? '', f.observe?.[lang] ?? ''));
		for (const c of s.checks ?? []) parts.push(checkBlock(lessonId, lang, c));
		out.push(parts.join('\n\n'));
	}
	if ((lessonKey(lessonId)?.questions ?? []).some((x) => x.kind === 'exercise')) out.push(`## ${lb.exercises}`, exercisesBlock(lessonId, lang));
	return out.join('\n\n') + '\n';
}

/** The lesson as plain Markdown for the AI tutor, with check questions, figures and exercises in place. */
export function lessonPackText(lessonId: string, lang: Lang): string {
	const plan = lessonPlan(lessonId);
	if (plan) return planPackText(lessonId, lang, plan);
	const l = lesson(lessonId);
	const lb = L(lang);
	const key = lessonKey(lessonId);
	const src = read(`src/content/docs/${lang}/lessons/${l.slug}.mdx`);
	const fm = /^---\n([\s\S]*?)\n---\n/.exec(src);
	const meta = fm ? parse(fm[1]) : {};
	let body = fm ? src.slice(fm[0].length) : src;

	body = body
		.replace(/^import .*\n/gm, '')
		.replace(/^(#{2,6}[ \t]+.*?)[ \t]*\[#[a-z0-9-]+\][ \t]*$/gm, '$1')
		.replace(/<Figure([^>]*)>([\s\S]*?)<\/Figure>/g, (_, a) => {
			const at = attrs(a);
			return figureBlock(lessonId, lang, at.id, at.title ?? '', at.observe ?? '');
		})
		.replace(/<Check id="([^"]+)"\s*\/>/g, (_, id) => checkBlock(lessonId, lang, id))
		.replace(/<CheckAll\s*\/>/g, '')
		.replace(/<Exercises\s*\/>/g, () => exercisesBlock(lessonId, lang))
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
					? `${lb.exercises} ${t(lang, 'exerciseItem', { n: ++exNo })} (id: ${q.id})`
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
