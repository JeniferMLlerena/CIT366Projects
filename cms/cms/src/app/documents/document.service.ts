import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DocumentService {

  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documentListChangedEvent = new Subject<Document[]>();
  maxId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
  }

  getDocuments(): Document[] {
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
      this.documentListChangedEvent.next(documentsClone);
    }
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (originalDoc && newDoc) {
      console.log(this.documents);

      let realOGDoc = this.documents.find(doc => {
        return doc.id === originalDoc.id;
      });
      let pos = this.documents.indexOf(realOGDoc);
      // let pos = this.documents.indexOf(originalDoc);
      if (realOGDoc) {
        newDoc.id = originalDoc.id;
        this.documents[pos] = newDoc;

        let documentsClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsClone);
      }
    }
  }

  deleteDocument(document: Document) {
    if (!document || !this.documents.includes(document)) {
      return;
    }

    const pos = this.documents.indexOf(document);
    let documentsClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsClone);
  }

}
