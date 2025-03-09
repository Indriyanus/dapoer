"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../../components/ConfirmModal';

export default function MenuProfile() {
  const [attendance, setAttendance] = useState<any>({
    id: null,
    masuk: null,
    keluar: null,
    isSubmitting: null
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  const [isSubmitting, setIsSubmitting] = useState<{
    [key: string]: { label: string, message: string };
  }>({
    "CLOCK_IN": { label: "Clock In", message: "Are you sure want to <strong>Clock in</strong>?" },
    "CLOCK_OUT": { label: "Clock Out", message: "Are you sure want to <strong>Clock out</strong>?" },
    "DONE": { label: "Done", message: "Done" }
  });

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      window.location.href = '/login';
      return;
    }

    const fetchAttendace = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+'/attendance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => {
          const attendanceResponse = response.data.data;
          setAttendance({
            ...attendanceResponse,
            masuk: convertDate(attendanceResponse.masuk),
            keluar: convertDate(attendanceResponse.keluar),
            isSubmitting: handleDone(attendanceResponse)
          });
        }).catch(() => {
          setAttendance({
            id: null,
            masuk: null,
            keluar: null,
            isSubmitting: handleDone({"masuk": null, "keluar": null})
          });
        });

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchAttendace()
  }, []);

  const handleMasuk = async () => {
    try {
      const token = localStorage.getItem('tkn');
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+'/attendance', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => {
        const attendanceResponse = response.data.data;
        setAttendance({
          ...attendanceResponse,
          masuk: convertDate(attendanceResponse.masuk),
          keluar: convertDate(attendanceResponse.keluar),
          isSubmitting: handleDone(attendanceResponse)
        })
        toast.success('Clock in successfully!');
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        toast.error('Failed to clock in. Please try again.');
      })

    } catch (error) {
      console.error('Error clock in:', error);
      toast.error('Failed to clock in. Please try again.');
    }
  }

  const handleKeluar = async () => {
    try {
      const token = localStorage.getItem('tkn');
      const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL+`/attendance/${attendance.id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => {
        const attendanceResponse = response.data.data;
        setAttendance({
          ...attendanceResponse,
          masuk: convertDate(attendanceResponse.masuk),
          keluar: convertDate(attendanceResponse.keluar),
          isSubmitting: handleDone(attendanceResponse)
        })
        toast.success('Clock out successfully!');
      })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          toast.error('Failed to clock out. Please try again.');
        })
    } catch (error) {
      console.error('Error clock out:', error);
      toast.error('Failed to clock out. Please try again.');
    }
  }

  const handleSave = async () => {
    if(!(attendance.masuk && attendance.keluar)) {
      setConfirmAction(() => async () => {
        if(attendance.masuk && !attendance.keluar) {
          await handleKeluar();
        }
        if (!attendance.masuk && !attendance.keluar) {
          await handleMasuk();
        }
        setIsModalOpen(false);
      });
      setIsModalOpen(true);
    }
  }

  const convertDate = (date: string | null) => {
    if(date) {
      return new Date(date).toLocaleString('en-US', {timeZone: 'Asia/Jakarta'}).toString();
    }
  }

  const handleDone = (attendance:any) => {
    if(attendance.masuk && attendance.keluar) {
      return isSubmitting["DONE"];
    }
    if(attendance.masuk && !attendance.keluar) {
      return isSubmitting["CLOCK_OUT"];
    }
    if (!attendance.masuk && !attendance.keluar) {
      return isSubmitting["CLOCK_IN"];
    }

    return null
  }

  return (
    <section className="flex flex-col items-center justify-center py-20 px-10 bg-[#d4b185] gap-5 font-tajawal"
    style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}
    >
      <ToastContainer />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAction}
        message={attendance.isSubmitting?.message}
      />

      <div className="flex flex-col items-center w-full max-w-md bg-[#cccccc] rounded-lg shadow-lg p-6"
      style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <p className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4a4a4a] text-center font-tajawal'>
          Attendance
        </p>
        <div className="w-full flex flex-col md:flex-row items-center md:px-5 text-center md:text-left">
          <div className="w-full flex flex-col items-start md:items-start text-justify mb-2">
            <strong>Clock in :</strong>
          </div>
          <div className="w-full flex flex-col items-end md:items-end text-justify mb-2">
            {attendance.masuk}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center md:px-5 text-center md:text-left">
          <div className="w-full flex flex-col items-start md:items-start text-justify mb-2">
            <strong>Clock out :</strong>
          </div>
          <div className="w-full flex flex-col items-end md:items-end text-justify mb-2">
            {attendance.keluar}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-1 w-full bg-[#cccccc] text-[#4a4a4a] font-bold p-2 rounded-lg transition duration-300 font-tajawal">
          {attendance.isSubmitting?.label}
        </button>
      </div>
    </section>
  );
}
