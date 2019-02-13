
export const initialState = new Uint8Array();

export const frequencyData = (state = initialState, action) => {
  switch (action.type) {
    case 'FFT_UPDATE':
      return action.frequencyData;
    default:
      return state;
  }
};
