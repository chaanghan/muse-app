import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/colors';
import { LibraryData } from '@/types/types';

export default function Library({
  id,
  imageUrl,
  title,
  contents,
}: LibraryData) {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image style={styles.image} />
      ) : (
        <View style={styles.icon}>
          <Ionicons name="musical-notes" size={70} color={colors.BLACK} />
        </View>
      )}

      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.author}>
        홍길동
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 110,
  },
  image: {
    backgroundColor: colors.GRAY_200,
    borderRadius: 5,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    borderRadius: 5,
    backgroundColor: colors.GRAY_200,
  },
  title: {
    marginVertical: 5,
    fontWeight: '600',
  },
  author: {
    color: colors.GRAY_700,
    fontWeight: '600',
  },
});
