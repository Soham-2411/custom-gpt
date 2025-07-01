import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks';

interface QueryProps {
    text: string; // The message content
}

const Response: React.FC<QueryProps> = ({ text }) => {
    return (
        <div
            className={"flex justify-start mb-4 px-4 mt-10"}
        >
            <div
                className={"p-4 w-full text-white"}
            >
                <p className="whitespace-pre-wrap text-md max-w-[90%] break-words "> {renderMessage(text)}
                </p>
            </div>
        </div>
    );
}


const renderMessage = (text: string) => {
    const codeBlockRegex = /```(.*?)```/gs;
    const headingRegex = /^###\s+(.*)$/gm;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;

    const parts = [];
    let lastIndex = 0;

    text.replace(codeBlockRegex, (match, codeBlock, offset) => {
        if (offset > lastIndex) {
            parts.push({ type: 'text', content: text.slice(lastIndex, offset) });
        }

        parts.push({ type: 'code', content: codeBlock.trim() });

        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return (
        <>
            {parts.map((part, index) => {
                if (part.type === 'code') {
                    return (
                        <div key={index} className="">
                            <CopyBlock
                                text={part.content}
                                language="python"
                                theme={dracula}
                            />
                        </div>
                    );
                } else {
                    let content = part.content;

                    content = content.replace(
                        headingRegex,
                        '<span class="font-bold text-2xl">$1</span>'
                    );
                    content = content.replace(boldRegex, '<strong>$1</strong>');
                    content = content.replace(italicRegex, '<em>$1</em>');

                    return (
                        <div
                            key={index}
                            className="whitespace-pre-wrap leading-7"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                }
            })}
        </>
    );
};

export default Response