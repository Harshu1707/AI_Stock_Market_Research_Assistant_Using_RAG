export const money = (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
export const pct = (value) => `${Number(value || 0).toFixed(2)}%`;
