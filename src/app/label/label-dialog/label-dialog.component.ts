import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ILabelData } from 'src/app/interfaces/label-data';
import { LabelConfigService } from 'src/app/label-config.service';


@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent implements OnInit, OnDestroy {
  dialogForm!: FormGroup;
  unsubscribe$!: Subscription;

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


    this.unsubscribe$ = this.labelConfigService.labelData$.subscribe((result: ILabelData | null) => {
      console.log(result);

    })
  }

  onSubmit(form: FormGroup) {

    this.labelConfigService.labelConfig = form.value;
    this.labelConfigService.createLabel();

    // setTimeout(() => {
    //   //send request 
    //   console.log(this.labelData);
    this.onNoClick();
    // }, 2000);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
