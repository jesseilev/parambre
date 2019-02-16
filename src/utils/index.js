export const sine = ({amp, period, offset, phase}, x) => (
  offset + amp * Math.sin( (2 * Math.PI * x / period) + phase )
);

export const range = (min, max) => ({ min: min, max: max });

export const rangeDistance = (range) => (range.max - range.min);

export const mapBetweenRanges = (fromRange, toRange, value) => {
  const percent = (value - fromRange.min) / rangeDistance(fromRange);
  return toRange.min + (percent * rangeDistance(toRange));
};

export const clampToRange = (range, value) => (
  Math.max(range.min, Math.min(range.max, value))
);