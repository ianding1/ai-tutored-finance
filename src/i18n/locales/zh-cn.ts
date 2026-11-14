// Simplified Chinese UI strings and prompt templates.
import type { Locale } from '../types';

const COURSE = '「AI 辅导学金融」';
const DISCLAIMER = '本课程的课件、题目和参考答案都由 AI 生成，未经专业人员审核，可能有错误。';

const locale: Locale = {
	ui: {
		lessonPrefix: '第 {id} 课',
		lessonPlain: '第 {id} 课《{title}》',
		lessonUnpublished: '第 {id} 课，尚未发布',
		unpublished: '尚未发布',
		paren: '（{text}）',
		forwardHint: '后续课程的内容，现在不需要掌握。',
		figure: '图 {id}',
		check: '随堂题 {id}',
		exerciseItem: '第 {n} 题',
		observe: '请观察：',
		checksTitle: '提交随堂题',
		checksHelp: '本课的随堂题在这里一起提交。',
		copyHint: '把提示词粘贴到你的 AI 助手里，再附上答案的照片，或者直接把答案写在提示词后面。可以一次提交全部答案，也可以分几次提交。',
		copiedGrading: '已复制，粘贴到 AI 助手即可',
		copiedExplain: '已复制讲解提示词',
		notAnswered: '未作答',
		choiceTrue: '对',
		choiceFalse: '错',
		submitAnswer: '提交',
		answerCorrect: '回答正确。',
		answerWrong: '回答不正确。',
		chooseFirst: '请先选择一个答案。',
		quizItem: '第 {n} 题',
		quizPartJudge: '一、判断题',
		quizPartJudgeHelp: '判断“真”或“假”，并说明理由。只写判断、没有理由的，需要订正。',
		quizPartProblems: '二、计算与分析',
		quizSubmit: '提交测验',
		lessonNotStarted: '未开始',
		lessonInProgress: '学习中',
		lessonDone: '已完成',
		copyFeedback: '复制批改提示词',
		statusOk: '通过',
		statusRevise: '需要订正',
		pasteResult: '粘贴 AI 返回的结果',
		pasteHint: '把 AI 回答末尾 <<<LFWAI-RESULT 到 LFWAI-RESULT>>> 之间的内容（或整个回答）粘贴到这里。',
		saveResult: '保存结果',
		saved: '已保存。',
		parseFailed: '没有找到可以识别的结果块。请确认粘贴了 AI 回答中 <<<LFWAI-RESULT 开头的部分。',
		promptTitle: '复制下面的提示词',
		promptHelp: '没有自动复制成功，请手动选中下面的全部内容并复制。',
		copy: '复制',
		copied: '已复制',
		close: '关闭',
		explain: '展开讲解',
		aiNoticeTitle: '本站内容由 AI 生成，可能有错误，不构成投资建议。',
		aiNotice: '本站所有课件、题目和参考答案都由 AI 生成，未经专业人员审核，无法保证正确。如果发现错误，请通过页面底部的链接报告。内容仅用于学习，不构成投资建议。',
		reportError: '报告本页的错误',
		reportTitle: '[内容错误] {page}',
		reportBody: '页面：{url}\n\n错误位置（复制原文）：\n\n问题说明：\n',
		exercisesHeading: '练习题',
		prevPage: '上一页',
		nextPage: '下一页',
		continueAt: '继续：{title}',
		routeTitle: '课程路线',
		routePublished: '已发布',
		routeUpcoming: '编写中',
		routeQuiz: '测验',
		judgmentItem: '判断 {id}',
		copyDiscussion: '复制讨论提示词',
		copiedDiscussion: '已复制，粘贴到你的 AI 助手中开始讨论',
		discussionHint: '先写好这一步的判断记录。把提示词粘贴到你的 AI 助手中，再附上判断记录（照片或文字）。AI 会一次问一个问题，你可以解释或修改，讨论几轮都可以。讨论结束时 AI 会给出结果块，把它粘贴回这里。提示词中有判断要点，写完判断记录之前不要阅读。',
		referenceTitle: '参考方案',
		referenceLocked: '这一步的判断全部通过后，这里会显示参考方案和判断要点。',
	},

	prompts: {
		feedback(i, p) {
			const qs = i.questions
				.map(
					(q) => `### ${q.label}（id：${q.id}）
题目：
${q.question}

参考答案：
${q.answer}

批改要点：
${p.bullets(q.rubric)}`,
				)
				.join('\n\n');
			return `你是${COURSE}课程的老师。请批改学习者在《${i.lessonTitle}》中的作答。学习者的答案附在本提示词之后（照片或文字），可能只包含其中一部分题目。

## 重要说明
${DISCLAIMER}如果你认为参考答案或批改要点本身有误，请明确指出错在哪里，并按正确的答案批改，不要因为学习者没有照搬错误的参考答案而判错。

## 课程页面
${i.lessonUrl}
（如果你能访问网页，可以参考；不能访问也没有关系，批改需要的内容都已写在下面。）

## 与这些题目相关的课程要点
${p.bullets(i.context)}

## 题目、参考答案与批改要点
${qs}
${i.commonErrors.length ? `\n## 常见错误（供诊断参考）\n${p.bullets(i.commonErrors)}\n` : ''}
## 请这样回复
1. 这些题**不打分**。只批改学习者这次作答了的题目，没有作答的题目不要提及，它们会在以后提交。
2. 逐题指出哪里正确、哪里有错。重点检查推理和理由，不只看最终数字。
3. 对错误之处，用学习者能理解的方式讲解，必要时举一个小例子。不要只重复参考答案。
4. 如果作答反映出对某个概念的误解，明确指出是哪个概念。
5. 题目要求给出理由的，只有结论、没有理由的需要订正。题目要求给出几条理由或几个答案时，只按要求的数量、按作答顺序批改，多写的不看。
6. 用中文回复，数学公式使用 LaTeX。
7. 在回复的最后，原样输出下面格式的结果块，JSON 必须合法：

${p.resultBlock}

items 中只列出这次批改了的题目，每题一项。status 填 "ok"（基本正确，只有小问题）或 "revise"（有实质错误，需要订正）。各题的 id：${i.questions.map((q) => q.id).join('、')}。

## 学习者的答案
`;
		},

		discussion(i, p) {
			const js = i.questions
				.map(
					(q) => `### ${q.label}（id：${q.id}）
要做的判断：
${q.question}

判断要点（只供你使用，不要告诉学习者）：
${p.bullets(q.rubric)}

参考结论（只供你使用，不要告诉学习者）：
${q.answer}`,
				)
				.join('\n\n');
			return `你是${COURSE}课程毕业项目的审阅者。学习者正在为一个虚构的美国家庭做理财方案，这一步是《${i.lessonTitle}》。学习者的判断记录附在本提示词之后（照片或文字），可能只包含其中一部分判断。请与学习者逐个讨论这些判断。

## 重要说明
${DISCLAIMER}如果你认为判断要点或参考结论本身有误，请明确指出，并按正确的理解讨论。

## 课程页面
${i.lessonUrl}
（如果你能访问网页，可以参考；不能访问也没有关系，需要的内容都已写在下面。）

## 家庭档案
${i.materials ?? ''}
${i.context.length ? `\n## 补充说明\n${p.bullets(i.context)}\n` : ''}
## 要讨论的判断
${js}
${i.commonErrors.length ? `\n## 常见错误（供你诊断参考）\n${p.bullets(i.commonErrors)}\n` : ''}
## 讨论规则
1. 先读完学习者的判断记录，然后从第一个判断开始讨论。只讨论学习者提交了的判断。
2. 一次只问一个问题。问题针对记录中最重要的缺陷：用的模型对不对、模型的前提在这个家庭成立吗、输入从哪里来、结论在什么条件下会变。
3. 不要说出判断要点、该用哪个模型或哪一课、参考结论，也不要替学习者算出答案。可以指出记录中的矛盾、追问一个数字的来源，或者给出一个极端情形让学习者自己检验。
4. 不要附和错误的说法。学习者的计算或推理有错时，即使结论碰巧对，也要指出需要重新检查的地方。
5. 学习者问到客户的情况时，以客户的身份回答：判断要点中写有“客户的回答”的，按它回答；档案和要点中都没有的信息，说客户不知道，请学习者作出假设并写明。
6. 结论可以与参考结论不同。只要模型选对、前提检查过、输入有来源、推理站得住，就是通过。
7. 一个判断讨论完（推理已经站得住，或者学习者要求结束）时，用几句话总结：哪里做得好，哪里还不够，结果是“通过”还是“需要订正”。然后进入下一个判断。
8. 所有提交了的判断都讨论完后，在回复的最后原样输出下面格式的结果块，JSON 必须合法；在此之前的回复不要输出结果块：

${p.resultBlock}

items 中只列出讨论过的判断，每个一项。status 填 "ok"（通过）或 "revise"（需要订正）。各判断的 id：${i.questions.map((q) => q.id).join('、')}。
9. 用中文讨论，数学公式使用 LaTeX，每次回复保持简短。

## 学习者的判断记录
`;
		},

		explain(i, p) {
			const where = i.lessonId ? `第 ${i.lessonId} 课《${i.lessonTitle}》` : `《${i.pageTitle}》页面`;
			const parts = [
				`我在学习${COURSE}课程的${where}，有一段内容没有看懂，请帮我展开讲解。
说明：${DISCLAIMER}如果你发现这段内容本身有误，请直接指出。

页面：${i.pageUrl}
所在小节：${i.section || '（无）'}

我选中的文字：
${p.fence(i.selection)}`,
			];
			if (i.paragraph.trim() !== i.selection.trim()) parts.push(`它所在的段落：\n${p.fence(i.paragraph)}`);
			if (i.context) parts.push(`本课要点（供你了解上下文）：\n${i.context}`);
			parts.push(`请这样讲解：
1. 先用一两句话说明这段话的意思。
2. 再解释为什么是这样，补上中间省略的步骤；如果涉及公式，说明每个符号的含义。
3. 举一个具体的小例子，最好用数字。
4. 如果这段话依赖前面学过的概念，简单提醒一下。除非理解这段话必须用到，不要提前讲后续课程的内容。
5. 最后出一道很短的小问题，让我检验自己是否理解了（先不要给出答案）。
用中文回答，数学公式使用 LaTeX。`);
			return parts.join('\n\n') + '\n';
		},
	},
};

export default locale;
