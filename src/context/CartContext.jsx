import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  where,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart when user changes (login/logout)
  useEffect(() => {
    console.log('🔄 Auth state changed:', { 
      userExists: !!currentUser, 
      userId: currentUser?.uid,
      isInitialized 
    });

    if (currentUser) {
      // User is logged in - load their cart
      loadCartFromFirebase();
      setupRealtimeCartListener();
    } else {
      // User is logged out - clear cart
      console.log('🔄 User logged out, clearing cart');
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
      setIsInitialized(true);
    }

    return () => {
      // Cleanup will be handled by the listener unsubscribe
    };
  }, [currentUser]); // Re-run when user changes

  const loadCartFromFirebase = async () => {
    if (!currentUser) {
      console.log('❌ No user, cannot load cart');
      return;
    }
    
    try {
      setLoading(true);
      console.log('📥 Loading cart for user:', currentUser.uid);
      
      const q = query(
        collection(db, 'carts'), 
        where('userId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({ 
          id: doc.id, 
          ...data,
          // Ensure dates are properly converted
          addedAt: data.addedAt?.toDate?.() || data.addedAt || new Date()
        });
      });
      
      console.log('✅ Loaded cart items:', items.length);
      setCartItems(items);
      calculateCartTotals(items);
      setIsInitialized(true);
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
      setIsInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeCartListener = () => {
    if (!currentUser) return;

    console.log('👂 Setting up real-time cart listener for:', currentUser.uid);
    
    const q = query(
      collection(db, 'carts'), 
      where('userId', '==', currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({ 
          id: doc.id, 
          ...data,
          addedAt: data.addedAt?.toDate?.() || data.addedAt || new Date()
        });
      });
      
      console.log('🔄 Real-time cart update:', items.length, 'items');
      setCartItems(items);
      calculateCartTotals(items);
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }, (error) => {
      console.error('❌ Cart listener error:', error);
    });

    return unsubscribe;
  };

  const calculateCartTotals = (items) => {
    const count = items.reduce((total, item) => total + (item.quantity || 0), 0);
    const total = items.reduce((total, item) => total + ((item.productPrice || 0) * (item.quantity || 0)), 0);
    
    setCartCount(count);
    setCartTotal(total);
    
    console.log('🧮 Cart totals updated:', { count, total: `Rs.${total}` });
  };

  const addToCart = async (product, selectedColor, selectedSize, quantity = 1) => {
    if (!currentUser) {
      alert('Please sign in to add items to your cart!');
      return false;
    }

    try {
      console.log('🛒 Adding to cart:', { product: product.title, size: selectedSize, color: selectedColor.code });
      setLoading(true);
      
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => 
        item.productId === product.id && 
        item.selectedColor?.code === selectedColor.code && 
        item.selectedSize === selectedSize
      );

      if (existingItem) {
        // Update existing item quantity
        console.log('📝 Updating existing cart item');
        await updateCartItem(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Add new item to cart
        console.log('➕ Adding new cart item');
        const cartItem = {
          userId: currentUser.uid,
          productId: product.id,
          productTitle: product.title,
          productPrice: product.price,
          selectedColor,
          selectedSize,
          quantity,
          addedAt: new Date(),
          productImage: selectedColor.img || selectedColor.image
        };

        const docRef = await addDoc(collection(db, 'carts'), cartItem);
        console.log('✅ Cart item added with ID:', docRef.id);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItemId, newQuantity) => {
    if (!currentUser) return;

    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const cartItemRef = doc(db, 'carts', cartItemId);
      await updateDoc(cartItemRef, {
        quantity: newQuantity,
        updatedAt: new Date()
      });
      
      console.log('✅ Cart item updated:', cartItemId, 'quantity:', newQuantity);
    } catch (error) {
      console.error('❌ Error updating cart item:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'carts', cartItemId));
      console.log('🗑️ Cart item removed:', cartItemId);
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      console.log('🧹 Clearing cart for user:', currentUser.uid);
      
      const q = query(
        collection(db, 'carts'), 
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(document => 
        deleteDoc(doc(db, 'carts', document.id))
      );
      
      await Promise.all(deletePromises);
      console.log('✅ Cart cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    isInitialized, // Add this to know when cart is ready
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    isLoggedIn: !!currentUser,
    reloadCart: loadCartFromFirebase // Manual reload function
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
