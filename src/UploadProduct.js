import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { products } from './data';

export const uploadProductsToFirebase = async () => {
  try {
    console.log('Uploading products to Firebase...');
    
    for (const product of products) {
      await addDoc(collection(db, 'products'), {
        title: product.title,
        price: product.price,
        colors: product.colors,
        description: "Nike Air Force is a range of athletic shoes made by Nike. It was created by designer Bruce Kilgore and was the first basketball shoe to use Nike's Air technology.",
        sizes: [38, 39, 40, 41, 42, 43, 44],
        category: "lifestyle",
        inStock: true
      });
    }
    
    console.log('All products uploaded successfully!');
    alert('Products uploaded to Firebase!');
  } catch (error) {
    console.error('Error uploading products:', error);
    alert('Error uploading products: ' + error.message);
  }
};
