export const stateLanguagesMap: { [key: string]: string[] } = {
  'Andhra Pradesh': ['Telugu', 'Urdu', 'Hindi'],
  'Arunachal Pradesh': ['English', 'Hindi'],
  'Assam': ['Assamese', 'Hindi', 'Bengali'],
  'Bihar': ['Hindi', 'Urdu', 'Maithili'],
  'Chhattisgarh': ['Hindi', 'Marathi'],
  'Goa': ['Konkani', 'Hindi', 'Marathi'],
  'Gujarat': ['Gujarati', 'Hindi', 'English'],
  'Haryana': ['Hindi', 'Punjabi', 'English'],
  'Himachal Pradesh': ['Hindi', 'Punjabi', 'Nepali'],
  'Jharkhand': ['Hindi', 'Santali', 'Bengali'],
  'Karnataka': ['Kannada', 'Urdu', 'Marathi'],
  'Kerala': ['Malayalam', 'Tamil', 'English'],
  'Madhya Pradesh': ['Hindi', 'Marathi'],
  'Maharashtra': ['Marathi', 'Hindi', 'Urdu'],
  'Manipur': ['Manipuri', 'English', 'Hindi'],
  'Meghalaya': ['Khasi', 'English', 'Hindi'],
  'Mizoram': ['Mizoram', 'English', 'Hindi'],
  'Nagaland': ['Nagamese', 'English', 'Hindi'],
  'Odisha': ['Odia', 'Hindi', 'Bengali'],
  'Punjab': ['Punjabi', 'Hindi', 'English'],
  'Rajasthan': ['Hindi', 'Marwari', 'English'],
  'Sikkim': ['Nepali', 'English', 'Lepcha'],
  'Tamil Nadu': ['Tamil', 'English', 'Urdu'],
  'Telangana': ['Telugu', 'Urdu', 'Hindi'],
  'Tripura': ['Bengali', 'Kokborok', 'Hindi'],
  'Uttar Pradesh': ['Hindi', 'Urdu', 'Punjabi'],
  'Uttarakhand': ['Hindi', 'Garhwali', 'Kumaoni'],
  'West Bengal': ['Bengali', 'Urdu', 'Hindi'],
};

export const STATES = Object.keys(stateLanguagesMap).sort();

export const getLanguagesForState = (state: string): string[] => {
  return stateLanguagesMap[state] || [];
};
