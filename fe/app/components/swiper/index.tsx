'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/mousewheel';
import { useRef } from 'react';

interface SwiperProps {
  // Define your props here
}

const SwiperComponent: React.FC<SwiperProps> = () => {
  const [swiper, setSwiper] = useState<InstanceType<typeof Swiper> | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        console.log('slide changed');
      });
    }
  }, [swiper]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (swiper) {
        if (event.key === 'ArrowLeft') {
          swiper.slidePrev();
        } else if (event.key === 'ArrowRight') {
          swiper.slideNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [swiper]);

  return (
    <div className="h-full w-full">
      <Swiper
        style={{ height: '50vh', width: '100%', maxWidth: '100vw', margin: '0 auto' }}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiper(swiper)}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        mousewheel={{
          enabled: true,
        }}
        modules={[Autoplay, Pagination, Navigation, Keyboard, Mousewheel]}
      >
        <SwiperSlide>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <img
              src="https://picsum.photos/1440/900"
              alt="Slide 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-10 left-0 right-0 m-4 flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">合作案例一</h3>
              <p className="text-2xl text-white mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">探索更多</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <img
              src="https://picsum.photos/1440/901"
              alt="Slide 2"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-10 left-0 right-0 m-4 flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">合作案例二</h3>
              <p className="text-2xl text-white mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">探索更多</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <img
              src="https://picsum.photos/1440/902"
              alt="Slide 3"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-10 left-0 right-0 m-4 flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">合作案例三</h3>
              <p className="text-2xl text-white mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">探索更多</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;