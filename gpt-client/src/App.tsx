import { FaPaperclip, FaArrowUp } from "react-icons/fa"
import { useState } from "react"
import Query from "./components/Query"
import Response from "./components/Response"
import { sendChatRequest } from './services/chatService';

function App() {

  const [responseProcessing, setResponseProcessing] = useState<boolean>(false);

  const [messages, setMessages] = useState<{ isUser: boolean, text: string }[]>([

  ]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() !== "") {
      setResponseProcessing(true);
      setMessages([...messages, { isUser: true, text: input }])
      const response = await sendChatRequest(input);
      console.log(response)
      setMessages([...messages, { isUser: true, text: input }, { isUser: false, text: response }]);
      setInput(""); // Clear the textarea
      setResponseProcessing(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-row">
        <aside className="h-screen w-60 text-center p-4 bg-sidebar">
          <h1 className="text-xl">Chats</h1>
          <div className="text-left pl-3 mt-5 py-3 border rounded-lg border-gray-600 hover:bg-gray-300 hover:bg-opacity-10 transition ease-in hover:cursor-pointer">
            <p className="text-sm">+ New chat</p>
          </div>
        </aside>

        <section className="flex-1 relative">
          <div className="h-full overflow-y-auto pb-52">

            {messages.map((msg, index) => (
              msg.isUser ? (
                <Query key={index} text={msg.text} />
              ) : (
                <Response key={index} text={msg.text} />
              )
            ))}
          </div>

          <div className="absolute bg-input rounded-3xl flex flex-col bottom-0 left-1/2 transform -translate-x-1/2 p-4 w-[800px] mb-10">
            <div className="w-full rounded-3xl flex items-center flex-row justify-between">
              <textarea
                className="flex-1 rounded-3xl bg-transparent focus:outline-none resize-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <div className="flex flex-row justify-between mt-0">
              <button className="w-10 rounded-full hover:bg-gray-100 hover:bg-opacity-20 justify-center flex items-center transition ease-in">
                <FaPaperclip />
              </button>
              <button
                className={`p-3 bg-white ${responseProcessing ? "opacity-20" : ""} w-10 hover:bg-gray-300 text-black rounded-full hover:cursor-pointer transition ease-in`}
                onClick={handleSend}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
