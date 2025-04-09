import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';

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
  const onSubmit = () => {
    router.push(`/search/${keyword}`);
  };
  console.log(keyword);

  return (
    <SafeAreaView style={styles.container}>
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
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>둘러보기</Text>
      </View>
      <View style={styles.genreContainer}>
        <View style={styles.genreRow}>
          <TouchableOpacity
            style={[styles.genreButton, styles.firstButton]}
            onPress={() => router.push('/(tabs)/search/kpop-track')}
          >
            <Text style={styles.genreText}>Pop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genreButton, styles.secondButton]}
            onPress={() => router.push('/(tabs)/search/kpop-track')}
          >
            <Text style={styles.genreText}>Pop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderWidth: 2,
    borderColor: colors.GRAY_200,
    borderRadius: 50,
  },
  icon: {
    marginHorizontal: 15,
  },
  input: {
    fontSize: 16,
    height: 45,
    flex: 1,
  },
  inputFocusContainer: {
    borderWidth: 2,
    borderColor: colors.GREEN_300,
    backgroundColor: colors.GRAY_100,
  },
  subTitleContainer: {
    marginTop: 20,
  },
  subTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  genreContainer: {
    display: 'flex',
    gap: 10,
    marginVertical: 20,
  },
  genreRow: {
    flexDirection: 'row',
  },

  genreButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    backgroundColor: 'gray',
    paddingVertical: 30,
    borderRadius: 5,
  },
  genreButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  firstButton: {
    marginRight: 10,
  },
  secondButton: {},
  thirdButton: {
    marginRight: 10,
  },
  fourthButton: {},
  genreText: {
    fontWeight: '600',
  },
});
export default SearchScreen;
