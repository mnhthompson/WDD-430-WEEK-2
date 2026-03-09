import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        this.document = { name: '', description: '', url: '' } as Document;
        return;
      }
      this.originalDocument = this.docService.getDocument(id);
      if (!this.originalDocument) return;

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument: Document = {
      name: value.name,
      description: value.description,
      url: value.url,
      id: '',  
      _id: ''  
    };

    if (this.editMode) {
      this.docService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.docService.addDocument(newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}