export class Contact {
  public contactId: string;
  public name: string;
  public email: string;
  public telephone: string;
  public imageUrl: string;
  public group: Contact[];

  constructor(contactId: string, name:string, email:string, telephone:string, imageUrl:string, group:Contact[]) {
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.telephone = telephone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}
