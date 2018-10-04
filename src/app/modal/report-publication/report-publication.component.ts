import { FormGroup, FormBuilder } from '@angular/forms';
import { PublicationDetail } from './../../../domain/publication-detail';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-report-publication',
  templateUrl: './report-publication.component.html',
  styleUrls: ['./report-publication.component.css']
})
export class ReportPublicationComponent implements OnInit {

  reportForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ReportPublicationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PublicationDetail,
    private formBuilder: FormBuilder) {
    this.reportForm = this.formBuilder.group({
      'publicationCode': [this.data.id],
      'reason': ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(true);
  }
}
