import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../navigation/interface';

const WelcomePage = () => {
  const navigation = useNavigation<AppNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.h1}>Selamat Datang</Text>
        <View style={styles.gap} />
        <Text style={styles.h2}>Di Aplikasi </Text>
        <View style={styles.gap} />
        <Text style={styles.h1}>Ruang Meeting</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingBottom: 80,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  gap: { height: 16 },
});
