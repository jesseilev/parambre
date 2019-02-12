
export const range = (min, max) => ({ min: min, max: max });

export const rangeDistance = (range) => (range.max - range.min);

export const mapBetweenRanges = (fromRange, toRange, value) => {
  const percent = (value - fromRange.min) / rangeDistance(fromRange);
  return toRange.min + (percent * rangeDistance(toRange));
};