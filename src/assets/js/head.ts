import loadSvgSprites from '@unic/estatico-svgsprite/lib/loader';
import './helpers/modernizrrc';
import FontLoader from './helpers/fontloader';
import Helper from './helpers/helper';
import namespace from './helpers/namespace';
import LineClamper from './helpers/lineclamper';
import AssetLoader from './helpers/assetloader';

window[namespace] = {
  data: {}, // Content data
  options: {}, // Module options
  styleLoader: new AssetLoader('data-style-main', 'style'),
  scriptLoader: new AssetLoader('data-script-main', 'script'),
  fontLoader: new FontLoader(),
  helpers: new Helper(),
  lineClamper: new LineClamper(),
};

document.addEventListener('DOMContentLoaded', loadSvgSprites);
