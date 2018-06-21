import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  //@input
  document: Document;

  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private windRef: WindRefService) {
    this.nativeWindow = this.windRef.getNativeWindow();
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params) => {
          this.document = this.documentService.getDocument(params.id);
        }
      );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }

}
