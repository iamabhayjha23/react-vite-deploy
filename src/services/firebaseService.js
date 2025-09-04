import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    console.log('📦 Retrieved products:', products.length);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Create order function - THIS WAS MISSING
export const createOrder = async (orderData) => {
  try {
    console.log('🔥 Creating order in Firebase...', orderData);
    
    const order = {
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Order with timestamps:', order);

    const docRef = await addDoc(collection(db, 'orders'), order);
    console.log('✅ Order created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw error;
  }
};

// Search products function
export const searchProducts = async (searchTerm) => {
  try {
    if (!searchTerm.trim()) {
      return await getProducts();
    }

    console.log('🔍 Searching for:', searchTerm);
    
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });

    const searchResults = allProducts.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      
      const titleMatch = product.title?.toLowerCase().includes(searchLower);
      const keywordMatch = product.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      );
      const colorMatch = product.colors?.some(color => 
        color.code?.toLowerCase().includes(searchLower)
      );

      return titleMatch || keywordMatch || colorMatch;
    });

    console.log(`✅ Found ${searchResults.length} products matching "${searchTerm}"`);
    return searchResults;
    
  } catch (error) {
    console.error('❌ Error searching products:', error);
    return [];
  }
};

// Add product function (for adding more sneakers)
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    console.log('✅ Product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding product:', error);
    throw error;
  }
};

// Delete product function
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    console.log('✅ Product deleted:', productId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    return false;
  }
};

// Update product function
export const updateProduct = async (productId, updateData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('✅ Product updated:', productId);
    return true;
  } catch (error) {
    console.error('❌ Error updating product:', error);
    return false;
  }
};

// Get orders function
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    console.log('📦 Retrieved orders:', orders.length);
    return orders;
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    return [];
  }
};
