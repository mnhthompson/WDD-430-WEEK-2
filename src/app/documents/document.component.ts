import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor() {}

  ngOnInit(): void {}
}
