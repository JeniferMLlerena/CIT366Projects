import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contacts.component';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    let foundContact = null;
    this.contacts.forEach((contact) => {
      if (contact.id === id) {
        foundContact = contact;
      }
    });
    return foundContact;
  }
}
