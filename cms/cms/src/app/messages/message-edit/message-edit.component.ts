import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender: string = 'Zach Williams';
  @ViewChild('subject') subjectEl: ElementRef;
  @ViewChild('message') messageEl: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onClear() {
    this.subjectEl.nativeElement.value = '';
    this.messageEl.nativeElement.value = '';
  }

  onSendMessage() {
    const message = new Message(
      '1',
      this.subjectEl.nativeElement.value,
      this.messageEl.nativeElement.value,
      this.currentSender
    );
    this.addMessageEvent.emit(message);
    this.onClear();
  }

}
