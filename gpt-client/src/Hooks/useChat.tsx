import { useEffect, useState } from "react"
import { Message, Chat } from "../types/types"
import { sendChatRequest } from "../services/chatService";
import { useAuth } from "../contexts/AuthContext";

const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [responseProcessing, setResponseProcessing] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        const newChat = createNewChat();
        setChats([newChat]);
        setActiveChatId(newChat.id)

    }, []);

    const createNewChat = (): Chat => {
        return {
            id: crypto.randomUUID(),
            title: "New Chat",
            messages: [],
            createdAt: new Date().toISOString(),
        }
    };

    const switchChat = (chatId: string) => {
        setActiveChatId(chatId);
    };

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

        console.log(input)
        if (!activeChatId || input.trim() === "") return;

        setResponseProcessing(true);
        const activeChat = chats.find((chat) => chat.id === activeChatId);
        if (!activeChat) return;

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

        const context = activeChat.messages
            .map((msg) => `${msg.user ? "User" : "Assistant"}: ${msg.text}`)
            .join("\n");
        const response = await sendChatRequest(input, context, activeChatId, user.id);
        // const shouldGenerateTitle = activeChat.messages.length === 0;
        // let title = activeChat.title;
        // if (shouldGenerateTitle) {

        //     try {
        //         console.log("Prompt for Title: ", title)
        //         title = await sendTitleRequest(input);
        //         title = title.replace(/['"]+/g, '').substring(0, 30);
        //     } catch (error) {
        //         title = input.substring(0, 30) || "New Chat";
        //     }
        // }

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
        setChats,
        handleSend,
        switchChat,
        addChat,
        deleteChat,
    };
};

export default useChat;