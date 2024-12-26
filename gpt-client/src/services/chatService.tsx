import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


export const sendChatRequest = async (prompt: string): Promise<string> => {
    try {
        // Use the correct interface for Axios response
        const response = await axios.post<string>(`${API_BASE_URL}/chat`, { prompt });
        return response.data; // Access the string inside the `data` field
    } catch (error: any) {
        console.error("Error while calling the API", error);
        throw error.response?.data || new Error("Network error");
    }
};