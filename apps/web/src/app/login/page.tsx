'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { HiMiniKey } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchemas } from '@/app/features/loginSchema';
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface LoginResponse {
    error: boolean;
    message: string;
    data: {
        token?: string;
    };
}

interface LoginValues {
    NIK: string;
    email: string;
    username: string;
    password: string;
}

export default function Login() {
    const { isLoggedIn, setIsLoggedIn, setFirstName } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);

    const mutationAuth = useMutation<AxiosResponse<LoginResponse>, AxiosError<{ message: string }>, LoginValues>({
        mutationFn: async (values) => {
            return await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/login", {
                NIK: values.NIK,
                email: values.email,
                username: values.username,
                password: values.password
            });
        },
        onSuccess: (response) => {
            localStorage.setItem("tkn", response.data.data.token || "");
            setIsLoggedIn(true);
            axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/user-profile", {
                headers: {
                    Authorization: `Bearer ${response.data.data.token}`
                }
            }).then(profileResponse => {
                setFirstName(profileResponse.data.data.namaDepan);
            }).catch(error => {
                console.error("Error fetching profile:", error);
            });
            toast.success(response.data.message);
            router.push("/");
        },
        onError: (error) => {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    });

    return (
        <>
            <section 
                id='background' 
                className='flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8' 
                style={{ backgroundImage: "url('/images/mockup.webp')" }}
            >
                <section 
                    className='bg-[#cccccc] bg-opacity-70 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl'
                >
                    <p className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4a4a4a] text-center font-tajawal'>
                        Login
                    </p>
                    <Formik
                        initialValues={{
                            NIK: '',
                            email: '',
                            username: '',
                            password: ''
                        }}
                        validationSchema={loginSchemas}
                        onSubmit={(values, { setSubmitting }) => {
                            mutationAuth.mutate(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div id='NIK' className='flex flex-col gap-2 mt-3 font-tajawal'>
                                    <div className='flex items-center gap-3 sm:gap-5'>
                                        <HiMiniKey className='text-center text-[#4a4a4a] text-sm sm:text-lg lg:text-xl' />
                                        <Field type="text"
                                            name='NIK'
                                            className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-black-300'
                                            placeholder='Enter NIK' />
                                    </div>
                                    <ErrorMessage name="NIK" component="div" className="text-red-500 text-sm mt-1 italic" />
                                </div>
                                <div id='email' className='flex flex-col gap-2 mt-3 font-tajawal'>
                                    <div className='flex items-center gap-3 sm:gap-5'>
                                        <MdAlternateEmail className='text-center text-[#4a4a4a] text-sm sm:text-lg lg:text-xl' />
                                        <Field type="email"
                                            name='email'
                                            className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-black-300'
                                            placeholder='Enter Email' />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 italic" />
                                </div>
                                <div id='username' className='flex flex-col gap-2 mt-3 font-tajawal'>
                                    <div className='flex items-center gap-3 sm:gap-5'>
                                        <AiOutlineUser className='text-center text-[#4a4a4a] text-sm sm:text-lg lg:text-xl' />
                                        <Field type="text"
                                            name='username'
                                            className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-black-300'
                                            placeholder='Enter Username' />
                                    </div>
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1 italic" />
                                </div>
                                <div id='password' className='flex flex-col gap-2 mt-3 font-tajawal'>
                                    <div className='flex items-center gap-3 sm:gap-5 relative'>
                                        <RiLockPasswordFill className='text-center text-[#4a4a4a] text-sm sm:text-lg lg:text-xl' />
                                        <Field type={showPassword ? "text" : "password"}
                                            name='password'
                                            className='w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#d4b185] placeholder-black-300'
                                            placeholder='Enter Password' />
                                        <div 
                                            className='absolute right-2 sm:right-4 lg:right-5 cursor-pointer text-[#4a4a4a] text-sm sm:text-lg lg:text-xl'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </div>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 italic" />
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 mt-3 font-tajawal">
                                    <div className='flex items-center'>
                                        <Field type="checkbox" name='rememberMe' className='mr-2' />
                                        <label htmlFor="rememberMe" className="text-[#4a4a4a] text-sm">Remember Me</label>
                                    </div>
                                    <a href="#" className="text-sm font-bold text-[#4a4a4a] hover:underline mt-2 sm:mt-0">Forgot Password?</a>
                                </div>
                                <button type="submit" className='w-full bg-[#cccccc] text-[#4a4a4a] font-bold p-2 rounded-lg hover:bg-[#d4b185] transition duration-300 font-tajawal' disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {/* <div className='text-center mt-4 sm:mt-6'>
                        <a href="./register" className='text-sm text-[#4a4a4a] hover:underline'>Don't have an account? Register</a>
                    </div> */}
                </section>
            </section>
        </>
    );
}
