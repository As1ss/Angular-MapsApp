import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from "mapbox-gl";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input() coords?: [number,number];

  @ViewChild("map")
  public divMap?:ElementRef;

  public map?:Map;




  ngAfterViewInit(): void {

    if(!this.coords) throw "Coords required";
    if(!this.divMap?.nativeElement) throw "Map rendered error";



    //crear mapa

    this.map = new Map({
      accessToken:
        environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coords, // starting position [lng, lat]
      interactive: false,
      zoom: 16, // starting zoom
    });

    //marker inicial

    const marker = new Marker().setLngLat(this.map.getCenter()).addTo(this.map);
    console.log(this.map.getCenter());
  }

}
