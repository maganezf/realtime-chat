import { getVowel, logic } from '../../../helpers';

export const encrypt = (message: string) => {
  let messageValues = message
    .split('')
    .map(letter =>
      logic(letter)
        ? (letter =
            String(getVowel('value', letter)) +
            String(new Date().getUTCFullYear()))
        : letter.charCodeAt(0).toString()
    );
  return messageValues;
};
