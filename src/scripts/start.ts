// "Start this lesson": copy the short prompt that starts an AI tutoring session.
import { copyPrompt, flash } from './dialog';
import { ui } from './page-data';

export function initStart() {
	document.querySelectorAll<HTMLButtonElement>('[data-start-prompt]').forEach((btn) => {
		btn.addEventListener('click', () => copyPrompt(btn.dataset.startPrompt || '', () => flash(btn, ui('copiedStart'))));
	});
}
