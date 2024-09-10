"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import { documentSchemas } from '@/app/features/documentSchemas';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SavedFile {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
  category: string;
  product?: {
    name: string;
  };
  notadinas?: {
    name: string;
  };
}

interface FormValues {
  category: string;
  subCategory: string;
  file: File | null;
}

const categories = [
  'Product',
  'Notadinas'
];

const productCategories = [
  'Dapoer Telekomunikasi',
  'Dapoer Parfum',
  'Dapoer Photography',
  'Dapoer Chemical',
  'Dapoer Website'
];

const notadinasCategories = [
  'Kop Surat',
  'Perjalanan Dinas'
];

const products = [
  { name: "Dapoer Telekomunikasi", code: "01.01/DPNG/PRO/DTI/2024" },
  { name: "Dapoer Parfum", code: "01.02/DPNG/PRO/DPM/2024" },
  { name: "Dapoer Photography", code: "01.03/DPNG/PRO/DPY/2024" },
  { name: "Dapoer Chemical", code: "01.04/DPNG/PRO/DCL/2024" },
  { name: "Dapoer Website", code: "01.05/DPNG/PRO/DWE/2024" },
  { name: "Kop Surat", code: "01.01/DPNG/DIN/2024" },
  { name: "Perjalanan Dinas", code: "01.01/DPNG/DIN/SPPD/2024" },
];

