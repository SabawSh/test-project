import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelConfigService } from 'src/app/label-config.service';


@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent implements OnInit {
  dialogForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LabelDialogComponent>,
    public labelConfigService: LabelConfigService
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dialogForm = new FormGroup({
      label: new FormControl(''),
      color: new FormControl(''),
      fontSize: new FormControl(''),
      fill: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
    });

  }

  onSubmit(form: FormGroup) {

    this.labelConfigService.labelConfig = form.value;
    this.labelConfigService.createLabel();


    this.onNoClick();

  }



}
