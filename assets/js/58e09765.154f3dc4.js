"use strict";(self.webpackChunkoverture_documentation=self.webpackChunkoverture_documentation||[]).push([[4424],{79854:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var t=i(74848),n=i(28453);const r={description:"tiles all day long",title:"Overture + PMTiles"},l=void 0,a={id:"examples/overture-tiles",title:"Overture + PMTiles",description:"tiles all day long",source:"@site/docs/examples/overture-tiles.mdx",sourceDirName:"examples",slug:"/examples/overture-tiles",permalink:"/examples/overture-tiles",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1726886765e3,frontMatter:{description:"tiles all day long",title:"Overture + PMTiles"},sidebar:"docs",previous:{title:"Overture + Rapid",permalink:"/examples/rapid-id"},next:{title:"Overture + Maplibre",permalink:"/examples/build-a-map"}},o={},d=[{value:"overture-tiles on GitHub",id:"overture-tiles-on-github",level:2},{value:"Accessing Tiles",id:"accessing-tiles",level:2},{value:"Viewing Tiles",id:"viewing-tiles",level:3},{value:"Area Extracts",id:"area-extracts",level:3},{value:"On AWS",id:"on-aws",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Setup",id:"setup",level:3},{value:"On Your Workstation",id:"on-your-workstation",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Scripts",id:"scripts",level:3},{value:"Customization",id:"customization",level:2},{value:"Example: Places",id:"example-places",level:3},{value:"Example: Buildings",id:"example-buildings",level:3}];function c(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:["Overture is primarily distributed in the ",(0,t.jsx)(s.a,{href:"/getting-data/#geoparquet",children:"GeoParquet format"}),". While GeoParquet is a compact format, ",(0,t.jsx)(s.strong,{children:"tiles"})," are essential for creating pannable, zoomable slippy maps for display on the web."]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Data is broken into ",(0,t.jsx)(s.strong,{children:"equal-sized square chunks"})," (tiles), to load only the visible data."]}),"\n",(0,t.jsxs)(s.li,{children:["Tiles are arranged in a pyramid by level of detail, enabling ",(0,t.jsx)(s.strong,{children:"zoomed-out overviews."})]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"overture-tiles-on-github",children:"overture-tiles on GitHub"}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.a,{href:"http://github.com/overtureMaps/overture-tiles",children:"overture-tiles GitHub repository"}),' contains scripts and programs to generate tilesets from Overture data. These tilesets are designed for an "X-ray" visualization like at ',(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.a,{href:"https://explore.overturemaps.org",children:"explore.overturemaps.org"})})," to aid in inspecting geometry and properties. ",(0,t.jsx)(s.strong,{children:"They are not designed to be a production-ready cartographic basemap."})]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"explore.overturemaps.org",src:i(24671).A+"",width:"6064",height:"1294"})}),"\n",(0,t.jsxs)(s.p,{children:["Each Overture theme is stored as a separate ",(0,t.jsx)(s.a,{href:"https://github.com/protomaps/PMTiles",children:"PMTiles"})," archive."]}),"\n",(0,t.jsxs)(s.p,{children:["The individual tiles contain geometry and tags in the open ",(0,t.jsx)(s.a,{href:"https://github.com/mapbox/vector-tile-spec",children:"MVT"})," vector tile format."]}),"\n",(0,t.jsx)(s.h2,{id:"accessing-tiles",children:"Accessing Tiles"}),"\n",(0,t.jsx)(s.p,{children:"Overture Tiles are generated with each release. The current beta distribution of tiles are at this url:"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"s3://overturemaps-tiles-us-west-2-beta/RELEASE/THEME.pmtiles"})}),"\n",(0,t.jsxs)(s.p,{children:["Where ",(0,t.jsx)(s.code,{children:"RELEASE"})," has the data minor version trimmed, e.g. ",(0,t.jsx)(s.code,{children:"2024-08-20"}),", instead of ",(0,t.jsx)(s.code,{children:"2024-08-20.0"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"These public S3 URLs can also be accessed via HTTP:"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/RELEASE/THEME.pmtiles"})}),"\n",(0,t.jsx)(s.h3,{id:"viewing-tiles",children:"Viewing Tiles"}),"\n",(0,t.jsxs)(s.p,{children:["Local and remote HTTP URLs can be previewed at ",(0,t.jsx)(s.a,{href:"https://pmtiles.io",children:"pmtiles.io"}),"."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"https://pmtiles.io/?url=https%3A%2F%2Foverturemaps-tiles-us-west-2-beta.s3.amazonaws.com%2F2024-08-20%2Fplaces.pmtiles",children:"View 2024-08-20/places.pmtiles on pmtiles.io"})}),"\n",(0,t.jsx)(s.h3,{id:"area-extracts",children:"Area Extracts"}),"\n",(0,t.jsxs)(s.p,{children:["To create a new tileset for only part of the world, use the ",(0,t.jsx)(s.code,{children:"extract"})," command of the ",(0,t.jsxs)(s.a,{href:"https://github.com/protomaps/go-pmtiles",children:[(0,t.jsx)(s.code,{children:"pmtiles"})," CLI"]}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["To get all ",(0,t.jsx)(s.code,{children:"buildings"})," tiles around Ghent, Belgium:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"pmtiles extract https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/buildings.pmtiles ghent.pmtiles --bbox=3.660507,51.004250,3.784790,51.065996\n"})}),"\n",(0,t.jsx)(s.h2,{id:"on-aws",children:"On AWS"}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:"overture-tiles"})," scripts can be automated with ",(0,t.jsx)(s.a,{href:"https://docs.aws.amazon.com/batch/",children:"AWS Batch"}),", which generates the largest global tilesets in ~90 minutes using ",(0,t.jsx)(s.code,{children:"c7gd.16xlarge"})," Ec2 instances on demand. Costs incurred include on-demand instances and S3 storage + transaction costs."]}),"\n",(0,t.jsx)(s.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://docs.aws.amazon.com/cli/",children:"AWS CLI"})}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"https://aws.amazon.com/cdk/",children:"AWS Cloud Development Kit (CDK)"})," ",(0,t.jsx)(s.code,{children:"npm install -g aws-cdk"})]}),"\n",(0,t.jsx)(s.li,{children:"Docker Desktop"}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"setup",children:"Setup"}),"\n",(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Modify ",(0,t.jsx)(s.code,{children:"bin/overture-tiles-cdk.ts"}),", specifying a different S3 bucket name."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["From the ",(0,t.jsx)(s.code,{children:"overture-tiles-cdk"})," repository:"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"npm run cdk bootstrap\nnpm run cdk deploy\n"})}),"\n",(0,t.jsxs)(s.ol,{start:"3",children:["\n",(0,t.jsxs)(s.li,{children:["Authenticate your Docker client with the provisioned AWS Elastic Container Registry (ECR) in the web console. Use ",(0,t.jsx)(s.strong,{children:"View Push Commands"})," to build the ",(0,t.jsx)(s.code,{children:"Dockerfile"})," in the ",(0,t.jsx)(s.code,{children:"overture-tiles"})," repository and push to ECR:"]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"explore.overturemaps.org",src:i(82687).A+"",width:"2314",height:"772"})}),"\n",(0,t.jsxs)(s.ol,{start:"4",children:["\n",(0,t.jsxs)(s.li,{children:["Submit jobs from the ",(0,t.jsx)(s.a,{href:"https://console.aws.amazon.com/batch/home#jobs",children:"AWS Batch"})," console."]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"explore.overturemaps.org",src:i(83994).A+"",width:"2824",height:"1376"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Select from the available ",(0,t.jsx)(s.strong,{children:"Job Definitions"}),". Each Definition is associated with a version and theme from an Overture release."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Select the ",(0,t.jsx)(s.strong,{children:"OvertureTilesQueue"})," as the Job queue."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Input the ",(0,t.jsx)(s.strong,{children:"Command"})," as a JSON list: ",(0,t.jsx)(s.code,{children:'["2024-08-20.0","my-bucket","addresses"]'})]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["The first item is the release version, including minor version: ",(0,t.jsx)(s.code,{children:"2024-08-20.0"})]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["The second item is the target bucket: ",(0,t.jsx)(s.code,{children:"my-bucket"})]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["The third item is the theme: ",(0,t.jsx)(s.code,{children:"addresses"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Once the job is complete, the tileset will be available at ",(0,t.jsx)(s.code,{children:"s3://BUCKET_NAME/RELEASE/THEME.pmtiles"}),", e.g. ",(0,t.jsx)(s.code,{children:"s3://mybucket/2024-08-20/addresses.pmtiles"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"on-your-workstation",children:"On Your Workstation"}),"\n",(0,t.jsx)(s.h3,{id:"requirements",children:"Requirements"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["a Java Runtime Environment, version 22+, to build the ",(0,t.jsx)(s.code,{children:"addresses"}),", ",(0,t.jsx)(s.code,{children:"base"}),", ",(0,t.jsx)(s.code,{children:"buildings"})," and ",(0,t.jsx)(s.code,{children:"transportation"})," themes, along with ",(0,t.jsx)(s.code,{children:"planetiler.jar"})," from ",(0,t.jsx)(s.a,{href:"https://github.com/onthegomap/planetiler/releases",children:"onthegomap/planetiler Releases"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["the ",(0,t.jsx)(s.a,{href:"https://github.com/felt/tippecanoe?tab=readme-ov-file#installation",children:"felt/tippecanoe"})," tool and the ",(0,t.jsx)(s.a,{href:"https://duckdb.org/docs/installation/",children:"DuckDB CLI"})," for other themes."]}),"\n",(0,t.jsxs)(s.li,{children:["the ",(0,t.jsx)(s.a,{href:"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html",children:"aws CLI"})," for downloading Overture data."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"scripts",children:"Scripts"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["Copy the Overture Parquet dataset to your local machine\n",(0,t.jsx)(s.a,{href:"https://github.com/OvertureMaps/data/blob/main/README.md#how-to-access-overture-maps-data",children:"using these docs"}),". If you want to only run on a small sample of data, you can use only the first ",(0,t.jsx)(s.code,{children:".parquet"})," file instead of all in the directory."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["for the ",(0,t.jsx)(s.code,{children:"base"}),", ",(0,t.jsx)(s.code,{children:"buildings"})," and ",(0,t.jsx)(s.code,{children:"transportation"})," themes, generate the tileset with java:"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"# --data indicates where your Overture data is (overture/theme=base/...)\njava -cp planetiler.jar profiles/Base.java --data=overture\n"})}),"\n",(0,t.jsxs)(s.p,{children:["The above command outputs ",(0,t.jsx)(s.code,{children:"base.pmtiles"})," in the ",(0,t.jsx)(s.code,{children:"data"})," dir."]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["for other themes, run the theme script in ",(0,t.jsx)(s.code,{children:"themes/"}),":"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"scripts/2024-08-20/places.sh overture places.pmtiles\n"})}),"\n",(0,t.jsxs)(s.p,{children:["This reads from Overture data in ",(0,t.jsx)(s.code,{children:"overture"})," and writes ",(0,t.jsx)(s.code,{children:"places.pmtiles"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"customization",children:"Customization"}),"\n",(0,t.jsx)(s.p,{children:"The tilesets accompanying Overture releases are primarily for powering explore.overturemaps.org. For your own application, you may want to:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Limit or modify the properties of each feature, to reduce the tile sizes."}),"\n",(0,t.jsx)(s.li,{children:"Change what features or properties are included at generalized lower zoom levels."}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["In these examples we'll work with a small area extract of Boston in the ",(0,t.jsx)(s.code,{children:"boston/"})," folder, but all tiling methods can scale to the full dataset."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"mkdir -p boston/theme=buildings/type=building\nmkdir -p boston/theme=places/type=place\noverturemaps download --bbox=-71.068,42.353,-71.058,42.363 -f geoparquet --type=building -o boston/theme=buildings/type=building/0.geoparquet\noverturemaps download --bbox=-71.068,42.353,-71.058,42.363 -f geoparquet --type=place -o boston/theme=places/type=place/0.geoparquet\n"})}),"\n",(0,t.jsx)(s.h3,{id:"example-places",children:"Example: Places"}),"\n",(0,t.jsxs)(s.p,{children:["The default ",(0,t.jsx)(s.code,{children:"places.sh"})," script includes all Overture properties to aid inspection. To slim down the tile sizes, you can remove all the primary name in the ",(0,t.jsx)(s.code,{children:"@name"})," field."]}),"\n",(0,t.jsxs)(s.p,{children:["Modify ",(0,t.jsx)(s.a,{href:"https://github.com/OvertureMaps/overture-tiles/blob/main/scripts/2024-07-22/places.sh",children:"places.sh"})," for the release matching your Overture data:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"  ...\n  json_object(\n      'id', id,\n      '@name', json_extract_string(names, '$.primary')\n  ) AS properties,\n  ...\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"./scripts/2024-07-22/places.sh boston boston_places.pmtiles\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Inspect the created ",(0,t.jsx)(s.code,{children:"boston_places.pmtiles"})," on ",(0,t.jsx)(s.a,{href:"https://pmtiles.io",children:"pmtiles.io"})," to see the slimmed-down properties:"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"customized places tileset",src:i(7354).A+"",width:"3496",height:"963"})}),"\n",(0,t.jsx)(s.h3,{id:"example-buildings",children:"Example: Buildings"}),"\n",(0,t.jsx)(s.p,{children:"To reduce the size of tiles, the default Buildings script includes all properties only at zoom 13. Your own application may need this data at a lower zoom level."}),"\n",(0,t.jsxs)(s.p,{children:["Modify ",(0,t.jsx)(s.a,{href:"https://github.com/OvertureMaps/overture-tiles/blob/main/profiles/Buildings.java",children:(0,t.jsx)(s.code,{children:"profile/Buildings.java"})})," to populate all Overture properties on zoom 12 instead of zoom 13:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-java",children:"...\nOvertureProfile.addFullTags(source, polygon, 12);\n...\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"java -cp planetiler.jar profiles/Buildings.java --data=boston\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Inspect the created ",(0,t.jsx)(s.code,{children:"data/buildings.pmtiles"})," on ",(0,t.jsx)(s.a,{href:"https://pmtiles.io",children:"pmtiles.io"})," to see the additional properties on zoom level 12:"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"customized buildings tileset",src:i(28647).A+"",width:"3736",height:"1074"})})]})}function h(e={}){const{wrapper:s}={...(0,n.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28647:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/overture-tiles-customize-buildings-31907b27956ba3d4bf2bb374e3e1e5d7.png"},7354:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/overture-tiles-customize-places-445a5010a98d2948942cb968a930d6d7.png"},24671:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/overture-tiles-header-32c9e827fe7ee370d26686f3a931ff30.png"},83994:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/overture-tiles-job-definitions-c19bdc75bb2f4723595fb643f5962eb3.png"},82687:(e,s,i)=>{i.d(s,{A:()=>t});const t=i.p+"assets/images/overture-tiles-view-push-commands-db27c1229fd0741b33f3c545aab7e6d2.png"}}]);