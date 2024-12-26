import React from 'react';

// Define the types for the parsed response item
interface BulletPoint {
    text: string; // The text content of the bullet point
    isSubPoint: boolean; // Whether it's a subpoint
}

// Define the props type for the component
interface DisplayResponseProps {
    response: string; // The raw response string to parse
}

const DisplayResponse: React.FC<DisplayResponseProps> = ({ response }) => {
    // Function to preprocess the response into a list of BulletPoint objects
    const parseResponse = (text: string): BulletPoint[] => {
        // Split the response into lines and map to structured BulletPoint items
        const lines = text.split('-')
            .map((line) => line.trim())
            .filter((line) => line !== ''); // Remove empty lines

        return lines.map((line) => {
            const isSubPoint = line.startsWith('*'); // Detect subpoints by checking if the line starts with '*'
            return {
                text: line.replace(/^\*+/, '').trim(), // Remove leading '*' characters
                isSubPoint,
            };
        });
    };

    // Parse the response into a list of BulletPoint objects
    const bulletPoints = parseResponse(response);

    return (
        <ul>
            {bulletPoints.map((point, index) => (
                <li key={index} style={{ marginLeft: point.isSubPoint ? '20px' : '0' }}>
                    {point.text}
                </li>
            ))}
        </ul>
    );
};

export default DisplayResponse;