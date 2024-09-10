"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SlLogout } from "react-icons/sl";
import { GrLogin } from "react-icons/gr";
import { FaUser, FaBoxOpen, FaCog, FaListAlt, FaGift } from 'react-icons/fa';
import { RiMessage2Fill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image'; // Pastikan untuk mengimpor komponen Image dari next/image

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, firstName, setIsLoggedIn, setFirstName } = useAuth();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("tkn");
    if (token) {
      axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setIsLoggedIn(true);
        setFirstName(response.data.data.namaDepan);
        setIsMenuOpen(false);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        setIsLoggedIn(false);
        setIsMenuOpen(false);
      });
    } else {
      setIsLoggedIn(false);
      setIsMenuOpen(false);
    }
  }, [router, setIsLoggedIn, setFirstName]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setIsLoggedIn(false);
    setFirstName("");
    setIsMenuOpen(false);
    router.push('/login');
  };

  const handleScroll = () => {
    const offset = window.pageYOffset;
    setIsScrolled(offset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section id='jumbotronNavbar' className={`bg-black flex flex-col md:flex-row justify-between items-center px-4 shadow-md fixed top-0 w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-opacity-70' : 'bg-opacity-10'}`}>
        <section id="left-side" className="flex-1 flex justify-between items-center gap-2 md:justify-start">
          <a href="/">
            <Image src="/images/logo2.webp" alt="Company Logo" width={40} height={40} className="w-10 h-10 md:w-14 md:h-14" />
          </a>
          <div className="md:hidden flex-1 flex justify-center items-center">
            <button className="p-2" onClick={toggleMenu}>
              {isMenuOpen ? <RxCross1 className="text-white w-8 h-8" /> : <RxHamburgerMenu className="text-white w-8 h-8" />}
            </button>
          </div>
          {isLoggedIn && (
            <span className="p-2 text-white font-tajawal text-xs md:hidden">
              Welcome, {firstName}
            </span>
          )}
        </section>
        <section id="center-side" className="hidden md:flex md:flex-3 md:justify-center md:gap-10">
          <a href="/" className="font-bold text-xs md:text-sm text-white rounded-full py-1 px-2 hover:bg-[#d4b185] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 font-tajawal">
            HOME
          </a>
          <a href="/aboutus" className="font-bold text-xs md:text-sm text-white rounded-full py-1 px-2 hover:bg-[#d4b185] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 font-tajawal">
            ABOUT US
          </a>
          <div className="relative">
            <button onClick={toggleServices} className="font-bold text-xs md:text-sm text-white rounded-full py-1 px-2 hover:bg-[#d4b185] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 font-tajawal">
              SERVICES
            </button>
            {isServicesOpen && (
              <div className="absolute mt-5 w-48 bg-[#cccccc] border rounded-md shadow-lg font-tajawal">
                <a href="/services/dapoertelekomunikasi" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                  <HiMiniBuildingOffice className="mr-2" /> Dapoer Telekomunikasi
                </a>
                <a href="/services/dapoerparfum" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                  <HiMiniBuildingOffice className="mr-2" /> Dapoer Parfum
                </a>
                <a href="/services/dapoerphotography" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                  <HiMiniBuildingOffice className="mr-2" /> Dapoer Fotografi
                </a>
                <a href="/services/dapoerchemical" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                  <HiMiniBuildingOffice className="mr-2" /> Dapoer Kimia
                </a>
                <a href="/services/dapoerwebsite" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                  <HiMiniBuildingOffice className="mr-2" /> Dapoer Website
                </a>
              </div>
            )}
          </div>
          <a href="/product" className="font-bold text-xs md:text-sm text-white rounded-full py-1 px-2 hover:bg-[#d4b185] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 font-tajawal">
          PORTFOLIO
          </a>
          <a href="/contactus" className="font-bold text-xs md:text-sm text-white rounded-full py-1 px-2 hover:bg-[#d4b185] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 font-tajawal">
            CONTACT US
          </a>
        </section>
        <section id="right-side" className="hidden md:flex flex-1 justify-end items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="p-2 text-white font-tajawal">
                Welcome, {firstName}
              </span>
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center p-2 text-white font-tajawal">
                  Menu {isDropdownOpen ? <RxCross1 className="ml-2" /> : <RxHamburgerMenu className="ml-2" />}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-[#cccccc] border rounded-md shadow-lg font-tajawal">
                    <a href="/menuprofile" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaUserTie className="mr-2" /> Profile
                    </a>
                    <a href="/viewmessage" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                      <RiMessage2Fill className="mr-2" /> View Message
                    </a>
                    <a href="/document" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaListAlt className="mr-2" /> Document
                    </a>
                    <a href="/register" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaUserPlus className="mr-2" /> Create User
                    </a>
                    <a href="/menusetting" className="flex items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaCog className="mr-2" /> Settings
                    </a>
                    <button onClick={handleLogout} className="flex items-center px-4 py-2 w-full text-left hover:bg-[#d4b185]">
                      <SlLogout className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <a href="/login" className="flex items-center p-2 text-white font-tajawal">
              Login <GrLogin className="ml-2" />
            </a>
          )}
        </section>
        <section id="mobile-menu" className={`md:hidden ${isMenuOpen ? 'flex' : 'hidden'} flex-col items-start w-full px-2`}>
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <a href="/" className="font-bold text-xs text-white py-1 px-2 hover:bg-[#d4b185] transition-all duration-300">
                HOME
              </a>
              <a href="/aboutus" className="font-bold text-xs text-white py-1 px-2 hover:bg-[#d4b185] transition-all duration-300">
                ABOUT US
              </a>
              <button onClick={toggleServices} className="font-bold text-xs text-white py-2 px-2 hover:bg-[#d4b185] transition-all duration-300">
                SERVICES
              </button>
              {isServicesOpen && (
                <div className="absolute mt-[60%] w-48 bg-[#cccccc] border rounded-md shadow-lg font-tajawal text-center">
                  <a href="/services/dapoertelekomunikasi" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                    <HiMiniBuildingOffice className="mr-2" /> Dapoer Telekomunikasi
                  </a>
                  <a href="/services/dapoerparfum" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                    <HiMiniBuildingOffice className="mr-2" /> Dapoer Parfum
                  </a>
                  <a href="/services/dapoerphotography" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                    <HiMiniBuildingOffice className="mr-2" /> Dapoer Fotografi
                  </a>
                  <a href="/services/dapoerchemical" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                    <HiMiniBuildingOffice className="mr-2" /> Dapoer Kimia
                  </a>
                  <a href="/services/dapoerwebsite" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                    <HiMiniBuildingOffice className="mr-2" /> Dapoer Website
                  </a>
                </div>
              )}
              <a href="/product" className="font-bold text-xs text-white py-1 px-2 hover:bg-[#d4b185] transition-all duration-300">
              PORTFOLIO
              </a>
              <a href="/contactus" className="font-bold text-xs text-white py-1 px-2 hover:bg-[#d4b185] transition-all duration-300">
                CONTACT US
              </a>
            </div>
            {isLoggedIn && (
              <div className="flex flex-col items-start w-full">
                <button onClick={toggleDropdown} className="flex items-center p-2 text-white font-tajawal">
                  Menu {isDropdownOpen ? <RxCross1 className="ml-2" /> : <RxHamburgerMenu className="ml-2" />}
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 w-full bg-[#cccccc] border rounded-md shadow-lg font-tajawal text-center">
                    <a href="/menuprofile" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaUserTie className="mr-2" /> Profile
                    </a>
                    <a href="/viewmessage" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                      <RiMessage2Fill className="mr-2" /> View Message
                    </a>
                    <a href="/document" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaListAlt className="mr-2" /> Document
                    </a>
                    <a href="/register" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaUserPlus className="mr-2" /> Create User
                    </a>
                    <a href="/menusetting" className="flex justify-center items-center px-4 py-2 hover:bg-[#d4b185]">
                      <FaCog className="mr-2" /> Settings
                    </a>
                    <button onClick={handleLogout} className="flex justify-center items-center px-4 py-2 w-full text-left hover:bg-[#d4b185]">
                      <SlLogout className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};
