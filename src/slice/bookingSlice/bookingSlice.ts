import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduleItem } from '../../hooks/useRoomSchedule/useRoomSchedule';

interface BookingState {
  myBookings: ScheduleItem[];
}

const initialState: BookingState = {
  myBookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Action untuk menambah data booking baru ke dalam list
    addBooking: (state, action: PayloadAction<ScheduleItem>) => {
      state.myBookings.unshift(action.payload); // Tambah ke urutan paling atas
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
