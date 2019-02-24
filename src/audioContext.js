
export default (function() {
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
    // crap out early
    alert("Sorry, but the Web Audio API is not supported by your browser." 
      + "Please, consider upgrading to the latest version or downloading "
      + "Google Chrome or Mozilla Firefox."
    );
    return false;
  }

  const context = new AudioContext();

  // unlock if iOS
  const isLockedOnIosDevice = context.state === 'suspended' && 'ontouchstart' in window;
  if(isLockedOnIosDevice) {
    alert('I know the device is iOS and audiocontext is locked');
    const unlock = () => {
      context.resume();
      alert('I have attempted to unlock the audiocontext');
    }
    document.body.addEventListener('touchstart', unlock, false);
  }

  return context;
})();