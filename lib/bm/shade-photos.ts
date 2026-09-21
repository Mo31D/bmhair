// Explicit printed shade codes verified against authentic BM HAIR source galleries.
// Provenance and unresolved codes: docs/shade-photo-provenance.json.
// A shade reference does not establish current stock, length or construction.
export type ShadePhoto={src:string;texture?:string};
export const shadePhotos:Record<string,Record<string,ShadePhoto[]>>={
  "capsules": {
    "10.0": [
      {
        "src": "/images/cat-1810-03.webp",
        "texture": "straight"
      },
      {
        "src": "/images/cat-1810-04.webp",
        "texture": "wavy"
      },
      {
        "src": "/images/cat-1810-05.webp",
        "texture": "wavy-curly"
      }
    ],
    "9.0": [
      {
        "src": "/images/cat-1810-07.webp",
        "texture": "straight"
      },
      {
        "src": "/images/cat-1810-06.webp",
        "texture": "wavy"
      }
    ],
    "7.1/10.1": [
      {
        "src": "/images/cat-1810-09.webp",
        "texture": "straight"
      }
    ],
    "6.0/10.0": [
      {
        "src": "/images/cat-1810-10.webp",
        "texture": "straight"
      }
    ],
    "8.74": [
      {
        "src": "/images/cat-1810-11.webp"
      }
    ],
    "8.71": [
      {
        "src": "/images/cat-1810-12.webp"
      }
    ],
    "7.71": [
      {
        "src": "/images/cat-1810-14.webp",
        "texture": "wavy-curly"
      }
    ],
    "7.1": [
      {
        "src": "/images/cat-1810-15.webp",
        "texture": "straight"
      }
    ],
    "6.74": [
      {
        "src": "/images/cat-1810-16.webp"
      }
    ],
    "6.71": [
      {
        "src": "/images/cat-1810-18.webp"
      }
    ],
    "6.0": [
      {
        "src": "/images/cat-1810-19.webp",
        "texture": "straight"
      }
    ],
    "5.7": [
      {
        "src": "/images/cat-1810-20.webp"
      }
    ],
    "1.0": [
      {
        "src": "/images/cat-1810-21.webp",
        "texture": "straight"
      },
      {
        "src": "/images/cat-1810-22.webp",
        "texture": "wavy-curly"
      }
    ]
  },
  "slavic-cut": {
    "9.0": [
      {
        "src": "/images/cat-1810-07.webp",
        "texture": "straight"
      },
      {
        "src": "/images/cat-1810-06.webp",
        "texture": "wavy"
      }
    ],
    "7.1/10.1": [
      {
        "src": "/images/cat-1810-09.webp",
        "texture": "straight"
      }
    ],
    "6.0/10.0": [
      {
        "src": "/images/cat-1810-10.webp",
        "texture": "straight"
      }
    ],
    "8.74": [
      {
        "src": "/images/cat-1810-11.webp"
      }
    ],
    "8.71": [
      {
        "src": "/images/cat-1810-12.webp"
      }
    ],
    "7.71": [
      {
        "src": "/images/cat-1810-14.webp",
        "texture": "wavy-curly"
      }
    ],
    "7.1": [
      {
        "src": "/images/cat-1810-15.webp",
        "texture": "straight"
      }
    ],
    "6.74": [
      {
        "src": "/images/cat-1810-16.webp"
      }
    ],
    "6.71": [
      {
        "src": "/images/cat-1810-18.webp"
      }
    ],
    "6.0": [
      {
        "src": "/images/cat-1810-19.webp",
        "texture": "straight"
      }
    ],
    "5.7": [
      {
        "src": "/images/cat-1810-20.webp"
      }
    ],
    "1.0": [
      {
        "src": "/images/cat-1810-21.webp",
        "texture": "straight"
      },
      {
        "src": "/images/cat-1810-22.webp",
        "texture": "wavy-curly"
      }
    ]
  },
  "european-cut": {
    "12": [
      {
        "src": "/images/cat-1846-05.webp"
      }
    ],
    "10": [
      {
        "src": "/images/cat-1846-06.webp"
      }
    ],
    "6": [
      {
        "src": "/images/cat-1846-08.webp"
      }
    ]
  },
  "ponytail": {
    "613": [
      {
        "src": "/images/cat-1820-02.webp"
      }
    ]
  },
  "clip-ins": {
    "6.74": [
      {
        "src": "/images/cat-1821-03.webp"
      }
    ],
    "6.7/9.7": [
      {
        "src": "/images/cat-1821-04.webp"
      }
    ],
    "10.16": [
      {
        "src": "/images/cat-1821-05.webp"
      }
    ],
    "1.0": [
      {
        "src": "/images/cat-1821-06.webp"
      }
    ]
  },
  "mono": {
    "6.0/10.7": [
      {
        "src": "/images/cat-1960-02.webp"
      }
    ],
    "5.71": [
      {
        "src": "/images/cat-1960-03.webp"
      }
    ],
    "6.74/9.7": [
      {
        "src": "/images/cat-1960-04.webp"
      }
    ]
  }
};
export function shadePhotosFor(productId:string,shade:string,texture?:string):ShadePhoto[]{
 const photos=shadePhotos[productId]?.[shade]||[];
 return texture?[...photos].sort((a,b)=>Number(b.texture===texture)-Number(a.texture===texture)):photos;
}
