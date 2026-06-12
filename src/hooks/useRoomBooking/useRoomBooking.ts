import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addBooking } from '../../slice/bookingSlice/bookingSlice';

export const useRoomBooking = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [division, setDivision] = useState('');
  const [roomName, setRoomName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [participants, setParticipants] = useState('');

  const submitBooking = () => {
    if (!roomName || !startTime || !endTime || !date) return false;

    // Fungsi untuk memformat Object Date ke string "HH:mm" (Contoh: "14:00")
    const formatTime = (d: Date) => {
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };
    const formatDateString = (d: Date) => {
      return d.toISOString().split('T')[0];
    };

    dispatch(
      addBooking({
        waktu_mulai: formatTime(startTime),
        waktu_selesai: formatTime(endTime),
        nama_ruangan: roomName,
        tanggal: formatDateString(date),
      }),
    );

    return true;
  };

  return {
    division,
    setDivision,
    roomName,
    setRoomName,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    participants,
    setParticipants,
    submitBooking,
  };
};
