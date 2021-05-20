
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppNotification, NotificationType } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component( { selector: 'notification', templateUrl: 'notification.component.html', styleUrls: [ './notification.component.scss' ] } )
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  notifications: AppNotification[] = [];
  notificationSubscription: Subscription | null = null;
  routeSubscription: Subscription | null = null;

  constructor( private router: Router, private notificationService: NotificationService ) { }

  ngOnInit () {
    this.notificationSubscription = this.notificationService.onNotify( this.id )
      .subscribe( notification => {
        if ( !notification.message ) {
          this.notifications = this.notifications.filter( f => f.keepAfterRouteChange );

          this.notifications.forEach( f => delete f.keepAfterRouteChange );
          return;
        }

        this.notifications.push( notification );

        if ( notification.autoClose ) {
          setTimeout( () => this.removeNotification( notification ), 3000 );
        }
      } );

    this.routeSubscription = this.router.events.subscribe( event => {
      if ( event instanceof NavigationStart ) {
        this.notificationService.clear( this.id );
      }
    } );
  }

  ngOnDestroy () {
    this.notificationSubscription!.unsubscribe();
    this.routeSubscription!.unsubscribe();
  }

  removeNotification ( notification: AppNotification ) {
    if ( !this.notifications.includes( notification ) ) {
      return;
    }

    if ( this.fade ) {
      this.notifications.find( f => f === notification )!.fade = true;

      setTimeout( () => {
        this.notifications = this.notifications.filter( f => f !== notification );
      }, 250 );
    } else {
      // remove notification
      this.notifications = this.notifications.filter( f => f !== notification );
    }
  }

  cssClass ( notification: AppNotification ) {
    if ( !notification ) {
      return;
    }

    const classes = [ 'notification' ];

    const notificationTypeClass = {
      [ NotificationType.Success ]: 'is-success',
      [ NotificationType.Error ]: 'is-danger',
      [ NotificationType.Info ]: 'is-info',
      [ NotificationType.Warning ]: 'is-warning'
    }

    classes.push( notificationTypeClass[ notification.type ] );

    if ( notification.fade ) {
      classes.push( 'fade' );
    }

    if ( notification.isLight ) {
      classes.push( 'is-light' );
    }

    if ( notification.isOverlay ) {
      classes.push( 'overlay' )
    }

    if ( notification.fullWidth ) {
      classes.push( 'full-width' );
    }

    return classes.join( ' ' );
  }
}