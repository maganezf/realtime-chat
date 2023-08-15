import { Dispatch, SetStateAction } from 'react';

export type State = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};
