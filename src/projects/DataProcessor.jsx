import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsciiText, bigMoneyNw } from 'react-ascii-text';

function DataProcessor() {
  const navigate = useNavigate();

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor = rootStyles.getPropertyValue('--lowlevel-bg').trim();
    const textColor = rootStyles.getPropertyValue('--lowlevel-text').trim();
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const asciiText = useAsciiText({
    isAnimated: false,
    font: bigMoneyNw,
    text: "CSV Processor"
  });

  return (
    <div className="bg-[var(--lowlevel-bg)] text-[var(--lowlevel-text)] font-mono h-screen p-6">
      <div className="relative flex items-center mb-4">
        <button onClick={() => navigate("/lowlevel")} className="absolute left-0 text-lg">Low-Level</button>
        <div className="flex-grow text-center text-lg">SFPD CSV Data Processor</div>
      </div>
      <pre ref={asciiText}></pre>
    </div>
  );
}

export default DataProcessor;

// https://github.com/KaiserMighty/SFPD-Data-Processor