import React from 'react';

interface SummaryProps {
    goals: string[];
}

export const Summary: React.FC<SummaryProps> = ({ goals }) => {
    return (
        <div>
            <h2>Summary of Goals</h2>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                ))}
            </ul>
        </div>
    );
};

export default Summary;