const tryAudioContext = () => {
  if (window == 'undefined') {
    return false;
  }
  return window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 
}

const AudioContext = tryAudioContext();

if (! AudioContext) {
  alert("Sorry, but the Web Audio API is not supported by your browser." 
    + "Please, consider upgrading to the latest version or downloading "
    + "Google Chrome or Mozilla Firefox."
  );
}


export default new AudioContext();