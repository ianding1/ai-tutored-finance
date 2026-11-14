// Prompt building. The wording of each prompt is in the locale modules (src/i18n/locales/<code>.ts);
// this file adds the language-independent parts. Every prompt must be self-contained: many assistants
// cannot open URLs, so all content needed for the task is written into the prompt itself.

import { LOCALES } from '../i18n/ui';
import type { ExplainInput, PromptParts } from '../i18n/types';

export type { ExplainInput } from '../i18n/types';

function parts(): PromptParts {
	return {
		bullets: (xs) => xs.map((x) => `- ${x}`).join('\n'),
		fence: (s) => `"""\n${s.trim()}\n"""`,
	};
}

export function explainPrompt(i: ExplainInput): string {
	return LOCALES[i.lang].prompts.explain(i, parts());
}
