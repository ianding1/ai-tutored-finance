// Show the reference solution of a capstone step once every judgment of the step is marked ok.
import { loadProgress } from './profile';

function render() {
	const results = loadProgress().results;
	document.querySelectorAll<HTMLElement>('[data-reference]').forEach((el) => {
		const lesson = el.dataset.reference;
		const ids = (el.dataset.ids || '').split(' ').filter(Boolean);
		const done = ids.length > 0 && ids.every((id) => results.some((r) => r.lesson === lesson && r.id === id && r.status === 'ok'));
		el.querySelector<HTMLElement>('[data-reference-body]')!.hidden = !done;
		el.querySelector<HTMLElement>('[data-reference-locked]')!.hidden = done;
	});
}

let started = false;
export function initReference() {
	if (started) return;
	started = true;
	render();
	window.addEventListener('lfwai:progress', render);
	window.addEventListener('storage', render);
}
