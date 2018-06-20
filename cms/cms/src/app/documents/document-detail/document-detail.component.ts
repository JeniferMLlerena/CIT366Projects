import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model'
import { DocumentService } from './../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from './../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  //@Input()
  nativeWindow: any;
  document: Document;
  id: string;
  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    });
  }

}
