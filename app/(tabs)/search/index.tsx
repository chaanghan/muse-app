import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, View } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { colors } from '@/constants/colors';
function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChangeKeyword = (text: string) => {
    setKeyword(text);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  console.log(keyword);

  return (
    <SafeAreaView>
      <View
        style={[styles.inputContainer, isFocused && styles.inputFocusContainer]}
      >
        <Octicons name="search" size={24} color="black" style={styles.icon} />
        <TextInput
          value={keyword}
          onChangeText={onChangeKeyword}
          style={styles.input}
          placeholder={isFocused ? '' : '어떤 음악을 듣고 싶어?'}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderWidth: 2,
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    marginHorizontal: 12,
  },
  icon: {
    marginHorizontal: 15,
  },
  input: {
    fontSize: 16,
    height: 45,
  },
  inputFocusContainer: {
    borderWidth: 2,
    borderColor: colors.GREEN_300,
    backgroundColor: colors.GRAY_100,
  },
});
export default SearchScreen;
