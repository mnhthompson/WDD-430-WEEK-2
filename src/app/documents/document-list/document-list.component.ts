import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {

   @Output() selectedDocumentEvent = new EventEmitter();


  documents = [
    new Document('1', 'Gotham', 'Im Batman', 'https://www.fake.com/'),
    new Document('1', 'newyork', 'Im spiderman', 'https://www.fake.com/'),
    new Document('1', 'krypton', 'Im superman', 'https://www.fake.com/'),
    new Document('1', 'star city', 'Im flash', 'https://www.fake.com/'),
    new Document('1', 'Gotham', 'Im robin', 'https://www.fake.com/'),
  ];

   constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);}
}