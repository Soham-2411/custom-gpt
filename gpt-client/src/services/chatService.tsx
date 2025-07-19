import axios from 'axios';
import { Chat } from '../types/types';

export const API_BASE_URL = import.meta.env.VITE_API_URL;


export const sendChatRequest = async (prompt: string, context: string, chatId: String, userId: string): Promise<string> => {
    try {
        console.log(prompt)
        const response = await axios.post<string>(`${API_BASE_URL}/chat`, { prompt, context, chatId, userId });
        return response.data;
    } catch (error: any) {
        console.error("Error while calling the API", error);
        throw error.response?.data || new Error("Network error");
    }
};


export const sendTitleRequest = async (prompt: string): Promise<string> => {
    try {
        let context = "";
        let message = prompt + "\n Give me a chat title for this prompt";
        console.log(message);
        const response = await axios.post<string>(`${API_BASE_URL}/chat`, { message, context });
        return response.data;
    } catch (error: any) {
        console.error(error);
        return "New Chat";
    }
};

export const getChats = async (userId: String): Promise<Chat[]> => {
    try {
        const response = await axios.get<Chat[]>(`${API_BASE_URL}/chats`, {
            params: { userId }
        });
        return response.data.map(chat => ({
            ...chat,
            messages: chat.messages || [] // Ensure messages array exists
        }));
    } catch (error: any) {
        console.error("Error fetching chats:", error);
        throw error.response?.data || new Error("Failed to load chats");
    }
}