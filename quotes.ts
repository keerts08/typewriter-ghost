export interface Quote {
  text: string;
  source: string;
  author: string;
  year: number;
}

export const NOVEL_QUOTES: Quote[] = [
  {
    text: "It was a bright cold day in April, and the clocks were striking thirteen.",
    source: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
  },
  {
    text: "Call me Ishmael. Some years ago—never mind how long precisely—having little money in my pocket and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
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
    text: "There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further outdoor exercise was now out of the question.",
    source: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
  },
  {
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    source: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: 1859,
  },
  {
    text: "All happy families are alike; each unhappy family is unhappy in its own way.",
    source: "Anna Karenina",
    author: "Leo Tolstoy",
    year: 1878,
  },
  {
    text: "Lolita, light of my life, fire of my loins. Lo-lee-ta: the tip of the tongue taking a trip of three steps down the palate to tap, at three, on the teeth.",
    source: "Lolita",
    author: "Vladimir Nabokov",
    year: 1955,
  },
  {
    text: "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show.",
    source: "David Copperfield",
    author: "Charles Dickens",
    year: 1850,
  },
  {
    text: "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter.",
    source: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
  },
  {
    text: "There is nothing either good or bad, but thinking makes it so.",
    source: "Hamlet",
    author: "William Shakespeare",
    year: 1603,
  },
  {
    text: "The sky above the port was the color of television, tuned to a dead channel.",
    source: "Neuromancer",
    author: "William Gibson",
    year: 1984,
  },
  {
    text: "Mrs Dalloway said she would buy the flowers herself. For Lucy had her work cut out for her.",
    source: "Mrs Dalloway",
    author: "Virginia Woolf",
    year: 1925,
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
    text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep.",
    source: "Genesis 1:1",
    author: "The Bible (KJV)",
    year: 1611,
  },
  {
    text: "Marley was dead: to begin with. There is no doubt whatever about that.",
    source: "A Christmas Carol",
    author: "Charles Dickens",
    year: 1843,
  },
  {
    text: "It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York.",
    source: "The Bell Jar",
    author: "Sylvia Plath",
    year: 1963,
  },
  {
    text: "124 was spiteful. Full of a baby's venom. The women of 124 had lived with it, shared it, and finally left.",
    source: "Beloved",
    author: "Toni Morrison",
    year: 1987,
  },
  {
    text: "Time is not a line but a dimension, like the dimensions of space. If you can bend space you can bend time also, and if you knew enough and could move faster than light you could travel backwards in time.",
    source: "Cat's Eye",
    author: "Margaret Atwood",
    year: 1988,
  },
  {
    text: "The man in black fled across the desert, and the gunslinger followed.",
    source: "The Dark Tower: The Gunslinger",
    author: "Stephen King",
    year: 1982,
  },
  {
    text: "Last night I dreamt I went to Manderley again.",
    source: "Rebecca",
    author: "Daphne du Maurier",
    year: 1938,
  },
  {
    text: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.",
    source: "Ulysses",
    author: "James Joyce",
    year: 1922,
  },
  {
    text: "The sun shone, having no alternative, on the nothing new.",
    source: "Murphy",
    author: "Samuel Beckett",
    year: 1938,
  },
  {
    text: "It was a dark and stormy night; the rain fell in torrents — except at occasional intervals, when it was checked by a violent gust of wind.",
    source: "Paul Clifford",
    author: "Edward Bulwer-Lytton",
    year: 1830,
  },
  {
    text: "Happy families are all alike; every unhappy family is unhappy in its own way.",
    source: "Anna Karenina",
    author: "Leo Tolstoy",
    year: 1877,
  },
  {
    text: "I am an invisible man. No, I am not a spook like those who haunted Edgar Allan Poe.",
    source: "Invisible Man",
    author: "Ralph Ellison",
    year: 1952,
  },
];

export function getRandomQuote(): Quote {
  return NOVEL_QUOTES[Math.floor(Math.random() * NOVEL_QUOTES.length)];
}
