import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeConfigService } from '../three-config.service';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('container', { static: true }) _container!: ElementRef;
  defaultExtrusion = 2;
  fillColor = "#F3FBFB";
  stokeColor = "#00A5E6";
  svgPath = "assets/data/speedometer-icon.svg";


  get container() {
    return this._container.nativeElement as HTMLElement;
  }





  constructor(private threeConfigService: ThreeConfigService) { }

  ngOnInit(): void {
    const scene = this.threeConfigService.setupScene(this.container);
    const { object } = this.threeConfigService.renderSVG(this.svgPath, this.defaultExtrusion, this.fillColor, this.stokeColor);
    scene.add(object);



  }
}
