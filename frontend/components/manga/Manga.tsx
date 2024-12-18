"use client"

import React, { useEffect, useState, useRef } from "react";
import "@/styles/book.css";

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkIsTouchDevice = () => {
      setIsTouchDevice(navigator.maxTouchPoints > 0);
    };

    checkIsTouchDevice();
    window.addEventListener("resize", checkIsTouchDevice);

    return () => {
      window.removeEventListener("resize", checkIsTouchDevice);
    };
  }, []);

  return isTouchDevice;
}

interface MangaProps {
  images: string[]; // Array of image URLs
}

const Manga: React.FC<MangaProps> = ({ images }) => {
  const isTouchDevice = useIsTouchDevice();
  const [isTurningPage, setIsTurningPage] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const totalImages = images.length;
  const totalPages = totalImages + 4; // 2 covers + images

  // Check if the total pages are odd
  const adjustedTotalPages = totalPages % 2 === 0 ? totalPages : totalPages + 1;

  useEffect(() => {
    const updatePageWidth = () => {
      if (bookRef.current) {
        const bookHeight = bookRef.current.clientHeight;
        const aspectRatio = 9.75 / 16; // Assuming a typical manga page aspect ratio
        const calculatedWidth = bookHeight * aspectRatio;
        setPageWidth(calculatedWidth);
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);

    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };
  }, []);

  useEffect(() => {
    const pages = document.getElementsByClassName("page");
    let lastPageId: number | null = null;

    const removeFlippedFromPair = (index: number) => {
      if (index >= 0 && index < pages.length) {
        if (pages[index]) {
          pages[index].classList.remove("flipped");
        }
        if (index >= 1 && pages[index - 1]) {
          pages[index - 1].classList.remove("flipped");
        }
        setTimeout(() => removeFlippedFromPair(index - 2), 100);
        setTimeout(() => {
          setIsTurningPage(false);
        }, 1600);
      }
    };

    for (let i = 0; i < adjustedTotalPages; i++) {
      const page = pages[i] as HTMLElement;
      if (page && i % 2 === 0) {
        page.style.zIndex = (adjustedTotalPages - i).toString();
      }
    }

    removeFlippedFromPair(adjustedTotalPages - 1);

    const handleFlipping = (page: HTMLElement, pageNum: number) => {
      const book = document.querySelector(".book") as HTMLElement;

      const addFlippedClass = (element: HTMLElement | null) => {
        if (element) element.classList.add("flipped");
      };

      const removeFlippedClass = (element: HTMLElement | null) => {
        if (element) element.classList.remove("flipped");
      };

      const setTransform = (translateValue: string) => {
        setTimeout(() => {
          if (book) book.style.transform = `translateX(${translateValue})`;
        }, 300);
      };

      const isSpecialPage = (pageNum: number) => {
        return (
          pageNum === 1 ||
          pageNum === 2 ||
          pageNum === 3 ||
          pageNum === adjustedTotalPages ||
          pageNum === adjustedTotalPages - 1 ||
          pageNum === adjustedTotalPages - 2
        );
      };

      if (isSpecialPage(pageNum)) {
        if (pageNum === 1 || pageNum === adjustedTotalPages - 1) {
          addFlippedClass(page);
          addFlippedClass(page.nextElementSibling as HTMLElement);
        } else if (
          pageNum === 2 ||
          pageNum === adjustedTotalPages - 2 ||
          pageNum === adjustedTotalPages
        ) {
          removeFlippedClass(page);
          removeFlippedClass(page.previousElementSibling as HTMLElement);
          if (pageNum === adjustedTotalPages - 2) {
            lastPageId = pageNum;
            setTransform("0");
          }
        } else if (pageNum === 3) {
          addFlippedClass(page);
          addFlippedClass(page.nextElementSibling as HTMLElement);
          lastPageId = pageNum;
          setTransform("50%");
        }
      } else {
        if (lastPageId === pageNum - 1 || lastPageId === pageNum) {
          removeFlippedClass(page);
          removeFlippedClass(page.previousElementSibling as HTMLElement);
          lastPageId = pageNum;
          setTransform("0");
        } else {
          setTransform("50%");
          lastPageId = pageNum;
          addFlippedClass(page);
          addFlippedClass(page.nextElementSibling as HTMLElement);
        }
      }
    };

    const handlePageClick = (e: MouseEvent) => {
      const page = (e.target as HTMLElement).closest(".page");
      if (!page) return;
      const pageNum = parseInt(page.id, 10);
      if (window.innerWidth < 1000) {
        handleFlipping(page as HTMLElement, pageNum);
      } else {
        if (pageNum % 2 === 0) {
          page.classList.remove("flipped");
          if (page.previousElementSibling) {
            (page.previousElementSibling as HTMLElement).classList.remove("flipped");
          }
        } else {
          page.classList.add("flipped");
          if (page.nextElementSibling) {
            (page.nextElementSibling as HTMLElement).classList.add("flipped");
          }
        }
      }
    };

    const handleTouchOrClick = (e: MouseEvent) => {
      handlePageClick(e);
    };

    if (isTouchDevice) {
      document.addEventListener("click", handleTouchOrClick);
    } else {
      document.addEventListener("click", handlePageClick);
    }

    return () => {
      document.removeEventListener("click", handleTouchOrClick);
      document.removeEventListener("click", handlePageClick);
    };
  }, [isTouchDevice, adjustedTotalPages]);

  return (
    <div ref={bookRef} className={`book ${isTurningPage ? "no-hover" : ""} h-screen flex items-center justify-center py-2`}>
      <div id="pages" className="pages h-full" style={{ width: `${pageWidth * 2}px` }}>
        <div className="page cover flipped" id="1" style={{ width: `${pageWidth}px` }}>
          <div className="w-full h-full bg-white">
            <img
              src="/path/to/cover-image.jpg"
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="page cover flipped" id="2" style={{ width: `${pageWidth}px` }}>
          <div className="w-full h-full bg-white">
            <img
              src="/path/to/cover-image.jpg"
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="page cover flipped" id="3" style={{ width: `${pageWidth}px` }}>
          <div className="w-full h-full bg-white">
            <img
              src="/path/to/cover-image.jpg"
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {images.map((image, index) => (
          <div key={index} id={`${index + 4}`} className={`page flipped`} style={{ width: `${pageWidth}px` }}>
            <div className="w-full h-full bg-white">
              <div className={`w-full h-full absolute ${index % 2 == 0 ? "bg-gradient-to-l from-[#0005] from-[1%] via-[#0001] via-[10%] to-[#0000] to-90% border-r border-zinc-500":"bg-gradient-to-r from-[#0005] from-[1%] via-[#0001] via-[10%] to-[#0000] to-90% border-l border-zinc-500"}`}></div>
              <img
                src={image}
                alt={`Page ${index + 2}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}

        {/* Add a blank page if total pages are odd */}
        {adjustedTotalPages > totalPages && (
          <div className="page blank" id={`${totalPages + 4}`} style={{ width: `${pageWidth}px` }}>
            <div className="w-full h-full bg-white"></div>
          </div>
        )}

        <div className="page cover flipped" id={`${adjustedTotalPages - 2}`} style={{ width: `${pageWidth}px` }}>
          <div className="w-full h-full bg-white">
            <img
              src="/path/to/back-cover-image.jpg"
              alt="Back Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="page cover flipped" id={`${adjustedTotalPages}`} style={{ width: `${pageWidth}px` }}>
          <div className="w-full h-full bg-white">
            <img
              src="/path/to/back-cover-image.jpg"
              alt="Back Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manga;