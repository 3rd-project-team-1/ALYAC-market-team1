import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBB1mOs6Mmr3oq7m8su9vk-AcKfq-xxvfw',
  authDomain: 'lets-sell-medicine.firebaseapp.com',
  projectId: 'lets-sell-medicine',
  storageBucket: 'lets-sell-medicine.firebasestorage.app',
  messagingSenderId: '313002780734',
  appId: '1:313002780734:web:35894ff69c5014393fc96f',
  measurementId: 'G-Y62MW93NXZ',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
