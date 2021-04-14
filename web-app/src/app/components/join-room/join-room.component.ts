import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JoinRoomFormModel } from 'src/app/models/form';
import { JoinRoomRequest } from 'src/app/models/request/joinRoomRequest';
import { UserType } from 'src/app/models/userType';
import { DataService } from 'src/app/services/data.service';
import { HubService } from 'src/app/services/hub.service';

@Component( {
  selector: 'join-room',
  templateUrl: './join-room.component.html',
  styleUrls: [ './join-room.component.scss' ]
} )
export class JoinRoomComponent implements OnInit {
  public model = new JoinRoomFormModel( '', '', UserType.ProductOwner );
  public loading = false;
  public submitting = false;
  //public error: AppError | null = null;

  constructor(
    private dataService: DataService,
    private hubService: HubService
  ) { }

  ngOnInit (): void {
  }

  async onSubmit ( joinRoomForm: NgForm ) {
    this.submitting = true;

    const { name, roomCode, userType } = joinRoomForm.value;
    const request = { roomCode, user: { name, userType } } as JoinRoomRequest;
    console.log( request );

    await this.hubService.joinRoom( request );
    this.submitting = false;

    // TODO: need to check for errors
    // TODO: if no errors redirect to lobby screen
  }
}
