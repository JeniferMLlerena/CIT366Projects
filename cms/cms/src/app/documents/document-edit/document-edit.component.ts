import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  editMode: boolean = false;
  originalDocument: Document;
  document: Document;

  constructor(private documentService: DocumentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params) => {
          console.log(params.id);
          if (!params.id) {
            this.editMode = false;
          } else {
            this.originalDocument = this.documentService.getDocument(params.id);
            console.log(this.originalDocument);
            if (!this.originalDocument) {
              return;
            }

            this.editMode = true;
            this.document = JSON.parse(JSON.stringify(this.originalDocument));
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newDocument = new Document(
      this.document ? this.document.id : '0',
      values.title,
      values.description,
      values.url,
      []
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.document, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['documents']);
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

}
