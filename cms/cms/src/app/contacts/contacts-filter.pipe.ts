import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.component';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredArray: Contact[] = contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase()));

    if (filteredArray.length < 1) return contacts;
    return filteredArray;
  }

}
