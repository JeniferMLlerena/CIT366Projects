import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable()
export class DocumentService {

  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documentListChangedEvent = new Subject<Document[]>();
  maxId: number;

  constructor(private http:HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get('https://cit366-jeni.firebaseio.com/documents.json')
      .subscribe(
        //success function
        (docs: Document[]) => {
          this.documents = docs;
          this.maxId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    let foundDocument = null;
    this.documents.forEach((document) => {
      if (document.id === id) {
        foundDocument = document;
      }
    });
    return foundDocument;
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      if (+document.id > maxId) maxId = +document.id;
    });
    return maxId + 1;
  }

  addDocument(newDoc: Document) {
    if (newDoc) {
      newDoc.id = `${this.maxId++}`;
      this.documents.push(newDoc);
      let documentsClone = this.documents.slice();
      //this.documentListChangedEvent.next(documentsClone);
      this.storeDocuments();
    }
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (originalDoc && newDoc) {
      console.log(this.documents);

      let realOrDoc = this.documents.find(doc => {
        return doc.id === originalDoc.id;
      });
      let pos = this.documents.indexOf(realOrDoc);
      // let pos = this.documents.indexOf(originalDoc);
      if (realOrDoc) {
        newDoc.id = originalDoc.id;
        this.documents[pos] = newDoc;

        let documentsClone = this.documents.slice();
        //this.documentListChangedEvent.next(documentsClone);
        this.storeDocuments();
      }
    }
  }

  deleteDocument(document: Document) {
    if (!document || !this.documents.includes(document)) {
      return;
    }

    const pos = this.documents.indexOf(document);
    let documentsClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsClone);
    this.storeDocuments();
  }

  //Function that will call the Document object when something is add/delete or modify
  storeDocuments() {
    let stringToServer = JSON.stringify(this.documents);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('https://cit366-jeni.firebaseio.com/documents.json', stringToServer,{headers:header})
      .subscribe(result => {
        this.documentListChangedEvent.next(Object.assign(this.documents));
      });
  }
}
