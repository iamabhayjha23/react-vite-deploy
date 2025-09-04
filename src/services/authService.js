import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { auth, db } from '../firebase';


export const signUp = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    
    await setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date(),
      searchHistory: [],
      favoriteProducts: []
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};


export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};


export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};


export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};


export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};


export const saveSearchQuery = async (userId, query) => {
  try {
    await addDoc(collection(db, 'searchHistory'), {
      userId,
      query: query.toLowerCase(),
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error saving search:', error);
  }
};


export const getUserSearchHistory = async (userId) => {
  try {
    const q = query(
      collection(db, 'searchHistory'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const searchHistory = [];
    querySnapshot.forEach((doc) => {
      searchHistory.push(doc.data().query);
    });
    
    return [...new Set(searchHistory)];
  } catch (error) {
    console.error('Error fetching search history:', error);
    return [];
  }
};


export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        // Convert Firestore timestamp to JavaScript Date if needed
        createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
      });
    });
    
    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    console.log(`📦 Retrieved ${orders.length} orders for user ${userId}`);
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

