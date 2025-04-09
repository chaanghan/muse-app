import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Root() {
  const router = useRouter();
  const rootNavigation = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigation?.key) return; // 네비게이션 준비 전이면 리턴

    router.replace('/(tabs)/home'); // 네비게이션이 준비된 후에 이동
  }, [rootNavigation?.key]);

  return null;
}
