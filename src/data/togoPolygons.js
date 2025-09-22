// Polygones GeoJSON simplifiés pour les territoires du Togo
export const togoPolygons = {
  Maritime: {
    type: "Polygon",
    coordinates: [
      [
        [0.5, 5.5],
        [1.8, 5.5],
        [1.8, 6.8],
        [0.5, 6.8],
        [0.5, 5.5],
      ],
    ],
    style: { color: "#3B82F6", weight: 2, fillOpacity: 0.1 },
  },

  Plateaux: {
    type: "Polygon",
    coordinates: [
      [
        [0.3, 6.5],
        [1.5, 6.5],
        [1.5, 7.8],
        [0.3, 7.8],
        [0.3, 6.5],
      ],
    ],
    style: { color: "#10B981", weight: 2, fillOpacity: 0.1 },
  },

  Centrale: {
    type: "Polygon",
    coordinates: [
      [
        [0.2, 7.8],
        [1.8, 7.8],
        [1.8, 9.2],
        [0.2, 9.2],
        [0.2, 7.8],
      ],
    ],
    style: { color: "#F59E0B", weight: 2, fillOpacity: 0.1 },
  },

  Kara: {
    type: "Polygon",
    coordinates: [
      [
        [0.8, 9.0],
        [1.6, 9.0],
        [1.6, 10.2],
        [0.8, 10.2],
        [0.8, 9.0],
      ],
    ],
    style: { color: "#EF4444", weight: 2, fillOpacity: 0.1 },
  },

  Savanes: {
    type: "Polygon",
    coordinates: [
      [
        [-0.2, 10.0],
        [0.6, 10.0],
        [0.6, 11.2],
        [-0.2, 11.2],
        [-0.2, 10.0],
      ],
    ],
    style: { color: "#8B5CF6", weight: 2, fillOpacity: 0.1 },
  },
};

