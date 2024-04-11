// color palette
var land = "#ccdae8"
var building = "#dce6ef"
var water = "#3063d2"
var wetland = "#00A9BF"
var park = "#09bac6"
var forest = "#09bac6"
var sand = "#EBD5BD"
var pedestrian = "#b9ccdf"
var roadCasing = "#dce6ef"
var roadMinor = "#a7bfd7"
var roadMajor = "#95b2d0"
var roadLabel = "#071F3F"
var placeLabel = "#071F3F"
var placeCasing = "#dce6ef"


const Admins = {
    "placeHighZoom": {
        "id": "placeHighZoom",
        "type": "symbol",
        "source": "placenames",
        "source-layer": "placenames",
        "minzoom": 9,
        "maxzoom": 24,
        "layout": {
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "text-size": ["step", ["zoom"],
                14,
                10,
                ["match", ["get", "locality_type"], ["borough"], 14, ["suburb"], 12, 0],
                12,
                ["match", ["get", "locality_type"], ["borough"], 16, ["suburb"], 14, ["neighborhood"], 10, 0],
                14,
                ["match", ["get", "locality_type"], ["borough"], 18, ["suburb"], 16, ["neighborhood"], 12, 0],
                15,
                ["match", ["get", "locality_type"], ["borough"], 20, ["suburb"], 18, ["neighborhood"], 14, 0],
                16,
                ["match", ["get", "locality_type"], ["borough"], 20, ["suburb"], 18, ["neighborhood"], 14, ["block"], 12, 0]
            ],
            "text-transform": ["step", ["zoom"], "none", 11, "uppercase"],
            "text-max-width": 6,
            "symbol-avoid-edges": true,
            "text-padding": 10,
            "text-justify": "auto"
        },
        "paint": {
            "text-color": placeLabel,
            "text-halo-color": placeCasing,
            "text-halo-width": 1
        }
    },
    "placeMidZoom": {
        "id": "placeMidZoom",
        "type": "symbol",
        "source": "placenames",
        "source-layer": "placenames",
        "minzoom": 8,
        "maxzoom": 24,
        "filter": [
            "all",
            ["has", "name"],
            [
                "step",
                ["zoom"],
                ["==", "$type", "Point"],
                8,
                ["match", ["get", "localityType"], ["settlement"], true, false],
                9,
                ["match", ["get", "localityType"], ["urban", "settlement"], true, false]
            ]
        ],
        "layout": {
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "text-size": [
                "step",
                ["zoom"],
                10,
                9,
                ["match", ["get", "localityType"], ["megacity"], 20, ["metropolis"], 18, ["city"], 16, ["municipality"], 14, ["town"], 10, 0],
                10,
                ["match", ["get", "localityType"], ["megacity"], 22, ["metropolis"], 20, ["city"], 18, ["municipality"], 16, ["town"], 12, 0],
                12,
                [
                    "match",
                    ["get", "localityType"],
                    ["megacity"],
                    22,
                    ["metropolis"],
                    20,
                    ["city"],
                    18,
                    ["municipality"],
                    16,
                    ["town"],
                    12,
                    ["village"],
                    10,
                    0
                ],
                14,
                ["match", ["get", "subclass"], ["megacity"], 22, ["metropolis"], 20, ["city"], 18, ["municipality"], 16, ["town"], 14, ["village", "hamlet"], 12, 0],
                15,
                ["match", ["get", "subclass"], ["megacity"], 22, ["metropolis"], 20, ["city"], 18, ["municipality"], 16, ["town"], 14, ["village", "hamlet"], 14, 0],
                16,
                ["match", ["get", "subclass"], ["village", "hamlet"], 16, 0]
            ],
            "text-transform": ["step", ["zoom"], "none", 11, "uppercase"],
            "text-padding": ["step", ["zoom"], 10, 9, 8, 10, 5, 12, 3],
            "text-max-width": 6,
            "symbol-avoid-edges": true,
            "symbol-sort-key": ["get", "sort_key"],
            "text-justify": "auto"
        },
        "paint": {
            "text-color": placeLabel,
            "text-halo-color": placeCasing,
            "text-halo-width": 1
        }
    }
}

