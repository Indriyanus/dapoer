"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const confirmPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match').required("Confirm password is required"),
});

export default function ConfirmRegisterPassword() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
      token: '',
    },
    validationSchema: confirmPasswordSchema,
    onSubmit: async (values) => {
      try {
        const { newPassword, token } = values;
        const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/verify-email", { newPassword, token });
        toast.success(response.data.message);
        router.push("/login");
      } catch (error) {
        console.error("Verification error: ", error);
        toast.error("Verification failed");
      }
    },
  });

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      formik.setFieldValue('token', token);
    }
  }, [formik.setFieldValue]);

  return (
    <section className='flex bg-[#cccccc] py-12 md:py-24 items-center justify-center font-tajawal'
    style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
      <div className="bg-[#d4b185] p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-5xl mt-3"
      style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}
      >
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#4a4a4a] text-center">Setup New Password & Verification Account</h1>
        <p className="text-[#4a4a4a] mb-6 text-center text-sm md:text-base">For your security, please do not share your password with anyone. Keep it confidential and safe.</p>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-[#4a4a4a] mb-2 text-sm md:text-base">Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full px-3 py-2 border rounded shadow-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-[#4a4a4a] mb-2 text-sm md:text-base">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded shadow-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button type="submit" className='w-full bg-white text-[#4a4a4a] font-bold p-2 rounded-lg hover:bg-[#cccccc] transition duration-300 mt-10 shadow-lg'>Submit</button>
        </form>
      </div>
    </section>
  );
}
