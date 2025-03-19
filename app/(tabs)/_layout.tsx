import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '검색',
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: '내 라이브러리',
        }}
      />
    </Tabs>
  );
}
