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
                <p className="whitespace-pre-wrap text-sm max-w-[90%] break-words"> {renderMessage(text)}
                </p>
            </div>
        </div>
    );
}


const renderMessage = (text: string) => {
    // Regex to match triple single-quoted sections
    const regex = /```(.*?)```/gs;

    const parts = [];
    let lastIndex = 0;

    text.replace(regex, (match, codeBlock, offset) => {
        // Add non-code text before this block
        if (offset > lastIndex) {
            parts.push({ type: 'text', content: text.slice(lastIndex, offset) });
        }

        // Add the code block
        parts.push({ type: 'code', content: codeBlock.trim() });

        lastIndex = offset + match.length;
        return match;
    });

    // Add any remaining non-code text after the last match
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return (
        <>
            {parts.map((part, index) => {
                console.log(part.content, part.type)
                return part.type === 'code' ? (
                    <CopyBlock
                        text={part.content}
                        language='python'
                        theme={dracula}
                    />
                ) : (
                    <pre className='whitespace-pre-wrap' key={index}>{part.content}</pre>
                )
            }
            )}
        </>
    );
}

export default Response