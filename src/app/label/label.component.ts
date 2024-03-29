import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LabelConfigService } from '../label-config.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ILabelData } from '../interfaces/label-data';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {

  unsubscribe$!: Subscription;

  constructor(private dialog: MatDialog, private labelConfigService: LabelConfigService, private renderer: Renderer2) { }

  openDialog(): void {

    this.dialog.open(LabelDialogComponent, {
      height: '500px',
      minWidth: '700px'
    });
  }


  ngOnInit(): void {

    this.unsubscribe$ = this.labelConfigService.labelData$.subscribe((result: ILabelData | null) => {
      console.log(result);

    })
  }

  setLabelPosition(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();

    this.labelConfigService.labelBottonPositionX = x;
    this.labelConfigService.labelBottonPositionY = y;

  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
