import { create } from 'zustand';

export const useSpriteStore = create((set) => ({
  sprites: [],

  addSprite: (sprite) =>
    set((state) => ({
      sprites: [
        ...state.sprites,
        {
          ...sprite,
          id: Date.now(),
          x: sprite.x || 50,
          y: sprite.y || 50,
          rotation: 0,
          blocks: [],
          say: '',
        },
      ],
    })),

  addBlockToSprite: (spriteId, block) =>
    set((state) => ({
      sprites: state.sprites.map((sprite) =>
        sprite.id === spriteId
          ? { ...sprite, blocks: [...sprite.blocks, { ...block }] }
          : sprite
      ),
    })),

  updateSpritePosition: (spriteId, x, y) =>
    set((state) => ({
      sprites: state.sprites.map((sprite) =>
        sprite.id === spriteId
          ? {
              ...sprite,
              x: Math.max(0, Math.min(x, 1000)),
              y: Math.max(0, Math.min(y, 336)),
            }
          : sprite
      ),
    })),

  updateSpriteRotation: (spriteId, delta) =>
    set((state) => ({
      sprites: state.sprites.map((sprite) =>
        sprite.id === spriteId
          ? { ...sprite, rotation: sprite.rotation + delta }
          : sprite
      ),
    })),

  saySomething: (spriteId, message) => {
    set((state) => ({
      sprites: state.sprites.map((sprite) =>
        sprite.id === spriteId ? { ...sprite, say: message } : sprite
      ),
    }));
    setTimeout(() => {
      set((state) => ({
        sprites: state.sprites.map((sprite) =>
          sprite.id === spriteId ? { ...sprite, say: '' } : sprite
        ),
      }));
    }, 5000);
  },

  swapBlocksBetweenSprites: (id1, id2) =>
    set((state) => {
      const s1 = state.sprites.find((s) => s.id === id1);
      const s2 = state.sprites.find((s) => s.id === id2);
      return {
        sprites: state.sprites.map((sprite) => {
          if (sprite.id === id1) return { ...sprite, blocks: s2.blocks };
          if (sprite.id === id2) return { ...sprite, blocks: s1.blocks };
          return sprite;
        }),
      };
    }),
}));
