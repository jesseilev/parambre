
const initialState = {
  frequencyData: new Float32Array()
};

export const frequencyData = (state = initialState, action) => {
  switch (action.type) {
    case 'FFT_UPDATE':
      return {
        ...state,
        frequencyData: action.frequencyData
      };
    default:
      return state;
  }
};
