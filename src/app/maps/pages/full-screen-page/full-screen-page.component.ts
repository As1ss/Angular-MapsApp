import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';





@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild("map")
  public divMap?:ElementRef;


  ngAfterViewInit(): void {

    if(!this.divMap)  throw "Elemento HTML no encontrado";

    const map = new Map({
      accessToken:"pk.eyJ1IjoiYXMxc3MiLCJhIjoiY2x2bTU0bzFuMDMxZTJxczM2bXhjd2dzMSJ9.xYq12_fIHO6NrKAl8VLZ5g",
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-5.67, 43.26], // starting position [lng, lat]
      zoom: 13, // starting zoom
    });
  }
}
