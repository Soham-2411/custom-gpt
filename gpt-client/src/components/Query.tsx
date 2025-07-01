import React from 'react'

interface QueryProps {
    text: string; // The message content
}

const Query: React.FC<QueryProps> = ({ text }) => {
    return (
        <div
            className={"flex justify-end mb-4 px-4 mt-10"}
        >
            <div
                className={"max-w-[90%] p-4 rounded-2xl shadow-md bg-query text-white whitespace-normal break-words"}
            >
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
}

export default Query