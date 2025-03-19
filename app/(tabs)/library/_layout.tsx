import { Stack } from 'expo-router';
import React from 'react';

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '라이브러리',
        }}
      />
    </Stack>
  );
}
