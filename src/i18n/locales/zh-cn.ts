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
		copiedExplain: '已复制讲解提示词',
		choiceTrue: '对',
		choiceFalse: '错',
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
		routeTitle: '课程路线',
		routePublished: '已发布',
		routeUpcoming: '编写中',
		routeQuiz: '测验',
		exercisesNote: '练习题由 AI 老师在讲完本课后布置并批改。点击页面顶部的“开始学习本课”。',
		quizNote: '测验题由 AI 老师逐题给出并批改。点击页面顶部的“开始学习本课”。',
		startLearning: '开始学习本课',
		startHint: '复制一段提示词，粘贴到能访问网页的 AI 助手中，它会读取本课的教案并开始讲解和提问。网站不保存学习进度，由 AI 助手记录。',
		copiedStart: '已复制，粘贴到你的 AI 助手中开始学习',
		startPrompt: '请当我的老师，带我学习「AI 辅导学金融」第 {id} 课《{title}》。先读取并遵守教学规则：{rules}\n本课教案：{pack}\n答案文件（只供你使用，我作答前不要透露）：{key}\n课程索引：{index}\n如果你打不开这些网页，请直接告诉我，不要凭记忆讲课。如果你有记忆或项目笔记，先查看我的学习记录，从上次停下的地方继续。',
	},

	prompts: {
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
