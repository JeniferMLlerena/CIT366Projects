import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter();

  documents = [
    new Document('1', 'Jenifer', 'lnmkllkmxklmxclkmcx', '#', null),
    new Document('2', 'Nilagros', 'lnmkllkmxklmxclkmcx', '@', null),
    new Document('3', 'Veronica', 'lnmkllkmxklmxclkmcx<', '#', null),
    new Document('4', 'Llerena', 'lnmkllkmxklmxclkmcx<', '#', null),
    new Document('5', 'Paye', 'lnmkllkmxklmxclkmcx', '#', null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
