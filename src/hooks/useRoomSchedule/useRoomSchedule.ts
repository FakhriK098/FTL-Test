import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// The keys must match the exact JSON response from the API
export interface ScheduleItem {
  waktu_mulai: string;
  waktu_selesai: string;
  nama_ruangan: string;
  tanggal?: string;
}

interface ScheduleApiResponse {
  status: string;
  message: string;
  timestamp: string;
  data: ScheduleItem[];
}

export const useRoomSchedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<ScheduleApiResponse>(
          'https://uat-api.ftlgym.com/api/v1/test/jadwalruangan',
        );

        if (response.data && response.data.status === 'success') {
          setScheduleData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load schedule.');
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message ||
            axiosError.message ||
            'Failed to fetch schedule data',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return { scheduleData, isLoading, error };
};
