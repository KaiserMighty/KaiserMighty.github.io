import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  { id: 1, title: 'Hermes Navigator for Linux', route: '/lowlevel/hermes' },
  { id: 2, title: 'NERSC Perlmutter Projects', route: '/lowlevel/perlmutter' },
  { id: 3, title: '32-Bit CPU and Assembler', route: '/lowlevel/32bitcpu' },
  { id: 4, title: 'Extents Based File-System', route: '/lowlevel/filesystem' },
  { id: 5, title: 'SFPD CSV Data Processor', route: '/lowlevel/dataprocessor' },
];

const generateCard = (title) => {
  const cardWidth = Math.max(30, title.length + 4);
  const padding = Math.floor((cardWidth - title.length) / 2);
  const topAndBottomBorder = `+${'-'.repeat(cardWidth)}+`;
  const emptyLine = `|${' '.repeat(cardWidth)}|`;
  const titleLine = `|${' '.repeat(padding)}${title}${' '.repeat(cardWidth - title.length - padding)}|`;
  return [topAndBottomBorder, emptyLine, titleLine, emptyLine, topAndBottomBorder].join('\n');
};

const LowLevel = () => {
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

  return (
    <div className="bg-[var(--lowlevel-bg)] text-[var(--lowlevel-text)] font-mono h-screen p-6">
      <div className="relative flex items-center mb-4">
        <button onClick={() => navigate("/")} className="absolute left-0 text-lg">Home</button>
        <div className="flex-grow text-center text-lg">Low-Level Projects</div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.route)}
            className="cursor-pointer group"
          >
            <pre className="text-left p-2">
              {generateCard(item.title)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowLevel;
