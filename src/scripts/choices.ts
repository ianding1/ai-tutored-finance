// Client behavior for check questions answered on the page (see QuestionBody.astro): the learner picks an
// option and submits it; the result is shown at once and stored like any other result ("ok" / "revise").
// A wrong answer shows the explanation. The learner may choose again and resubmit.
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
		const explain = form.querySelector<HTMLElement>('[data-choice-explain]')!;
		form.addEventListener('change', () => {
			result.textContent = '';
			delete result.dataset.state;
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
			explain.hidden = ok;
			applyResult({ lesson: form.dataset.lesson!, items: [{ id: form.dataset.choice!, status: ok ? 'ok' : 'revise' }] });
			renderStatuses();
		});
	});
}
