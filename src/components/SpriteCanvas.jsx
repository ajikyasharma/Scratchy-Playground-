import React from 'react';
import { useSpriteStore } from '../store/useSpriteStore';
import { motion } from 'framer-motion';

const SpriteCanvas = () => {
  const { sprites } = useSpriteStore();

  return (
    <div className="canvas">
      {sprites.map((sprite) => (
        <motion.div
          key={sprite.id}
          initial={{ x: sprite.x, y: sprite.y, rotate: sprite.rotation }}
          animate={{ x: sprite.x, y: sprite.y, rotate: sprite.rotation }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute w-16 h-16"
          style={{ left: sprite.x, top: sprite.y }}
        >
          <img src={sprite.image} alt="sprite" className="w-full h-full" />
          {sprite.say && <div className="speech-bubble">{sprite.say}</div>}
        </motion.div>
      ))}
    </div>
  );
};

export default SpriteCanvas;
