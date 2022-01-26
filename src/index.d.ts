declare module 'arma3-be' {
    export function Config(Config: object): void
    export function SendCommand(Command: string): Promise<any>
    export type Messages = any;
}