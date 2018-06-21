import { Component, OnInit, Injectable } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  selectedContact: Contact;
  subscription: any;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactSelectedEvent
      .subscribe(contact => {
        this.selectedContact = contact;
      });
  }
}

@Injectable()
export class Contact {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group: Contact[]) {
  }
}
