import { useState } from "react"

import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import MessageInput from "./components/MessageInput";
import useChat from "./Hooks/useChat";

function App() {

  const {
    chats,
    activeChatId,
    responseProcessing,
    handleSend,
    switchChat,
    addChat,
    deleteChat,
  } = useChat();


  const [input, setInput] = useState("");


  return (
    <>
      <div className="h-screen w-full flex flex-row">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onAddChat={addChat}
          onDeleteChat={deleteChat}
          onSwitchChat={switchChat}
        />
        <section className="flex-1 relative">
          <ChatContainer
            messages={activeChatId ? chats.find(c => c.id === activeChatId)?.messages || [] : []}
            responseProcessing={responseProcessing}
          />
          <div className="absolute flex bg-chatarea flex-col bottom-0 left-1/2 transform -translate-x-1/2 w-[840px]">
            <MessageInput
              input={input}
              onInputChange={setInput}
              onSend={() => {
                handleSend(input);
                setInput("");
              }}
              responseProcessing={responseProcessing}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
