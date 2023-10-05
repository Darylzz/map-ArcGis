import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-research-map',
  templateUrl: './research-map.component.html',
  styleUrls: ['./research-map.component.css'],
})
export class ResearchMapComponent implements OnInit {
  @ViewChild('viewMap', { static: true }) viewMap: ElementRef;
  item: MenuItem[] = [{ label: 'Pin' }, { label: 'XY' }, { label: 'Polygon' }];
  clickPin: boolean = false;
  clickXY: boolean = false;
  clickPolyline: boolean = false;
  clickPolygon: boolean = false;
  constructor(private mapService: MapService) {}
  ngOnInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
  }

  onGetLocateByPin() {
    this.clickPin = true;
    this.clickPolygon = false;
    this.clickPolyline = false;
    this.clickXY = false;
  }

  onClickXY() {
    this.clickPin = false;
    this.clickPolygon = false;
    this.clickPolyline = false;
    this.clickXY = true;
  }

  onClickPolyline() {
    this.clickPin = false;
    this.clickPolygon = false;
    this.clickPolyline = true;
    this.clickXY = false;
  }

  onClickPolygon() {
    this.clickPin = false;
    this.clickPolygon = true;
    this.clickPolyline = false;
    this.clickXY = false;
  }
}
