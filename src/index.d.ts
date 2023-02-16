declare module 'arma3-be' {
    interface config {
        IP: string,
        Port: string,
        Password: string,
        Debug: boolean,
        RetryOnFailedAttempt: boolean
    }
    export function Config(Config: config): void
    export function SendCommand(Command: string): Promise<any>
    export function onMessageCallback(callback: Function): void
}