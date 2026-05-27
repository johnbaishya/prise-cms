import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { IGallery } from '@/Types/entities/core-entities';
import { CarouselImage, ImageThumbnail } from './ui/image-thumbnail';

type PropTypes = {
    images: IGallery[] | [] | undefined,
}

export default function ThumbGallerySwiper(props: PropTypes) {
    const { images } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    // onSwiper={setThumbsSwiper}
    //             spaceBetween={10}
    //             slidesPerView={4}
    //             freeMode={true}
    //             watchSlidesProgress={true}
    //             modules={[FreeMode, Navigation, Thumbs]}
    //             className="mySwiper"

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                freeMode
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"



            >
                {
                    images?.map(item => {
                        return (
                            <SwiperSlide key={item.key}>
                                {/* <img src={item.location} /> */}
                                <CarouselImage src={item.location} />
                            </SwiperSlide>
                        )
                    })
                }
                {/* <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/abstract-10.jpg" />
                </SwiperSlide> */}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-2 gap-2"
            >
                {
                    images?.map(item => {
                        return (
                            <SwiperSlide key={item.key}>
                                {/* <img src={item.location} /> */}
                                <ImageThumbnail src={item.location} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

        </>
    );
}
