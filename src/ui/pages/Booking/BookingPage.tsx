import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../navigation/interface';
import { useRoomBooking } from '../../../hooks/useRoomBooking/useRoomBooking';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
} from '../../../assets/Icons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const divisionData = [
  { label: 'Information Technology', value: 'IT' },
  { label: 'Human Resources', value: 'HR' },
  { label: 'Marketing', value: 'MKT' },
  { label: 'Operations', value: 'OPS' },
];

const roomData = [
  { label: 'Squats Room', value: 'Squats Room' },
  { label: 'Lunges Room', value: 'Lunges Room' },
  { label: 'Deadlift Room', value: 'Deadlift Room' },
];

const BookingPage: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {
    division,
    setDivision,
    roomName,
    setRoomName,
    startTime,
    date,
    endTime,
    setDate,
    setStartTime,
    setEndTime,
    participants,
    setParticipants,
    submitBooking,
  } = useRoomBooking();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const handleSubmit = () => {
    if (!roomName || !startTime || !endTime) {
      Alert.alert('Incomplete Data', 'Harap isi Ruang Meeting dan Waktu.');
      return;
    }
    const success = submitBooking();
    if (success) {
      navigation.navigate('Home');
    }
  };

  const formatDateString = (d: Date | null) => {
    if (!d) return 'Tanggal Meeting';
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTimeString = (d: Date | null, placeholder: string) => {
    if (!d) return placeholder;
    return d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Ruang Meeting</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Dropdown
            style={styles.inputWrapper}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={divisionData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Divisi"
            value={division}
            onChange={item => setDivision(item.value)}
            renderRightIcon={() => (
              <ChevronDownIcon size={20} color="#A0A0A0" />
            )}
          />

          {/* Dropdown Ruang Meeting */}
          <Dropdown
            style={styles.inputWrapper}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={roomData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih Ruang Meeting"
            value={roomName}
            onChange={item => setRoomName(item.value)}
            renderRightIcon={() => (
              <ChevronDownIcon size={20} color="#A0A0A0" />
            )}
          />

          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.7}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={[styles.pickerText, !date && { color: '#A0A0A0' }]}>
              {formatDateString(date)}
            </Text>
            <CalendarIcon size={20} color="#A0A0A0" />
          </TouchableOpacity>

          {/* Start Time Picker Button */}
          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.7}
            onPress={() => setStartTimePickerVisibility(true)}
          >
            <Text
              style={[styles.pickerText, !startTime && { color: '#A0A0A0' }]}
            >
              {formatTimeString(startTime, 'Waktu Mulai (Contoh: 14:00)')}
            </Text>
            <ClockIcon size={20} color="#A0A0A0" />
          </TouchableOpacity>

          {/* End Time Picker Button */}
          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.7}
            onPress={() => setEndTimePickerVisibility(true)}
          >
            <Text style={[styles.pickerText, !endTime && { color: '#A0A0A0' }]}>
              {formatTimeString(endTime, 'Waktu Selesai (Contoh: 15:00)')}
            </Text>
            <ClockIcon size={20} color="#A0A0A0" />
          </TouchableOpacity>

          <TextInput
            style={[styles.inputWrapper, { paddingRight: 15 }]}
            placeholder="Jumlah Peserta"
            keyboardType="numeric"
            value={participants}
            onChangeText={setParticipants}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={selectedDate => {
          setDate(selectedDate);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={time => {
          setStartTime(time);
          setStartTimePickerVisibility(false);
        }}
        onCancel={() => setStartTimePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={time => {
          setEndTime(time);
          setEndTimePickerVisibility(false);
        }}
        onCancel={() => setEndTimePickerVisibility(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  formContainer: { padding: 25 },
  inputWrapper: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  input: { flex: 1, fontSize: 16, color: '#333' },
  footer: { padding: 25 },
  submitButton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  placeholderStyle: { fontSize: 16, color: '#A0A0A0' },
  selectedTextStyle: { fontSize: 16, color: '#333' },
  pickerText: { flex: 1, fontSize: 16, color: '#333' },
});

export default BookingPage;
