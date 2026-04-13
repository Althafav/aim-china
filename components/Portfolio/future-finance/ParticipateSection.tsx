
import React from 'react';

import { FaCheck } from 'react-icons/fa';
import { Serviceitem } from '@/models/serviceitem';
import { Portfoliopage } from '@/models/portfoliopage';



interface PageDataProps {
    pageData: Portfoliopage | null;
}

const ParticipateSection: React.FC<PageDataProps> = ({ pageData }) => {


    if (!pageData) {
        return <></>;
    }


    return (
        <>
            <div className='participate-section-wrapper'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-lg-center justify-content-md-start justify-content-center">

                            <div>

                                <h2 className='mb-4 heading'>{pageData.whoparticipateheading.value}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="whocanparticipate-item-wrapper mt-4">

                        <div className='row g-3'>
                            {pageData.whoparticipateitems.value.map((m: any, index: number) => {
                                var item: Serviceitem = m;
                                return (
                                    <div className="col-lg-6" key={`whocan-${index}`}>
                                        <div className='whocanparticipate-card '>
                                            <h5 className='name d-flex gap-4 '><FaCheck />{item.name.value}</h5>
                                        </div>
                                    </div>

                                )

                            })}
                        </div>





                    </div>
                </div>
            </div>

            



        </>

    );
}


export default ParticipateSection;
