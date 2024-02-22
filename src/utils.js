function generateRandomNumberString() {
  const randomNumber = Math.floor(Math.random() * 99) + 1; // Generates a number between 1 and 99
  return randomNumber < 10 ? `0${randomNumber}` : `${randomNumber}`;
}

const adjectives = [
  'excited',
  'caffeinated',
  'innovative',
  'dynamic',
  'creative',
  'enthusiastic',
  'brilliant',
  'inspired',
  'motivated',
  'dedicated',
  'passionate',
  'energetic',
  'resourceful',
  'adventurous',
  'curious',
  'ambitious',
  'intelligent',
  'inventive',
  'persevering',
  'visionary',
];

const nouns = [
  'developer',
  'technologist',
  'programmer',
  'engineer',
  'creator',
  'innovator',
  'coder',
  'hacker',
  'builder',
  'designer',
  'architect',
  'thinker',
  'problem-solver',
  'enthusiast',
  'analyst',
  'strategist',
  'planner',
  'pioneer',
  'explorer',
  'visionary',
];

export function getOrSetId() {
  let id = localStorage.getItem('devWeekId');
  if (!id) {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumberString = generateRandomNumberString();

    id = `${randomAdjective}-${randomNoun}-${randomNumberString}`;

    localStorage.setItem('devWeekId', id);
  }
  return id;
}

export const types = [
  'General Technologist',
  'DevOps Engineer',
  'Full-Stack Developer',
  'Web Developer',
  'Solutions Engineer',
  'Data Scientist',
  'Mobile App Developer',
  'Cloud Architect',
  'Software Engineer',
  'UI/UX Designer',
  'Front-End Developer',
  'Back-End Developer',
  'Security Analyst',
  'Database Administrator',
  'System Administrator',
  'Machine Learning Engineer',
  'QA Engineer',
  'Network Engineer',
  'Product Manager',
  'Technical Writer',
  'Blockchain Developer',
];

// list of 50 US states
export const states = [
  'Other / International',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
