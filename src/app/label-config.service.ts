import { Injectable } from '@angular/core';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { ThreeConfigService } from './three-config.service';
import { ILabelConfig, ILabelData } from './interfaces/label-data';

@Injectable({
  providedIn: 'root'
})
export class LabelConfigService {

  public labelConfig!: ILabelConfig;

  public labelData!: ILabelData;

  constructor(private threeConfigService: ThreeConfigService) { }


  public createLabel() {
    const labelDiv = document.createElement("div");
    labelDiv.className = "label";
    labelDiv.textContent = this.labelConfig.label;
    labelDiv.style.color = this.labelConfig.color;
    labelDiv.style.fontSize = this.labelConfig.fontSize + 'rem';
    labelDiv.style.backgroundColor = this.labelConfig.fill;
    labelDiv.style.width = this.labelConfig.width + 'rem';
    labelDiv.style.height = this.labelConfig.height + 'rem';


    const Label = new CSS2DObject(labelDiv);
    Label.position.set(0, 0, 0);

    this.threeConfigService.svgObject.add(Label);
    return this.setLabelData(Label);
  }


  private setLabelData(label: CSS2DObject) {
    return this.labelData = {
      id: label.uuid,
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
          x: label.position.x,
          y: label.position.y,
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



    }
  }
}
