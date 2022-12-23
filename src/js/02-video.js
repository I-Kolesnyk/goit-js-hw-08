import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframeRef = document.querySelector('#vimeo-player');

const iframePlayer = new Player(iframeRef);

iframePlayer.on('timeupdate', throttle(handlePlayerOn, 1000));
/**
 *
 * @param {*} param0
 */
function handlePlayerOn({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

(function handlePlayerPlay() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) {
    return;
  }
  iframePlayer.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
})();
