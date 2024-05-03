import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  coords: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent {
  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentCoords: LngLat = new LngLat(-5.67, 43.26);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      accessToken:
        'pk.eyJ1IjoiYXMxc3MiLCJhIjoiY2x2bTU0bzFuMDMxZTJxczM2bXhjd2dzMSJ9.xYq12_fIHO6NrKAl8VLZ5g',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCoords, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.loadFromLocalStorage();
  }

  //   const markerHtml = document.createElement("div");
  //   markerHtml.innerHTML = "Calle Falsa 123";

  //   const marker:Marker = new Marker({
  //     // color : "red",
  //     element: markerHtml,
  //   }).setLngLat(this.currentCoords).addTo(this.map);
  // }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const coords: LngLat = this.map.getCenter();

    this.addMarker(coords, color);
  }

  addMarker(coords: LngLat, color: string): void {
    if (!this.map) {
      return;
    }
    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(coords)
      .addTo(this.map);

    this.markers.push({
      color: color,
      marker: marker,
    });

    this.saveToLocalStorage();


    marker.on("dragend",()=>{
      this.saveToLocalStorage();
    })


  }

  redirectToMarker(marker: Marker): void {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });

  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(item => {
      return {
        color: item.color,
        coords: item.marker.getLngLat().toArray()
      }
    });

    localStorage.setItem("plainMarkers",JSON.stringify( plainMarkers ));
  }

  loadFromLocalStorage() {

    const plainMarketsString = localStorage.getItem("plainMarkers") ?? "[]";

    const plainMarkers:PlainMarker[] = JSON.parse(plainMarketsString);
    console.log({plainMarkers});

    plainMarkers.forEach(item => {
      const [lng, lat] = item.coords;
      const coords:LngLat = new LngLat(lng,lat);
      this.addMarker(coords,item.color);
    });
  }
}
