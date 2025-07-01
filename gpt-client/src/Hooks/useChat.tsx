import { useEffect, useState } from "react"
import { Message, Chat } from "../types/types"
import { sendChatRequest } from "../services/chatService";

const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [responseProcessing, setResponseProcessing] = useState<boolean>(false);

    useEffect(() => {
        const newChat = createNewChat();
        setChats([newChat]);
        setActiveChatId(newChat.id)

    }, []);

    const createNewChat = (): Chat => {
        return {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [],
            createdAt: new Date().toISOString(),
        }
    };

    const switchChat = (chatId: string) => {
        setActiveChatId(chatId);
    };

    // Add a new chat
    const addChat = () => {
        const newChat = createNewChat();
        setChats([...chats, newChat]);
        setActiveChatId(newChat.id);
    };

    const deleteChat = (chatId: string) => {
        const updatedChats = chats.filter((chat) => chat.id !== chatId);
        setChats(updatedChats);
        if (activeChatId === chatId) {
            setActiveChatId(updatedChats[0]?.id || null);
        }
    };

    const handleSend = async (input: string) => {

        console.log("CALLING API")
        console.log(activeChatId)
        console.log(input)
        if (!activeChatId || input.trim() === "") return;

        console.log("CALLING API")
        setResponseProcessing(true);
        const activeChat = chats.find((chat) => chat.id === activeChatId);
        if (!activeChat) return;

        // Update UI optimistically
        const updatedMessages: Message[] = [
            ...activeChat.messages,
            { user: true, text: input },
        ];

        const updatedChats = chats.map((chat) =>
            chat.id === activeChatId
                ? { ...chat, messages: updatedMessages }
                : chat
        );
        setChats(updatedChats);

        // Generate context from current chat's messages
        const context = activeChat.messages
            .map((msg) => `${msg.user ? "User" : "Assistant"}: ${msg.text}`)
            .join("\n");

        // Call API
        const response = await sendChatRequest(input, context);

        // Update with response
        const finalMessages: Message[] = [
            ...updatedMessages,
            { user: false, text: response },
        ];

        setChats(
            chats.map((chat) =>
                chat.id === activeChatId
                    ? { ...chat, messages: finalMessages }
                    : chat
            )
        );
        setResponseProcessing(false);
    };

    // Get messages for active chat
    const messages = activeChatId
        ? chats.find((chat) => chat.id === activeChatId)?.messages || []
        : [];

    return {
        chats,
        activeChatId,
        messages,
        responseProcessing,
        handleSend,
        switchChat,
        addChat,
        deleteChat,
    };
};

export default useChat;