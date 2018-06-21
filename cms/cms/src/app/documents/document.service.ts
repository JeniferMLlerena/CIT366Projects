import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {

  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
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

  deleteDocument(document: Document) {
    if (!document || !this.documents.includes(document)) {
      return;
    }

    const pos = this.documents.indexOf(document);
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
