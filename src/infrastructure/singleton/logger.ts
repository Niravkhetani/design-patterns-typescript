export class Logger {
  private static instance: Logger;
  private readonly logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string): void {
    const entry = `[INFO] ${new Date().toISOString()} - ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  warn(message: string): void {
    const entry = `[WARN] ${new Date().toISOString()} - ${message}`;
    this.logs.push(entry);
    console.warn(entry);
  }

  error(message: string): void {
    const entry = `[ERROR] ${new Date().toISOString()} - ${message}`;
    this.logs.push(entry);
    console.error(entry);
  }

  getLogs(): ReadonlyArray<string> {
    return [...this.logs];
  }

  clear(): void {
    this.logs.length = 0;
  }
}
