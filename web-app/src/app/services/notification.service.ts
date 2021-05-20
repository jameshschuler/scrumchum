import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppNotification, AppNotificationOptions, NotificationType } from '../models/notification';

@Injectable( {
    providedIn: 'root'
} )
export class NotificationService {
    constructor() {

    }

    private subject = new Subject<AppNotification>();
    private defaultId = 'default-alert';

    onNotify ( id = this.defaultId ): Observable<AppNotification> {
        return this.subject.asObservable().pipe( filter( x => x && x.id === id ) );
    }

    success ( message: string, options?: any ) {
        this.notify( new AppNotification( { ...options, type: NotificationType.Success, message } ) );
    }

    error ( message: string, options?: AppNotificationOptions ) {
        this.notify( new AppNotification( { ...options, type: NotificationType.Error, message } ) );
    }

    info ( message: string, options?: any ) {
        this.notify( new AppNotification( { ...options, type: NotificationType.Info, message } ) );
    }

    warn ( message: string, options?: any ) {
        this.notify( new AppNotification( { ...options, type: NotificationType.Warning, message } ) );
    }

    notify ( notification: AppNotification ) {
        notification.id = notification.id || this.defaultId;
        notification.message = notification.message || '';
        this.subject.next( notification );
    }

    clear ( id = this.defaultId ) {
        this.subject.next( new AppNotification( { id } ) );
    }
}