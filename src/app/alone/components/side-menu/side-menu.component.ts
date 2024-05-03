import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


interface MenuItem {
  name: string;
  router: string;
}

@Component({
  standalone: true,
  imports: [RouterModule,CommonModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {


  public menuItems: MenuItem[]= [
    {name: "FullScreen",router: "/maps/fullscreen"},
    {name: "ZoomRange",router: "/maps/zoom-range"},
    {name: "Markers",router: "/maps/markers"},
    {name: "Houses",router: "/maps/properties"},
    {name: "Alone Page",router: "/alone"},
  ]
}
