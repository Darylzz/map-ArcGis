import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export class MapService {
  map: Map | null;
  mapView: MapView;

  createMap(container: any) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      center: [100, 13],
      zoom: 6,
    });
  }
}
