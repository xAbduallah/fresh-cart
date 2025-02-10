import { useState, useEffect, useRef } from "react";

export default function Carousel({ images, duration = 2000, imgObject = 'object-contain' }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    if (!images) return;

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, duration);
    };

    useEffect(() => {
        if (images.length < 2) return;
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, [activeIndex, images]);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        resetInterval();
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        resetInterval();
    };

    return (
        <>
            <div className="flex relative w-full gap-2 items-center">
                <div className='w-full '>
                    <div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
                        {images?.map((image, index) => (
                            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}>
                                <img src={image} className={`block w-full h-full ${imgObject}`} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}

                        {/* Navigation controls */}
                        <div className='flex justify-between items-center absolute inset-0'>
                            {/* Previous button */}
                            <button
                                type='button'
                                onClick={handlePrev}
                                className='bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none'
                                aria-label='Previous'
                            >
                                <svg className='w-4 h-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                                </svg>
                            </button>

                            {/* Next button */}
                            <button
                                type='button'
                                onClick={handleNext}
                                className='bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none'
                                aria-label='Next'
                            >
                                <svg className='w-4 h-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
