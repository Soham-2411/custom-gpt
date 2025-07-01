import React, { useEffect, useRef } from 'react'
import Query from './Query'
import Response from './Response'
import { Message } from '../types/types'

interface ChatContainerProps {
    messages: Message[]
    responseProcessing: boolean
    activeChatId?: string  // Optional: For future chat-specific features
}

const ChatContainer: React.FC<ChatContainerProps> = ({
    messages,
    responseProcessing
}) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            endOfMessagesRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 100)

        return () => clearTimeout(timer)
    }, [messages, responseProcessing])

    return (
        <div className="flex justify-center h-[calc(100vh-160px)] overflow-y-auto pb-10">
            <div className="flex justify-center w-full">
                <div className="w-[840px] space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Start a new conversation</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, index) => (
                                msg.user ? (
                                    <Query
                                        key={`${msg.text}-${index}`}
                                        text={msg.text}
                                    />
                                ) : (
                                    <Response
                                        key={`${msg.text}-${index}`}
                                        text={msg.text}
                                    />
                                )
                            ))}
                        </>
                    )}

                    {responseProcessing && (
                        <div className="flex items-start pl-4 pr-8 py-3">
                            <div className="flex space-x-2 p-3 rounded-lg bg-transparent">
                                <div className="flex space-x-1.5">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                        style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={endOfMessagesRef} className="h-px" />
                </div>
            </div>
        </div>
    )
}

export default ChatContainer