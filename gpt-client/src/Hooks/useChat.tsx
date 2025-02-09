import { useEffect, useState } from "react"
import { Message } from "../types/types"
import { sendChatRequest, API_BASE_URL } from "../services/chatService";

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [responseProcessing, setResponseProcessing] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/chat`)
            .then(response => response.json())
            .then(data => { setMessages(data) })
            .catch(error => console.error('Error loading chat history:', error));
    }, []);

    const handleSend = async (input: string) => {
        if (input.trim() !== "") {
            setResponseProcessing(true);
            const context = messages.map((msg) => {
                return `${msg.user ? "User" : "Assistant"}: ${msg.text}`
            }).join("\n")
            const updatedMessages = [...messages, { user: true, text: input }];
            setMessages(updatedMessages);
            const response = await sendChatRequest(input, context);
            console.log(response)
            setMessages([...messages, { user: true, text: input }, { user: false, text: response }]);
            setResponseProcessing(false);
        }

    };

    return { messages, responseProcessing, handleSend };
};

export default useChat;