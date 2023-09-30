import { Component, OnInit } from '@angular/core';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(LabelDialogComponent, {
      height: '500px',
      minWidth: '700px'
    });

  }


  ngOnInit(): void {

  }

}
