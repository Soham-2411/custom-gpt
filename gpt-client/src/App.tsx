import { FaPaperclip, FaArrowUp } from "react-icons/fa"
import { useEffect, useState, useRef } from "react"
import Query from "./components/Query"
import Response from "./components/Response"
import { API_BASE_URL, sendChatRequest } from './services/chatService';

function App() {

  const [responseProcessing, setResponseProcessing] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<{ user: boolean, text: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [input, setInput] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((files) => [...files, ...selectedFiles]);
    }
  }

  const removeFile = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  }


  const adjustTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        10 * 24
      )}px`;
    }
  }

  const handleSend = async () => {
    if (input.trim() !== "") {
      setResponseProcessing(true);
      setInput("");
      let context = "";
      context = messages.map((msg) => {
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/chat`)
      .then(response => response.json())
      .then(data => { setMessages(data) })
      .catch(error => console.error('Error loading chat history:', error));
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);


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
          <div className="flex justify-center h-[calc(100vh-160px)] overflow-y-auto pb-10">
            <div className="flex justify-center">
              <div className="w-[840px]">
                {Array.isArray(messages) &&
                  messages.map((msg, index) =>
                    msg.user ? (
                      <Query key={index} text={msg.text} />
                    ) : (
                      <Response key={index} text={msg.text} />
                    )
                  )}
              </div>
            </div>
          </div>
          <div className="absolute flex bg-chatarea flex-col bottom-0 left-1/2 transform -translate-x-1/2 w-[840px]">
            <div className="mb-10 bg-input p-4 rounded-3xl">
              <div className="w-full flex items-center flex-row justify-between">
                <textarea
                  ref={textAreaRef}
                  className="flex rounded-3xl w-full bg-transparent resize-none focus:outline-none overflow-y-auto"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  style={{ lineHeight: "24px" }}
                />
              </div>
              <div className="flex flex-row justify-between mt-0">
                <button className="w-10 rounded-full hover:bg-gray-100 hover:bg-opacity-20 justify-center flex items-center transition ease-in"
                  onClick={handleUploadClick}
                >
                  <FaPaperclip />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <button disabled={responseProcessing}
                  className={`p-3 bg-white ${responseProcessing ? "opacity-20 cursor-not-allowed" : "hover:bg-gray-300 hover:cursor-pointer transition ease-in"} w-10  text-black rounded-full `}
                  onClick={handleSend}
                >
                  <FaArrowUp />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
