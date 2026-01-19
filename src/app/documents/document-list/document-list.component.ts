import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents = [
    new Document('1', 'Gotham', 'Im Batman', 'https://www.fake.com/'),
  ];

  constructor() {}

  ngOnInit(): void {}
}