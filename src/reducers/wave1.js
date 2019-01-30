const defaultWave = {
  phase: 0,
  offset: 0.5,
  freq: 1,
  amp: 0.5
};

export const wave1 = (state = defaultWave, action) => {
  switch(action.type) {
    case 'WAVE_CHANGE':
      return action.newWave;
    default:
      return state;
  }
}

// export const wave1freq = (state = 1, action) => {
//   switch(action.type) {
//     case 'SLIDER_CHANGE':
//       return action.payload.currentTarget.value;
//     default: 
//       return state;
//   }
// };

// export const wave1offset = (state = 0, action) => {
//   switch(action.type) {
//     case 'BOX_DRAG':
//       return state + action.payload.deltaY
//     default: 
//       return state;
//   }
// }

// export const wave1phase = (state = 0, action) => {
//   switch(action.type) {
//     case 'BOX_DRAG':
//       return state + action.payload.deltaX
//     default: 
//       return state;
//   }
// }
