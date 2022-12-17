import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');

const iframePlayer = new Player(iframeRef);

iframePlayer.on('timeupdate', throttle(handlePlayerOn, 1000));

function handlePlayerOn({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

(function handlePlayerPlay() {
  const savedData = localStorage.getItem('videoplayer-current-time');
  if (!savedData) {
    return;
  }
  iframePlayer.setCurrentTime(
    localStorage.getItem('videoplayer-current-time') || 0
  );
})();
