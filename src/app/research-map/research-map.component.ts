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
  clickPin: any;
  clickXY: any;
  clickPolyline: any;
  clickPolygon: any;
  constructor(private mapService: MapService) {}
  ngOnInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
  }
}
