const playback = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_PLAYBACK':
      return !state;
    default:
      return state;
  }
};

export default playback;