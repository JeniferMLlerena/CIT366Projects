import { Component, OnInit } from '@angular/core';
import { Contact } from './contact-list/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  displayList = false;

  constructor() { }

  ngOnInit() {
  }

  toggleList() {
    this.displayList = !this.displayList;
  }

}
