import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  selectedDocument!: Document;
  private subscription!: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.selectedDocumentEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );

  
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents; 
      }
    );


    this.documentService.getDocuments();
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}