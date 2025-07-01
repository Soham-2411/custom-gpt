import { useState } from "react"

import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import MessageInput from "./components/MessageInput";
import useChat from "./Hooks/useChat";

function App() {

  const { messages, responseProcessing, handleSend } = useChat();

  const [input, setInput] = useState("");


  return (
    <>
      <div className="h-screen w-full flex flex-row">
        <Sidebar />
        <section className="flex-1 relative">
          <ChatContainer messages={messages} />
          <div className="absolute flex bg-chatarea flex-col bottom-0 left-1/2 transform -translate-x-1/2 w-[840px]">
            <MessageInput
              input={input}
              onInputChange={setInput}
              onSend={() => handleSend(input)}
              responseProcessing={responseProcessing}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
