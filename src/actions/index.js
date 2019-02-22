

export const boxAdjustment = (params) => ({
  type: 'BOX_ADJUSTMENT',
  params
});

export const boxAdjustmentStart = (paramSetName) => ({
  type: 'BOX_ADJUSTMENT_START',
  paramSetName
});

export const boxAdjustmentStop = (paramSetName) => ({
  type: 'BOX_ADJUSTMENT_STOP',
  paramSetName
});

export const setPlayback = (newIsPlaying) => ({
  type: 'SET_PLAYBACK',
  newIsPlaying
});

export const graphUpdate = () => ({
  type: 'GRAPH_UPDATE'
});

export const fftUpdate = (frequencyData) => ({
  type: 'FFT_UPDATE',
  frequencyData
});

