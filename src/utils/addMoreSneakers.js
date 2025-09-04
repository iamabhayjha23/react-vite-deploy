import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const moreSneakers = [
  {
    id: 6,
    title: "Nike Dunk Low",
    price: 8999,
    colors: [
      { code: "black", img: "./img/dunk-black.png" },
      { code: "white", img: "./img/dunk-white.png" },
      { code: "gray", img: "./img/dunk-gray.png" }
    ],
    keywords: ["dunk", "low", "basketball", "retro", "classic", "street"]
  },
  {
    id: 7,
    title: "Nike React Element",
    price: 13999,
    colors: [
      { code: "#87CEEB", img: "./img/react-blue.png" },
      { code: "#32CD32", img: "./img/react-green.png" },
      { code: "#FF6347", img: "./img/react-orange.png" }
    ],
    keywords: ["react", "element", "running", "comfort", "modern", "technology"]
  },
  {
    id: 8,
    title: "Nike Vapormax",
    price: 18999,
    colors: [
      { code: "black", img: "./img/vapormax-black.png" },
      { code: "#4169E1", img: "./img/vapormax-blue.png" },
      { code: "#FF1493", img: "./img/vapormax-pink.png" }
    ],
    keywords: ["vapormax", "air", "running", "performance", "lightweight"]
  },
  {
    id: 9,
    title: "Nike Cortez",
    price: 7999,
    colors: [
      { code: "white", img: "./img/cortez-white.png" },
      { code: "red", img: "./img/cortez-red.png" },
      { code: "blue", img: "./img/cortez-blue.png" }
    ],
    keywords: ["cortez", "classic", "vintage", "retro", "original", "iconic"]
  },
  {
    id: 10,
    title: "Nike Pegasus",
    price: 11999,
    colors: [
      { code: "#FF4500", img: "./img/pegasus-orange.png" },
      { code: "#008000", img: "./img/pegasus-green.png" },
      { code: "#800080", img: "./img/pegasus-purple.png" }
    ],
    keywords: ["pegasus", "running", "marathon", "training", "cushion", "zoom"]
  },
  {
    id: 11,
    title: "Nike Huarache",
    price: 10999,
    colors: [
      { code: "black", img: "./img/huarache-black.png" },
      { code: "white", img: "./img/huarache-white.png" },
      { code: "#FF69B4", img: "./img/huarache-pink.png" }
    ],
    keywords: ["huarache", "comfort", "slip-on", "casual", "lifestyle", "neoprene"]
  },
  {
    id: 12,
    title: "Nike Presto",
    price: 9999,
    colors: [
      { code: "#FFD700", img: "./img/presto-gold.png" },
      { code: "#40E0D0", img: "./img/presto-turquoise.png" },
      { code: "#FF6347", img: "./img/presto-coral.png" }
    ],
    keywords: ["presto", "t-shirt", "foot", "flexible", "breathable", "comfort"]
  },
  {
    id: 13,
    title: "Nike Roshe Run",
    price: 6999,
    colors: [
      { code: "#2F4F4F", img: "./img/roshe-darkgray.png" },
      { code: "#FF7F50", img: "./img/roshe-coral.png" },
      { code: "#9370DB", img: "./img/roshe-purple.png" }
    ],
    keywords: ["roshe", "run", "minimal", "lightweight", "casual", "everyday"]
  },
  {
    id: 14,
    title: "Nike Free Run",
    price: 8999,
    colors: [
      { code: "#00CED1", img: "./img/freerun-cyan.png" },
      { code: "#FF4500", img: "./img/freerun-orange.png" },
      { code: "#32CD32", img: "./img/freerun-lime.png" }
    ],
    keywords: ["free", "run", "natural", "motion", "barefoot", "flexible"]
  },
  {
    id: 15,
    title: "Nike Metcon",
    price: 13999,
    colors: [
      { code: "#8B0000", img: "./img/metcon-darkred.png" },
      { code: "#000080", img: "./img/metcon-navy.png" },
      { code: "#2F4F4F", img: "./img/metcon-slate.png" }
    ],
    keywords: ["metcon", "training", "crossfit", "workout", "gym", "versatile"]
  }
];

export const addMoreSneakersToFirebase = async () => {
  try {
    console.log('🔥 Adding more sneakers to Firebase...');
    
    for (const sneaker of moreSneakers) {
      const docRef = await addDoc(collection(db, 'products'), sneaker);
      console.log(`✅ Added ${sneaker.title} with ID:`, docRef.id);
    }
    
    console.log('🎉 All sneakers added successfully!');
  } catch (error) {
    console.error('❌ Error adding sneakers:', error);
  }
};
