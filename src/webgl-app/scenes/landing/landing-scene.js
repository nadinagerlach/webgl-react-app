import BaseScene from '../base/base-scene';
import { VECTOR_ZERO } from '../../utils/math';
import Sphere from './objects/sphere/sphere';
import Ambient from '../../lights/ambient';
import Directional from '../../lights/directional';
import assets from './assets';
import Background from './background/background';

export default class LandingScene extends BaseScene {
  constructor() {
    const lights = [new Ambient(), new Directional()];
    super({ id: 'landing', assets, gui: true, guiOpen: true, lights, controls: true });
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(VECTOR_ZERO);
  }

  /**
   * Create and setup any objects for the scene
   *
   * @memberof LandingScene
   */
  createSceneObjects = () => {
    return new Promise((resolve, reject) => {
      try {
        this.background = new Background(this.gui);
        this.scene.add(this.background.mesh);
        this.sphere = new Sphere(this.camera);
        this.scene.add(this.sphere.mesh);
        this.animateInit();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  preloadGpuCullScene = (culled: Boolean) => {
    this.sphere.preloadGpuCullScene(culled);
  };

  animateInit = () => {
    return this.sphere.animateInit();
  };

  animateIn = () => {
    return this.sphere.animateIn();
  };

  animateOut = () => {
    return this.sphere.animateOut();
  };

  /**
   * Update loop
   *
   * @memberof LandingScene
   */
  update = (delta: Number) => {
    this.sphere.update(delta);
  };
}
