interface ErrorInfo {
  customErrorCode: number;
  message: string;
  httpCode: number;
}

interface AppErrorOptions {
  message?: string;
  originalError?: Error;
  metaData?: Record<string, any>;
}

class AppError extends Error {
  customErrorCode: number;

  metaData: Record<string, any>;

  httpCode?: number;

  originalError?: Error;

  constructor(
    errorInfo: ErrorInfo,
    { message, originalError, metaData }: AppErrorOptions = {}
  ) {
    if (!errorInfo) {
      throw new Error('Invalid call to AppError');
    }

    super(message || errorInfo.message);

    this.name = 'AppError'; // Set the name property to 'AppError' for clarity
    this.customErrorCode = errorInfo.customErrorCode;
    this.metaData = metaData || {};

    if (errorInfo.httpCode) {
      this.httpCode = errorInfo.httpCode;
    }

    if (originalError) {
      this.originalError = originalError;
    }

    // Preserve the stack trace if available
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
