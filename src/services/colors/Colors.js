import { scaleSequential } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

const monthScale = scaleSequential(interpolateViridis).domain([1, 16]);

/**
 * Colors service class
 */
export default class {
  static get default() {
    return 'steelblue';
  }

  static get genre() {
    return {
      M: '#33a02c',
      F: '#6a3d9a',
    };
  }

  static monthScale(month) {
    return monthScale(month);
  }
}
