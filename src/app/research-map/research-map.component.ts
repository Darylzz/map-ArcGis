import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { MenuItem } from 'primeng/api';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';

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
  searchLat: any = null;
  searchLong: any = null;

  constructor(private mapService: MapService) {}
  ngOnInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
  }

  onGetLocateByPin() {
    this.clickPin = true;
    this.clickPolygon = false;
    this.clickPolyline = false;
    this.clickXY = false;
    if (this.clickPin === true) {
      this.mapService.mapView?.when(() => {
        this.mapService.mapView?.on('click', (event) => {
          const mapPoint = event.mapPoint;
          const point = new Point({
            latitude: mapPoint.latitude,
            longitude: mapPoint.longitude,
          });
          const marker = new SimpleMarkerSymbol({
            color: 'blue',
            outline: {
              color: 'tranparent',
              width: 2,
            },
          });
          const graphic = new Graphic({
            geometry: point,
            symbol: marker,
          });
          this.mapService.mapView?.graphics.removeAll();
          this.mapService.mapView?.graphics.add(graphic);
          this.mapService.mapView?.goTo(point);
        });
      });
    } else {
    }
  }

  onClickXY() {
    this.mapService.mapView?.graphics.removeAll();
    this.clickPin = false;
    this.clickPolygon = false;
    this.clickPolyline = false;
    this.clickXY = true;
  }

  onClickPolyline() {
    this.mapService.mapView?.graphics.removeAll();
    this.clickPin = false;
    this.clickPolygon = false;
    this.clickPolyline = true;
    this.clickXY = false;
  }

  onClickPolygon() {
    this.mapService.mapView?.graphics.removeAll();
    this.clickPin = false;
    this.clickPolygon = true;
    this.clickPolyline = false;
    this.clickXY = false;
  }

  onSubmitForm() {
    const point = new Point({
      latitude: this.searchLat,
      longitude: this.searchLong,
    });
    const marker = new SimpleMarkerSymbol({
      color: 'red',
      outline: {
        color: 'tranparent',
        width: 2,
      },
    });
    const graphic = new Graphic({
      geometry: point,
      symbol: marker,
    });
    this.mapService.mapView?.graphics.removeAll();
    this.mapService.mapView?.graphics.add(graphic);
    this.mapService.mapView?.goTo(point);
  }

  onClearForm() {
    this.mapService.mapView?.graphics.removeAll();
    this.searchLat = null;
    this.searchLong = null;
  }
}
