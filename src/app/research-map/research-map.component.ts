import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-research-map',
  templateUrl: './research-map.component.html',
  styleUrls: ['./research-map.component.css'],
})
export class ResearchMapComponent implements AfterViewInit {
  @ViewChild('viewMap', { static: true }) viewMap: ElementRef;
  constructor(private mapService: MapService) {}
  ngAfterViewInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
  }
}
