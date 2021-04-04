import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cardset } from 'src/app/models/cardset';
import { CreateRoomFormModel } from 'src/app/models/form';
import { CreateRoomRequest } from 'src/app/models/request/createRoomRequest';
import { UserType } from 'src/app/models/userType';
import { DataService } from 'src/app/services/data.service';
import { HubService } from 'src/app/services/hub.service';

@Component( {
  selector: 'create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: [ './create-room-form.component.scss' ],
} )
export class CreateRoomFormComponent implements OnInit {
  public model = new CreateRoomFormModel( '', '', 1, UserType.ProductOwner );
  public loading = true;
  public submitting = false;
  //public error: AppError | null = null;
  public cardsets: Cardset[] = [];

  constructor(
    private dataService: DataService,
    private hubService: HubService
  ) { }

  ngOnInit (): void {
    // TODO: user observable
    this.dataService
      .getCardsets()
      .pipe(
        tap( ( data: Cardset[] ) => {
          this.cardsets = data;
        } ),
        catchError( ( err ) => {
          this.loading = false;
          //this.alertService.error( err, { autoClose: false } );
          return EMPTY;
        } )
      )
      .subscribe();

    this.loading = false;
  }

  async onSubmit ( createRoomForm: NgForm ) {
    this.submitting = true;

    const { cardsetId, name, roomCode, userType } = createRoomForm.value;
    const request = { cardsetId, roomCode, user: { name, userType } } as CreateRoomRequest;

    await this.hubService.createRoom( request );
    this.submitting = false;

    // TODO: need to check for errors
    // TODO: if no errors redirect to lobby screen
  }
}
