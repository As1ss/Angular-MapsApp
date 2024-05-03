import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit,OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 13;
  public map?:Map;
  public currentCoords: LngLat = new LngLat(-5.67, 43.26);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      accessToken:
        'pk.eyJ1IjoiYXMxc3MiLCJhIjoiY2x2bTU0bzFuMDMxZTJxczM2bXhjd2dzMSJ9.xYq12_fIHO6NrKAl8VLZ5g',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCoords, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      minZoom: -2
    });
    this.mapListeners();
  }

  mapListeners(): void {
    if(!this.map) throw "Mapa no inicializado";

    this.map.on("zoom",() => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on("zoomend",() => {
      if(this.map!.getZoom()<18) return;
      this.map?.zoomTo(18);
    });

    this.map.on("move",() => {
      this.currentCoords = this.map!.getCenter();
    })

  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

  zoomIn(){
    this.map?.zoomIn();
  }
  zoomOut(){
    this.map?.zoomOut();
  }

  ngOnDestroy(): void {

    this.map?.remove();

  }
}
