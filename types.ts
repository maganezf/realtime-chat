interface Data {
	room: string;
	author: string;
	time: string;
}

export interface ServerMessage extends Data {
	message: string[];
}

export interface ClientMessage extends Data {
	message: string;
}
