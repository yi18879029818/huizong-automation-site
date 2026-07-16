// Snapshot derived from 2026-07-10-coolyne-seo-geo-page-mapping(1)(1).xlsx.
// Keep the spreadsheet as the planning source and this file as the deployable runtime snapshot.
export const SEO_KEYWORD_SOURCE = [
  {
    route: "/",
    primary: "warehouse automation",
    primarySearchVolume: 6600,
    secondary: [
      "warehouse robot",
      "warehouse robotics",
      "warehouse automation robots",
      "warehouse automation solutions",
      "autonomous warehouse robots"
    ],
    geo: [
      "warehouse automation technologies",
      "types of warehouse robots",
      "types of warehouse automation",
      "robotic warehouse automation system"
    ]
  },
  {
    route: "/about",
    primary: "warehouse automation companies",
    primarySearchVolume: 480,
    secondary: [
      "warehouse robotics companies",
      "intralogistics automation",
      "top warehouse automation companies",
      "intralogistics automation solutions",
      "top warehouse robotics companies"
    ],
    geo: ["top warehouse automation companies"]
  },
  {
    route: "/contact",
    primary: "",
    primarySearchVolume: null,
    secondary: [],
    geo: []
  },
  {
    route: "/products",
    primary: "automated guided vehicle system",
    primarySearchVolume: 4400,
    secondary: [
      "agv system",
      "automated guided vehicle system agvs",
      "agv system logistics",
      "robotic warehouse automation system",
      "warehouse automation system integrators"
    ],
    geo: [
      "types of automated guided vehicle system",
      "agv system",
      "automated guided vehicle system agvs",
      "agv system logistics"
    ]
  },
  {
    route: "/products/agv-forklift",
    primary: "agv forklift",
    primarySearchVolume: 1300,
    secondary: ["automated guided vehicle forklift"],
    geo: ["automated guided vehicle forklift"]
  },
  {
    route: "/products/ground-handling-forklift-agv",
    primary: "agv pallet mover",
    primarySearchVolume: 210,
    secondary: [
      "agv warehouse",
      "agv warehouse automation",
      "agv material handling equipment",
      "agv warehouse systems",
      "automated pallet jacks"
    ],
    geo: ["agv warehouse systems"]
  },
  {
    route: "/products/lifting-agv",
    primary: "lifting agv",
    primarySearchVolume: 170,
    secondary: ["automated pallet jacks", "autonomous pallet jack", "agv pallet jack"],
    geo: []
  },
  {
    route: "/products/storage-agv",
    primary: "automated pallet storage and retrieval system",
    primarySearchVolume: 110,
    secondary: [
      "automated racking systems",
      "automated pallet racking system",
      "automated warehouse racking system",
      "automated racking system for warehouse",
      "automated storage racking system"
    ],
    geo: [
      "automated racking systems",
      "automated pallet racking system",
      "automated warehouse racking system",
      "automated racking system for warehouse"
    ]
  },
  {
    route: "/products/agv-roller",
    primary: "material handling conveyor system",
    primarySearchVolume: 1300,
    secondary: [
      "warehouse conveyor automation",
      "automation conveyor systems",
      "conveyor system for material handling",
      "automated pallet conveyor systems",
      "automated warehouse conveyor systems"
    ],
    geo: [
      "automation conveyor systems",
      "conveyor system for material handling",
      "automated pallet conveyor systems",
      "automated warehouse conveyor systems"
    ]
  },
  {
    route: "/products/composite-mobile-robot",
    primary: "mobile industrial robot",
    primarySearchVolume: 210,
    secondary: [
      "mobile robot",
      "autonomous mobile robots",
      "tiny mobile robot",
      "autonomous mobile robots amr",
      "introduction to autonomous mobile robots"
    ],
    geo: ["mobile robot types", "mobile robot guide"]
  },
  {
    route: "/solutions",
    primary: "warehouse automation solutions",
    primarySearchVolume: 1300,
    secondary: [
      "warehouse automation",
      "warehouse automation robots",
      "warehouse automation technologies",
      "robotic warehouse automation",
      "robotics warehouse automation"
    ],
    geo: [
      "types of warehouse automation",
      "robotic warehouse automation system",
      "warehouse automation system integrators"
    ]
  },
  {
    route: "/solutions/asrs",
    primary: "automated storage and retrieval system",
    primarySearchVolume: 8100,
    secondary: [
      "asrs warehouse",
      "asrs in warehouse",
      "automated storage warehouse",
      "asrs warehouse automation",
      "b2c asrs warehouse"
    ],
    geo: [
      "mini load automated storage and retrieval system",
      "types of automated storage and retrieval systems",
      "asrs automated storage and retrieval system",
      "asrs automated storage retrieval system"
    ]
  },
  {
    route: "/solutions/material-handling",
    primary: "material handling automation",
    primarySearchVolume: 1300,
    secondary: [
      "material handling and automation",
      "material handling robot",
      "automated material handling solutions",
      "material handling automation solutions",
      "handling automation"
    ],
    geo: [
      "automated guided vehicle for material handling",
      "types of automated material handling system",
      "types of material handling robots",
      "material handling conveyor system"
    ]
  },
  {
    route: "/solutions/picking",
    primary: "goods to person system",
    primarySearchVolume: 140,
    secondary: [
      "goods to person automation",
      "goods to person robots",
      "automated warehouse order picking",
      "goods to person warehouse automation",
      "warehouse automated picking"
    ],
    geo: [
      "goods to person",
      "types of automated picking systems",
      "automated picking systems",
      "order picking system"
    ]
  },
  {
    route: "/solutions/goods-to-person-picking-system",
    sourceStatus: "not_in_spreadsheet",
    primary: "",
    primarySearchVolume: null,
    secondary: [],
    geo: []
  },
  {
    route: "/solutions/machine-tending-automation",
    sourceStatus: "not_in_spreadsheet",
    primary: "",
    primarySearchVolume: null,
    secondary: [],
    geo: []
  },
  {
    route: "/solutions/software",
    primary: "warehouse control systems",
    primarySearchVolume: 1600,
    secondary: [
      "wms automation",
      "wms robot",
      "wcs automation",
      "manufacturing automation wms",
      "wcs warehouse control system"
    ],
    geo: [
      "wcs warehouse control system",
      "warehouse execution system",
      "automated warehouse control system",
      "automated warehouse management system wms"
    ]
  },
  {
    route: "/industries/food-beverage-fmcg-automation",
    sourceStatus: "not_in_spreadsheet",
    primary: "",
    primarySearchVolume: null,
    secondary: [],
    geo: []
  }
];

export const SEO_KEYWORD_SOURCE_BY_ROUTE = Object.fromEntries(
  SEO_KEYWORD_SOURCE.map((entry) => [entry.route, entry])
);
