import React from 'react'
import DisplayResponse from '../services/displayResponse';

interface QueryProps {
    text: string; // The message content
}

const Response: React.FC<QueryProps> = ({ text }) => {
    return (
        <div
            className={"flex justify-start mb-4 px-4 lg:ml-72 mt-10"}
        >
            <div
                className={"max-w-lg p-4 bg-transparent text-white "}
            >
                <DisplayResponse response={text} />
            </div>
        </div>
    );
}

export default Response