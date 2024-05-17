
``` python
import pandas as pd
import geopandas as gpd
import overturemaps #pre-release 
from shapely import wkb
from lonboard import Map, PolygonLayer
from lonboard.colormap import apply_categorical_cmap
```

``` python
# specify bounding box
bbox =  -78.6429, 39.463, -73.7806, 41.6242
```

``` python
# read in Overture Maps land_cover data type
table = overturemaps.record_batch_reader("land_cover", bbox).read_all()
table = table.combine_chunks()
```

``` python
# convert to dataframe
df = table.to_pandas()
```

``` python
df.shape
```

    (163377, 8)

``` python
# filter for higher resolution land_cover features
df_h = df[df.cartography.apply(lambda x: x['min_zoom'] == 8)]
```

``` python
df_h.shape
```

    (163353, 8)

``` python
# create color map for land_cover subtypes, loosely based on natural-color palette: https://www.shadedrelief.com/shelton/c.html
color_map = {
    "urban": [167, 162, 186],
    "forest": [134, 178, 137],
    "barren": [245, 237, 213],
    "shrub": [239, 218, 182],
    "grass": [254, 239, 173],
    "crop": [222, 223, 154],
    "wetland": [158, 207, 195], 
    "mangrove": [83, 171, 128],
    "moss": [250, 230, 160],
    "snow": [255, 255, 255],
    #"none": [108, 159, 184],   
}
```

``` python
# apply color map to land_cover subtypes
colors = apply_categorical_cmap(df_h.subtype, color_map)
```

``` python
# dataframe to geodataframe, set crs
gdf = gpd.GeoDataFrame(
    df_h, 
    geometry=df_h['geometry'].apply(wkb.loads), 
    crs="EPSG:4326"
)
```

``` python
# reproject to Pennsylvania State Plane (https://epsg.io/2272) 
# gdf = gdf.to_crs(2272)
```

``` python
gdf.crs
```

    <Geographic 2D CRS: EPSG:4326>
    Name: WGS 84
    Axis Info [ellipsoidal]:
    - Lat[north]: Geodetic latitude (degree)
    - Lon[east]: Geodetic longitude (degree)
    Area of Use:
    - name: World.
    - bounds: (-180.0, -90.0, 180.0, 90.0)
    Datum: World Geodetic System 1984 ensemble
    - Ellipsoid: WGS 84
    - Prime Meridian: Greenwich

``` python
# create map layer 
layer = PolygonLayer.from_geopandas(
    gdf= gdf[['id','subtype', 'cartography', 'geometry']].reset_index(drop=True),
    get_fill_color=colors,
    get_line_color=colors,
)
```

``` python
#render map
view_state = {
    "longitude": -76.2,
    "latitude": 39.6,
    "zoom": 8,
    "pitch": 65,
    "bearing": 5,
}
m = Map(layer, view_state=view_state)
m
```

    Map(layers=[PolygonLayer(get_fill_color=<pyarrow.lib.FixedSizeListArray object at 0x32d0a2a40>
    [
      [
        254,
    …
