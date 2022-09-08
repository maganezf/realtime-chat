import { VOWELS, VOWELS_ENUM } from './constants';

export const getStringIgnoringAccents = (text: string) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();

export const getVowel = (response: 'value' | 'index', value: string) =>
	response === 'value'
		? Object.values(VOWELS_ENUM)[
				Object.keys(VOWELS_ENUM).indexOf(getStringIgnoringAccents(value))
		  ]
		: Object.keys(VOWELS_ENUM)[
				Object.values(VOWELS_ENUM).indexOf(value as VOWELS_ENUM)
		  ];

export const logic = (vowel: string) =>
	VOWELS.includes(getStringIgnoringAccents(vowel));
