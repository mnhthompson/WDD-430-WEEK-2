import { Component,EventEmitter,OnDestroy,OnInit,Output,} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}

  allContacts: Contact[] = [];

ngOnInit(): void {
  this.allContacts = this.contactService.getContacts();
  this.contacts = [...this.allContacts];

  this.subscription =
    this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.allContacts = contacts;
        this.contacts = [...contacts];
      }
    );
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<Contact[]>) {
    moveItemInArray(this.contacts, event.previousIndex, event.currentIndex);
  }
   search(value: string) {
  const term = value.toLowerCase().trim();

  if (!term) {
    this.contacts = [...this.allContacts];
    return;
  }

  this.contacts = this.allContacts.filter(contact =>
    contact.name.toLowerCase().includes(term)
  );
}

  }
