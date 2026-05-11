export interface Quote {
    text: string;
    source: string;
    author: string;
    year: number;
}

export const QUOTES: Quote[] = [
  {
    text: "It was a bright cold day in April, and the clocks were striking thirteen.",
    source: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
  },
  {
    text: "Call me Ishmael.",
    source: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
  },
  {
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    source: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
  },
  {
    text: "It was the best of times, it was the worst of times.",
    source: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: 1859,
  },
  {
    text: "Last night I dreamt I went to Manderley again.",
    source: "Rebecca",
    author: "Daphne du Maurier",
    year: 1938,
  },
  {
    text: "All happy families are alike; each unhappy family is unhappy in its own way.",
    source: "Anna Karenina",
    author: "Leo Tolstoy",
    year: 1878,
  },
  {
    text: "Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
    source: "The Trial",
    author: "Franz Kafka",
    year: 1925,
  },
  {
    text: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
    source: "The Metamorphosis",
    author: "Franz Kafka",
    year: 1915,
  },
  {
    text: "Marley was dead: to begin with. There is no doubt whatever about that.",
    source: "A Christmas Carol",
    author: "Charles Dickens",
    year: 1843,
  },
  {
    text: "The man in black fled across the desert, and the gunslinger followed.",
    source: "The Dark Tower",
    author: "Stephen King",
    year: 1982,
  },
];

export function getRandomQuote(): Quote {
    return QUOTES[Math.floor(Math.random() * QUOTES. length)]
}