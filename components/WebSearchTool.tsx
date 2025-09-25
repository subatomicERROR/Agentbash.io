import React from 'react';
import { GroundingChunk } from '../types';
import { GlobeIcon, LinkIcon } from './Icons';

interface WebSearchToolProps {
  sources: GroundingChunk[];
}

const WebSearchTool: React.FC<WebSearchToolProps> = ({ sources }) => {
    if (!sources || sources.length === 0) {
        return null;
    }

    return (
        <div className="bg-dark-bg/20 rounded-lg p-4 my-3 animate-fade-in-up backdrop-blur-sm border border-dark-bg/30">
            <div className="flex items-center gap-2 mb-3">
                <GlobeIcon className="w-4 h-4 text-dark-bg/80" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-dark-bg/80">
                    References from the web
                </h4>
            </div>
            <div className="space-y-2">
                {sources.map((source, index) => {
                    if (!source.web?.uri || !source.web?.title) return null;
                    
                    const displayTitle = source.web.title;

                    return (
                        <a
                            href={source.web.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={source.web.uri + index}
                            className="group flex items-center gap-2 p-2 bg-dark-bg/30 rounded-md transition-all duration-200 hover:bg-dark-bg/50 hover:shadow-md animate-pop-in cursor-pointer"
                            style={{ animationDelay: `${index * 50}ms` }}
                            title={`Visit: ${source.web.uri}`} // Show full URL on hover
                        >
                            <LinkIcon className="w-4 h-4 text-dark-bg/70 group-hover:text-cyan-accent transition-colors flex-shrink-0" />
                            <span className="text-sm font-bold text-dark-bg/90 group-hover:text-white group-hover:underline transition-colors truncate">
                                {displayTitle}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default WebSearchTool;