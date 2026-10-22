/**
 * Everything personal lives here.
 *
 * You can edit the names below, or set VITE_SENDER_NAME in a local .env file.
 * For example:
 *   VITE_SENDER_NAME="Your Favorite Person"
 */
const envSender = import.meta.env.VITE_SENDER_NAME

export const siteConfig = {
  recipient: {
    fullName: 'Grace Delighty',
    firstName: 'Grace',
    role: 'Software Developer',
    company: 'Capgemini',
  },
  sender: envSender || 'Your Favorite Person',
  opening: {
    eyebrow: 'A little surprise, made just for you',
    specialLine: 'Someone very special is starting something beautiful today... ✨',
    subtitle: 'Your first chapter at Capgemini begins today.',
    button: 'Open Your Surprise 💌',
    footnote: 'For the girl who makes ordinary days feel like magic.',
  },
  celebration: {
    eyebrow: 'SHE DID IT! ✨',
    titleLead: 'Congratulations,',
    journey:
      'Your journey as a Software Developer at Capgemini begins today.',
    paragraph:
      "I'm so proud of you, Grace. This is the beginning of an exciting new chapter filled with opportunities, learning, growth, and beautiful achievements.",
    card: {
      kicker: 'A moment to remember',
      name: 'GRACE DELIGHTY',
      role: 'Software Developer',
      company: 'CAPGEMINI',
      line: 'A new beginning. A thousand possibilities.',
    },
  },
  letter: {
    heading: 'Words I need you to carry',
    intro:
      'For the nerves, the butterflies, and every beautiful thing ahead — a few words from my heart to yours.',
    button: 'Open My Letter, Grace 💗',
    salutation: 'My Dearest Grace Delighty, ❤️',
    paragraphs: [
      'Today is your day, my love.',
      'Seeing you begin this beautiful new journey as a Software Developer at Capgemini makes me so happy. I hope you take a moment to appreciate yourself and everything that has brought you here.',
      'I believe in your talent, your strength, and your ability to create a beautiful future for yourself.',
      'And beyond all your achievements, deadlines, and busy workdays, I hope you always find reasons to smile and remember how special you are.',
      "Today, you begin a new professional journey. I hope it brings you wonderful friendships, amazing opportunities, confidence, success, and memories you'll cherish for years.",
      'Go into Capgemini with that beautiful smile of yours and show the world what Grace Delighty can do.',
      "I'm incredibly proud of you, sweetheart.",
      'Congratulations on your first day. ❤️',
      'Keep dreaming. Keep learning. Keep shining.',
      "You've got this, my girl. Always.",
    ],
    closing: 'With all my love,',
    signature: envSender || 'Your Favorite Person',
  },
  scenes: {
    newBeginning: {
      chapter: '01',
      kicker: 'A New Beginning',
      quote:
        'A new day. A new beginning. A beautiful future waiting for you.',
      supporting:
        'May this be the start of something extraordinary, Grace.',
    },
    promises: {
      chapter: '02',
      kicker: 'A Sky Full of Promises',
      heading: 'The future is yours, Grace.',
      intro:
        'A few little promises, written in the stars for your next chapter. Choose one, my love.',
      stars: [
        {
          id: 'win',
          label: 'your wins',
          x: 50,
          y: 85,
          promise:
            'I promise to celebrate every win — the promotions, the breakthroughs, and the tiny victories nobody else notices.',
        },
        {
          id: 'hard-days',
          label: 'hard days',
          x: 69,
          y: 66,
          promise:
            'I promise to be your soft place to land after the difficult days, without ever asking you to be anything other than yourself.',
        },
        {
          id: 'dreams',
          label: 'big dreams',
          x: 82,
          y: 31,
          promise:
            'I promise to believe in every dream you whisper, even the ones that still feel too big to say out loud.',
        },
        {
          id: 'joy',
          label: 'small joys',
          x: 61,
          y: 16,
          promise:
            'I promise to keep finding little reasons to make you smile, on the ordinary Tuesdays as much as the unforgettable days.',
        },
        {
          id: 'growth',
          label: 'your growth',
          x: 39,
          y: 16,
          promise:
            'I promise to cheer for the woman you are becoming — and to love every version of you along the way.',
        },
        {
          id: 'always',
          label: 'always',
          x: 20,
          y: 31,
          promise:
            'I promise to be in your corner, always. In the first days, the hard days, and every beautiful day still to come.',
        },
      ],
      defaultMessage: 'Choose a star, my love. ✨',
    },
  },
  finale: {
    kicker: 'One last thing, before you go',
    script: "You've got this, my girl.",
    lead: 'Go show the world what Grace Delighty can do.',
    paragraph:
      "I'll be right here — cheering the loudest, holding your hand through every new beginning, and loving you in every chapter.",
    loveNote: 'I love you. Yesterday, today, and in every beautiful tomorrow.',
    plate: {
      small: 'Made for',
      name: 'Grace Delighty',
      line: 'Software Developer · Capgemini',
    },
    signature: 'Always yours,',
    footer: 'Made with love, sleepless nights, and a very full heart.',
  },
}

export const letterLength = [
  siteConfig.letter.salutation,
  ...siteConfig.letter.paragraphs,
  siteConfig.letter.closing,
  `${siteConfig.letter.signature} ❤️`,
].reduce((total, text) => total + Array.from(text).length, 0)
