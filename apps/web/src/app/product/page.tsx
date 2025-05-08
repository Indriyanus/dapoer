"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/context/AuthContext';
import { FaEdit, FaPlusSquare } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

export default function Product() {
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [started, setStarted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
    const [zoomedImageSrc, setZoomedImageSrc] = useState<string>('');
    const [galeries, setGaleries] = useState<any[]>([]);
    const { isLoggedIn, firstName, setIsLoggedIn, setFirstName } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    const handleProductClick = (product: string) => {
        if (started) {
            setSelectedProduct(product);
        }
    };

    const handleStartClick = () => {
        setStarted(true);
        setSelectedProduct('DAPOER TELEKOMUNIKASI');
        getGaleries();
    };

    const handleImageClick = (src: string) => {
        setZoomedImageSrc(src);
        setIsImageZoomed(true);
    };

    const handleCloseZoom = () => {
        setIsImageZoomed(false);
    };

    const getGaleries = async () => {
        try {
            const token = localStorage.getItem('tkn');
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/galeri', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGaleries(response.data.data);
        } catch (error) {
            console.error('Error fetching galeries:', error);
            toast.error('Failed to fetch galeri. Please try again.');
        }
    };

    const products = [
        {
            id: 'DAPOER TELEKOMUNIKASI'
        },
        {
            id: 'DAPOER CHEMICAL'
        },
        {
            id: 'DAPOER PARFUM'
        },
        {
            id: 'DAPOER WEBSITE'
        },
        {
            id: 'DAPOER PHOTOGRAPHY'
        }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const [formData, setFormData] = useState(() => {
        return {
            id: null,
            name: '',
            file: null as File | null,
            description: '',
            category: '',
        };
    });

    const categories = [
        'DAPOER TELEKOMUNIKASI',
        'DAPOER CHEMICAL',
        'DAPOER PARFUM',
        'DAPOER WEBSITE',
        'DAPOER PHOTOGRAPHY',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Add your API call logic here
        try {
            const token = localStorage.getItem('tkn');
            await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+'/galeri', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
              .then((response) => {
                  toast.success('Submit form tambah protofolio successfully!');
                  getGaleries()
              })
              .catch((error) => {
                  console.error('Error Submit form tambah protofolio:', error);
                  toast.error('Failed to Submit form tambah protofolio. Please try again.');
              })
              .finally(() => clearForm());

        } catch (error) {
            console.error('Error Submit form tambah protofolio:', error);
            toast.error('Failed to Submit form tambah protofolio. Please try again.');
        }
    };

    const clearForm = () => {
        setFormData({
            id: null,
            name: '',
            file: null,
            description: '',
            category: '',
        });
        setShowModal(false);
        setEdit(false);
        setIsImageZoomed(false);
        setLoading(false);
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Add your API call logic here
        try {
            const token = localStorage.getItem('tkn');
            await axios.put(process.env.NEXT_PUBLIC_BASE_API_URL+`/galeri/${formData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
              .then((response) => {
                  toast.success('Submit form ubah protofolio successfully!');
                  getGaleries()
              })
              .catch((error) => {
                  console.error('Error Submit form ubah protofolio:', error);
                  toast.error('Failed to Submit form ubah protofolio. Please try again.');
              })
              .finally(() => clearForm());

        } catch (error) {
            console.error('Error Submit form ubah protofolio:', error);
            toast.error('Failed to Submit form ubah protofolio. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Apakah kamu yakin untuk menghapus portofolio tersebut?')) {
            return;
        }
        setLoading(true);
        // Add your API call logic here
        try {
            const token = localStorage.getItem('tkn');
            await axios.delete(process.env.NEXT_PUBLIC_BASE_API_URL+`/galeri/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
              .then((response) => {
                  toast.success('Delete protofolio successfully!');
                  getGaleries()
              })
              .catch((error) => {
                  console.error('Error Delete protofolio:', error);
                  toast.error('Failed to Delete protofolio. Please try again.');
              })
              .finally(() => clearForm());

        } catch (error) {
            console.error('Error Delete protofolio:', error);
            toast.error('Failed to Delete protofolio. Please try again.');
        }
    }

    const formEdit = async (galeri: any) => {
        setEdit(true);
        setFormData({
            id: galeri.id,
            name: galeri.name,
            file: null,
            description: galeri.description,
            category: galeri.category,
        });
        setShowModal(true);
    }

    return (
        <>
            <section className='bg-[#d4b185] font-tajawal py-10'
            style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                <section className='py-10 px-5 sm:px-10 lg:px-20 rounded-lg shadow-md'
                style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4a4a4a]'>
                            PORTFOLIO US
                        </h2>
                        <div className='flex flex-wrap items-center justify-center gap-10 py-5'>
                            {products.map(product => (
                                <h2
                                    key={product.id}
                                    className={`text-sm md:text-lg cursor-pointer font-bold transition-transform transform hover:scale-110 ${selectedProduct === product.id ? 'text-white' : 'text-[#4a4a4a]'}`}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {product.id}
                                </h2>
                            ))}
                        </div>
                    </div>

                    {isLoggedIn && started &&  (
                      <div className="flex justify-center my-5">
                          <button
                            className="flex items-center bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700"
                            onClick={() => setShowModal(true)}
                          >
                              <FaPlusSquare className='mr-2'></FaPlusSquare>
                              TAMBAH GALERI
                          </button>
                      </div>
                    )}

                    {!started && (
                        <div className="flex justify-center mt-5">
                            <button
                                className="bg-white text-[#4a4a4a] font-bold py-2 px-4 rounded-lg hover:bg-[#cccccc]"
                                onClick={handleStartClick}
                            >
                                Get Started
                            </button>
                        </div>
                    )}

                    {started && (
                      <AnimatePresence>
                          {products.filter(product => product.id === selectedProduct).map(filteredProduct => (
                            <motion.section
                              key={filteredProduct.id}
                              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 px-5 md:px-10 max-h-[75vh] overflow-y-auto'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.30 }}
                            >

                                {galeries.filter(galeri => galeri.category === filteredProduct.id).map(galeri => (
                                  <motion.div
                                    key={galeri.id}
                                    className='bg-[#d4b185] p-5 md:p-10 flex flex-col items-center rounded-lg shadow-md mt-5 relative'
                                    tabIndex={0}
                                    aria-labelledby={filteredProduct.id}
                                    whileHover={{ scale: 1 }}
                                    style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}
                                    onClick={() => handleImageClick(galeri.url)}
                                  >
                                      {isLoggedIn && (
                                        <div className="absolute top-2 right-2">
                                          <button
                                            onClick={() => handleDelete(galeri.id)}
                                            className=" mx-1 bg-red-900 text-white p-1 rounded-full hover:bg-red-800"
                                            aria-label="Delete"
                                            disabled={loading}
                                          ><FaTrashCan></FaTrashCan></button>
                                          <button
                                            onClick={() => formEdit(galeri)}
                                            className=" mx-1 bg-blue-900 text-white p-1 rounded-full hover:bg-blue-800"
                                            aria-label="Delete"
                                          ><FaEdit></FaEdit></button>
                                      </div>)}

                                      <Image src={galeri.url} alt={galeri.name} width={240} height={320} className='h-80 w-60 md:h-96 md:w-72 lg:h-80 lg:w-60 rounded-lg shadow-lg object-cover' loading="lazy" />
                                      <Image src="/images/watermark.webp" alt="Watermark" width={50} height={50} className='absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70' />
                                      <p id={filteredProduct.id} className='text-center text-sm py-5 text-[#4a4a4a]'>
                                          {galeri.description}
                                      </p>
                                  </motion.div>
                                ))}

                            </motion.section>
                          ))}
                      </AnimatePresence>
                    )}
                </section>
            </section>

            {isImageZoomed && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleCloseZoom}>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 0.8 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-[80vw] h-[80vh]"
                    >
                        <Image src={zoomedImageSrc} alt="Zoomed Image" layout="fill" objectFit="contain" className="rounded-lg shadow-lg" />
                    </motion.div>
                </div>
            )}

            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                      <h2 className="text-xl font-bold mb-4">Tambah Portofolio</h2>
                      <form onSubmit={(e) => {
                          e.preventDefault();
                          if(!edit) {handleSubmit(e).then(r => console.log(r) )}
                          else {handleEdit(e).then(r => console.log(r) )}
                      }}>
                          <div className="mb-4">
                              <label htmlFor="name" className="block text-sm font-bold mb-2">Nama:</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                              />
                          </div>
                          {edit && (
                          <Image src={zoomedImageSrc} alt={formData.name} width={240} height={320} className="w-10 h-20"/>
                      )}
                          <div className="mb-4">
                              <label htmlFor="file" className="block text-sm font-bold mb-2">File:</label>
                              <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                                required={!edit}
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="description" className="block text-sm font-bold mb-2">Deskripsi:</label>
                              <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                rows={4}
                                required
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="category" className="block text-sm font-bold mb-2">Kategori:</label>
                              <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                              >
                                  <option value="" disabled>Select a category</option>
                                  {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                  ))}
                              </select>
                          </div>
                          <div className="flex justify-end">
                              <button
                                type="button"
                                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                                onClick={() => {
                                    setShowModal(false);
                                    setEdit(false);
                                    setIsImageZoomed(false);
                                }}
                              >
                                  Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-amber-600 text-white py-2 px-4 rounded"
                                disabled={loading}
                              >
                                  {loading ? 'Submitting...' : 'Submit Form'}
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
            )}
        </>
    );
}
