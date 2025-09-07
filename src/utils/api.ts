export const validateDate = (date?: string): string | undefined => {
  return date?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];
};
