"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa'; // Import the icon

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const [nik, setNik] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAttendances();
  }, [nik, page, startDate, endDate]);

  const fetchAttendances = async () => {
    try {
      const token = localStorage.getItem('tkn');
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/attendances', {
        params: { ...(nik && { nik }), page, startDate, endDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendances(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching attendances:', error);
      toast.error('Failed to fetch attendances. Please try again.');
    }
  };

  const handleNikChange = (e: any) => {
    setNik(e.target.value);
    setPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const convertDate = (date: Date | null | undefined) => {
    if (date) {
      return new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).toString();
    }
    return '-';
  };

  return (
    <section className="flex flex-col items-center justify-center w-full py-20 px-10 bg-[#d4b185] gap-5 font-tajawal"
             style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
      <ToastContainer />
      <div className="flex flex-col items-center w-full max-w-6xl bg-[#cccccc] rounded-lg shadow-lg p-6"
           style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <p className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4a4a4a] text-center font-tajawal'>
          Attendances
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by NIK"
            value={nik}
            onChange={handleNikChange}
            className="p-2 border rounded"
          />
          <input
            type="datetime-local"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="datetime-local"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <table className="w-full text-left">
          <thead>
          <tr>
            <th className="border px-4 py-2">NIK</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Clock In</th>
            <th className="border px-4 py-2">Lokasi Clock In</th>
            <th className="border px-4 py-2">Clock Out</th>
            <th className="border px-4 py-2">Lokasi Clock Out</th>
          </tr>
          </thead>
          <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance['id']}>
              <td className="border px-4 py-2">{attendance['pengguna']['NIK']}</td>
              <td className="border px-4 py-2">{attendance['pengguna']['namaDepan']}</td>
              <td className="border px-4 py-2">{convertDate(attendance['masuk'])}</td>
              <td className="border px-4 py-2">{attendance['lokasiMasuk']}</td>
              <td className="border px-4 py-2">{convertDate(attendance['keluar'])}</td>
              <td className="border px-4 py-2">{attendance['lokasiKeluar']}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 gap-3">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <a href="/attendance" className="fixed top-16 right-4 bg-gray-300 p-4 rounded-full shadow-lg hover:bg-gray-400 transition duration-300 flex items-center gap-2">
        <FaPlus className="text-xl" />
        <span>Add Attendance</span>
      </a>
    </section>
  );
};

export default Attendances;
