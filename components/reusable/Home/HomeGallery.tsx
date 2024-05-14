'use client'
import { Gallery } from 'react-grid-gallery'
import { BiImages } from 'react-icons/bi';
const HomeGallery = () => {
    const images = [
        {
            src: "/assets/graduate3.jpg",
            width: 320,
            height: 174,
        },
        {
            src: "/assets/card.jpg",
            width: 420,
            height: 252,
            alt: "Boats (Jeshu John - designerspics.com)",
        },
        {
            src: "/assets/graduate3.jpg",
            width: 400,
            height: 212,
        },
        {
            src: "/assets/card2.jpg",
            width: 320,
            height: 212,
        },
        {
            src: "/assets/college1.png",
            width: 520,
            height: 212,
        },
        {
            src: "/assets/course1.jpg",
            width: 320,
            height: 212,
        },
        {
            src: "/assets/graduate1.jpg",
            width: 320,
            height: 212,
        },
        {
            src: "/assets/graduate2.jpg",
            width: 400,
            height: 272,
        },

    ];
    return <div className="screen-lg mt-3">
        <div className='screen-lg flex justify-center gap-2 items-end p-4'>
            <BiImages className='text-primary p-2' />
            <h2 className='text-[40px] font-bold'>Image</h2>
            <p className='text-[24px] font-medium mb-1'>Gallery</p>
        </div>
        <Gallery images={images} enableImageSelection={false} />
    </div>
}
export default HomeGallery