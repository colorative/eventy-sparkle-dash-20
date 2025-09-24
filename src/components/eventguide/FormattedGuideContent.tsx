
import React from "react";

interface FormattedGuideContentProps {
  content: string;
}

export const FormattedGuideContent: React.FC<FormattedGuideContentProps> = ({ content }) => {
  return (
    <div className="prose max-w-none pt-2">
      {content.split('\n').map((paragraph, i) => {
        if (paragraph.startsWith('# ')) {
          return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{paragraph.substring(2)}</h1>;
        } else if (paragraph.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-5 mb-3 text-gray-800">{paragraph.substring(3)}</h2>;
        } else if (paragraph.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-gray-800">{paragraph.substring(4)}</h3>;
        } else if (paragraph.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start mb-2 ml-2">
              <span className="text-primary mr-2 mt-1">•</span>
              <span>{paragraph.substring(2)}</span>
            </div>
          );
        } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return <p key={i} className="font-bold mb-3">{paragraph.substring(2, paragraph.length - 2)}</p>;
        } else if (paragraph.trim().startsWith('**') && paragraph.trim().includes('**:')) {
          const parts = paragraph.trim().split('**:');
          return (
            <div key={i} className="mb-3">
              <span className="font-bold">{parts[0].substring(2)}</span>: {parts[1]}
            </div>
          );
        } else if (paragraph.trim().length > 0) {
          return <p key={i} className="mb-3">{paragraph}</p>;
        }
        return null;
      })}
    </div>
  );
};
