import React, { useEffect } from 'react';
import SpriteCanvas from './components/SpriteCanvas';
import BlockLibrary from './components/BlockLibrary';
import Workspace from './components/Workspace';
import PlayButton from './components/PlayButton';
import { useSpriteStore } from './store/useSpriteStore';

const App = () => {
  const { sprites, addSprite } = useSpriteStore();

  useEffect(() => {
    if (sprites.length === 0) {
      addSprite({ image: '/assets/cat.png' });
    }
  }, []);

  const handleAddSprite = () => {
    const options = ['/assets/cat.png', '/assets/ball.png'];
    const nextImage = options[sprites.length % options.length];
    const startX = 100 + sprites.length * 50;
    const startY = 100 + sprites.length * 30;
    addSprite({ image: nextImage, x: startX, y: startY });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-purple-100 to-blue-200">
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-purple-700 tracking-wide">
          Scratchy 🎮 Playground  
        </h1>
        <p className="text-sm font-bold text-gray-500">
          Create, Animate & Collide with Code Blocks!
        </p>
      </header>

      <div className="flex flex-col md:flex-row px-4 pt-4 gap-4">
        <BlockLibrary />
        <Workspace />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddSprite}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200"
        >
          ➕ Add Another Sprite
        </button>
      </div>

      <SpriteCanvas />
      <PlayButton />


    </div>
  );
};

export default App;
