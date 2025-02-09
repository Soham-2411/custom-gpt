import React, { useEffect, useRef } from 'react'
import { FaArrowUp, FaPaperclip } from 'react-icons/fa'

interface MessageInputProps {
    input: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    responseProcessing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, onInputChange, onSend, responseProcessing }) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const adjustTextareaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${Math.min(
                textAreaRef.current.scrollHeight,
                10 * 24
            )}px`;
        }
    }
    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    return (
        <div className="mb-10 bg-input p-4 rounded-3xl">
            <div className="w-full flex items-center flex-row justify-between pb-5">
                <textarea
                    ref={textAreaRef}
                    className="flex rounded-3xl w-full bg-transparent resize-none focus:outline-none overflow-y-auto"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            onInputChange("")
                            onSend();
                        }
                    }}
                    rows={1}
                    style={{ lineHeight: "24px" }}
                />
            </div>
            <div className="flex flex-row justify-between mt-0">
                <button className="w-10 rounded-full hover:bg-gray-100 hover:bg-opacity-20 justify-center flex items-center transition ease-in"
                >
                    <FaPaperclip />
                </button>
                <button disabled={responseProcessing}
                    className={`p-3 bg-white ${responseProcessing ? "opacity-20 cursor-not-allowed" : "hover:bg-gray-300 hover:cursor-pointer transition ease-in"} w-10  text-black rounded-full `}
                    onClick={onSend}
                >
                    <FaArrowUp />
                </button>
            </div>
        </div>
    )
}

export default MessageInput