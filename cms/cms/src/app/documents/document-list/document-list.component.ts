import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  subscription: Subscription;

  ngOnInit() {
  }

  constructor(private documentService: DocumentService) {
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
    this.documents = this.documentService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }*/
}
