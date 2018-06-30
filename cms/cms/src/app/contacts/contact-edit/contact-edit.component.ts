import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contacts.component';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  originalContact: Contact;
  invalidGroupContact: boolean = false;
  editMode = false;
  hasGroup = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params) => {
          if (!params.id) {
            this.editMode = false;
          } else {
            this.originalContact = this.contactService.getContact(params.id);
            if (!this.originalContact) {
              return;
            }

            this.editMode = true;
            this.contact = JSON.parse(JSON.stringify(this.originalContact));
            if (this.contact.group) {
              this.groupContacts = Object.assign(this.contact.group);
            }
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newContact = new Contact(
      this.contact ? this.contact.id : '0',
      values.name,
      values.email,
      values.phone,
      values.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.contact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['contacts']);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;
    if (newContact.id === this.contact.id) return true;
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) return;
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}

