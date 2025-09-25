import React, { useState, useEffect } from 'react';

const AnimatedTerminal: React.FC = () => {
    const examples = [
        {
            command: 'setup a local langflow environment',
            response: [
                'Agent LangFlow-Automator online.',
                'Mission: Generate a script to set up LangFlow with Docker.',
                'PLAN:',
                '1. Check for Docker dependency.',
                '2. Create docker-compose.yml for LangFlow.',
                '3. Create a sample chat flow JSON.',
                'Generating script...',
                '### File: setup-langflow.sh',
                '#!/bin/bash',
                'cat <<EOL > docker-compose.yml',
                '# ...docker-compose content...',
                'EOL',
                '...'
            ]
        },
        {
            command: 'create a react todo app with tailwind',
            response: [
                'Agent React-Automator online.',
                'Mission: Generate a script to build a complete, ready-to-run React application.',
                'PLAN:',
                '1. Scaffold a new React + Vite project.',
                '2. Install and configure Tailwind CSS.',
                '3. Overwrite App.jsx with a complete, functional Todo component.',
                'Generating script to build the entire app...',
                '### File: create-todo-app.sh',
                '#!/bin/bash',
                'npm create vite@latest my-todo-app -- --template react',
                '...'
            ]
        },
        {
            command: 'dockerize my node.js api',
            response: [
                'Agent Docker Automator online.',
                'Mission: Craft an optimized Dockerfile.',
                'PLAN:',
                '1. Use a multi-stage build for a small production image.',
                '2. Copy package.json and install dependencies.',
                '3. Copy source code and expose the correct port.',
                'Generating Dockerfile...',
                '### File: Dockerfile',
                'FROM node:18-alpine AS builder',
                'WORKDIR /app',
                'COPY package*.json ./',
                'RUN npm install',
                '...'
            ]
        },
        {
            command: 'setup a github actions workflow to test and deploy',
            response: [
                'Agent CI/CD-Automator online.',
                'Mission: Generate a GitHub Actions workflow.',
                'PLAN:',
                "1. Trigger workflow on push to the 'main' branch.",
                '2. Set up Node.js environment.',
                "3. Run 'npm install' and 'npm test'.",
                '4. (Optional) Add a deployment step.',
                'Generating workflow file...',
                '### File: .github/workflows/main.yml',
                'name: CI/CD Pipeline',
                'on: [push]',
                '...'
            ]
        }
    ];

    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const typingSpeed = 40;
    const lineDelay = 200;
    const exampleDelay = 4000;

    useEffect(() => {
        setDisplayedLines([]);
        let lineIndex = -1; // Start with command
        const currentExample = examples[currentExampleIndex];
        const allLines = [currentExample.command, ...currentExample.response];

        const typeLine = () => {
            lineIndex++;
            if (lineIndex >= allLines.length) {
                // Finished this example, wait then switch to next
                setTimeout(() => {
                    setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
                }, exampleDelay);
                return;
            }

            const line = allLines[lineIndex];
            let charIndex = 0;
            setDisplayedLines(prev => [...prev, '']);

            const typeChar = () => {
                if (charIndex < line.length) {
                    setDisplayedLines(prev => {
                        const newLines = [...prev];
                        newLines[lineIndex] = line.substring(0, charIndex + 1);
                        return newLines;
                    });
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    // Finished line, move to next
                    setTimeout(typeLine, lineDelay);
                }
            };
            typeChar();
        };

        const timeoutId = setTimeout(typeLine, 500);
        return () => clearTimeout(timeoutId);
    }, [currentExampleIndex]);

    return (
        <div className="w-full max-w-4xl mx-auto bg-dark-card/80 backdrop-blur-sm rounded-xl border border-border-dark shadow-2xl shadow-cyan-accent/10 overflow-hidden font-mono text-xs sm:text-sm">
            <div className="h-8 bg-dark-bg flex items-center px-4 space-x-2 border-b border-border-dark">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="p-4 sm:p-6 h-80 sm:h-96 overflow-y-auto">
                {displayedLines.map((line, index) => (
                    <div key={index} className="flex items-start">
                        {index === 0 ? (
                            <span className="text-cyan-accent mr-2 shrink-0">$</span>
                        ) : (
                            <span className="text-text-secondary mr-2 shrink-0">&gt;</span>
                        )}
                        <p className="whitespace-pre-wrap break-all leading-tight">{line}</p>
                    </div>
                ))}
                 <div className="flex items-center">
                    <span className="text-cyan-accent mr-2 shrink-0">$</span>
                    <div className="w-2 h-4 bg-cyan-accent animate-blink"></div>
                 </div>
            </div>
        </div>
    );
};

export default AnimatedTerminal;
