import { getVowel, logic } from '../../../helpers';

export const decrypt = (messageValues: string[]) => {
  messageValues = messageValues.map(letter => {
    const parsed = letter.replace(String(new Date().getUTCFullYear()), '');
    if (logic(String(getVowel('index', parsed)))) {
      return String(getVowel('index', parsed));
    } else {
      return String.fromCharCode(Number(letter));
    }
  });
  return messageValues.join('');
};
