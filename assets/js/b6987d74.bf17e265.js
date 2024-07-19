"use strict";(self.webpackChunkoverture_documentation=self.webpackChunkoverture_documentation||[]).push([[5888],{89809:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>d,default:()=>g,frontMatter:()=>o,metadata:()=>u,toc:()=>h});var a=t(74848),r=t(28453),i=t(97577);const s="SELECT\n    id,\n    theme,\n    class,\n    sources[1].dataset AS primary_source,\n    names.primary AS primary_name,\n    ST_GeomFromBinary(geometry) AS geometry\nFROM overture.release.__ATHENA_OVERTURE_RELEASE\nWHERE theme='buildings'\n    AND type='building'\n    AND  bbox.xmin > 78.383144\n    AND bbox.xmax < 78.565011\n    AND bbox.ymin > 17.30199\n    AND bbox.ymax < 17.423426\n",l="LOAD spatial;\nLOAD httpfs;\n\nCOPY (\n    SELECT\n        id,\n        level,\n        height,\n        JSON(names) AS names,\n        sources[1].dataset AS primary_source,\n        JSON(sources) AS sources,\n        ST_GeomFromWkb(geometry) AS geometry\n    FROM read_parquet('s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/theme=buildings/type=*/*', filename=true, hive_partitioning=1)\n    WHERE\n        bbox.xmin > 78.4194\n        AND bbox.xmax < 78.5129\n        AND bbox.ymin > 17.3427\n        AND bbox.ymax < 17.4192\n) TO 'buildings_hyderabad.geojson'\nWITH (FORMAT GDAL, DRIVER 'GeoJSON', SRS 'EPSG:4326');\n",o={title:"Overture Maps + kepler.gl"},d=void 0,u={id:"examples/kepler-gl",title:"Overture Maps + kepler.gl",description:"In this example, we'll query the Overture Maps buildings theme and download data for a specified bounding box. Then we'll load the data into kepler.gl, an open-source tool for working with large map datasets, and visualize the buildings data by data source: OpenStreetMap, Microsoft ML Building Footprints, and Google Open Buildings.",source:"@site/docs/examples/kepler-gl.mdx",sourceDirName:"examples",slug:"/examples/kepler-gl",permalink:"/examples/kepler-gl",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1721232162e3,frontMatter:{title:"Overture Maps + kepler.gl"},sidebar:"docs",previous:{title:"Examples",permalink:"/examples/"},next:{title:"Visualizing Places in Rapid",permalink:"/examples/rapid-id"}},p={},h=[{value:"Query the data in AWS Athena",id:"query-the-data-in-aws-athena",level:2},{value:"Query the data using DuckDB",id:"query-the-data-using-duckdb",level:2},{value:"Explore the data in kepler.gl",id:"explore-the-data-in-keplergl",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",img:"img",p:"p",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["In this example, we'll query the Overture Maps buildings theme and download data for a specified bounding box. Then we'll load the data into ",(0,a.jsx)(n.a,{href:"https://kepler.gl/demo",children:"kepler.gl"}),", an open-source tool for working with large map datasets, and visualize the buildings data by data source: ",(0,a.jsx)(n.a,{href:"https://wiki.openstreetmap.org/wiki/Key:building",children:"OpenStreetMap"}),", ",(0,a.jsx)(n.a,{href:"https://github.com/microsoft/GlobalMLBuildingFootprints",children:"Microsoft ML Building Footprints"}),", and ",(0,a.jsx)(n.a,{href:"https://sites.research.google/open-buildings/",children:"Google Open Buildings"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"Requirements: you'll need an AWS account and access to an S3 bucket if you want to use Athena. If you're using DuckDB (we recommend 0.10.0), you'll need to install and load the spatial and S3 or Azure extensions. You do not need an account on kepler.gl."}),"\n",(0,a.jsx)(n.h2,{id:"query-the-data-in-aws-athena",children:"Query the data in AWS Athena"}),"\n",(0,a.jsxs)(n.p,{children:["Follow the ",(0,a.jsx)(n.a,{href:"/getting-data/athena-aws",children:"instructions for running the set-up queries"})," in Amazon Athena. Then you can run this in the Athena query console:"]}),"\n",(0,a.jsx)(i.A,{query:s}),"\n",(0,a.jsx)(n.p,{children:"This outputs around 106,000 buildings in a table view that you can download as a CSV file."}),"\n",(0,a.jsx)(n.h2,{id:"query-the-data-using-duckdb",children:"Query the data using DuckDB"}),"\n",(0,a.jsx)(n.p,{children:"Here's a similar query in DuckDB's flavor of SQL that outputs a GeoJSON file."}),"\n",(0,a.jsx)(i.A,{query:l}),"\n",(0,a.jsx)(n.h2,{id:"explore-the-data-in-keplergl",children:"Explore the data in kepler.gl"}),"\n",(0,a.jsxs)(n.p,{children:["Drag and drop the CSV or GeoJSON file into ",(0,a.jsx)(n.a,{href:"https://kepler.gl/demo",children:"kepler.gl"}),". Style the feature layer by choosing different colors based on the ",(0,a.jsx)(n.code,{children:"primary_source"})," field. Then you can explore the data sources that Overture Maps conflated to create the buildings theme."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"kepler.gl example",src:t(3848).A+"",width:"1279",height:"772"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"kepler.gl gif",src:t(88693).A+"",width:"1270",height:"772"})})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},97577:(e,n,t)=>{t.d(n,{A:()=>s});var a=t(21432),r=t(44586),i=t(74848);function s(e){const{siteConfig:{customFields:n}}=(0,r.A)();var t=e.query.replace("__OVERTURE_RELEASE",n.overtureRelease);t=t.replace("__ATHENA_OVERTURE_RELEASE","v"+n.overtureRelease.replaceAll(".","_").replaceAll("-","_"));var s=e.language||"sql";return(0,i.jsx)(a.default,{language:s,title:e.title,children:t})}},3848:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/kepler-overture-hyderabad-075eda9a6f53b5239a586e34f2009db5.png"},88693:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/kepler_overture_buildings_hyderabad-48f61bd38da94df6776371f57ab63d03.gif"}}]);