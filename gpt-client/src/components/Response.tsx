import React from 'react'

interface QueryProps {
    text: string; // The message content
}

const Response: React.FC<QueryProps> = ({ text }) => {
    return (
        <div
            className={"flex justify-start mb-4 px-4 lg:ml-72 mt-10"}
        >
            <div
                className={"max-w-md p-4 bg-transparent text-white "}
            >
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
}

export default Response