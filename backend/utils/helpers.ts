/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes string input by removing potentially harmful characters
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validates required fields in an object
 */
export const validateRequiredFields = (obj: Record<string, any>, requiredFields: string[]): string[] => {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (!obj[field] || (typeof obj[field] === 'string' && obj[field].trim() === '')) {
      missingFields.push(field);
    }
  }
  
  return missingFields;
};

/**
 * Creates a standardized API response
 */
export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
) => {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error }),
    timestamp: new Date().toISOString()
  };
};
