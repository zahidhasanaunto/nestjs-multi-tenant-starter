export const toBool = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return false;
};
