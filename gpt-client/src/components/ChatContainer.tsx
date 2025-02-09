import React, { useRef } from 'react'
import Query from './Query'
import Response from './Response'
import { Message } from '../types/types'


interface ChatContainerProps {
    messages: Message[]
}


const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    return (
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
    )
}

export default ChatContainer