const Buildings = {
    "id": 'buildings',
    "type": "fill-extrusion",
    "minzoom":12, "maxzoom": 24,
    "source": 'buildings',
    "source-layer": 'buildings',
    "paint": {
        "fill-extrusion-color": building,
        "fill-extrusion-opacity": 0.6,
        "fill-extrusion-base": 0,
        "fill-extrusion-height": ["case",
            ["has", "height"],
            ["to-number", ["get", "height"]], 3.2
        ]
    }
}

const Places = {
    "id": "placesLabel",
    "type": "symbol",
    "source": "places",
    "source-layer": "places",
    "filter": ["all",
        ["has", "name"],
        [">", ["get", "confidence"], 0.75]
    ],
    "minzoom": 15, "maxzoom": 24,
    "layout": {
        "text-field": ["concat", "■\n",["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-max-width": 5,
        "text-size": 10,
        "text-line-height": 1,
        "text-justify": "center",
        "text-anchor": "center",
        "text-radial-offset": 0.8,
        "text-padding": 4,
    },
    "paint": {
        "text-color": placeLabel,
        "text-halo-color": placeCasing, "text-halo-width": 1
    }
}

const Transportation = {
    "footwayCasing": {
        "id": "footwayCasing",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 15,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["footway"], true, false],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.25, 20, 1.3],
            "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.5, 16, 3, 22, 25],
            "line-color": roadCasing
        }
    },
    "footway": {
        "id": "footway",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 15,
        "maxzoom": 24,
        "filter":
            ["match", ["get", "class"], ["footway"], true, false],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.5, 16, 3, 22, 25],
            "line-color": pedestrian
        }
    },
    "parkingAisleUnknownCasing": {
        "id": "parkingAisleUnknownCasing",
        "type": "line",
        "source": "roads", "source-layer": "roads",
        "minzoom": 14, "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["parking_aisle", "unknown"], true, false],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.25, 20, 1.3], "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.5, 16, 3.5, 22, 75],
            "line-color": roadCasing
        }
    },
    "residentialCasing": {
        "id": "residentialCasing",
        "type": "line",
        "source": "roads", "source-layer": "roads",
        "minzoom": 12, "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["residential"], true, false],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.75, 20, 1.3], "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 1, 16, 6, 22, 125],
            "line-color": roadCasing
        }
    },
    "secondaryTertiaryCasing": {
        "id": "secondaryTertiaryCasing",
        "type": "line",
        "source": "roads", "source-layer": "roads",
        "minzoom": 11, "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 1, 20, 1.3], "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 10, 0.5, 12, 2.2, 16, 6.6, 22, 160],
            "line-color": roadCasing
        }
    },
    "primaryCasing": {
        "id": "primaryCasing",
        "type": "line",
        "source": "roads", "source-layer": "roads",
        "minzoom": 8, "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["primary"], true, false],
        "layout": { "line-cap": ["step", ["zoom"], "butt", 16, "round"], "line-join": ["step", ["zoom"], "miter", 16, "round"] },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 1, 20, 1.4], "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 8, 0.5, 12, 3.1, 16, 9.3, 22, 175],
            "line-color": roadCasing
        }
    },
    "parkingAisleUnknown": {
        "id": "parkingAisleUnknown",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 14,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["parking_aisle", "unknown"], true, false],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-width": [
                "interpolate",
                [
                    "exponential",
                    1.5
                ],
                [
                    "zoom"
                ],
                12,
                0.5,
                16,
                3.5,
                22,
                75
            ],
            "line-color": roadMinor
        }
    },
    "residential": {
        "id": "residential",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 12,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["residential"], true, false],
        "layout": { "line-cap": ["step", ["zoom"], "butt", 13, "round"], "line-join": ["step", ["zoom"], "miter", 13, "round"] },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 1, 16, 6, 22, 125],
            "line-color": roadMinor
        }
    },
    "secondaryTertiary": {
        "id": "secondaryTertiary",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 10,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
        "layout": { "line-cap": ["step", ["zoom"], "butt", 13, "round"], "line-join": ["step", ["zoom"], "miter", 13, "round"] },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 10, 0.5, 12, 2.2, 16, 6.6, 22, 160],
            "line-color": roadMinor
        }
    },
    "primary": {
        "id": "primary",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 8,
        "maxzoom": 24,
        "filter":
            ["match", ["get", "class"], ["primary"], true, false],
        "layout": {
            "line-cap": ["step", ["zoom"], "butt", 13, "round"],
            "line-join": ["step", ["zoom"], "miter", 13, "round"]
        },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 8, 0.5, 12, 3.1, 16, 9.3, 22, 175],
            "line-color": roadMinor
        }
    },
    "motorwayCasing": {
        "id": "motorwayCasing",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 6,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["motorway"], true, false],
        "layout": {
            "line-cap": ["step", ["zoom"], "butt", 13, "round"],
            "line-join": ["step", ["zoom"], "miter", 13, "round"]
        },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 1, 20, 1.4],
            "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 6, 0.5, 12, 3.3, 16, 9.9, 22, 175],
            "line-color": roadCasing
        }
    },
    "motorway": {
        "id": "motorway",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 6,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["motorway"], true, false],
        "layout": {
            "line-cap": ["step", ["zoom"], "butt", 12, "round"],
            "line-join": ["step", ["zoom"], "miter", 12, "round"]
        },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 6, 0.5, 12, 3.3, 16, 9.9, 22, 175],
            "line-color": roadMajor
        }
    },

    // Road Labels
    "residentialLabel": {
        "id": "residentialLabel",
        "type": "symbol",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 13,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["residential", "unknown"], true, false],
        "layout": {
            "text-transform": "uppercase",
            "text-size": ["interpolate", ["linear"], ["zoom"],
                13, 9,
                18, ["match", ["get", "class"], ["access", "path"], 9, 12]],
            "text-max-angle": 30,
            "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 13, 200, 16, 400],
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "symbol-placement": "line", "text-padding": 5
        },
        "paint": {
            "text-color": roadLabel,
            "text-halo-color": "hsl(0,0%,100%)",
            "text-halo-width": 1
        }
    },
    "highwayLabel": {
        "id": "highwayLabel",
        "type": "symbol",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 13,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["motorway", "primary", "secondary", "tertiary"], true, false],
        "layout": {
            "text-transform": "uppercase",
            "text-size": ["interpolate", ["linear"], ["zoom"],
                13, 9,
                18, ["match", ["get", "class"], ["access", "path"], 9, 12]],
            "text-max-angle": 30,
            "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 13, 200, 16, 400],
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "symbol-placement": "line"
        },
        "paint": {
            "text-color": roadLabel,
            "text-halo-color": "hsl(0,0%,100%)",
            "text-halo-width": 1
        }
    }
}

