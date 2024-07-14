import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from 'pmtiles';
import '../css/map.css';

export default function GlobalBuildingsMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-117.05154);
  const [lat] = useState(32.58453);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Create the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      minZoom: 2,
      maxZoom: 18,
      pitch: 60,
      hash: true,
      cooperativeGestures: {
        windowsHelpText: 'Use Ctrl + scroll to zoom the map.',
        macHelpText: 'Use ⌘ + scroll to zoom the map.',
        mobileHelpText: 'Use 2 fingers to move the map.'
      },
      style: {
        light:{
          anchor: "viewport",
          color: "white",
          intensity: 0.5
        },
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          buildings: {
            type: "vector",
            url: "pmtiles://https://d32gfzcnkb85e2.cloudfront.net/2024-06-13-beta/buildings.pmtiles"
          },
          transportation: {
            type: "vector",
            url: "pmtiles://https://d32gfzcnkb85e2.cloudfront.net/2024-06-13-beta/transportation.pmtiles"
          },
          divisions: {
            type: "vector",
            url: "pmtiles://https://d32gfzcnkb85e2.cloudfront.net/2024-06-13-beta/divisions.pmtiles"
          },
          base: {
            type: "vector",
            url: "pmtiles://https://d32gfzcnkb85e2.cloudfront.net/2024-06-13-beta/base.pmtiles"
          },
          // TODO: Determine best source for some sat imagery here?
          // 'satellite-bg': {
          //   'type': 'raster',
          //   'tiles': [

          //   ],
          // 'tileSize': 256,
          // }
        },
        layers: [
          {
            "id": "background",
            "type": "background",
            "minzoom": 0,
            "maxzoom": 24,
            "paint": {
                "background-color": "hsl(216,20%,95%)"
            }
          },
          // TODO (Hope)
          // {
          //   'id': 'sat-bg',
          //   'type': 'raster',
          //   'source': 'satellite-bg',
          //   'minzoom': 0,
          //   'maxzoom': 22
          // },

          {
            "id": 'land',
            "type": 'fill',
            "source": 'base',
            "source-layer": 'land',
            "paint": {
              "fill-color": "hsla(97, 13%, 66%, 1)",
              "fill-outline-color": "hsl(216, 30%, 95%)",
              "fill-opacity": 0.1
            }
          },

          {
            "id": 'transportation',
            "type": 'line',
            "source": 'transportation',
            "source-layer": 'segment',
            "paint": {
              "line-color": "#333",
              "line-opacity": 0.2,
            }
          },
          // {
          //   "id": 'all-buildings',
          //   "type": "fill-extrusion",
          //   "minzoom":13, "maxzoom": 14,
          //   "source": 'buildings',
          //   "source-layer": 'building',
          //   "paint": {
          //       "fill-extrusion-color": "steelblue",
          //       "fill-extrusion-opacity": 1,
          //       "fill-extrusion-base": 0,
          //       "fill-extrusion-height": ["case",
          //           ["has", "height"],
          //           ["to-number", ["get", "height"]], 3.2
          //       ]
          //   }
          // },

          //OSM Buildings
          {
            "id": 'osm-buildings',
            "type": "fill-extrusion",
            "minzoom":14, "maxzoom": 18,
            "source": 'buildings',
            "source-layer": 'building',
            "filter": ["in", "OpenStreetMap", ["get", "sources"]],
            "paint": {
                "fill-extrusion-color": "rgb(194,42,87)",
                "fill-extrusion-opacity": 1,
                "fill-extrusion-base": 0,
                "fill-extrusion-height": ["case",
                    ["has", "height"],
                    ["to-number", ["get", "height"]], 3.2
                ]
            }
          },

          //Esri Buildings
          {
            "id": 'esri-buildings',
            "type": "fill-extrusion",
            "minzoom":14, "maxzoom": 18,
            "source": 'buildings',
            "source-layer": 'building',
            "filter": ["in", "Esri Community Maps", ["get", "sources"]],
            "paint": {
                "fill-extrusion-color": "rgb(4,151,188)",
                "fill-extrusion-opacity": 1,
                "fill-extrusion-base": 0,
                "fill-extrusion-height": ["case",
                    ["has", "height"],
                    ["to-number", ["get", "height"]], 3.2
                ]
            }
          },

          //MSFT Buildings
          {
            "id": 'msft-buildings',
            "type": "fill-extrusion",
            "minzoom":14, "maxzoom": 18,
            "source": 'buildings',
            "source-layer": 'building',
            "filter": ["in", "Microsoft ML Buildings", ["get", "sources"]],
            "paint": {
                "fill-extrusion-color": "rgb(243,175,102)",
                "fill-extrusion-opacity": 1,
                "fill-extrusion-base": 0,
                "fill-extrusion-height": ["case",
                    ["has", "height"],
                    ["to-number", ["get", "height"]], 3.2
                ]
            }
          },

          //Google Buildings
          {
            "id": 'google-buildings',
            "type": "fill-extrusion",
            "minzoom":14, "maxzoom": 18,
            "source": 'buildings',
            "source-layer": 'building',
            "filter": ["in", "Google Open Buildings", ["get", "sources"]],
            "paint": {
                "fill-extrusion-color": "rgb(236,253,188)",
                "fill-extrusion-opacity": 1,
                "fill-extrusion-base": 0,
                "fill-extrusion-height": ["case",
                    ["has", "height"],
                    ["to-number", ["get", "height"]], 3.2
                ]
            }
          },

          {
            "id": 'building-names',
            "type": 'symbol',
            "source": 'buildings',
            "source-layer": 'building',
            "minzoom": 14.5,
            "layout": {
              "text-field": ["get", "@name"],
              "text-font": ["Noto Sans Bold"],
              "text-size": 10,
            },
            "paint": {
              "text-color": "black",
              "text-halo-color": "#fff",
              "text-halo-width": 1,
              "text-halo-blur": 0.5,
            }
          },

          //Admins
          {
            "id": 'admins',
            "type": 'symbol',
            "source": 'divisions',
            "source-layer": 'division',
            "filter": ["any",
              ["==", ["get", "subtype"], "locality"],
              ["==", ["get", "subtype"], "region"]
            ],
            "layout": {
              "text-field": ["get", "@name"],
              "text-font": ["Noto Sans Bold"]
            },
            "maxzoom": 14,
          },
        ]
      }
    });

    // map.current.scrollZoom.enable();
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.FullscreenControl());

    // Controls
    class layerControl {
        constructor(options) {
          this._options = {...options};
          this._container = document.createElement("div");
          this._container.classList.add("maplibregl-ctrl");
          this._container.classList.add("closed");
          switch (this._options.expandDirection || "right") {
            case "top":
              this._container.classList.add("reverse");
            case "down":
              this._container.classList.add("column");
              break;
            case "left":
              this._container.classList.add("reverse");
            case "right":
              this._container.classList.add("row");
          }
        }

        onAdd(map) {
          this._map = map;

          return this._container;
        }

        onRemove(){
          this._container.parentNode?.removeChild(this._container);
          delete this._map;
        }
      }

    map.current.addControl(new layerControl(), 'bottom-left');
    map.current.addControl(new maplibregl.AttributionControl({
      customAttribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>, '+
       '<a href="https://overturemaps.org" target="_blank">OvertureMaps Foundation</a>'
    }), 'bottom-right');


    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, [lng, lat, zoom]);

  return (
    <div className="map-wrap">
        <div ref={mapContainer} className="map" />
    </div>
  );
}
