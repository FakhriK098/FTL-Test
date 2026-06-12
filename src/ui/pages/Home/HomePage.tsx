import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  ScheduleItem,
  useRoomSchedule,
} from '../../../hooks/useRoomSchedule/useRoomSchedule';
import { ClipboardIcon, EditIcon } from '../../../assets/Icons';
import { AppNavigationProp } from '../../../navigation/interface';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const HomePage: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { scheduleData, isLoading, error } = useRoomSchedule();
  const myBookings = useSelector(
    (state: RootState) => state.booking.myBookings,
  );
  const combinedData = [...myBookings, ...scheduleData];

  const userProfile = {
    name: 'Yosi',
    role: 'Web Developer',
    initial: 'Y',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userProfile.initial}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userRole}>{userProfile.role}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Jadwal Ruang Meeting Hari Ini</Text>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={{ marginTop: 50 }}
          />
        ) : error && scheduleData.length === 0 ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={combinedData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderScheduleItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Custom Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Schedule')}
        >
          <ClipboardIcon size={28} color="#000000" />
          <Text style={styles.navText}>Jadwal{'\n'}Ruang Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Booking')}
        >
          <EditIcon size={28} color="#000000" />
          <Text style={styles.navText}>Booking{'\n'}Ruang Meeting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B9C0E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
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
  cardText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    paddingVertical: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default HomePage;
