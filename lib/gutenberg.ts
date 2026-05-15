export interface GutenbergBook {
  id: number;
  title: string;
  authors: { name: string; birth_year: number; death_year: number }[];
}

export const BOOK_IDS = [
  1342, // Pride and Prejudice
  11, // Alice in Wonderland
  84, // Frankenstein
  1080, // A Modest Proposal
  2701, // Moby Dick
  98, // A Tale of Two Cities
  1661, // Sherlock Holmes
  174, // The Picture of Dorian Gray
  1952, // The Yellow Wallpaper
  219, // Heart of Darkness
  76, // Huckleberry Finn
  345, // Dracula
];

export async function fetchBookOpener(bookId: number): Promise<{
  text: string;
  source: string;
  author: string;
  year: number;
} | null> {
  try {
    const metadataResponse = await fetch(
      `https://gutendex.com/books/${bookId}`,
    );
    if (!metadataResponse.ok)
      console.error(
        `Failed to fetch metadata for book ID ${bookId}: ${metadataResponse.statusText}`,
      );
    const meta: GutenbergBook = await metadataResponse.json();

    const author = meta.authors[0]?.name ?? "Unknown";
    const year = meta.authors[0]?.death_year ?? 0;

    const textUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
    const textResponse = await fetch(textUrl);
    if (!textResponse.ok)
      console.error(
        `Failed to fetch text for book ID ${bookId}: ${textResponse.statusText}`,
      );

    const text = await textResponse.text();

    const opener = extractOpener(text);
    if (!opener) {
      console.warn(`Could not extract opener for book ID ${bookId}`);
      return null;
    }

    return {
      text: opener,
      source: meta.title,
      author: formatAuthorName(author),
      year,
    };
  } catch (error) {
    console.error(`Error fetching book opener for ID ${bookId}:`, error);
    return null;
  }
}

function extractOpener(text: string): string | null {
  const marker = text.indexOf("*** START OF");
  const content = marker !== -1 ? text.slice(marker) : text;

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 40);
  const proseLine = lines.find(
    (line) =>
      line.includes(" ") &&
      line !== line.toUpperCase() &&
      !/^chapter/i.test(line),
  );
  if (!proseLine) return null;

  const sentenceEnd = proseLine.search(/[.!?]/);
  if (sentenceEnd === -1) return proseLine.slice(0, 120);
  return proseLine.slice(0, sentenceEnd + 1).trim();
}

function formatAuthorName(name: string): string {
  const parts = name.split(", ");
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : name;
}
