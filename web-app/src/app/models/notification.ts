export class AppNotification {
    id: string = '';
    type: NotificationType = NotificationType.Info;
    message: string = '';
    autoClose: boolean = true;
    keepAfterRouteChange?: boolean = true;
    fade: boolean = true;
    isLight: boolean = false;
    isOverlay: boolean = false;
    fullWidth: boolean = false;

    constructor( init?: Partial<AppNotification> ) {
        Object.assign( this, init );
    }
}

export enum NotificationType {
    Error,
    Success,
    Info,
    Warning
}

export interface AppNotificationOptions {
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    isLight?: boolean;
    isOverlay?: boolean;
    fullWidth?: boolean;
}