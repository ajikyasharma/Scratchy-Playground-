import React from 'react';
import { blocks } from '../data/blocks';

const BlockLibrary = () => {
  const handleDragStart = (e, block) => {
    e.dataTransfer.setData('block', JSON.stringify(block));
  };

  return (
    <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-purple-700 mb-4">🧩 Block Library</h2>
      {blocks.map((block) => (
        <div
          key={block.id}
          draggable
          onDragStart={(e) => handleDragStart(e, block)}
          className="p-2 bg-purple-100 hover:bg-purple-200 rounded mb-2 cursor-move transition"
        >
          {block.label}
        </div>
      ))}
    </div>
  );
};

export default BlockLibrary;