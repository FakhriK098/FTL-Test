import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignIn } from '../../../hooks/useSignIn/useSignIn';
import { AppNavigationProp } from '../../../navigation/interface';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeOffIcon } from '../../../assets/Icons';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const { signIn, isLoading, error } = useSignIn();
  const navigation = useNavigation<AppNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong');
      return;
    }

    const result = await signIn(email, password);

    if (result.success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Gagal', result.error as string);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>Ruangan Meeting</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Sign In</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email..."
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password..."
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible} // Toggle visibilitas di sini
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.7}
            >
              {isPasswordVisible ? (
                <EyeIcon size={20} color="#A0A0A0" />
              ) : (
                <EyeOffIcon size={20} color="#A0A0A0" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            activeOpacity={0.7}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardContainer: {
    backgroundColor: '#EAEAEA',
    marginHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 35,
  },
  errorText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 35,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonDisabled: {
    backgroundColor: '#515151',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1, // Mengambil sisa ruang di sebelah kiri ikon
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
  },
  eyeIconContainer: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },
});
