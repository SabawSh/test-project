import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { ThreeConfigService } from './three-config.service';
import { ILabelConfig, ILabelData } from './interfaces/label-data';
import { DOCUMENT } from '@angular/common';
import * as uuid from 'uuid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelConfigService {

  private isDragging = false;
  private dragTarget: any;

  private lastOffsetX = 0;
  private lastOffsetY = 0;


  public labelConfig!: ILabelConfig;
  public labelData$ = new BehaviorSubject<ILabelData | null>(null);
  public labelBottonPositionX = 0;
  public labelBottonPositionY = 0;
  private labelPositionX = 0;
  private labelPositionY = 0;

  private timeout!: any;


  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  labelData!: ILabelData;



  public createLabel() {

    let labelDiv: HTMLDivElement = this.renderer.createElement('div');

    const text = this.renderer.createText(this.labelConfig.label);

    this.renderer.appendChild(labelDiv, text);

    this.renderer.appendChild(this.document.body, labelDiv);

    this.renderer.addClass(labelDiv, 'drag');
    this.renderer.addClass(labelDiv, 'label');
    this.renderer.setStyle(labelDiv, 'color', this.labelConfig.color);
    this.renderer.setStyle(labelDiv, 'font-size', this.labelConfig.fontSize + 'rem');
    this.renderer.setStyle(labelDiv, 'background-color', this.labelConfig.fill);
    this.renderer.setStyle(labelDiv, 'width', this.labelConfig.width + 'rem');
    this.renderer.setStyle(labelDiv, 'height', this.labelConfig.height + 'rem');


    this.positionLabel(labelDiv);

    this.renderer.listen('document', 'mousedown', (e: any) => {
      if (!e.target.classList.contains('drag')) {
        return;
      }

      this.dragTarget = e.target;

      const dragTargetParent = this.renderer.parentNode(this.dragTarget);
      this.renderer.appendChild(dragTargetParent, this.dragTarget);
      this.lastOffsetX = e.offsetX;
      this.lastOffsetY = e.offsetY;

      this.isDragging = true;
    });
    this.renderer.listen('document', 'mousemove', (event: any) => {
      if (!this.isDragging) return;
      if (this.timeout !== undefined) {
        clearTimeout(this.timeout)
      }

      this.labelPositionX = event.clientX - this.lastOffsetX;
      this.labelPositionY = event.clientY - this.lastOffsetY;
      this.renderer.setStyle(this.dragTarget, 'left', event.clientX - this.lastOffsetX + 'px');
      this.renderer.setStyle(this.dragTarget, 'top', event.clientY - this.lastOffsetY + 'px');

      this.timeout = setTimeout(() => {
        const value$ = this.labelData$.value;

        if (value$) {
          this.labelData$.next({ ...value$, text: { view: { ...value$.text.view, x: this.labelPositionX, y: this.labelPositionY } } });
        }

      }, 500);

    });
    this.renderer.listen('document', 'mouseup', (event) => {
      this.isDragging = false;
    });


    //implement api request in another service  

    this.setLabelData();

  }


  private positionLabel(label: HTMLDivElement) {
    this.labelBottonPositionX = this.labelBottonPositionX === 0 ? window.innerWidth / 2 -
      label.clientWidth / 2 +
      (-100 + Math.round(Math.random() * 50)) : this.labelBottonPositionX;

    this.labelBottonPositionY = this.labelBottonPositionY === 0 ? window.innerHeight / 2 -
      label.clientHeight / 2 +
      (-100 + Math.round(Math.random() * 50)) : this.labelBottonPositionY;


    this.renderer.setStyle(label, 'left', this.labelBottonPositionX + 'px');
    this.renderer.setStyle(label, 'top', this.labelBottonPositionY + 'px');



  }



  private setLabelData() {
    this.labelData$.next({
      id: `label_${uuid.v4()}`,
      shape: {
        shape: 'rect',
        view: {
          fill: this.labelConfig.fill,
          width: this.labelConfig.width,
          height: this.labelConfig.height,
        }
      },

      text: {
        view: {
          fontSize: this.labelConfig.fontSize,
          fill: this.labelConfig.color,
          x: this.labelPositionX,
          y: this.labelPositionY,
        }
      },
      content: {
        label: this.labelConfig.label,
        dynamic: {
          topic: '',
          output: '',
          isLinked: false,
        },
      },
      action: null,
      animation: null,
      type: '[Hmi] update dynamic label'



    })

  }
}