const Land = {
    "land": {
        "id": "land",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subtype"], ["land"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": land
        }
    },
    "sand": {
        "id": "sand",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subtype"], ["sand"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": sand
        }
    },
    "wetland": {
        "id": "wetland",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subtype"], ["wetland"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": wetland
        }
    },
    "forest": {
        "id": "forest",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subtype"], ["forest", "grass", "scrub"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": forest
        }
    },
}

const Landuse = {
    "parks": {
        "id": "parks",
        "type": "fill",
        "source": 'base',
        "source-layer": 'landuse',
        "filter": ["match", ["get", "subtype"], ["park"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": park
        }
    },
    "golfGreens": {
        "id": "golfGreens",
        "type": "fill",
        "source": 'base',
        "source-layer": 'landuse',
        "filter": ["==", ["get", "class"], "green"],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": park
        }
    },
}

const Water ={
    "waterPolygons": {
        "id": "water-fill",
        "type": "fill",
        "source": "base",
        "source-layer": "water",
        "filter":["==", ["geometry-type"], "Polygon"],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": water
        }
    },
    "waterLinestrings": {
        "id": "water-line",
        "type": "line",
        "source": "base",
        "source-layer": "water",
        "filter":["==", ["geometry-type"], "LineString"],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            'line-width': 3,
            "line-color": water
        }
    }
}

export { Admins, Buildings, Places, Transportation, Land, Landuse, Water };
