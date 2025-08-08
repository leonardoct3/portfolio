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

/**
 * Converts a Buffer to a base64 data URL
 */
export const bufferToBase64DataUrl = (buffer: Buffer, mimeType: string = 'image/jpeg'): string => {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

/**
 * Converts a base64 data URL to a Buffer
 */
export const base64DataUrlToBuffer = (dataUrl: string): Buffer => {
    // Remove data URL prefix if present (data:image/jpeg;base64,)
    const base64Data = dataUrl.replace(/^data:image\/[a-z]+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
};

/**
 * Validates if a string is a valid base64 data URL
 */
export const isValidBase64DataUrl = (dataUrl: string): boolean => {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(dataUrl);
};

/**
 * Gets the MIME type from a base64 data URL
 */
export const getMimeTypeFromDataUrl = (dataUrl: string): string | null => {
    const match = dataUrl.match(/^data:(image\/[a-z]+);base64,/);
    return match ? match[1] : null;
};
