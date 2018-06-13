import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {

  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();

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
}