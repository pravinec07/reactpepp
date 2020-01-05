export const GENRE = [
  { value: 'Health and Medical', label: 'Health and Medical' },
  { value: 'Business and Finance', label: 'Business and Finance' },
  { value: 'Technical', label: 'Technical' },
  {
    value: 'Deep Technical- AI/ML/IoT/Cybersecurity',
    label: 'Deep Technical- AI/ML/IoT/Cybersecurity',
  },
  { value: 'Lifestyle and Fashion', label: 'Lifestyle and Fashion' },
  {
    value: 'Nutrition/ Food and Beverage',
    label: 'Nutrition/ Food and Beverage',
  },
  {
    value: 'News Content and/or Entertainment',
    label: 'News Content and/or Entertainment',
  },
  { value: 'Travel and Hospitality', label: 'Travel and Hospitality' },
  { value: 'Sports and Recreation', label: 'Sports and Recreation' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Family-Parenting/Childcare', label: 'Family-Parenting/Childcare' },
  {
    value: 'Opinionated and Engaging Content',
    label: 'Opinionated and Engaging Content',
  },
  { value: 'Education', label: 'Education' },
  { value: 'Astrology and Spiritual', label: 'Astrology and Spiritual' },
  { value: 'Generic', label: 'Generic' },
  { value: 'Other', label: 'Other' },
];
export const VERTICAL = [
  { value: 'Blogs and Articles', label: 'Blogs and Articles' },
  { value: 'Website Content', label: 'Website Content' },
  { value: 'Academic/Book Writing', label: 'Academic/Book Writing' },
  { value: 'Press Releases', label: 'Press Releases' },
  { value: 'White Papers', label: 'White Papers' },
  { value: 'Branded Content', label: 'Branded Content' },
  { value: 'Copywriting', label: 'Copywriting' },
  { value: 'Social Media- LinkedIn', label: 'Social Media- LinkedIn' },
  { value: 'Social Media- Facebook', label: 'Social Media- Facebook' },
  { value: 'Social Media- Twitter', label: 'Social Media- Twitter' },
  { value: 'Social Media- Instagram', label: 'Social Media- Instagram' },
  {
    value: 'Product Descriptions and Reviews',
    label: 'Product Descriptions and Reviews',
  },
  {
    value: 'Corporate Communications Content',
    label: 'Corporate Communications Content',
  },
  {
    value: 'Technical Content Writing- Manuals, Software Testing Guides',
    label: 'Technical Content Writing- Manuals, Software Testing Guides',
  },
  { value: 'Others', label: 'Others' },
];
export const LANGUAGE = [
  { value: 'Assamese', label: 'Assamese' },
  { value: 'English', label: 'English' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
  { value: 'Odia', label: 'Odia' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'European Languages', label: 'European Languages' },
  {
    value: 'Other South-east Asian Languages',
    label: 'Other South-east Asian Languages',
  },
];
export const PAY_RANGE = [
  { value: '0.3-0.5', label: '0.3-0.5' },
  { value: '0.5-0.7', label: '0.5-0.7' },
  { value: '0.7-0.9', label: '0.7-0.9' },
  { value: '0.9-1.2', label: '0.9-1.2' },
  { value: '1.2-1.5', label: '1.2-1.5' },
  { value: '1.5-2.0', label: '1.5-2.0' },
  { value: '2.0 and above', label: '2.0 and above' },
];
export const POSITION_SOURCE = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Naukri.com', label: 'Naukri.com' },
  { value: 'Others', label: 'Others' },
  { value: 'Pepper Campus Ambassador', label: 'Pepper Campus Ambassador' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Whatsapp Groups', label: 'Whatsapp Groups' },
  { value: 'Writer Referral', label: 'Writer Referral' },
];

export const LOCAL_MESSAGE = {
  somthingWrong:
    'Something Wrong!!! Please check your internet connection and retry.',
};

export const Constants = {
  status: {
    ALL: 'All',
    INPROGRESS: 'In-Progress',
    REJECTED: 'Rejected',
    COMPLETED: 'Completed',
    SUBMITTED: 'Submitted',
    REWORK: 'Rework',
  },
  colors: {
    ALL: 'black',
    INPROGRESS: '#e8e806',
    REJECTED: 'red',
    COMPLETED: 'green',
    SUBMITTED: 'blue',
    REWORK: 'pink',
  },
};

export const DAYS = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' },
];

export const PASSWORD_REGX = {
  regx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  error:
    'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
};
