import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

}

export class Contact {
  contactId: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: Contact[];

  constructor(
    contactId: number,
    name: string,
    email: string,
    phone: string,
    imageUrl: string,
    group: Contact[]) {
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}
