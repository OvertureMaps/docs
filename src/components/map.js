import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from 'pmtiles';
import '../css/map.css';
import {
    Admins, Buildings, Places, Transportation, Land, Landuse, Water
} from './layers.js';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-122.33);
  const [lat] = useState(47.60);
  const [zoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Create the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      minZoom: 10,
      pitch: 45,
      hash: true,
      cooperativeGestures: {
        windowsHelpText: 'Use Ctrl + scroll to zoom the map.',
        macHelpText: 'Use ⌘ + scroll to zoom the map.',
        mobileHelpText: 'Use 2 fingers to move the map.'
      },
      style: {
        light:{"anchor":"viewport","color":"white","intensity":0.8},
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          roads: {
              type: "vector",
              url: "pmtiles://../../example-map/tiles/roads.pmtiles"
          },
          places: {
              type: "vector",
              url: "pmtiles://../../example-map/tiles/places.pmtiles"
          },
          // This is really "Admins"
          placenames: {
              type: "vector",
              url: "pmtiles://../../example-map/tiles/placenames.pmtiles"
          },
          buildings: {
              type: "vector",
              url: "pmtiles://../../example-map/tiles/buildings.pmtiles"
          },
          base: {
              type: "vector",
              url: "pmtiles://../../example-map/tiles/base.pmtiles"
          }
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
            //Land
            Land.land,
            Land.sand,
            Land.wetland,
            Land.forest,

            //LandUse
            Landuse.parks,
            Landuse.golfGreens,

            //Water
            Water.waterPolygons,
            Water.waterLinestrings,

            //Transportation
            Transportation.footwayCasing,
            Transportation.footway,
            Transportation.parkingAisleUnknownCasing,
            Transportation.residentialCasing,
            Transportation.secondaryTertiaryCasing,
            Transportation.primaryCasing,
            Transportation.parkingAisleUnknown,
            Transportation.residential,
            Transportation.secondaryTertiary,
            Transportation.primary,
            Transportation.motorwayCasing,
            Transportation.motorway,

            Transportation.residentialLabel,
            Transportation.highwayLabel,

            //Buildings
            Buildings,

            // Overture Places
            Places,

            // Overture Admin Labels
            Admins.placeHighZoom,
            Admins.placeMidZoom
        ]
      }
    });

    // map.current.scrollZoom.disable();
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

          // Places Toggle and Slider
          const placesSlider = document.createElement("input");
                placesSlider.type = 'range'
                placesSlider.value = 50
                placesSlider.addEventListener("change", (e) => {
                    console.log(e.target.value)
                    map.setFilter('placesLabel', ['all',['>=',['number',['get', 'confidence']], e.target.value/100]])
                })

          const layerButton = document.createElement("button");
                layerButton.classList.add("layer")
                layerButton.classList.add("active")
                layerButton.innerHTML = 'Places'
                layerButton.addEventListener("click", () => {
                  if(map.getLayoutProperty('placesLabel','visibility')=='visible'){
                    // Turn layer off
                    map.setLayoutProperty('placesLabel','visibility','none')
                    layerButton.classList.remove("active");
                    placesSlider.disabled=true;
                  }else{
                    // Turn layer on
                    map.setLayoutProperty('placesLabel','visibility','visible')
                    layerButton.classList.add("active");
                    placesSlider.disabled=false;
                  }
                })

          const placesToggle = document.createElement("div");
                placesToggle.appendChild(layerButton);
                placesToggle.appendChild(placesSlider);
          this._container.appendChild(placesToggle);

          // Other Layers to Toggle?

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
