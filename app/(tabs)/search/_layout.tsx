import { Stack } from 'expo-router';
import React from 'react';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '검색',
        }}
      />
    </Stack>
  );
}
