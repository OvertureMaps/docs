const Admins = {
    "placeHighZoom": {
        "id": "placeHighZoom",
        "type": "symbol",
        "source": "placenames",
        "source-layer": "placenames",
        "minzoom": 9,
        "maxzoom": 24,
        // "filter": ["all", ["has", "name"], ["==", "localityType", "local"]],
        "layout": {
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "text-size": [
                "step",
                ["zoom"],
                14,
                10,
                ["match", ["get", "localityType"], ["borough"], 14, ["suburb"], 12, 0],
                12,
                ["match", ["get", "localityType"], ["borough"], 16, ["suburb"], 14, ["neighborhood"], 10, 0],
                14,
                ["match", ["get", "localityType"], ["borough"], 18, ["suburb"], 16, ["neighborhood"], 12, 0],
                15,
                ["match", ["get", "localityType"], ["borough"], 20, ["suburb"], 18, ["neighborhood"], 14, 0],
                16,
                ["match", ["get", "localityType"], ["borough"], 20, ["suburb"], 18, ["neighborhood"], 14, ["block"], 12, 0]
            ],
            "text-transform": ["step", ["zoom"], "none", 11, "uppercase"],
            "text-max-width": 6,
            "symbol-avoid-edges": true,
            "symbol-sort-key": ["get", "sort_key"],
            "text-padding": 10,
            "text-justify": "auto"
        },
        "paint": {
            "text-color": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,
                "hsl(214, 8%, 30%)",
                10,
                ["match", ["get", "subclass"], ["borough"], "hsl(214, 8%, 30%)", ["suburb"], "hsl(214, 8%, 30%)", "hsl(214, 8%, 30%)"],
                11,
                ["match", ["get", "subclass"], ["borough"], "hsl(214, 8%, 30%)", ["suburb", "neighborhood"], "hsl(214, 8%, 30%)", "hsl(214, 8%, 30%)"],
                12,
                "hsl(214, 8%, 30%)",
                14,
                ["match", ["get", "subclass"], ["borough", "suburb"], "hsl(214, 8%, 30%)", ["neighborhood"], "hsl(215, 8%, 20%)", "hsl(214, 8%, 30%)"],
                16,
                ["match", ["get", "subclass"], ["borough", "block"], "hsl(214, 8%, 30%)", ["suburb", "neighborhood"], "hsl(214, 8%, 30%)", "hsl(214, 8%, 30%)"]
            ],
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": ["match", ["get", "subclass"], ["megacity", "metropolis"], 1, ["city", "municipality"], 1, 1]
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
            "text-color": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                ["match", ["get", "localityType"], ["town"], "hsl(214, 8%, 30%)", "hsl(214, 8%, 30%)"],
                9,
                [
                    "match",
                    ["get", "subclass"],
                    ["megacity", "metropolis", "city"],
                    "hsl(215, 8%, 20%)",
                    ["town", "municipality"],
                    "hsl(214, 8%, 30%)",
                    "hsl(214, 8%, 30%)"
                ],
                10,
                [
                    "match",
                    ["get", "localityType"],
                    ["megacity", "metropolis"],
                    "hsl(215, 8%, 20%)",
                    ["town", "city", "municipality"],
                    "hsl(214, 8%, 30%)",
                    "hsl(214, 8%, 30%)"
                ],
                11,
                [
                    "match",
                    ["get", "localityType"],
                    ["megacity", "metropolis"],
                    "hsl(215, 8%, 20%)",
                    ["town", "village", "city", "municipality"],
                    "hsl(214, 8%, 30%)",
                    "hsl(214, 8%, 30%)"
                ],
                12,
                [
                    "match",
                    ["get", "localityType"],
                    ["megacity", "metropolis"],
                    "hsl(215, 8%, 20%)",
                    ["town", "village", "city", "municipality"],
                    "hsl(214, 8%, 30%)",
                    "hsl(214, 8%, 30%)"
                ],
                14,
                "hsl(214, 8%, 30%)"
            ],
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": ["match", ["get", "subclass"], ["megacity", "metropolis"], 1, ["city", "municipality"], 1, 1]
        }
    }
}

