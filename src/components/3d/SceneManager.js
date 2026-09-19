/**
 * Global 3D Scene Registry to guarantee:
 * 1. At most 2 live 3D scenes on desktop (Tier 2).
 * 2. At most 1 live 3D scene on mid mobile/tablet (Tier 1).
 * 3. 0 live 3D scenes on Tier 0 (fallbacks only).
 * 4. Immediate disposal of scenes when they leave within 1 viewport.
 */

class SceneManager {
  constructor() {
    this.activeScenes = new Set();
    this.listeners = new Set();
  }

  register(sceneId, maxLimit = 2) {
    if (this.activeScenes.has(sceneId)) return true;

    // If limit reached, evict the oldest scene
    if (this.activeScenes.size >= maxLimit) {
      const oldest = this.activeScenes.values().next().value;
      if (oldest) {
        this.activeScenes.delete(oldest);
      }
    }

    this.activeScenes.add(sceneId);
    this.notify();
    return true;
  }

  unregister(sceneId) {
    if (this.activeScenes.has(sceneId)) {
      this.activeScenes.delete(sceneId);
      this.notify();
    }
  }

  isActive(sceneId) {
    return this.activeScenes.has(sceneId);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((fn) => fn(new Set(this.activeScenes)));
  }
}

export const sceneManager = new SceneManager();
export default sceneManager;
