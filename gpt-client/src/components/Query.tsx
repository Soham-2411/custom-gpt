import React from 'react'

interface QueryProps {
    text: string; // The message content
}

const Query: React.FC<QueryProps> = ({ text }) => {
    return (
        <div
            className={"flex justify-end mb-4 px-4 lg:mr-80 mt-10"}
        >
            <div
                className={"max-w-md p-4 rounded-lg shadow-md bg-query text-white"}
            >
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
}

export default Query