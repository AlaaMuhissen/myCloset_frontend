import { ClerkProvider, useAuth ,ClerkLoaded } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Your Clerk publishable key
const CLERK_PUBLISHABLE_KEY = 'pk_test_aGVyb2ljLW1hbW1vdGgtMzcuY2xlcmsuYWNjb3VudHMuZGV2JA';
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

// The initial layout component that manages navigation based on auth status
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();  // Clerk authentication hooks
  const segments = useSegments();  // Get current navigation segments
  const router = useRouter();  // Router for navigation

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);
    console.log('inTabsGroup: ', inTabsGroup);

    if (isSignedIn && inTabsGroup) {
      console.log("djdj")
      router.replace('/(tabs)');
    } else if (!isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isSignedIn]);

  return <Slot />;
};
// Token cache for securely storing tokens using expo-secure-store
const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);  // Get token by key
    } catch (err) {
      console.error('Error getting token:', err);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);  // Save token by key
    } catch (err) {
      console.error('Error saving token:', err);
    }
  },
};

// Root layout component that provides Clerk context and manages auth
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;






