import { useState, useEffect } from "react";
import imgSlider1 from "../assets/images/slider-image-1.jpeg";
import imgSlider2 from "../assets/images/slider-image-2.jpeg";
import imgSlider3 from "../assets/images/slider-image-3.jpeg";
import imgSlider4 from "../assets/images/grocery-banner.png";
import imgSlider5 from "../assets/images/banner-4.jpeg";
import rightSide1 from "../assets/images/blog-img-1.jpeg";
import rightSide2 from "../assets/images/blog-img-2.jpeg";

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [imgSlider1, imgSlider2, imgSlider3, imgSlider4, imgSlider5];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <div className="flex relative m-auto px-[5%] w-full gap-2 items-center">
        <div className='w-3/4'>
          {/* Carousel wrapper */}
          <div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
            {images.map((image, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}>
                <img src={image} className='block w-full h-full object-cover' alt={`Slide ${index + 1}`} />
              </div>
            ))}

            {/* Navigation controls */}
            <div className='flex justify-between items-center absolute inset-0'>
              {/* Previous button */}
              <button
                type='button'
                onClick={handlePrev}
                className='bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none ms-5'
                aria-label='Previous'
              >
                <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>

              {/* Next button */}
              <button
                type='button'
                onClick={handleNext}
                className='bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none me-5'
                aria-label='Next'
              >
                <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div>
          </div>

        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <img src={rightSide1} className='block w-full h-[185px] object-cover rounded-lg' alt={`Slide`} />
          <img src={rightSide2} className='block w-full h-[185px] object-cover rounded-lg' alt={`Slide`} />
        </div>
      </div>
    </>
  );
}
