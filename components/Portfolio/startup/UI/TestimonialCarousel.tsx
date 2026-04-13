import Globals from '@/modules/Globals';
import JsLoader from '@/modules/JsLoader';
import React, { useEffect } from 'react'

export default function TestimonialCarousel() {

    useEffect(() => {
       

        JsLoader.loadFile(`${Globals.BASE_URL}assets/js/owl.carousel.min.js`, () => {
            JsLoader.loadFile(`${Globals.BASE_URL}assets/js/singleTestimonialCarousel.js`, () => {


            });
        });



        return () => {
            $('.testimonialCarousel').trigger('destroy.owl.carousel');
        };
    }, []);
    return (
        <div className='startup-testimonial-carousel-wrapper'>

            <div className="container">
                <div className="row">
                    <div className="col-12 ">
                        <div className="single-testimonial-carousel owl-carousel">
                            <div className="card">
                                <img src="/assets/imgs/startup/testimonial.jpg" alt="" className='testimonial-img' />
                            </div>

                            <div className="card">
                                <img src="/assets/imgs/startup/testimonial.jpg" alt="" className='testimonial-img' />
                            </div>

                            <div className="card">
                                <img src="/assets/imgs/startup/testimonial.jpg" alt="" className='testimonial-img' />
                            </div>

                            <div className="card">
                                <img src="/assets/imgs/startup/testimonial.jpg" alt="" className='testimonial-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
