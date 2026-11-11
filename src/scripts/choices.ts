// Client behavior for check questions answered on the page (see QuestionBody.astro): the learner picks an
// option and submits it; the result is shown at once and stored like any other result ("ok" / "revise").
// A wrong answer shows what is wrong with the picked option (or, for true / false, a hint) without revealing the
// right answer. The learner may choose again and resubmit.
import { ui } from './page-data';
import { applyResult } from './profile';
import { renderStatuses } from './questions';

let done = false;

export function initChoices() {
	if (done) return;
	done = true;
	renderStatuses();
	document.querySelectorAll<HTMLFormElement>('form[data-choice]').forEach((form) => {
		const result = form.querySelector<HTMLElement>('[data-choice-result]')!;
		const notes = [...form.querySelectorAll<HTMLElement>('[data-choice-why]')];
		const showNote = (key: string | null) => notes.forEach((n) => (n.hidden = n.dataset.choiceWhy !== key));
		form.addEventListener('change', () => {
			result.textContent = '';
			delete result.dataset.state;
			showNote(null);
		});
		form.addEventListener('submit', (ev) => {
			ev.preventDefault();
			const picked = form.querySelector<HTMLInputElement>('input[type=radio]:checked');
			if (!picked) {
				result.textContent = ui('chooseFirst');
				result.dataset.state = 'none';
				return;
			}
			const ok = picked.value === form.dataset.correct;
			result.textContent = ui(ok ? 'answerCorrect' : 'answerWrong');
			result.dataset.state = ok ? 'ok' : 'revise';
			showNote(ok ? null : form.dataset.judge !== undefined ? 'hint' : picked.value);
			applyResult({ lesson: form.dataset.lesson!, items: [{ id: form.dataset.choice!, status: ok ? 'ok' : 'revise' }] });
			renderStatuses();
		});
	});
}
