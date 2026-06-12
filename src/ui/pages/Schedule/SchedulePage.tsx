import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppNavigationProp } from '../../../navigation/interface';
import {
  ScheduleItem,
  useRoomSchedule,
} from '../../../hooks/useRoomSchedule/useRoomSchedule';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
} from '../../../assets/Icons';
import { RootState } from '../../../store/store';

const roomData = [
  { label: 'Semua Ruangan', value: '' }, // Opsi reset filter
  { label: 'Squats Room', value: 'Squats Room' },
  { label: 'Lunges Room', value: 'Lunges Room' },
  { label: 'Deadlift Room', value: 'Deadlift Room' },
];

const SchedulePage: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { scheduleData, isLoading } = useRoomSchedule();
  const myBookings = useSelector(
    (state: RootState) => state.booking.myBookings,
  );

  // State untuk Filter
  const [filterRoom, setFilterRoom] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Menggabungkan dan Memfilter Data
  const filteredSchedule = useMemo(() => {
    const combinedData = [...myBookings, ...scheduleData];

    return combinedData.filter(item => {
      let matchRoom = true;
      let matchDate = true;

      if (filterRoom) {
        matchRoom = item.nama_ruangan === filterRoom;
      }

      if (filterDate) {
        const selectedDateStr = filterDate.toISOString().split('T')[0];
        // Jika data dari API tidak memiliki tanggal, kita asumsikan itu jadwal hari ini,
        // atau Anda bisa menyesuaikan logikanya di sini.
        if (item.tanggal) {
          matchDate = item.tanggal === selectedDateStr;
        }
      }

      return matchRoom && matchDate;
    });
  }, [scheduleData, myBookings, filterRoom, filterDate]);

  const formatDateString = (d: Date | null) => {
    if (!d) return 'Tanggal Meeting';
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <View style={styles.card}>
      <Text
        style={styles.cardText}
      >{`${item.waktu_mulai} - ${item.waktu_selesai}`}</Text>
      <Text style={styles.cardText}>{item.nama_ruangan}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Section (Gray Background) */}
      <SafeAreaView style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Jadwal Ruang Meeting</Text>
        </View>

        <View style={styles.filterContainer}>
          <Dropdown
            style={styles.inputWrapper}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={roomData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Ruang Meeting"
            value={filterRoom}
            onChange={item => setFilterRoom(item.value)}
            renderRightIcon={() => (
              <ChevronDownIcon size={20} color="#A0A0A0" />
            )}
          />

          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.7}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text
              style={[styles.pickerText, !filterDate && { color: '#A0A0A0' }]}
            >
              {formatDateString(filterDate)}
            </Text>
            <CalendarIcon size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Section (White Background) */}
      <View style={styles.bottomSection}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={filteredSchedule}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderScheduleItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => {
          setFilterDate(date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topSection: {
    backgroundColor: '#F2F2F2', // Warna abu-abu terang sesuai gambar
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '500', color: '#000000' },
  filterContainer: { paddingHorizontal: 20 },
  inputWrapper: {
    backgroundColor: '#FFFFFF', // Form berwarna putih
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 55, // Fixed height agar seragam
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0E5E5', // Border outline tipis agak kemerahan/abu
  },
  placeholderStyle: { fontSize: 16, color: '#A0A0A0' },
  selectedTextStyle: { fontSize: 16, color: '#A0A0A0' }, // Warna teks pilihan diredupkan sesuai gambar
  pickerText: { flex: 1, fontSize: 16, color: '#A0A0A0' },

  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  listContainer: { paddingBottom: 30 },
  card: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
});

export default SchedulePage;
