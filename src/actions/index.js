let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const togglePlayback = () => ({
  type: 'TOGGLE_PLAYBACK'
})

export const sliderChange = payload => ({
  type: 'SLIDER_CHANGE',
  payload
})

export const waveChange = (newWave) => ({
  type: 'WAVE_CHANGE',
  newWave
})

export const boxAdjustment = (params) => ({
  type: 'BOX_ADJUSTMENT',
  params
})

export const boxAdjustmentStart = (paramSetName) => ({
  type: 'BOX_ADJUSTMENT_START',
  paramSetName
})

export const boxAdjustmentStop = (paramSetName) => ({
  type: 'BOX_ADJUSTMENT_STOP',
  paramSetName
})

export const dragDelta = (payload) => ({
  type: 'DRAG_DELTA',
  payload
})

export const resizeDelta = (payload) => ({
  type: 'RESIZE_DELTA',
  payload
})

export const setPlayback = (newIsPlaying) => ({
  type: 'SET_PLAYBACK',
  newIsPlaying
})

export const dragStart = () => ({
  type: 'DRAG_START'
})

export const dragStop = () => ({
  type: 'DRAG_STOP'
})

export const graphUpdate = () => ({
  type: 'GRAPH_UPDATE'
})

export const fftUpdate = (frequencyData) => ({
  type: 'FFT_UPDATE',
  frequencyData
})

export const boxDrag = dragData => ({
  type: 'BOX_DRAG',
  dragData
})

export const boxResize = payload => ({
  type: 'BOX_RESIZE',
  payload
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
