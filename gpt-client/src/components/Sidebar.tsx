import { Chat } from "../types/types"

interface SidebarProps {
    chats: Chat[]
    activeChatId: string | null
    onAddChat: () => void
    onDeleteChat: (chatId: string) => void
    onSwitchChat: (chatId: string) => void
}


const Sidebar: React.FC<SidebarProps> = ({ 
    chats, 
    activeChatId, 
    onAddChat, 
    onDeleteChat, 
    onSwitchChat 
}) => {
    return (
        <aside className="h-screen w-60 p-4 bg-sidebar overflow-y-auto">
            <h1 className="text-xl text-center mb-4">Chats</h1>
            
            {/* New Chat Button */}
            <div
                className="text-left pl-3 mb-4 py-3 border rounded-lg border-gray-600 hover:bg-gray-300 hover:bg-opacity-10 transition ease-in cursor-pointer"
                onClick={onAddChat}
            >
                <p className="text-sm">+ New chat</p>
            </div>

            {/* Chat List */}
            <div className="space-y-2">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSwitchChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition ease-in ${
                            chat.id === activeChatId 
                                ? "bg-gray-300 bg-opacity-20 border border-gray-500" 
                                : "hover:bg-gray-300 hover:bg-opacity-10 border border-transparent"
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="truncate text-sm">
                                {chat.title || "Untitled Chat"}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteChat(chat.id);
                                }}
                                className="text-gray-400 hover:text-red-400 ml-2"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};


export default Sidebar