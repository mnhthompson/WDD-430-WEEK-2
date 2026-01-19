import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Test 1', 'batman', 'Bruce Wayne'),
    new Message('2', 'Test 2', 'spiderman', 'peter parker'),
    new Message('3', 'Test 3', 'superman', 'clark kent'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}