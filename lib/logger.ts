type LogLevel = "debug" | "info" | "warn" | "error";

class LoggerService {
  private isDev = process.env.NODE_ENV !== "production";

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const isBrowser = typeof window !== "undefined";

    if (this.isDev) {
      // Development logging
      if (isBrowser) {
        // Browser console styling
        const styles = {
          debug: "color: #3b82f6; font-weight: bold;", // Blue
          info: "color: #10b981; font-weight: bold;", // Green
          warn: "color: #f59e0b; font-weight: bold;", // Yellow
          error: "color: #ef4444; font-weight: bold;", // Red
        };
        const consoleMethod = level === "debug" ? "log" : level;
        if (data !== undefined) {
          console[consoleMethod](
            `%c[${level.toUpperCase()}]%c ${message}`,
            styles[level],
            "color: inherit;",
            data
          );
        } else {
          console[consoleMethod](
            `%c[${level.toUpperCase()}]%c ${message}`,
            styles[level],
            "color: inherit;"
          );
        }
      } else {
        // Server/Node console ANSI styling
        const colors = {
          debug: "\x1b[34m", // Blue
          info: "\x1b[32m", // Green
          warn: "\x1b[33m", // Yellow
          error: "\x1b[31m", // Red
        };
        const reset = "\x1b[0m";
        const formattedMessage = this.formatMessage(level, message);
        const consoleMethod = level === "debug" ? "log" : level;
        if (data !== undefined) {
          console[consoleMethod](
            `${colors[level]}${formattedMessage}${reset}`,
            data
          );
        } else {
          console[consoleMethod](`${colors[level]}${formattedMessage}${reset}`);
        }
      }
    } else {
      // Production structured JSON logging
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
      };

      const consoleMethod = level === "debug" ? "log" : level;
      console[consoleMethod](JSON.stringify(logEntry));
    }
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }
  
  info(message: string, data?: any) {
    this.log("info", message, data);
  }
  
  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }
  
  error(message: string, error?: any) {
    // Enhance error logging natively
    if (error instanceof Error) {
      this.log("error", message, {
        errorMessage: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      this.log("error", message, error);
    }
  }
}

export const logger = new LoggerService();
