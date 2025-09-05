import React, { useEffect, useState } from 'react'
import SectionTitle from '../../compoment/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';

export default function Testimonis() {
    const [reviews, setreviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setreviews(data))
    }, [])
    console.log(reviews)
    return (
        <div>
            <SectionTitle subtitle='---What Our Clients Say---' title='TESTIMONIALS'></SectionTitle>
            <Swiper

                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide>
                        <div className='flex flex-col items-center mx-24 my-16'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className='py-8'>{review.details}</p>
                            <h2 className='text-2xl text-orange-400'>{review.name}</h2>
                            
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>

        </div>
    )
}
