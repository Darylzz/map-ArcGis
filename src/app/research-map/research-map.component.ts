import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { MenuItem } from 'primeng/api';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
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
  clickPolygon: boolean = false;
  searchLat: any = null;
  searchLong: any = null;
  createPolyline: boolean = false;
  sketchViewModel: __esri.SketchViewModel;

  constructor(private mapService: MapService) {}
  ngOnInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
  }

  onGetLocateByPin() {
    this.clickPin = !this.clickPin;
    this.clickPolygon = false;
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
    this.clickXY = !this.clickXY;
  }

  onClickPolygon() {
    this.mapService.mapView?.graphics.removeAll();
    this.clickPin = false;
    this.clickXY = false;
    this.clickPolygon = !this.clickPolygon;
    if (!this.sketchViewModel) {
      const graphicLayer = new GraphicLayer();
      console.log(this.clickPolygon);
      if (this.clickPolygon === true) {
        this.sketchViewModel = new SketchViewModel({
          view: this.mapService.mapView,
          layer: graphicLayer,
          polygonSymbol: {
            type: 'simple-fill',
            color: [39, 189, 138, 0.5],
            outline: {
              color: [39, 189, 138],
              width: 2,
            },
          },
        });

        this.sketchViewModel.create('polygon');
        this.sketchViewModel.on('create', (event) => {
          console.log(event);
          if (event.state === 'complete') {
            const geometry: any = event.graphic.geometry;
            const polygon = new Polygon({
              rings: geometry.rings,
              spatialReference: geometry.spatialReference,
            });
            const symbol = new SimpleFillSymbol({
              color: [39, 189, 138, 0.5],
              outline: {
                color: [39, 189, 138],
                width: 2,
              },
            });
            const graphic = new Graphic({
              geometry: polygon,
              symbol: symbol,
            });
            this.mapService.mapView?.graphics.removeAll();
            this.mapService.mapView?.graphics.add(graphic);
          }
        });
      }
    }
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
