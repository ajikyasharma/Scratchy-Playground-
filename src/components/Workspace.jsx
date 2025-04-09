import React from 'react';
import { useSpriteStore } from '../store/useSpriteStore';

const Workspace = () => {
  const { sprites, addBlockToSprite } = useSpriteStore();

  const handleDrop = (e, spriteId) => {
    e.preventDefault();
    const block = JSON.parse(e.dataTransfer.getData('block'));
    addBlockToSprite(spriteId, block);
  };

  return (
    <div className="w-full md:w-2/4 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">🛠 Workspace</h2>
      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          onDrop={(e) => handleDrop(e, sprite.id)}
          onDragOver={(e) => e.preventDefault()}
          className="mb-6 p-4 border-2 border-dashed border-blue-300 rounded-lg min-h-[100px] bg-blue-50"
        >
          <img src={sprite.image} alt="sprite" className="h-16 mb-2 mx-auto" />
          <div className="space-y-1">
            {sprite.blocks.map((block, i) => (
              <div key={i} className="p-1 bg-blue-200 rounded text-sm text-blue-900">
                {block.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workspace;