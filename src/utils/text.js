export function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
