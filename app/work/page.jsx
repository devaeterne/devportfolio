"use client";

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from "next/link";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import WorkSliderBtns from '@/components/WorkSliderBtns';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Slider değişimi için index tutuluyor

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await fetch("http://localhost:3001/projects");
        const projectData = await projectRes.json();

        if (Array.isArray(projectData) && projectData.length > 0) {
          setProjects(projectData);
        } else {
          console.error("Geçersiz veri yapısı:", projectData);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  if (projects.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex); // Slider değiştiğinde aktif indeksi güncelle
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        tanstion: { delay: 2.4, duration: 0.3, esase: "easeIn" }
      }}
      className="min-h-screen flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row xl:gap-[30px] gap-8">
          {/* Right Content: Swiper */}
          <div className='w-full xl:w-[50%] xl:h-[460px] xl:order-2'>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px]"
              onSlideChange={handleSlideChange} // Slider değiştiğinde çalışacak
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className='w-full'>
                  <div className='relative h-[300px] md:h-[460px] group flex justify-center items-center bg-pink-50/20'>
                    <div className='absolute top-0 bottom-0 w-full h-full bg-black/10 z-10'></div>
                    <div className='relative w-full h-full'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] flex justify-center items-center transition-all" />
            </Swiper>
          </div>

          {/* Left Content: Proje Bilgileri (Aktif proje bilgileri gösteriliyor) */}
          <div className="w-full xl:w-[50%] xl:order-1 flex flex-col gap-8">
            <div className='flex flex-col gap-4'>
              <div className="text-6xl md:text-8xl leading-none font-extrabold text-transparent text-outline">
                {projects[activeIndex].num}
              </div>
              <h2 className="text-[28px] md:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {projects[activeIndex].category} Project
              </h2>
              <p className="text-white/60">{projects[activeIndex].description}</p>
              <ul className='flex flex-wrap gap-2 text-accent'>
                {projects[activeIndex].stack.map((item, index) => (
                  <li key={index} className='text-lg md:text-xl'>
                    {item.name}
                    {index !== projects[activeIndex].stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20"></div>
              <div className='flex items-center gap-4'>
                <Link href={projects[activeIndex].live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className='text-white text-2xl md:text-3xl group-hover:text-accent' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='text-white bg-black p-2 rounded'>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={projects[activeIndex].github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className='text-white text-2xl md:text-3xl group-hover:text-accent' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='text-white bg-black p-2 rounded'>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Work;
