"use client";

import { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'; // Tambahkan impor Image dari next/image

export default function MenuProfile() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<any>({
    id: null,
    NIK: '',
    namaDepan: '',
    namaBelakang: '',
    email: '',
    tanggalLahir: '',
    alamat: '',
    posisi: '',
    nomorTelepon: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      window.location.href = '/login';
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+'/menuprofile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = response.data.data;
        setProfile({
          ...profileData,
          tanggalLahir: new Date(profileData.tanggalLahir).toLocaleDateString('en-GB')
        });
        if (profileData.profileImage) {
          const photoUrl = profileData.profileImage.url;
          setPhoto(photoUrl);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        window.location.href = '/login';
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first!');
      return;
    }

    if (!profile.id) {
      toast.error('Profile ID is missing');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('penggunaId', profile.id.toString());

    try {
      const token = localStorage.getItem('tkn');
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+'/profile-images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setIsEditing(false);
      setSelectedFile(null); // Reset state setelah berhasil mengunggah
      toast.success('Photo updated successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload photo. Please try again.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-10 bg-[#d4b185] gap-5 font-tajawal"
    style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}
    >
      <ToastContainer />
      <div className="flex flex-col items-center w-full max-w-md bg-[#cccccc] rounded-lg shadow-lg p-6"
      style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <div className="relative mb-6">
          {photo ? (
            <Image src={photo} alt="Profile" width={128} height={128} className="rounded-full" />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-300" />
          )}
        </div>
        <label
          htmlFor="photoInput"
          className="bg-gray-800 text-white px-2 py-2 rounded-full cursor-pointer flex items-center text-sm justify-center hover:bg-gray-700 transition duration-300 mb-4"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit className="mr-1 text-sm" /> Change Photo
          <input id="photoInput" type="file" className="hidden" onChange={handlePhotoChange} />
        </label>
        {isEditing && photo && (
          <button
            onClick={handleSavePhoto}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaSave className="mr-1" /> Save Photo
          </button>
        )}
      </div>
      <div className="flex flex-col items-center w-full max-w-md bg-[#cccccc] rounded-lg shadow-lg p-6"
      style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">NIK:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.NIK}</p>
          </div>
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">Name:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.namaDepan} {profile.namaBelakang}</p>
          </div>
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">Email:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">Place, Date of Birth:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.tanggalLahir}</p>
          </div>
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">Address:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.alamat}</p>
          </div>
          <div className="mb-4">
            <label className="block text-[#4a4a4a] text-sm font-bold mb-2">Position:</label>
            <p className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">{profile.posisi}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
