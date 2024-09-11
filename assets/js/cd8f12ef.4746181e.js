"use strict";(self.webpackChunkoverture_documentation=self.webpackChunkoverture_documentation||[]).push([[4780],{61832:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>g,contentTitle:()=>x,default:()=>y,frontMatter:()=>f,metadata:()=>b,toc:()=>j});var a=s(74848),n=s(28453),r=s(11470),i=s(19365),o=s(97577);const l="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\nSELECT\n    *\nFROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*'))\nTO 'places.parquet';",d="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n    SELECT\n       id,\n       version,\n    -- We are casting these columns to JSON in order to ensure compatibility with our GeoJSON output. \n    -- These conversions may be not necessary for other output formats.\n       CAST(names AS JSON) AS names,\n       CAST(categories AS JSON) AS categories,\n       confidence,\n       CAST(websites AS JSON) AS websites,\n       CAST(socials AS JSON) AS socials,\n       CAST(emails AS JSON) AS emails,\n       CAST(phones AS JSON) AS phones,\n       CAST(brand AS JSON) AS brand,\n       CAST(addresses AS JSON) AS addresses,\n       CAST(sources AS JSON) AS sources,\n       ST_GeomFromWKB(geometry)\nFROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')\nWHERE\n    -- Point geometry doesn't require looking at both min and max:\n      bbox.xmin BETWEEN 12.46 AND 12.48 AND\n      bbox.ymin BETWEEN 41.89 AND 41.91\n) TO 'rome_places.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');\n",c="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n    SELECT\n-- we can parse addresses into columns to make further filtering of the data simpler\n    addresses[1].freeform as street,\n    addresses[1].locality as locality,\n    addresses[1].postcode as postcode,\n    addresses[1].region as region,\n    addresses[1].country as country,\n    *\nFROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')\nWHERE\n    addresses[1].country = 'LT'\n) TO 'lithuania_places.parquet';\n",u="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n    SELECT\n    names.primary as primary_name,\n    confidence,\n    addresses,\n    websites,\n    geometry\nFROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')\nWHERE\n    categories.primary IN ('flour_mill', 'rice_mill')\n) TO 'mills.parquet';\n",h="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n    SELECT\n    *\nFROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')\nWHERE\n-- Only select data with a confidence score above .95\n    confidence > .95\n-- Further filtering for data within Massachusetts to limit the size of this query\n    AND addresses[1].region = 'MA'\n) TO 'MA_high_confidence_places.parquet';\n",p="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n-- We'll first select OSM data from Oregon with amenity = restaurant\n    WITH osm AS (\n        SELECT kind,\n            id,\n            tags->>'name' AS name,\n            tags->>'addr:housenumber' AS housenumber,\n            tags->>'addr:street' AS street,\n            tags->>'addr:postcode' AS postcode,\n            tags->>'addr:city' AS city,\n            tags->>'website' AS website,\n            tags->>'phone' AS phone,\n            lat,\n            lon,\n            tags\n        FROM st_readosm(\n                'oregon-latest.osm.pbf'\n            )\n        WHERE tags->>'amenity' = 'restaurant'\n    ),\n-- Then select Overture data with any category containing the word restauarant in Oregon.\n    overture AS (\n        SELECT id,\n            names.primary AS \"names.primary\",\n            websites[1] AS website,\n            socials[1] AS social,\n            emails[1] AS email,\n            phones[1] AS phone,\n            addresses[1].freeform AS freeform,\n            addresses[1].locality AS locality,\n            addresses[1].postcode AS postcode,\n            addresses[1].region AS region,\n            addresses[1].country AS country,\n            ST_GeomFromWKB(geometry) AS geometry\n        FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/*/*')\n        WHERE region = 'OR'\n            AND country = 'US'\n            AND categories.primary ilike '%restaurant%'\n    )\n-- Now that we have our input data we will join them together.\n    SELECT\n        -- With the GERS id joined to the final result this dataset can be quickly synced to future Overture releases\n        overture.id AS GERS_id,\n        osm.name,\n        -- Using CASE statements, we'll favor OSM data when it is present but use Overture data wherever there are gaps\n        CASE\n            WHEN osm.housenumber IS NOT NULL\n            OR osm.street IS NOT NULL THEN concat(osm.housenumber, ' ', osm.street)\n            ELSE overture.freeform\n        END AS address,\n        CASE\n            WHEN osm.city IS NOT NULL THEN osm.city\n            ELSE overture.locality\n        END AS city,\n        CASE\n            WHEN osm.postcode IS NOT NULL THEN osm.postcode\n            ELSE overture.postcode\n        END AS postcode,\n        CASE\n            WHEN osm.website IS NOT NULL THEN osm.website\n            ELSE overture.website\n        END AS website,\n        CASE\n            WHEN osm.phone IS NOT NULL THEN osm.phone\n            ELSE overture.phone\n        END AS phone,\n        overture.social,\n        overture.email,\n        ST_AsWKB(st_point(osm.lon, osm.lat)) AS geometry\n    FROM osm\n-- To join the data, we'll first match features that have the same OR similar names \n        LEFT JOIN overture ON (\n            osm.name = overture.\"names.primary\"\n            OR osm.name ilike concat('%', overture.\"names.primary\", '%')\n            OR overture.\"names.primary\" ilike concat('%', osm.name, '%')\n            OR damerau_levenshtein(osm.name, overture.\"names.primary\") < 3\n        )\n-- Then use a small buffer to match features that are nearby to each other\n        AND st_intersects(\n            st_buffer(overture.geometry::geometry, 0.003),\n            st_point(osm.lon, osm.lat)\n        )\n) TO 'oregon_restaurants_combined.parquet';",m="LOAD spatial;\nLOAD httpfs;\n-- Access the data on AWS in this example\nSET s3_region='us-west-2';\n\nCOPY (\n    -- First query places with address data in the area we are interested in\n    WITH places AS\n        (\n        SELECT * \n        FROM read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=places/*/*')\n        WHERE bbox.xmin BETWEEN 14.38 AND 14.44\n        AND bbox.ymin BETWEEN 50.07 AND 50.11\n        AND addresses[1].freeform IS NOT NULL\n        ),\n    -- Then get buildings in the same area\n    buildings as\n        (\n        SELECT * \n        FROM read_parquet('s3://overturemaps-us-west-2/release/2024-07-22.0/theme=buildings/type=building/*')\n        WHERE bbox.xmin > 14.38 AND bbox.xmax < 14.44\n        AND bbox.ymin > 50.07 AND bbox.ymax < 50.11\n        )\n    -- Join the data using an intersect and select distinct to avoid duplicates\n    SELECT distinct(buildings.id), buildings.*, places.addresses\n    FROM buildings\n    LEFT JOIN places on st_intersects(ST_GeomFromWKB(places.geometry), ST_GeomFromWKB(buildings.geometry))\n    ORDER BY buildings.id\n) TO 'prague_places_in_buildings.parquet';\n",f={title:"Places",description:"53M places and points of interest around the world"},x=void 0,b={id:"guides/places",title:"Places",description:"53M places and points of interest around the world",source:"@site/docs/guides/places.mdx",sourceDirName:"guides",slug:"/guides/places",permalink:"/guides/places",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:172605874e4,frontMatter:{title:"Places",description:"53M places and points of interest around the world"},sidebar:"docs",previous:{title:"Divisions",permalink:"/guides/divisions"},next:{title:"Transportation",permalink:"/guides/transportation"}},g={},j=[{value:"Overview",id:"overview",level:2},{value:"Dataset description",id:"dataset-description",level:2},{value:"Data access and retrieval",id:"data-access-and-retrieval",level:2},{value:"Data usage guidelines",id:"data-usage-guidelines",level:2},{value:"Data manipulation and analysis",id:"data-manipulation-and-analysis",level:2},{value:"Querying by properties",id:"querying-by-properties",level:3},{value:"Advanced examples",id:"advanced-examples",level:3},{value:"Tools and libraries",id:"tools-and-libraries",level:2},{value:"Rapid",id:"rapid",level:3}];function v(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components},{Details:f}=t;return f||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["This guide is focused on the Overture places ",(0,a.jsx)(t.strong,{children:"data"}),"\u2014its content, scope, properties, and use cases. Please see the ",(0,a.jsx)(t.a,{href:"/schema/reference/places/place",children:"schema reference documentation"})," for more information on the Overture places ",(0,a.jsx)(t.strong,{children:"schema"}),"."]})}),"\n",(0,a.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,a.jsxs)(t.p,{children:["The Overture places theme has one feature type, called ",(0,a.jsx)(t.code,{children:"place"}),", and contains more than 53 million point representations of real-world entities: schools, businesses, hospitals, religious organizations, landmarks, mountain peaks, and much more. The theme is derived from a conflation of Meta and Microsoft data and is available under a ",(0,a.jsx)(t.a,{href:"https://cdla.dev/permissive-2-0/",children:"CDLA Permissive 2.0"})," license."]}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsx)(t.tr,{children:(0,a.jsx)(t.th,{style:{textAlign:"center"},children:(0,a.jsx)(t.img,{alt:"Overture places theme coverage",src:s(78679).A+"",width:"1728",height:"1138"})})})}),(0,a.jsx)(t.tbody,{children:(0,a.jsx)(t.tr,{children:(0,a.jsx)(t.td,{style:{textAlign:"center"},children:(0,a.jsx)(t.em,{children:"Overture places data, styled by data source: purple for Meta, orange for Microsoft."})})})})]}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Primary source"}),(0,a.jsx)(t.th,{children:"Feature count, July 2024 release"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Meta"}),(0,a.jsx)(t.td,{children:"~48 million"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Microsoft"}),(0,a.jsx)(t.td,{children:"~5.5 million"})]})]})]}),"\n",(0,a.jsx)(t.h2,{id:"dataset-description",children:"Dataset description"}),"\n",(0,a.jsxs)(t.p,{children:["All Overture data, including places data, is distributed as GeoParquet, a column-based data structure. Below you'll find a table with column-by-column descriptions of the properties in the place feature type. Of particular interest to users is the categories property; we offer a complete list of available categories ",(0,a.jsx)(t.a,{href:"https://github.com/OvertureMaps/schema/blob/main/task-force-docs/places/overture_categories.csv",children:"here"}),"."]}),"\n",(0,a.jsxs)(f,{children:[(0,a.jsx)("summary",{children:"Schema for GeoParquet files in the places theme"}),(0,a.jsx)("div",{children:(0,a.jsx)(r.default,{children:(0,a.jsx)(i.default,{value:"places",label:"places",default:!0,children:(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"column"}),(0,a.jsx)(t.th,{children:"type"}),(0,a.jsx)(t.th,{children:"description"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"id"}),(0,a.jsx)(t.td,{children:"VARCHAR"}),(0,a.jsx)(t.td,{children:"A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if\u2014and-only-if the feature represents an entity that is part of GERS."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"geometry"}),(0,a.jsx)(t.td,{children:"BLOB"}),(0,a.jsx)(t.td,{children:"The point representation of the Place's location. Place's geometry which MUST be a Point as defined by GeoJSON schema."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"bbox"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsx)(t.td,{children:"Area defined by two longitudes and two latitudes: latitude is a decimal number between -90.0 and 90.0; longitude is a decimal number between -180.0 and 180.0."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"version"}),(0,a.jsx)(t.td,{children:"INTEGER"}),(0,a.jsx)(t.td,{children:"Version number of the feature, incremented in each Overture release where the geometry or attributes of this feature changed."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"sources"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsx)(t.td,{children:"The array of source information for the properties of a given feature, with each entry being a source object which lists the property in JSON Pointer notation and the dataset that specific value came from. All features must have a root level source which is the default source if a specific property's source is not specified."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"names"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsx)(t.td,{children:"Properties defining the names of a feature."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"categories"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsxs)(t.td,{children:["The categories of the place. Complete list is available on GitHub: ",(0,a.jsx)(t.a,{href:"https://github.com/OvertureMaps/schema/blob/main/task-force-docs/places/overture_categories.csv",children:"https://github.com/OvertureMaps/schema/blob/main/task-force-docs/places/overture_categories.csv"})]})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"confidence"}),(0,a.jsx)(t.td,{children:"DOUBLE"}),(0,a.jsx)(t.td,{children:"The confidence of the existence of the place. It's a number between 0 and 1. 0 means that we're sure that the place doesn't exist (anymore). 1 means that we're sure that the place exists. If there's no value for the confidence, it means that we don't have any confidence information."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"websites"}),(0,a.jsx)(t.td,{children:"VARCHAR[]"}),(0,a.jsx)(t.td,{children:"The websites of the place."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"socials"}),(0,a.jsx)(t.td,{children:"VARCHAR[]"}),(0,a.jsx)(t.td,{children:"The social media URLs of the place."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"emails"}),(0,a.jsx)(t.td,{children:"VARCHAR[]"}),(0,a.jsx)(t.td,{children:"The email addresses of the place."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"phones"}),(0,a.jsx)(t.td,{children:"VARCHAR[]"}),(0,a.jsx)(t.td,{children:"The phone numbers of the place."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"brand"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsx)(t.td,{children:"The brand of the place. A location with multiple brands is modeled as multiple separate places, each with its own brand."})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"addresses"}),(0,a.jsx)(t.td,{children:"STRUCT"}),(0,a.jsx)(t.td,{children:"The addresses of the place."})]})]})]})})})})]}),"\n",(0,a.jsx)(t.h2,{id:"data-access-and-retrieval",children:"Data access and retrieval"}),"\n",(0,a.jsx)(t.p,{children:"The latest places data can be obtained from AWS or Azure as GeoParquet files at the following locations."}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Provider"}),(0,a.jsx)(t.th,{children:"Location"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Amazon S3"}),(0,a.jsx)(t.td,{children:(0,a.jsx)(o.A,{query:"s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=places/type=place/",language:"text"})})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Azure Blob Storage"}),(0,a.jsx)(t.td,{children:(0,a.jsx)(o.A,{query:"https://overturemapswestus2.blob.core.windows.net/release/__OVERTURE_RELEASE/theme=places/type=place/",language:"text"})})]})]})]}),"\n",(0,a.jsxs)(t.p,{children:["More information can be found in the ",(0,a.jsx)(t.a,{href:"https://docs.overturemaps.org/getting-data/",children:"Getting Overture Data"})," section of this documentation. You can download the entire dataset directly from the S3 or Azure locations above. Warning: the output will be a very large file.\nDepending on your use case, these methods might be more practical for you:"]}),"\n",(0,a.jsxs)(r.default,{children:[(0,a.jsxs)(i.default,{value:"Python Command-line Tool",label:"Python Command-line Tool",default:!0,children:[(0,a.jsxs)(t.p,{children:["First, follow the ",(0,a.jsx)(t.a,{href:"/getting-data/overturemaps-py/",children:"setup guide for the Python Command-line Tool"}),"."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"overturemaps download -f geoparquet --type=place -o places.geoparquet\n"})})]}),(0,a.jsxs)(i.default,{value:"DuckDB",label:"DuckDB",default:!0,children:[(0,a.jsxs)(t.p,{children:["First, follow the ",(0,a.jsx)(t.a,{href:"/getting-data/duckdb/",children:"setup guide for DuckDB"}),"."]}),(0,a.jsx)(o.A,{query:l})]})]}),"\n",(0,a.jsx)(t.h2,{id:"data-usage-guidelines",children:"Data usage guidelines"}),"\n",(0,a.jsx)(t.p,{children:"We recommend downloading only the Overture data you need. If you have a particular geographic area of interest, there are several options for using a simple bounding box to extract places data and output a GeoJSON file."}),"\n",(0,a.jsxs)(r.default,{children:[(0,a.jsxs)(i.default,{value:"Overture Maps Explorer",label:"Overture Maps Explorer",default:!0,children:[(0,a.jsxs)(t.p,{children:["To quickly view and download modest amounts of data, you can use the ",(0,a.jsx)(t.a,{href:"https://explore.overturemaps.org/#15.07/41.89731/12.47626",children:"Overture Maps Explorer website"}),"."]}),(0,a.jsxs)(t.p,{children:["To download data: Pan to the area you are interested in, turn off the other layers, then click ",(0,a.jsx)(t.code,{children:"Download Visible"}),"."]}),(0,a.jsx)(t.p,{children:"This will download the area visible on your screen."})]}),(0,a.jsxs)(i.default,{value:"Python Command-line Tool",label:"Python Command-line Tool",default:!0,children:[(0,a.jsxs)(t.p,{children:["First, follow the ",(0,a.jsx)(t.a,{href:"/getting-data/overturemaps-py/",children:"setup guide for the Python Command-line Tool"}),"."]}),(0,a.jsxs)(t.p,{children:["Simply alter the ",(0,a.jsx)(t.code,{children:"bbox"})," value to download a particular area."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"overturemaps download --bbox=12.46,41.89,12.48,41.91 -f geojson --type=place -o rome.geojson\n"})})]}),(0,a.jsxs)(i.default,{value:"DuckDB",label:"DuckDB",default:!0,children:[(0,a.jsxs)(t.p,{children:["First, follow the ",(0,a.jsx)(t.a,{href:"/getting-data/duckdb/",children:"setup guide for DuckDB"}),"."]}),(0,a.jsxs)(t.p,{children:["Replace the ",(0,a.jsx)(t.code,{children:"bbox.xmin"})," and ",(0,a.jsx)(t.code,{children:"bbox.ymin"})," values with a new bounding box to run the query for a different area."]}),(0,a.jsx)(o.A,{query:d})]})]}),"\n",(0,a.jsx)(t.h2,{id:"data-manipulation-and-analysis",children:"Data manipulation and analysis"}),"\n",(0,a.jsx)(t.h3,{id:"querying-by-properties",children:"Querying by properties"}),"\n",(0,a.jsx)(t.p,{children:"These examples use data properties in the address, category, and confidence scores columns to filter the data in useful ways using DuckDB."}),"\n",(0,a.jsxs)(r.default,{children:[(0,a.jsxs)(i.default,{value:"Query by address",label:"Query by address",default:!0,children:[(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"address"})," column can be used to quickly filter data down to a particular political unit. This example uses the country key to get all the data with addresses in Lithuania. Region can be likewise used to extract data from smaller units such as US states."]}),(0,a.jsx)(o.A,{query:c})]}),(0,a.jsxs)(i.default,{value:"Query by category",label:"Query by category",default:!0,children:[(0,a.jsxs)(t.p,{children:["For filtering data by a particular type of place we can use the ",(0,a.jsx)(t.code,{children:"categories"})," column. In this example we'll extract all the places with categories of ",(0,a.jsx)(t.code,{children:"rice_mill"})," or ",(0,a.jsx)(t.code,{children:"flour_mill"})]}),(0,a.jsxs)(t.p,{children:["The full category list is available ",(0,a.jsx)(t.a,{href:"https://github.com/OvertureMaps/schema/blob/main/task-force-docs/places/overture_categories.csv",children:"here"}),"."]}),(0,a.jsx)(o.A,{query:u})]}),(0,a.jsxs)(i.default,{value:"Query by confidence score",label:"Query by confidence score",default:!0,children:[(0,a.jsxs)(t.p,{children:["Suppose you only want data that definitely exists and is accurate. We can use the ",(0,a.jsx)(t.code,{children:"confidence"})," score to filter out data below a certain threshold to remove any suspect data."]}),(0,a.jsx)(o.A,{query:h})]})]}),"\n",(0,a.jsx)(t.h3,{id:"advanced-examples",children:"Advanced examples"}),"\n",(0,a.jsx)(t.p,{children:"These examples present some use cases that combine places data with other datasets."}),"\n",(0,a.jsxs)(r.default,{children:[(0,a.jsxs)(i.default,{value:"Conflate with OpenStreetMap",label:"Conflate with OpenStreetMap",default:!0,children:[(0,a.jsx)(t.p,{children:"Overture Places can be a valuable source for conflating with or enhancing your own existing dataset."}),(0,a.jsx)(t.p,{children:"In this example, suppose we want to use OpenStreetMap POIs for a project but would like to fill in any missing attributes such as addresses or phone numbers with Overture Place data."}),(0,a.jsx)(t.p,{children:"Using some basic matching logic, we can join these two datasets together to create a more robust final product. By also joining the GERS ID to our output dataset we could easily keep our now conflated dataset synced with future Overture releases with a simple join."}),(0,a.jsxs)(t.p,{children:["To run this example yourself, an Oregon PBF can be obtained from ",(0,a.jsx)(t.a,{href:"https://download.geofabrik.de/north-america/us/oregon.html",children:"Geofabrik"}),"."]}),(0,a.jsxs)(t.p,{children:["Note: Joining data with a CDLA Permissive 2.0 license to OSM is permitted but the resulting data may need to carry the Open Database License (ODbL) if it is a derivative database.  Please see the ",(0,a.jsx)(t.a,{href:"https://osmfoundation.org/wiki/Licence/Community_Guidelines/Collective_Database_Guideline_Guideline",children:"OSM Collective Database Guideline"})," for information on this topic."]}),(0,a.jsxs)(f,{children:[(0,a.jsx)("summary",{children:"Query"}),(0,a.jsx)("div",{children:(0,a.jsx)(o.A,{query:p})})]})]}),(0,a.jsxs)(i.default,{value:"Find building addresses",label:"Find building addresses",default:!0,children:[(0,a.jsxs)(t.p,{children:["Suppose you are interested in having address data attached to buildings. The ",(0,a.jsx)(t.a,{href:"/schema/reference/addresses/address/",children:"Overture addresses"})," theme might be a good place to check, but let's assume it does not cover the area you are interested in."]}),(0,a.jsx)(t.p,{children:"The places theme has wide coverage and many of the place point features have addresses associated with them. Using an intersect we can find places that fall inside buildings and then join the place's address to the building polygon."}),(0,a.jsxs)(f,{children:[(0,a.jsx)("summary",{children:"Query"}),(0,a.jsx)("div",{children:(0,a.jsx)(o.A,{query:m})})]})]})]}),"\n",(0,a.jsx)(t.h2,{id:"tools-and-libraries",children:"Tools and libraries"}),"\n",(0,a.jsx)(t.h3,{id:"rapid",children:"Rapid"}),"\n",(0,a.jsxs)(t.p,{children:["Rapid, an OpenStreetMap editor, is capable of displaying places data as a reference layer by following the guide ",(0,a.jsx)(t.a,{href:"/examples/rapid-id/",children:"here"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"The license is compatible with OSM and this data can be used for mapping."})]})}function y(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}},19365:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});s(96540);var a=s(18215);const n={tabItem:"tabItem_Ymn6"};var r=s(74848);function i(e){let{children:t,hidden:s,className:i}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,a.A)(n.tabItem,i),hidden:s,children:t})}},11470:(e,t,s)=>{s.r(t),s.d(t,{default:()=>E});var a=s(96540),n=s(18215),r=s(23104),i=s(56347),o=s(205),l=s(57485),d=s(31682),c=s(89466);function u(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:s}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:s,attributes:a,default:n}}=e;return{value:t,label:s,attributes:a,default:n}}))}(s);return function(e){const t=(0,d.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,s])}function p(e){let{value:t,tabValues:s}=e;return s.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:s}=e;const n=(0,i.W6)(),r=function(e){let{queryString:t=!1,groupId:s}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:t,groupId:s});return[(0,l.aZ)(r),(0,a.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace({...n.location,search:t.toString()})}),[r,n])]}function f(e){const{defaultValue:t,queryString:s=!1,groupId:n}=e,r=h(e),[i,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=s.find((e=>e.default))??s[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:r}))),[d,u]=m({queryString:s,groupId:n}),[f,x]=function(e){let{groupId:t}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,r]=(0,c.Dv)(s);return[n,(0,a.useCallback)((e=>{s&&r.set(e)}),[s,r])]}({groupId:n}),b=(()=>{const e=d??f;return p({value:e,tabValues:r})?e:null})();(0,o.A)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),x(e)}),[u,x,r]),tabValues:r}}var x=s(92303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=s(74848);function j(e){let{className:t,block:s,selectedValue:a,selectValue:i,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,r.a_)(),c=e=>{const t=e.currentTarget,s=l.indexOf(t),n=o[s].value;n!==a&&(d(t),i(n))},u=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const s=l.indexOf(e.currentTarget)+1;t=l[s]??l[0];break}case"ArrowLeft":{const s=l.indexOf(e.currentTarget)-1;t=l[s]??l[l.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.A)("tabs",{"tabs--block":s},t),children:o.map((e=>{let{value:t,label:s,attributes:r}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>l.push(e),onKeyDown:u,onClick:c,...r,className:(0,n.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":a===t}),children:s??t},t)}))})}function v(e){let{lazy:t,children:s,selectedValue:n}=e;const r=(Array.isArray(s)?s:[s]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:r.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n})))})}function y(e){const t=f(e);return(0,g.jsxs)("div",{className:(0,n.A)("tabs-container",b.tabList),children:[(0,g.jsx)(j,{...t,...e}),(0,g.jsx)(v,{...t,...e})]})}function E(e){const t=(0,x.A)();return(0,g.jsx)(y,{...e,children:u(e.children)},String(t))}},97577:(e,t,s)=>{s.d(t,{A:()=>i});var a=s(21432),n=s(44586),r=s(74848);function i(e){const{siteConfig:{customFields:t}}=(0,n.A)();var s=e.query.replace("__OVERTURE_RELEASE",t.overtureRelease);s=(s=s.replace("__ATHENA_OVERTURE_RELEASE","v"+t.overtureRelease.replaceAll(".","_").replaceAll("-","_"))).replace("__PMTILES_OVERTURE_RELEASE",t.overtureRelease.split(".",1));var i=e.language||"sql";return(0,r.jsx)(a.default,{language:i,title:e.title,children:s})}},78679:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/places-coverage-e42e20322ffeaf2f9be9cb3f25719635.png"}}]);