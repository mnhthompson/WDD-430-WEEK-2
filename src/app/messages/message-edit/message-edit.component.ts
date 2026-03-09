import {Component,ElementRef,EventEmitter,OnInit,Output,ViewChild,} from '@angular/core';
import { Message } from '../messages.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

onSendMessage() {
  const subject = this.subject.nativeElement.value;
  const msgText = this.msgText.nativeElement.value;
  const senderId = '69aef04a629964b87a67c983';
  const message = new Message(senderId, subject, msgText);
  this.messageService.addMessage(message);}

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}