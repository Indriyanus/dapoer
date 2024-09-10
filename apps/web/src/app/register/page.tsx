"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Menggunakan `next/navigation` untuk Next.js 13 ke atas
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { FaHome, FaUser } from "react-icons/fa";
import { MdAlternateEmail, MdPhoneIphone } from "react-icons/md";
import { HiMiniKey } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { toast } from 'react-toastify';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from 'axios';
import registerSchema from '@/app/features/registerSchema';

export default function Register() {
    const [positions, setPositions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Pastikan ini hanya berjalan di klien
            const token = localStorage.getItem('tkn');
            if (!token) {
                // Jika tidak ada token, arahkan ke halaman login
                router.push('/login');
                return;
            }
        }

        const fetchPositions = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/positions");
                setPositions(response.data.positions);
            } catch (error) {
                console.error("Failed to fetch positions:", error);
            }
        };

        fetchPositions();
    }, [router]);

    return (
        <>
            <section id='background' className='flex items-center justify-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('/images/mockup.webp')" }}>
                <section className='bg-[#cccccc] bg-opacity-70 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md md:max-w-3xl mt-14 mb-8 md:mb-12'>
                    <p className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4a4a4a] text-center font-tajawal'>
                        Register User
                    </p>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            NIK: '',
                            email: '',
                            birthday: '',
                            phoneNumber: '',
                            password: '',
                            confirmPassword: '',
                            position: '',
                            address: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const token = localStorage.getItem('tkn');
                                const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/register", values, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                toast.success(response.data.message);
                            } catch (error) {
                                console.error("Registration error: ", error);
                                if (axios.isAxiosError(error)) {
                                    toast.error(error.response?.data?.message || 'Registration failed');
                                } else {
                                    toast.error('An unexpected error occurred');
                                }
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div id='FirstName' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <AiOutlineUser className='text-center' />
                                            <Field type="text" name='firstName' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter First Name' />
                                        </div>
                                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='LastName' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <FaUser className='text-center' />
                                            <Field type="text" name='lastName' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Last Name' />
                                        </div>
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='NIK' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <HiMiniKey className='text-center' />
                                            <Field type="text" name='NIK' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter NIK' />
                                        </div>
                                        <ErrorMessage name="NIK" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='Email' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <MdAlternateEmail className='text-center' />
                                            <Field type="email" name='email' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Email' />
                                        </div>
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='Birthday' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <SlCalender className='text-center' />
                                            <Field type="date" name='birthday' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' />
                                        </div>
                                        <ErrorMessage name="birthday" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='PhoneNumber' className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <MdPhoneIphone className='text-center' />
                                            <Field type="text" name='phoneNumber' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Phone Number' />
                                        </div>
                                        <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='Address' className='flex flex-col gap-2 md:col-span-2'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <FaHome className='text-center' />
                                            <Field type="text" name='address' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Address' />
                                        </div>
                                        <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='Password' className='flex flex-col gap-2 relative'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <RiLockPasswordLine className='text-center' />
                                            <Field type={showPassword ? "text" : "password"} name='password' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Password' />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                                                    {showPassword ? <IoEyeOffOutline className="text-[#4a4a4a]" /> : <IoEyeOutline className="text-[#4a4a4a]" />}
                                                </button>
                                            </div>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div id='ConfirmPassword' className='flex flex-col gap-2 relative'>
                                        <div className='flex items-center gap-3 sm:gap-5'>
                                            <RiLockPasswordFill className='text-center' />
                                            <Field type={showConfirmPassword ? "text" : "password"} name='confirmPassword' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-[#4a4a4a] placeholder-opacity-70' placeholder='Enter Confirm Password' />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                                                    {showConfirmPassword ? <IoEyeOffOutline className="text-[#4a4a4a]" /> : <IoEyeOutline className="text-[#4a4a4a]" />}
                                                </button>
                                            </div>
                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div className="flex items-center justify-between mt-3 md:col-span-2">
                                        <div className='flex items-center'>
                                            <Field type="checkbox" name='rememberMe' className='mr-2' />
                                            <label htmlFor="rememberMe" className="text-[#4a4a4a] text-sm">Remember Me</label>
                                        </div>
                                    </div>

                                    <div id='Position' className='flex flex-col gap-2 mt-3 md:col-span-2'>
                                        <Field as="select" name='position' className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] appearance-none'>
                                            <option value="" disabled hidden>Please, Select Position First!</option>
                                            {positions.map((position, index) => (
                                                <option key={index} value={position}>{position}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="position" component="div" className="text-red-500 text-xs mt-1 italic" />
                                    </div>

                                    <div className='md:col-span-2'>
                                        <button type="submit" className='mt-10 w-full bg-[#cccccc] text-[#4a4a4a] font-bold p-2 rounded-lg hover:bg-[#d4b185] transition duration-300 font-tajawal' disabled={isSubmitting}>
                                            Submit Form
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
            </section>
        </>
    );
}
