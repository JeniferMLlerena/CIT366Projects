import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.component';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
    this.contacts = this.contactService.getContacts();
  }

  onKeyPress(value: string) {
    this.term = value;
  }
  /*onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }*/
}
