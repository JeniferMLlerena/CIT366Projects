import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contacts.component';
import { Subject } from 'rxjs/Subject';
import {Document} from "../documents/document.model";
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable()
export class ContactService {

  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxId: number;

  constructor(private http:HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http.get('https://cit366-jeni.firebaseio.com/contacts.json')
      .subscribe(
        //success function
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
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

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      if (+contact.id > maxId) maxId = +contact.id;
    });
    return maxId + 1;
  }

  addContact(newDoc: Contact) {
    if (newDoc) {
      newDoc.id = `${this.maxId++}`;
      this.contacts.push(newDoc);
      let contactsClone = this.contacts.slice();
      //this.contactListChangedEvent.next(contactsClone);
      this.storeContacts();
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      let realOGCon = this.contacts.find(contact => {
        return contact.id === originalContact.id;
      });
      let pos = this.contacts.indexOf(realOGCon);
      if (pos > -1) {
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        let contactsClone = this.contacts.slice();
        //this.contactListChangedEvent.next(contactsClone);
        this.storeContacts();
      }
    }
  }

  deleteContact(contact: Contact) {
    if (!contact || !this.contacts.includes(contact)) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    let contactsClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactsClone);
    this.storeContacts();
  }

  //Function that will call the Document object when something is add/delete or modify
  storeContacts() {
    let stringToServer = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('https://cit366-jeni.firebaseio.com/documents.json', stringToServer,{headers:header})
      .subscribe(result => {
        this.contactListChangedEvent.next(Object.assign(this.contacts));
      });
  }
}
