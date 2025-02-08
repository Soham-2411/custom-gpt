import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080/api';


export const sendChatRequest = async (prompt: string, context: string): Promise<string> => {
    try {
        console.log(prompt)
        const response = await axios.post<string>(`${API_BASE_URL}/chat`, { prompt, context });
        return response.data;
    } catch (error: any) {
        console.error("Error while calling the API", error);
        throw error.response?.data || new Error("Network error");
    }
};