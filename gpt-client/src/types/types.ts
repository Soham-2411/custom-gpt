export interface Message {
    user: boolean;
    text: string;
}

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: string;
}