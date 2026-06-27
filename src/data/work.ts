export interface Video {
  id: string;
  title: string;
  caption: string;
}

export interface Category {
  slug: string;
  name: string;
  videos: Video[];
}

export interface Tier {
  slug: string;
  name: string;
  categories: Category[];
}

// Three categories per tier today. To add a category, append an object to
// the relevant tier's `categories` array. To add a tier, append an object
// here. work.astro only ever iterates tiers -> categories -> videos, so
// neither change requires touching the page template.
export const tiers: Tier[] = [
  {
    slug: 'professional',
    name: 'Professional Work',
    categories: [
      {
        slug: 'cinematics',
        name: 'Cinematics',
        videos: [
          {
            id: 'p07S7rEP15w',
            title: 'Codebrew 2026',
            caption:
              "Promotional cinematic for CISSA's Codebrew event. Filmed, directed, wrote, and edited. Music selection, color grading, transitions, and subtitling.",
          },
          {
            id: 'guW2GEs23d8',
            title: 'Design Blitz 2026',
            caption:
              "Promotional cinematic for CISSA's Design Blitz event. Filmed, directed, wrote, and edited. Sound design and effects, visual effects, color grading, and subtitling.",
          },
          {
            id: 'skf5tVMvmlc',
            title: 'Codebrew 2025',
            caption:
              "Promotional cinematic for CISSA's Codebrew 2025 event. Filmed, directed, wrote, and edited. Fast-paced cuts and music, custom title-card graphics, and keyframed animations.",
          },
        ],
      },
      {
        slug: 'performance-films',
        name: 'Performance Films',
        videos: [
          {
            id: 'YvxLGyyryAY',
            title: 'SKYFALL: Aerial Silk Performance by Simone K.',
            caption:
              'Live aerial silk performance edited from two camera angles, synced to music with precise cuts, color grading, cropping, and transitions. 7K+ views.',
          },
          {
            id: 'OCtXXwbO5vM',
            title: 'Aerial Performance at the Ritz Carlton',
            caption:
              'Live aerial performance edited from four camera angles. Shots restructured and re-timed to a shortened music cut for a tighter final piece. 1.8K views.',
          },
          {
            id: '0idQhppoLz0',
            title: 'PowerSwing Aerial Annual Student Showcase 2025',
            caption:
              'Annual showcase editing seven separate aerial performances back to back, each cut to its own shortened track with custom title cards created for every performer. Transitions and color grading throughout.',
          },
        ],
      },
      {
        slug: 'event-promotional',
        name: 'Event & Promotional',
        videos: [
          {
            id: 'yc52Y1ZOfBA',
            title: 'EOX: City of Stars',
            caption:
              "A fast-paced recap of last year's EOX event, made to promote the next one. Quick cuts, speed adjustments, on-screen text, and upbeat pacing.",
          },
          {
            id: 'jutu-60LGEE',
            title: 'Welcome to CISSA',
            caption:
              "The club's official trailer, in use for over a year. Heavy keyframing and motion graphics, animated text and logos, infographics, and footage from past events.",
          },
        ],
      },
    ],
  },
  {
    slug: 'personal-creative',
    name: 'Personal & Creative Work',
    categories: [
      {
        slug: 'narrative-film',
        name: 'Narrative Film',
        videos: [
          {
            id: 'NeYMtW2uogI',
            title: 'Veritas Ltd. Orientation Tape',
            caption:
              'An in-universe orientation tape for an original horror game concept, made for a university video games subject. Filmed and starred in it. VHS effects, ambient sound design, overlays, color grading, and subtitling.',
          },
          {
            id: 'C-4IXz79OoQ',
            title: 'Veritas Ltd. Pre-Deployment Briefing',
            caption:
              "A sequel that explores the game's mechanics. Filmed and starred in it. Includes custom animations such as a top-down map with a moving player icon, plus the VHS aesthetic and subtitling.",
          },
        ],
      },
      {
        slug: 'video-essays',
        name: 'Video Essays',
        videos: [
          {
            id: '6nkv1ZSDIo0',
            title: 'Why Do Games Keep Launching Broken?',
            caption:
              'An original video essay on the trend of major games launching in a broken state. Voiceover over gameplay, sourced news clips and graphics, and an edited cold-open skit with effects. Subtitled.',
          },
          {
            id: 'fCDThC5ndbI',
            title: "What's Herobrine's Deal? | Fallen Kingdom Music Series",
            caption:
              "A video essay dissecting the antagonist's motives across CaptainSparklez's Fallen Kingdom music series. Self-written and voiced, with clip and image editing and background scoring. 4K views.",
          },
        ],
      },
      {
        slug: 'trailers',
        name: 'Trailers',
        videos: [
          {
            id: 'gdAnA7zHXJM',
            title: 'Captain America: Civil War, Creed III Trailer Style',
            caption:
              'A fanmade trailer recutting Captain America: Civil War to the music and editing rhythm of the Creed III trailer. 7K+ views.',
          },
          {
            id: '96UAaY_cybg',
            title: 'Top Gun Maverick, Oppenheimer Trailer Style',
            caption:
              'A fanmade trailer recutting Top Gun Maverick in the style of the Oppenheimer main trailer. 2K views.',
          },
          {
            id: '0rlQVqV4aD0',
            title: "Avengers Endgame, King's Man Trailer 2 Style",
            caption:
              "A fanmade trailer recutting Avengers: Endgame to the music and editing structure of the King's Man Trailer 2. 1.1K views.",
          },
        ],
      },
    ],
  },
];
