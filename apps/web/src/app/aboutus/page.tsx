'use client';
import Image from 'next/image';
import { FaBookBookmark } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

export default function AboutUs() {
    return (
        <>
            <section className='bg-[#d4b185] flex flex-col md:flex-row items-center py-5 px-10 font-tajawal text-[#4a4a4a]'
            style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                <div className='flex-1 flex justify-center items-center'>
                    <Image src='/images/direktur.png' alt="CEO Photo" width={500} height={500} className='w-1/2 h-auto' loading="lazy" />
                </div>
                <div className='flex-1 flex-col mt-10 md:mt-20'>
                    <div className='text-center'>
                        <h1 className='text-2xl md:text-3xl text-[#4a4a4a]' tabIndex={0}>
                            GREETING FROM THE CEO
                        </h1>
                    </div>
                    <div className='text-justify text-base md:text-md mt-5 text-[#4a4a4a]' tabIndex={0}>
                        <p>
                            At PT Dapoer Poesat Noesantara Group, we are committed to continuous growth and innovation across various strategic sectors. We are proud to offer a range of premium services, including Dapoer Telekomunikasi, Dapoer Parfum, Dapoer Fotografi, Dapoer Kimia, and Dapoer Website.
                        </p>
                        <br />
                        <p>
                            Over the past two years, PT Dapoer Poesat Noesantara Group has demonstrated our unwavering commitment to providing the best services and products to our customers across Indonesia. This success is made possible by the trust and support of our shareholders, business partners, and customers, as well as the exceptional dedication of our entire workforce.
                        </p>
                        <br />
                        <p>
                            As CEO, I extend my deepest gratitude to all stakeholders who have played a vital role in the company’s journey. I also call upon our management team to continue leading with integrity and innovation, serving as role models to inspire productivity and excellence across the company.
                        </p>
                        <br />
                        <p>
                            As we look ahead to the future, we must embrace the challenges with renewed vigor, strengthen our competencies, and consistently innovate to achieve even greater company objectives.
                        </p>
                        <br />
                        <p>
                            With collaboration and hard work, I am confident that PT Dapoer Poesat Noesantara Group will continue to advance, making a positive impact on society and achieving greater milestones in the years to come.
                        </p>
                        <br />
                        <p>
                            Tangerang, April 4, 2024
                        </p>
                        <br />
                        <p>
                            Indriyanus
                        </p>
                        <br />
                        <p>
                            CEO
                        </p>
                    </div>
                </div>
            </section>
            <section className='flex flex-col md:flex-row justify-between py-5 px-10 gap-10 bg-[#cccccc] font-tajawal text-[#4a4a4a]'
            style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                <div className='flex-1 bg-[#d4b185] p-5 md:p-10 rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="service"
                style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <RiCustomerService2Line className='h-10 w-10 text-[#4a4a4a]' />
                    <h2 id="service" className='font-bold text-xl md:text-2xl text-[#4a4a4a]'>
                        Service
                    </h2>
                    <br />
                    <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                    At PT Dapoer Poesat Noesantara Group, we are unwavering in our commitment to delivering exceptional service throughout every phase of our projects. Our team consistently provides the latest and most innovative solutions at each stage, ensuring that our clients receive superior and up-to-date results. We take pride in our meticulous attention to detail and our dedication to exceeding client expectations, reinforcing our reputation as a leader in quality and reliability.
                    </p>
                </div>
                <div className='bg-[#d4b185] flex-1 p-5 md:p-10 rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="planning"
                style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <FaBookBookmark className='h-10 w-10 text-[#4a4a4a]' />
                    <h2 id="planning" className='font-bold text-xl md:text-2xl text-[#4a4a4a]'>
                    Planning
                    </h2>
                    <br />
                    <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                    In all our activities, we are committed to designing and providing the best solutions tailored to the specific needs of our clients. PT Dapoer Poesat Noesantara Group always prioritizes innovation and quality in every planning process, ensuring that each step taken delivers optimal and satisfying results for our clients.
                    </p>
                </div>
                <div className='flex-1 bg-[#d4b185] p-5 md:p-10 rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="execution"
                style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <RxLapTimer className='h-10 w-10 text-[#4a4a4a]' />
                    <h2 id="execution" className='font-bold text-xl md:text-2xl text-[#4a4a4a]'>
                        Execution
                    </h2>
                    <br />
                    <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                    We are backed by highly skilled and experienced professionals in their respective fields. PT Dapoer Poesat Noesantara Group is committed to delivering high-quality results that are not only satisfying but also meet industry standards. With a strong focus on timely and efficient execution, we ensure that every project we undertake not only achieves success but also provides significant value to all our stakeholders. Our dedication to precision and quality ensures that every step in the project is completed meticulously, resulting in optimal outcomes that meet and exceed client expectations.
                    </p>
                </div>  
            </section>
            <section className='bg-[#cccccc] py-5 px-10 shadow-md font-tajawal text-[#4a4a4a]' tabIndex={0}
            style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                <section className='flex flex-col md:flex-row justify-center py-5 px-5 md:px-20 rounded-lg shadow-md'
                style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <div className='flex-1'>
                        <h2 className='font-bold text-xl md:text-2xl text-center text-[#4a4a4a]'>
                            SERVICES
                        </h2>
                        <br />
                        <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                        As a company dedicated to providing the best service, PT Dapoer Poesat Noesantara Group offers a range of premier services designed to meet the needs and expectations of our clients. With a strong focus on quality, innovation, and customer satisfaction, we ensure that every service we provide supports your business&apos;s success and growth. Here are the main services we offer:
                        </p>
                    </div>
                </section>
                <section className='py-5 px-5 rounded-lg shadow-md' style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <section className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                        <div className='flex-1 text-[#4a4a4a]' tabIndex={0} aria-labelledby="isp">
                            <h3 id="isp" className='text-lg md:text-xl font-bold text-center text-[#4a4a4a]'>
                            Dapoer Telekomunikasi
                            </h3>
                            <br />
                            <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                            We provide reliable and high-speed telecommunications services tailored for your business. Our services include network infrastructure installation and maintenance, high-quality internet connections, VPN services, network security, and 24/7 technical support. We also offer additional services such as web hosting and business email management to ensure your business remains securely connected and operates efficiently.
                            </p>
                        </div>
                        <div className='flex-1 text-[#4a4a4a]' tabIndex={0} aria-labelledby="infrastructure">
                            <h3 id="infrastructure" className='text-lg md:text-xl font-bold text-center text-[#4a4a4a]'>
                            Dapoer Parfum
                            </h3>
                            <br />
                            <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                            Dapoer Parfum delivers a range of high-quality perfumes designed to meet the tastes and needs of consumers. We combine the finest ingredients with cutting-edge technology in every production process, ensuring our products are not only captivating in fragrance but also safe to use. With extensive distribution channels, our perfumes are available through various online and offline platforms.
                            </p>
                        </div>
                        <div className='flex-1 text-[#4a4a4a]' tabIndex={0} aria-labelledby="chemicals">
                            <h3 id="chemicals" className='text-lg md:text-xl font-bold text-center text-[#4a4a4a]'>
                            Dapoer Fotografi
                            </h3>
                            <br />
                            <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                            We offer professional photography services for various needs, from product photography to event documentation. With a team of experienced photographers and state-of-the-art equipment, Dapoer Photography ensures every precious moment is captured with the highest quality. We also provide photo editing and album creation services to deliver a perfect final result.
                            </p>
                        </div>
                        <div className='flex-1 text-center text-[#4a4a4a]' tabIndex={0} aria-labelledby="procurement">
                            <h3 id="procurement" className='text-lg md:text-xl font-bold text-[#4a4a4a]'>
                            Dapoer Kimia
                            </h3>
                            <br />
                            <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                            We specialize in the distribution of high-quality chemicals for various industries. Our services include the safe and timely procurement and delivery of chemicals, along with consultation on chemical usage. Our products encompass chemicals for manufacturing, agriculture, and pharmaceuticals, all adhering to strict industry standards.
                            </p>
                        </div>
                        <div className='flex-1 text-center text-[#4a4a4a]' tabIndex={0} aria-labelledby="web-app">
                            <h3 id="web-app" className='text-lg md:text-xl font-bold text-[#4a4a4a]'>
                            Dapoer Website
                            </h3>
                            <br />
                            <p className='text-justify text-sm md:text-base text-[#4a4a4a]'>
                            We provide innovative web development services tailored to meet your business needs. Our services include custom website design and development, web application development, search engine optimization (SEO), and system and API integration. Dapoer Website ensures that every project we undertake enhances your online presence and effectively supports your business goals.
                            </p>
                        </div>
                        
                    </section>
                </section>
            </section>
            <section className='py-5 px-10 shadow-md bg-[#d4b185] font-tajawal text-[#4a4a4a]'
            style={{ backgroundImage: 'url(/images/3backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                <div className='flex item-center justify-center'>
                    <h2 className='text-xl md:text-2xl font-bold text-[#4a4a4a]'>
                        OUR PORTFOLIO
                    </h2>
                </div>
                <section className='flex flex-col md:flex-row justify-between py-5 px-5 md:px-10 gap-5'>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio1"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/APARTEMEN_2.jpeg" alt="Skyland City Jatinangor Internet Network Management - 2023" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio1" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        REVOLUTIONIZING CONNECTIVITY AT SKYLAND CITY JATINANGOR - INTERNET NETWORK MANAGEMENT
                        </p>
                    </div>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio3"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/dapoerphotography/15.webp" alt="FO Cable Installation Bank Index - 2024" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio3" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        WEDDING DAY
                        </p>
                    </div>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio2"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/dapoerkimia/NaOH1.webp" alt="FO Cable Installation Bank Panin - 2024" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio2" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        NAOH (CAUSTIC SODA FLAKE 48%) EX THAILAND
                        </p>
                    </div>
                </section>
                <section className='flex flex-col md:flex-row justify-between py-5 px-5 md:px-10 gap-5'>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio4"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/dapoerwebsite/e-commers tampilan.webp" alt="Cross Connection (LAN) Installation RGE Group - 2024" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio4" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        INNOVATIVE E-COMMERCE PLATFORM FOR TICKET PURCHASING
                        </p>
                    </div>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio5"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/dapoerwebsite/e-commers transaksi.webp" alt="Local Area Network Installation PT Protonindo Citra - 2024" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio5" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        STREAMLINED TRANSACTION PROCESS IN E-COMMERCE APP
                        </p>
                    </div>
                    <div className='bg-[#d4b185] p-5 md:p-10 flex-1 flex flex-col items-center rounded-lg shadow-md text-[#4a4a4a]' tabIndex={0} aria-labelledby="portfolio6"
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                        <Image src="/images/dapoerwebsite/e-commers transaksi complete.webp" alt="PABX Installation RS Dustira Army Hospital Cimahi - 2023" width={240} height={320} className='h-80 w-60 rounded-lg shadow-lg' loading="lazy" />
                        <p id="portfolio6" className='text-center text-sm py-5 text-[#4a4a4a]'>
                        COMPLETED TRANSACTION IN E-COMMERCE TICKET PURCHASE APP
                        </p>
                    </div>
                </section>
                <section className='py-5 px-10 rounded-lg shadow-md bg-[#4a4a4a] font-tajawal text-center'
                    style={{ backgroundImage: 'url(/images/2backgrounddpng.png)', backgroundSize: 'auto', backgroundPosition: 'center' }}>
                    <p className='text-sm md:text-base text-[#4a4a4a]'>
                        For a complete overview of our portfolio and to explore all the projects we&apos;ve successfully delivered, please visit our dedicated portfolio page. <a href="http://localhost:3000/product" className='text-blue-400 underline hover:text-blue-500'>Click here</a> to discover the full spectrum of our expertise and see how PT Dapoer Poesat Noesantara Group has consistently delivered excellence across various industries.
                    </p>
                </section>
            </section>
            <section className='flex flex-center justify-center py-10 px-5 item-center bg-[#cccccc] font-tajawal text-[#4a4a4a]'>
                <h2 className='text-xl md:text-2xl font-bold text-[#4a4a4a]'>
                    OUR CLIENTS
                </h2>
            </section>
            <section id='our clients' className='flex flex-center justify-center px-5 md:px-10 item-center bg-[#cccccc] font-tajawal text-[#4a4a4a]'>
                <div className="marquee">
                    <div className="marquee-content">
                        <div className="marquee-item">
                            <Image src="/images/logo/logobankiindex.webp" alt="Client Logo Bank Index" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobankpanin.webp" alt="Client Logo Bank Panin" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobri.webp" alt="Client Logo BRI" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logojco.webp" alt="Client Logo JCo" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoprotoindo.webp" alt="Client Logo Protonindo" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logorge.webp" alt="Client Logo RGE" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoskyland.webp" alt="Client Logo Skyland" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logosriwijayaair.webp" alt="Client Logo Sriwijaya Air" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoudistira.webp" alt="Client Logo RS Dustira" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logotelkomakses.webp" alt="Client Logo Telkom Akses" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logofunworld.webp" alt="Client Logo Funworld" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logojavaoffshore.webp" alt="Client Logo Java Offshore" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoweave1.png" alt="Client Logo Weave" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logosurge2.png" alt="Client Logo Surge" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logostarlite3.png" alt="Client Logo Starlite" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoccsi4.png" alt="Client Logo CCSI" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logon5.png" alt="Client Logo N" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logomayora6.png" alt="Client Logo Mayora" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobalitower7.png" alt="Client Logo Bali Tower" width={200} height={100} loading="lazy" />
                        </div>
                        {/* Salinan kedua untuk looping yang mulus */}
                        <div className="marquee-item">
                            <Image src="/images/logo/logobankiindex.webp" alt="Client Logo Bank Index" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobankpanin.webp" alt="Client Logo Bank Panin" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobri.webp" alt="Client Logo BRI" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logojco.webp" alt="Client Logo JCo" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoprotoindo.webp" alt="Client Logo Protonindo" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logorge.webp" alt="Client Logo RGE" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoskyland.webp" alt="Client Logo Skyland" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logosriwijayaair.webp" alt="Client Logo Sriwijaya Air" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoudistira.webp" alt="Client Logo RS Dustira" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logotelkomakses.webp" alt="Client Logo Telkom Akses" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logofunworld.webp" alt="Client Logo Funworld" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logojavaoffshore.webp" alt="Client Logo Java Offshore" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoweave1.png" alt="Client Logo Weave" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logosurge2.png" alt="Client Logo Surge" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logostarlite3.png" alt="Client Logo Starlite" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logoccsi4.png" alt="Client Logo CCSI" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logon5.png" alt="Client Logo N" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logomayora6.png" alt="Client Logo Mayora" width={200} height={100} loading="lazy" />
                        </div>
                        <div className="marquee-item">
                            <Image src="/images/logo/logobalitower7.png" alt="Client Logo Bali Tower" width={200} height={100} loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Styles */}
            <style jsx>{`
                .marquee {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }

                .marquee-content {
                    display: flex;
                    width: calc(200px * 38); /* 24 items * 200px per item */
                    animation: marquee 30s linear infinite;
                }

                .marquee-item {
                    flex: 0 0 auto;
                    width: 200px;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 15px;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } /* Sesuaikan agar looping berjalan dengan baik */
                }
            `}</style>
        </>
    )
}

