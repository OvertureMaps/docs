"use strict";(self.webpackChunkoverture_documentation=self.webpackChunkoverture_documentation||[]).push([[1001],{70736:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var n=a(74848),i=a(28453);const s={title:"Global Entity Reference System (GERS)",slug:"/gers"},r=void 0,o={id:"gers/index",title:"Global Entity Reference System (GERS)",description:"Understanding GERS",source:"@site/docs/gers/index.mdx",sourceDirName:"gers",slug:"/gers",permalink:"/gers",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1717437552e3,frontMatter:{title:"Global Entity Reference System (GERS)",slug:"/gers"},sidebar:"docs",previous:{title:"Transportation",permalink:"/guides/transportation"},next:{title:"Attribution",permalink:"/attribution"}},d={},l=[{value:"Understanding GERS",id:"understanding-gers",level:2},{value:"What does an Overture Maps id look like?",id:"what-does-an-overture-maps-id-look-like",level:2},{value:"Stability and traceability",id:"stability-and-traceability",level:2},{value:"Using GERS",id:"using-gers",level:2}];function u(e){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"understanding-gers",children:"Understanding GERS"}),"\n",(0,n.jsx)(t.p,{children:"The Global Entity Reference System (GERS) is a framework for structuring, encoding, and matching map data to a shared universal reference. All features in Overture Maps have a unique id, and for some feature types that unique id is registered to GERS."}),"\n",(0,n.jsx)(t.p,{children:"GERS provides a mechanism to match features across datasets. For example, multiple building features from separate datasets that each represent the footprint of the Empire State Building in New York City can be matched if the features reference the same id in GERS."}),"\n",(0,n.jsx)(t.h2,{id:"what-does-an-overture-maps-id-look-like",children:"What does an Overture Maps id look like?"}),"\n",(0,n.jsx)(t.p,{children:"A unique id in Overture Maps is 128 bits. In this example, you can see five unique ids for five features in the buildings dataset from the May 2024 data release. The ids for the building feature type are registered to GERS."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"D SET s3_region='us-west-2';\nD SELECT id FROM read_parquet('s3://overturemaps-us-west-2/release/2024-05-16-beta.0/theme=buildings/type=buiding/*', filename=true, hive_partitioning=1) limit 5;\n\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502                id                \u2502\n\u2502             varchar              \u2502\n\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 08bf2a40219b0fff0200c394dae731bd \u2502\n\u2502 08bf35ad6a05afff0200e90ab3b011fa \u2502\n\u2502 08bf35ad6a058fff020009945ce09d65 \u2502\n\u2502 08bf35ad6a04efff02006264a736fc56 \u2502\n\u2502 08bf35ad6a04afff0200cf5e511a3f1b \u2502\n\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502             5 rows               \u2502\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n"})}),"\n",(0,n.jsx)(t.h2,{id:"stability-and-traceability",children:"Stability and traceability"}),"\n",(0,n.jsx)(t.p,{children:"Unique ids registered to GERS are intended to be stable \u2014 within a reasonable tolerance of error \u2014 across multiple releases of Overture Maps data. When stability is not possible, we will attempt to provide traceability in a GERS changelog. For example:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"a single road segment is bisected by a new road and becomes two road segments: 1 unique ID \u2192 2 new unique IDs;"}),"\n",(0,n.jsx)(t.li,{children:"a large building footprint is determined to be four smaller buildings when a higher resolution dataset becomes available: 1 unique ID \u2192 4 new unique ID;"}),"\n",(0,n.jsx)(t.li,{children:"a building is shifted 10 meters to the west when higher resolution imagery is made available: the unique ID is preserved for that feature."}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"using-gers",children:"Using GERS"}),"\n",(0,n.jsx)(t.p,{children:"Overture Maps intends for GERS to be used in two ways:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Associating data."})," Users can independently conflate their own data with a current Overture Maps dataset, identifying matches among features across datasets. A user can assign an Overture Maps id to features that match. The associated data will not become part of Overture Maps, but it will become GERS-enabled data, ready to be matched to any of the available datasets in the Overture Maps data ecosystem."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Contributing data."})," If an organization contributes data to the Overture Maps Foundation, our engineering team will match the features in that dataset to existing features in Overture Maps. Matched features may be assigned an Overture Maps id, and new features may be assigned a new id registered to GERS."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Feedback on GERS is welcome on ",(0,n.jsx)(t.a,{href:"https://github.com/OvertureMaps/data/discussions",children:"GitHub"}),"."]})]})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>o});var n=a(96540);const i={},s=n.createContext(i);function r(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);