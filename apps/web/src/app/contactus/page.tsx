"use client"

import React, { useEffect, useState } from 'react';
import { FaBuilding, FaPhoneAlt, FaMobileAlt, FaEnvelope } from 'react-icons/fa';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { contactSchema } from '@/app/features/contactSchema';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Product = {
  id: number;
  name: string;
};

export default function ContactUs() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/products/list");
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className='flex flex-col lg:flex-row bg-[#cccccc] font-tajawal py-10 px-5'
      style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
      
      {/* Contact Information Section */}
      <section className='flex-1 py-10 px-5 h-full'>
        <div className="flex flex-col items-center font-tajawal">
          <p className='text-justify text-[#4a4a4a]'>
            We at PT Dapoer Poesat Noesantara are happy to invite you to contact us if you have any questions, need further information, or have specific needs to discuss. Our team is always ready to provide the best service and answer all your questions quickly and efficiently.
          </p>
          <p className='mt-5 text-justify text-[#4a4a4a]'>
            Please fill out the contact form below to send a message directly to us. Our team will respond to your message quickly and professionally. We value every feedback and question you submit, as it helps us to continue to grow and provide better services.
            Thank you for choosing PT Dapoer Poesat Noesantara as your partner. We greatly appreciate your trust and support.
          </p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className='flex-1 py-10 px-5 mt-2'>
        <div className="flex flex-col items-center justify-center h-full font-tajawal">
          <div className="text-center bg-gradient-to-r from-[#d4b185] to-[#e2c1a1] p-6 rounded-lg shadow-lg w-full max-w-2xl relative"
            style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
            
            {/* Contact Title with Floating Animation */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-[#4a4a4a] animate-pulse">Contact</h1>
            <p className="text-[#4a4a4a] mb-6 text-center">Here is some information about how to contact me...</p>
            
            {/* Contact Details */}
            <div className="text-left space-y-4">
              <div className="flex items-center mb-4 animate-fade-in">
                <FaBuilding className="mr-2 lg:mr-5 text-2xl lg:text-5xl text-[#333]" />
                <p className='text-[#4a4a4a]'>TOWER SEQUIS CENTER 9TH FLOOR NO. 902 JL. JEND. SUDIRMAN 71, Kelurahan Senayan, Kec. Kebayoran Baru,
                  Adm. Jakarta Selatan, Provinsi DKI Jakarta, Kode Pos: 12190.</p>
              </div>
              <div className="flex items-center mb-4 animate-fade-in">
                <FaPhoneAlt className="mr-2 lg:mr-5 text-xl lg:text-2xl text-[#333]" />
                <p className='text-[#4a4a4a]'>+6221 55 77 9999</p>
              </div>
              <div className="flex items-center mb-4 animate-fade-in">
                <FaMobileAlt className="mr-2 lg:mr-5 text-xl lg:text-2xl text-[#333]" />
                <p className='text-[#4a4a4a]'>085211336653</p>
              </div>
              <div className="flex items-center mb-4 animate-fade-in">
                <FaEnvelope className="mr-2 lg:mr-5 text-xl lg:text-2xl text-[#333]" />
                <a href="mailto:Indriyanusmanalor.realemail@gmail.com" className="text-[#4a4a4a] hover:text-[#d4b185]">corporate@dapoerpoesatnoesantara.co.id</a>
              </div>
            </div>
            
            {/* Form */}
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                product: '',
                message: ''
              }}
              validationSchema={contactSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  console.log('Sending data:', values);
                  await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/contact", values);
                  toast.success("Message sent successfully!");
                  resetForm();
                } catch (error) {
                  console.error('Error sending message:', error);
                  toast.error("Failed to send message!");
                }
              }}
            >
              {() => (
                <Form className="text-left w-full py-5 animate-fade-in">
                  <div className="mb-2">
                    <label htmlFor="name" className="block text-[#4a4a4a]">Name</label>
                    <Field type="text" name="name" id="name" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#d4b185]" />
                    <ErrorMessage name="name" component="div" className="text-red-500 italic mt-1" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="block text-[#4a4a4a]">Email</label>
                    <Field type="email" name="email" id="email" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#d4b185]" />
                    <ErrorMessage name="email" component="div" className="text-red-500 italic mt-1" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="phone" className="block text-[#4a4a4a]">Phone Number</label>
                    <Field type="text" name="phone" id="phone" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#d4b185]" />
                    <ErrorMessage name="phone" component="div" className="text-red-500 italic mt-1" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="product" className="block text-[#4a4a4a]">Services</label>
                    <Field as="select" name="product" id="product" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#d4b185]">
                      <option value="" disabled>Please select Services</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.name}>{product.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="product" component="div" className="text-red-500 italic mt-1" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="message" className="block text-[#4a4a4a]">Message</label>
                    <Field as="textarea" name="message" id="message" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#d4b185]"></Field>
                    <ErrorMessage name="message" component="div" className="text-red-500 italic mt-1" />
                  </div>
                  <button type="submit" className='w-full bg-white text-[#4a4a4a] font-bold p-2 rounded-lg hover:bg-[#d4b185] transition duration-300 mt-7 shadow-lg'>
                    Send Message
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </section>
  );
}
