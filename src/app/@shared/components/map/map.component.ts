import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/@core/types/user.interface';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { mapSetting } from './map-setting.const';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() userInfo: UserInterface;
  private map;
  icon = {
    icon: L.icon(mapSetting.iconSetting)
  };


  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.userInfo.address.geo.lat,this.userInfo.address.geo.lng ],
      zoom: mapSetting.zoom
    });

    L.tileLayer(environment.mapTileLayer, {
      maxZoom: mapSetting.maxZoom,
      minZoom: mapSetting.minZoom,
      attribution: environment.mapAttribution
    }).addTo(this.map);

    L.marker([this.userInfo.address.geo.lat,this.userInfo.address.geo.lng], this.icon).addTo(this.map);
  }
  ngAfterViewInit(): void {
    this.initMap();
  }

}
