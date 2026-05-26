import { templates } from "./templates";

export function matchTemplate(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const template of templates) {
    let score = 0;

    for (const tag of template.tags) {
      if (lowerPrompt.includes(tag)) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = template;
    }
  }

  return bestMatch;
}