// Polygones pour les préfectures (exemples simplifiés)
export const prefecturePolygons = {
  Maritime: {
    Golfe: {
      type: "Polygon",
      coordinates: [
        [
          [1.0, 6.0],
          [1.4, 6.0],
          [1.4, 6.3],
          [1.0, 6.3],
          [1.0, 6.0],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
    Avé: {
      type: "Polygon",
      coordinates: [
        [
          [1.0, 6.3],
          [1.3, 6.3],
          [1.3, 6.6],
          [1.0, 6.6],
          [1.0, 6.3],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
    Lacs: {
      type: "Polygon",
      coordinates: [
        [
          [1.4, 6.1],
          [1.8, 6.1],
          [1.8, 6.4],
          [1.4, 6.4],
          [1.4, 6.1],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
    Vo: {
      type: "Polygon",
      coordinates: [
        [
          [0.9, 6.2],
          [1.2, 6.2],
          [1.2, 6.5],
          [0.9, 6.5],
          [0.9, 6.2],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
    Yoto: {
      type: "Polygon",
      coordinates: [
        [
          [1.0, 6.4],
          [1.4, 6.4],
          [1.4, 6.7],
          [1.0, 6.7],
          [1.0, 6.4],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
    Zio: {
      type: "Polygon",
      coordinates: [
        [
          [0.7, 6.3],
          [1.1, 6.3],
          [1.1, 6.6],
          [0.7, 6.6],
          [0.7, 6.3],
        ],
      ],
      style: { color: "#3B82F6", weight: 2, fillOpacity: 0.2 },
    },
  },

  Plateaux: {
    Agou: {
      type: "Polygon",
      coordinates: [
        [
          [0.6, 6.7],
          [1.0, 6.7],
          [1.0, 7.0],
          [0.6, 7.0],
          [0.6, 6.7],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Kloto: {
      type: "Polygon",
      coordinates: [
        [
          [0.4, 6.7],
          [0.9, 6.7],
          [0.9, 7.1],
          [0.4, 7.1],
          [0.4, 6.7],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Ogou: {
      type: "Polygon",
      coordinates: [
        [
          [0.9, 7.0],
          [1.3, 7.0],
          [1.3, 7.3],
          [0.9, 7.3],
          [0.9, 7.0],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Amou: {
      type: "Polygon",
      coordinates: [
        [
          [0.8, 7.2],
          [1.2, 7.2],
          [1.2, 7.5],
          [0.8, 7.5],
          [0.8, 7.2],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Danyi: {
      type: "Polygon",
      coordinates: [
        [
          [0.7, 6.9],
          [1.0, 6.9],
          [1.0, 7.3],
          [0.7, 7.3],
          [0.7, 6.9],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Wawa: {
      type: "Polygon",
      coordinates: [
        [
          [0.5, 7.3],
          [1.0, 7.3],
          [1.0, 7.8],
          [0.5, 7.8],
          [0.5, 7.3],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Moyen_Mono: {
      type: "Polygon",
      coordinates: [
        [
          [1.2, 7.1],
          [1.5, 7.1],
          [1.5, 7.4],
          [1.2, 7.4],
          [1.2, 7.1],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
    Haho: {
      type: "Polygon",
      coordinates: [
        [
          [1.0, 6.8],
          [1.4, 6.8],
          [1.4, 7.1],
          [1.0, 7.1],
          [1.0, 6.8],
        ],
      ],
      style: { color: "#10B981", weight: 2, fillOpacity: 0.2 },
    },
  },

  Centrale: {
    Tchaoudjo: {
      type: "Polygon",
      coordinates: [
        [
          [0.8, 8.7],
          [1.5, 8.7],
          [1.5, 9.3],
          [0.8, 9.3],
          [0.8, 8.7],
        ],
      ],
      style: { color: "#F59E0B", weight: 2, fillOpacity: 0.2 },
    },
    Sotouboua: {
      type: "Polygon",
      coordinates: [
        [
          [0.7, 8.3],
          [1.3, 8.3],
          [1.3, 8.8],
          [0.7, 8.8],
          [0.7, 8.3],
        ],
      ],
      style: { color: "#F59E0B", weight: 2, fillOpacity: 0.2 },
    },
    Tchamba: {
      type: "Polygon",
      coordinates: [
        [
          [1.1, 8.8],
          [1.7, 8.8],
          [1.7, 9.3],
          [1.1, 9.3],
          [1.1, 8.8],
        ],
      ],
      style: { color: "#F59E0B", weight: 2, fillOpacity: 0.2 },
    },
  },

  Kara: {
    Kozah: {
      type: "Polygon",
      coordinates: [
        [
          [0.9, 9.3],
          [1.5, 9.3],
          [1.5, 9.8],
          [0.9, 9.8],
          [0.9, 9.3],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
    Bassar: {
      type: "Polygon",
      coordinates: [
        [
          [0.5, 9.0],
          [1.1, 9.0],
          [1.1, 9.5],
          [0.5, 9.5],
          [0.5, 9.0],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
    Bimah: {
      type: "Polygon",
      coordinates: [
        [
          [0.8, 9.6],
          [1.4, 9.6],
          [1.4, 10.1],
          [0.8, 10.1],
          [0.8, 9.6],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
    Kéran: {
      type: "Polygon",
      coordinates: [
        [
          [0.8, 9.4],
          [1.3, 9.4],
          [1.3, 9.9],
          [0.8, 9.9],
          [0.8, 9.4],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
    Doufelgou: {
      type: "Polygon",
      coordinates: [
        [
          [0.8, 9.5],
          [1.3, 9.5],
          [1.3, 10.0],
          [0.8, 10.0],
          [0.8, 9.5],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
    Assoli: {
      type: "Polygon",
      coordinates: [
        [
          [1.1, 9.2],
          [1.6, 9.2],
          [1.6, 9.7],
          [1.1, 9.7],
          [1.1, 9.2],
        ],
      ],
      style: { color: "#EF4444", weight: 2, fillOpacity: 0.2 },
    },
  },

  Savanes: {
    Tone: {
      type: "Polygon",
      coordinates: [
        [
          [-0.1, 10.6],
          [0.5, 10.6],
          [0.5, 11.1],
          [-0.1, 11.1],
          [-0.1, 10.6],
        ],
      ],
      style: { color: "#8B5CF6", weight: 2, fillOpacity: 0.2 },
    },
    Cinkassé: {
      type: "Polygon",
      coordinates: [
        [
          [-0.2, 10.5],
          [0.3, 10.5],
          [0.3, 11.0],
          [-0.2, 11.0],
          [-0.2, 10.5],
        ],
      ],
      style: { color: "#8B5CF6", weight: 2, fillOpacity: 0.2 },
    },
    Tandjouaré: {
      type: "Polygon",
      coordinates: [
        [
          [0.2, 10.5],
          [0.7, 10.5],
          [0.7, 11.1],
          [0.2, 11.1],
          [0.2, 10.5],
        ],
      ],
      style: { color: "#8B5CF6", weight: 2, fillOpacity: 0.2 },
    },
    Oti: {
      type: "Polygon",
      coordinates: [
        [
          [0.1, 10.2],
          [0.6, 10.2],
          [0.6, 10.7],
          [0.1, 10.7],
          [0.1, 10.2],
        ],
      ],
      style: { color: "#8B5CF6", weight: 2, fillOpacity: 0.2 },
    },
  },
};

// Fonction utilitaire pour obtenir le polygone d'un territoire
export const getTerritoryPolygon = (region, prefecture = null) => {
  if (
    prefecture &&
    prefecturePolygons[region] &&
    prefecturePolygons[region][prefecture]
  ) {
    return prefecturePolygons[region][prefecture];
  }

  if (region && togoPolygons[region]) {
    return togoPolygons[region];
  }

  return null;
};
