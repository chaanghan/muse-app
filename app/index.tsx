import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/home');
  }, []);

  return null;
}