const Buildings = {
    "id": 'buildings',
    "type": "fill-extrusion",
    "source": 'buildings',
    "source-layer": 'buildings',
    "paint": {
        "fill-extrusion-color": ["match",
            ["get", "class"],
            ["commercial"], "hsl(218, 26%, 82%)",
            "hsl(218, 20%, 88%)"
        ],
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
    "minzoom": 13, "maxzoom": 24,
    "layout": {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-max-width": 5,
        "text-size": 10,
        "text-line-height": 1,
        "icon-image": "places",
        "text-justify": "auto",
        "text-variable-anchor": ["literal", ["right", "left"]],
        "text-radial-offset": 0.8,
        "text-padding": 0,
        "visibility" : "visible"
    },
    "paint": {
        "text-color": "hsl(245, 40%, 35%)",
        "text-halo-color": "hsl(0,0%,100%)", "text-halo-width": 1
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
            "line-color": "hsl(214, 26%, 85%)"
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
            "line-color": "hsl(214, 36%, 97%)"
        }
    },
    "parkingAisleUnknownCasing": {
        "id": "parkingAisleUnknownCasing",
        "type": "line",
        "source": "roads", "source-layer": "roads",
        "minzoom": 14, "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["parkingAisle", "unknown"], true, false],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.25, 20, 1.3], "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.5, 16, 3.5, 22, 75],
            "line-color": ["step", ["zoom"],
                "hsl(216,26%,89%)",
                16, "hsl(214, 26%, 80%)"
            ]
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
            "line-color": ["step", ["zoom"],
                "hsl(216,26%,89%)",
                16, "hsl(214, 26%, 80%)"
            ]
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
            "line-color": ["step",["zoom"],
            "hsl(0, 0%, 100%)",
            12,"hsl(216,26%,89%)",
            16,"hsl(214, 26%, 80%)"
        ]
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
            "line-color": ["step",["zoom"],
            "hsl(0, 0%, 100%)",
            10,"hsl(0, 0%, 100%)",
            11,"hsl(0, 0%, 100%)",
            12,"hsl(216,26%,89%)",
            16,"hsl(214, 26%, 80%)"
        ]
        }
    },
    "parkingAisleUnknown": {
        "id": "parkingAisleUnknown",
        "type": "line",
        "source": "roads",
        "source-layer": "roads",
        "minzoom": 14,
        "maxzoom": 24,
        "filter": ["match", ["get", "class"], ["parkingAisle", "unknown"], true, false],
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
            "line-color": "hsl(0, 0%, 100%)"
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
            "line-color": "hsl(0, 0%, 100%)"
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
            "line-color": ["step", ["zoom"], "hsl(214, 26%, 80%)",
                11,
                "hsl(214, 26%, 85%)",
                12,
                "hsl(0, 0%, 100%)",
                16,
                "hsl(0, 0%, 100%)"]
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
            "line-color": ["step", ["zoom"],
                "hsl(214, 26%, 69%)",
                10,
                "hsl(214, 26%, 79%)",
                11,
                "hsl(214, 26%, 85%)",
                12,
                "hsl(0, 0%, 100%)",
                16,
                "hsl(0, 0%, 100%)"]
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
            "line-color": [
                "step",
                [
                    "zoom"
                ],
                "hsl(0, 0%, 100%)",
                8,
                "hsl(0, 0%, 100%)",
                10,
                "hsl(0, 0%, 100%)",
                11,
                "hsl(0, 0%, 100%)",
                12,
                "hsl(214, 26%, 77%)",
                16,
                "hsl(214, 26%, 70%)"
            ]
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
            "line-color": ["step", ["zoom"],
                "hsl(214, 26%, 67%)",
                8,
                "hsl(214, 26%, 70%)",
                10,
                "hsl(214, 26%, 75%)",
                11,
                "hsl(214, 26%, 77%)",
                12,
                "hsl(214, 26%, 87%)",
                16,
                "hsl(214, 21%, 85%)"]
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
            "text-size": ["interpolate", ["linear"], ["zoom"],
                13, 9,
                18, ["match", ["get", "class"], ["access", "path"], 12, 14]],
            "text-max-angle": 30,
            "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 13, 200, 16, 400],
            "text-field": ["to-string", ["get", "commoname"]],
            "text-font": ["Noto Sans Regular"],
            "symbol-placement": "line", "text-padding": 5
        },
        "paint": {
            "text-color": "hsl(214, 16%, 55%)",
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
            "text-size": ["interpolate", ["linear"], ["zoom"],
                13, 11,
                18, ["match", ["get", "class"], ["access", "path"], 12, 14]],
            "text-max-angle": 30,
            "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 13, 200, 16, 400],
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "symbol-placement": "line", "text-padding": 5
        },
        "paint": {
            "text-color": "hsl(214, 16%, 45%)",
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
        "filter": ["match", ["get", "subType"], ["land"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": [
                "interpolate", ["linear"], ["zoom"],
                5, "hsl(216,20%,99%)",
                16, "hsl(216,20%,95%)"
            ]
        }
    },
    "sand": {
        "id": "sand",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subType"], ["sand"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": "hsl(43, 69%, 95%)"
        }
    },
    "wetland": {
        "id": "wetland",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subType"], ["wetland"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": "hsl(132, 36%, 89%)"
        }
    },
    "forest": {
        "id": "forest",
        "type": "fill",
        "source": 'base',
        "source-layer": 'land',
        "filter": ["match", ["get", "subType"], ["forest", "grass", "scrub"], true, false],
        "minzoom": 0,
        "maxzoom": 24,
        "paint": {
            "fill-color": "hsl(131, 35%, 90%)"
        }
    },
}

const Landuse = {

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
            "fill-color": "hsl(204,88%,82%)"
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
            "line-color": "hsl(204,88%,82%)"
        }
    }
}

export { Admins, Buildings, Places, Transportation, Land, Landuse, Water };
