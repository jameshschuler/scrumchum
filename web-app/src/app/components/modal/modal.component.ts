import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateItemFormComponent } from '../item/create-item-form/create-item-form.component';

@Component( {
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
} )
export class ModalComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() title: string = '';
  @ContentChild( CreateItemFormComponent ) content!: CreateItemFormComponent;
  @Output() closeModalEvent = new EventEmitter();

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.closeModalEvent.emit();
  }
}
