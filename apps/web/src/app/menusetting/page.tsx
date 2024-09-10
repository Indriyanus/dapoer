"use client";

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const MenuSettingSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .required("Old Password is required")
    .min(8, "Password must be at least 8 characters"),
    newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required("Confirm password is required"),
});

export default function MenuSetting() {
  const router = useRouter();

  useEffect(() => {
    // Memeriksa apakah token ada di localStorage
    const token = localStorage.getItem('tkn');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      router.push('/login');
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: MenuSettingSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("tkn"); // Ambil token dari local storage
        const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+'/change-password', values, {
          headers: {
            Authorization: `Bearer ${token}` // Sertakan token dalam header Authorization
          }
        });
        if (response.status === 200) {
          toast.success('Password changed successfully!');
          router.push('/login'); // Redirect setelah password berhasil diubah
        }
      } catch (error: any) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Failed to change password. Please try again.');
        }
      }
    },
  });

  return (
    <section 
      className='flex bg-[#cccccc] py-12 md:py-24 items-center justify-center font-tajawal'
      style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div 
        className="bg-[#d4b185] p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-5xl mt-3"
        style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#4a4a4a] text-center">Setup Change Password</h1>
        <p className="text-[#4a4a4a] mb-6 text-center">For your security, please do not share your password with anyone. Keep it confidential and safe.</p>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-[#4a4a4a] mb-2">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className={`w-full px-3 py-2 border rounded shadow-lg ${formik.touched.oldPassword && formik.errors.oldPassword ? 'border-red-500' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.oldPassword}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-[#4a4a4a] mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className={`w-full px-3 py-2 border rounded shadow-lg ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-[#4a4a4a] mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`w-full px-3 py-2 border rounded shadow-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button 
            type="submit" 
            className='w-full bg-white text-[#4a4a4a] font-bold p-2 rounded-lg hover:bg-[#cccccc] transition duration-300 mt-10 shadow-lg'
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
