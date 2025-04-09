import React from 'react';
import { useSpriteStore } from '../store/useSpriteStore';

const PlayButton = () => {
  const {
    sprites,
    updateSpritePosition,
    updateSpriteRotation,
    swapBlocksBetweenSprites,
    saySomething,
  } = useSpriteStore();

  const executeBlock = async (spriteId) => {
    for (let i = 0; i < 10; i++) {
      const sprite = useSpriteStore.getState().sprites.find((s) => s.id === spriteId);
      if (!sprite) return;

      const block = sprite.blocks[i];
      if (!block) break;

      switch (block.id) {
        case 'move':
          updateSpritePosition(sprite.id, sprite.x + 50, sprite.y);
          await new Promise((r) => setTimeout(r, 500));
          break;

        case 'turn':
          updateSpriteRotation(sprite.id, 45);
          await new Promise((r) => setTimeout(r, 300));
          break;

        case 'goto':
          updateSpritePosition(sprite.id, 100, 100);
          await new Promise((r) => setTimeout(r, 500));
          break;

        case 'repeat':
          for (let j = 0; j < 3; j++) {
            const current = useSpriteStore.getState().sprites.find((s) => s.id === spriteId);
            updateSpritePosition(spriteId, current.x + 50, current.y);
            await new Promise((r) => setTimeout(r, 300));
          }
          break;

        case 'sayHello':
          saySomething(sprite.id, 'Hello!');
          await new Promise((r) => setTimeout(r, 1000));
          break;

        case 'thinking':
          saySomething(sprite.id, 'Thinking...');
          await new Promise((r) => setTimeout(r, 1000));
          break;

        default:
          break;
      }
    }
  };

  const checkCollisionsAndSwap = async () => {
    const spriteList = useSpriteStore.getState().sprites;

    for (let i = 0; i < spriteList.length; i++) {
      for (let j = i + 1; j < spriteList.length; j++) {
        const a = spriteList[i];
        const b = spriteList[j];

        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 64) {
          swapBlocksBetweenSprites(a.id, b.id);

          await executeBlock(a.id);
          await executeBlock(b.id);

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const magnitude = Math.max(Math.hypot(dx, dy), 1);
          const offset = 100;

          const ax = a.x - (dx / magnitude) * offset;
          const ay = a.y - (dy / magnitude) * offset;

          const bx = b.x + (dx / magnitude) * offset;
          const by = b.y + (dy / magnitude) * offset;

          updateSpritePosition(a.id, ax, ay);
          updateSpritePosition(b.id, bx, by);

          await new Promise((r) => setTimeout(r, 300));
        }
      }
    }
  };

  const handlePlay = async () => {
    const ids = useSpriteStore.getState().sprites.map((s) => s.id);
    for (const id of ids) {
      await executeBlock(id);
    }

    await checkCollisionsAndSwap();
  };

  return (
    <div className="absolute bottom-4 right-4">
      <button
        onClick={handlePlay}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-all duration-200"
      >
        ▶ Play
      </button>
    </div>
  );
};

export default PlayButton;