export default function Document() {
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      window.location.href = '/login';
      return;
    }

    const fetchDocuments = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+'/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedFiles(response.data.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        // Jika terjadi error (misalnya token tidak valid), arahkan ke halaman login
        window.location.href = '/login';
      }
    };
    fetchDocuments();
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      category: '',
      subCategory: '',
      file: null
    },
    validationSchema: documentSchemas,
    onSubmit: async (values, { resetForm }) => {
      if (!values.file) return;

      const duplicateFile = savedFiles.find(
        file => file.name === values.file!.name && file.size === values.file!.size && file.category === values.subCategory
      );

      if (duplicateFile) {
        setErrorMessage('File with the same name and size already exists in this category.');
        toast.error('File with the same name and size already exists in this category.');
      } else {
        const fileUrl = URL.createObjectURL(values.file!);
        const newSavedFile: SavedFile = {
          id: savedFiles.length + 1,
          name: values.file!.name,
          type: values.file!.type,
          size: values.file!.size,
          url: fileUrl,
          category: values.category,
          product: values.category === 'Product' ? { name: values.subCategory } : undefined,
          notadinas: values.category === 'Notadinas' ? { name: values.subCategory } : undefined,
        };

        try {
          const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+'/documents', {
            name: values.file!.name,
            type: values.file!.type,
            size: values.file!.size,
            url: fileUrl,
            category: values.category,
            productCode: getProductCode(values.subCategory)
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tkn')}`,
            },
          });

          if (response.data.error) {
            setErrorMessage(response.data.message);
            toast.error(response.data.message);
          } else {
            setSavedFiles([...savedFiles, newSavedFile]);
            resetForm();
            setErrorMessage(null);
            toast.success('Document saved successfully');
          }
        } catch (error) {
          console.error('Error saving document:', error);
          setErrorMessage('Failed to save document');
          toast.error('Failed to save document');
        }
      }
    }
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      formik.setFieldValue('file', event.target.files[0]);
    }
  };

  const getProductCode = (subCategory: string): string => {
    const product = products.find(p => p.name === subCategory);
    return product ? product.code : '';
  };

  const getFileTypeDisplay = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return 'Image (JPEG, PNG, JPG)';
    } else if (fileType === 'application/pdf') {
      return 'PDF';
    } else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'Word';
    } else if (
      fileType === 'application/vnd.ms-excel' ||
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return 'Excel';
    } else {
      return fileType;
    }
  };

  const filteredFiles = filterCategory === 'All' ? savedFiles : savedFiles.filter(file => {
    if (productCategories.includes(filterCategory) || notadinasCategories.includes(filterCategory)) {
      return (file.product?.name === filterCategory || file.notadinas?.name === filterCategory);
    }
    return file.category === filterCategory;
  });

  return (
    <>
      <ToastContainer />
      <section className='flex flex-col lg:flex-row bg-[#d4b185] font-tajawal py-20 px-5'
      style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <div className='w-full lg:w-1/4 p-5 bg-[#cccccc] rounded shadow-lg'
        style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
          <h2 className='text-xl font-bold mb-5 text-[#4a4a4a]'>SERVICES</h2>
          <ul className="list-disc ml-4 text-[#4a4a4a]">
            <li>Dapoer Telekomunikasi : 01.01/DPNG/PRO/TMI/2024</li>
            <li>Dapoer Parfum : 01.02/DPNG/PRO/PRM/2024</li>
            <li>Dapoer Fotografi : 01.03/DPNG/PRO/FGI/2024</li>
            <li>Dapoer Kimia : 01.04/DPNG/PRO/KMA/2024</li>
            <li>Dapoer Website : 01.05/DPNG/PRO/WSE/2024</li>
          </ul>
          <h2 className='text-xl font-bold mt-10 mb-5 text-[#4a4a4a]'>NOTADINAS</h2>
          <ul className="list-disc ml-4 text-[#4a4a4a]">
            <li>Kop Surat : 01.01/DPNG/DIN/2024</li>
            <li>Perjalanan Dinas : 01.01/DPNG/DIN/SPPD/2024</li>
          </ul>
        </div>
        <div className='w-full lg:w-3/4 p-5 bg-[#cccccc] rounded shadow-lg ml-0 lg:ml-5 mt-5 lg:mt-0 flex flex-col'
        style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
          <form onSubmit={formik.handleSubmit} className='flex-1 text-center'>
            <p className='text-[#4a4a4a]'>Document folder</p>
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className='mb-5 p-2 rounded border bg-[#cccccc] text-[#4a4a4a]'
            >
              <option value='' disabled>Select a document</option>
              {categories.map(category => (
                <option key={category} value={category}>{category === 'Product' ? 'Services' : category}</option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className='text-red-500'>{formik.errors.category}</div>
            ) : null}

            {formik.values.category && (
              <select
                name="subCategory"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subCategory}
                className='mb-5 p-2 rounded border bg-[#cccccc] text-[#4a4a4a]'
              >
                <option value='' disabled>Select a sub-document</option>
                {(formik.values.category === 'Product' ? productCategories : notadinasCategories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
            {formik.touched.subCategory && formik.errors.subCategory ? (
              <div className='text-red-500'>{formik.errors.subCategory}</div>
            ) : null}

            {(formik.values.category && formik.values.subCategory) && (
              <input type="file" name="file" onChange={handleFileChange} className='mb-5' />
            )}
            {formik.touched.file && formik.errors.file ? (
              <div className='text-red-500'>{formik.errors.file}</div>
            ) : null}

            {(formik.values.category && formik.values.subCategory && formik.values.file) && (
              <div>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Save</button>
              </div>
            )}
            {errorMessage && (
              <div className='mt-2 text-red-500'>
                {errorMessage}
              </div>
            )}
            <div className='text-left bg-[#d4b185] p-5 rounded border mt-5 text-[#4a4a4a]'
            style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
              <h3 className='font-bold text-lg'>Important Notification</h3>
              <p className='text-justify'>
                To ensure smooth and accurate document management, we kindly ask everyone to adhere to the following guidelines:
              </p>
              <ol className='list-decimal pl-5 text-justify'>
                <li>
                  <strong>File Format:</strong> All uploaded files must be in Word, Excel, or PDF format.
                </li>
                <li>
                  <strong>File Naming:</strong> File names must be in uppercase and include the product or document code at the beginning of the file name. Example of correct naming:
                  <ul className='list-disc pl-5'>
                    <li>Dapoer Telekomunikasi: 01.01/DPNG/PRO/DTI/2024</li>
                    <li>01.01/DPNG/PRO/TMI/2024|OFFER LETTER PT TELEKOMUNIKASI INDONESIA</li>
                  </ul>
                </li>
                <li>
                  <strong>File Categorization:</strong> Ensure that each file is uploaded according to the correct product category; avoid uploading files randomly.
                </li>
                <li>
                  <strong>Content Verification:</strong> Make sure the document content has been checked and confirmed for accuracy before uploading.
                </li>
              </ol>
              <p className='text-justify'>
                We highly appreciate your attention and cooperation in following these guidelines. By doing so, we can maintain high work standards and ensure all administrative processes run smoothly.
              </p>
              <br />
              <p className='text-right'>
                Thank you for your attention.<br />
                <strong>PT Dapoer Poesat Noesantara Group</strong>
              </p>
            </div>
          </form>
        </div>
      </section>
      <div className='px-10 py-5 bg-[#cccccc] rounded shadow-lg font-tajawal text-[#4a4a4a]'
      style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
        <h3 className='text-lg font-bold mb-2'>My Documents</h3>
        <div className='flex justify-center'>
          <select
            name="filterCategory"
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
            className='p-2 rounded border bg-[#cccccc] text-[#4a4a4a]'
          >
            <option value="All">All</option>
            {productCategories.concat(notadinasCategories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {filteredFiles.length === 0 && (
          <p className='text-gray-500 text-center'>No files uploaded.</p>
        )}
        {filteredFiles.length > 0 && (
          <div className='overflow-x-auto py-10 px-5'>
            <table className='min-w-full bg-[#cccccc]'>
              <thead className='bg-[#cccccc] text-[#4a4a4a]'>
                <tr>
                  <th className='w-1/12 py-2 text-xs lg:text-sm'>No</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>Document Name</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>Document</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>Sub Document</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>File Type</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>Memory</th>
                  <th className='w-1/12 py-2 text-xs lg:text-sm'>ID</th>
                  <th className='w-2/12 py-2 text-xs lg:text-sm'>Action</th>
                </tr>
              </thead>
              <tbody className='text-[#4a4a4a] text-xs lg:text-sm'>
                {filteredFiles.map((file, index) => (
                  <tr key={file.id} className='border-t'>
                    <td className='py-2 text-center'>{index + 1}</td>
                    <td className='py-2 text-center'>{file.name}</td>
                    <td className='py-2 text-center'>{file.category === 'Product' ? 'Services' : file.category}</td>
                    <td className='py-2 text-center'>{file.product?.name || file.notadinas?.name}</td>
                    <td className='py-2 text-center'>{getFileTypeDisplay(file.type)}</td>
                    <td className='py-2 text-center'>{file.size} bytes</td>
                    <td className='py-2 text-center'>{file.id}</td>
                    <td className='py-2 text-center'>
                      <a href={file.url} download className='bg-blue-500 text-white px-3 py-1 rounded'>Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
