"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default function ViewMessage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [productCounts, setProductCounts] = useState<ProductCount[]>([]);
  const [productMessageCounts, setProductMessageCounts] = useState<{
    [key: string]: number;
  }>({
    "Dapoer Telekomunikasi": 0,
    "Dapoer Parfum": 0,
    "Dapoer Photography": 0,
    "Dapoer Chemical": 0,
    "Dapoer Website": 0,
  });
  const [selectedProduct, setSelectedProduct] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      window.location.href = '/login';
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredMessages = response.data.data.filter((message: Message) => {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          return new Date(message.createdAt) >= oneYearAgo;
        });

        setMessages(filteredMessages);

        const productCountMap: { [key: string]: number } = {
          "Dapoer Telekomunikasi": 0,
          "Dapoer Parfum": 0,
          "Dapoer Photography": 0,
          "Dapoer Chemical": 0,
          "Dapoer Website": 0,
        };

        filteredMessages.forEach((message: Message) => {
          if (productCountMap[message.productName] !== undefined) {
            productCountMap[message.productName]++;
          }
        });

        const productCountArray = Object.keys(productCountMap).map(productName => ({
          productName,
          count: productCountMap[productName],
        }));

        setProductCounts(productCountArray);
        setProductMessageCounts(productCountMap);
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Jika terjadi error (misalnya token tidak valid), arahkan ke halaman login
        window.location.href = '/login';
      }
    };

    fetchMessages();
  }, []);

  // Definisikan tipe data untuk pesan
  interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    productName: string;
    message: string;
    createdAt: string;
  }

  interface ProductCount {
    productName: string;
    count: number;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  const data = {
    labels: productCounts.map(pc => 
      pc.productName === "Dapoer Chemical" ? "Dapoer Kimia" : 
      pc.productName === "Dapoer Photography" ? "Dapoer Fotografi" :
      pc.productName
    ),
    datasets: [
      {
        label: 'Messages by Service',
        data: productCounts.map(pc => pc.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Messages by Service (Last Year)',
      },
    },
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const filteredMessages = selectedProduct === "All"
    ? messages
    : messages.filter((message) => message.productName === selectedProduct);

  return (
    <section className="bg-[#d4b185] font-tajawal text-[#4a4a4a] min-h-screen py-20 px-4 sm:px-10"
    style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
      <div className="py-10">
        <div className="max-w-6xl mx-auto p-5 py-10 rounded-lg shadow-md bg-[#cccccc] relative"
        style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
          <h2 className="text-xl font-bold mb-5">Messages by Service (Last Year)</h2>
          <Bar data={data} options={options} />
          <div className="absolute top-0 right-0 m-5 p-5 bg-[#d4b185] border border-gray-200 rounded-lg shadow-lg text-[#4a4a4a]"
          style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}
          >
            <h3 className="text-lg font-bold mb-3">Service Message</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Dapoer Telekomunikasi = {productMessageCounts["Dapoer Telekomunikasi"]}</li>
              <li>Dapoer Parfum = {productMessageCounts["Dapoer Parfum"]}</li>
              <li>Dapoer Fotografi = {productMessageCounts["Dapoer Photography"]}</li>
              <li>Dapoer Kimia = {productMessageCounts["Dapoer Chemical"]}</li>
              <li>Dapoer Website = {productMessageCounts["Dapoer Website"]}</li>
            </ul>
          </div>
        </div>
        <br />
        <div className="max-w-6xl mx-auto p-5 rounded-lg shadow-md bg-[#cccccc]"
        style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
          <h1 className="text-2xl font-bold mb-5">User Messages</h1>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="mb-5 p-2 border bg-[#d4b185] border-gray-400 rounded"
          >
            <option value="All">All</option>
            <option value="Dapoer Telekomunikasi">Dapoer Telekomunikasi</option>
            <option value="Dapoer Parfum">Dapoer Parfum</option>
            <option value="Dapoer Photography">Dapoer Fotografi</option>
            <option value="Dapoer Chemical">Dapoer Kimia</option>
            <option value="Dapoer Website">Dapoer Website</option>
          </select>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Message</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id}>
                    <td className="py-2 px-4 border-b">{message.name}</td>
                    <td className="py-2 px-4 border-b">{message.email}</td>
                    <td className="py-2 px-4 border-b">{message.phone}</td>
                    <td className="py-2 px-4 border-b">
                      {message.productName === "Dapoer Chemical" ? "Dapoer Kimia" : 
                       message.productName === "Dapoer Photography" ? "Dapoer Fotografi" :
                       message.productName}
                    </td>
                    <td className="py-2 px-4 border-b">{message.message}</td>
                    <td className="py-2 px-4 border-b">{formatDate(message.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
