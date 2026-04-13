import { EntrepreneurPortfolio } from '@/models/entrepreneur_portfolio';
import { Partnerspageitem } from '@/models/partnerspageitem';
import { Portfoliopage } from '@/models/portfoliopage';
import { Serviceitem } from '@/models/serviceitem';
import React from 'react'


interface PageDataProps {
    pageData: EntrepreneurPortfolio | null;
}

const KeyPlayersSME: React.FC<PageDataProps> = ({ pageData }) => {

    if (!pageData) {
        return <></>;
    }

    return (
        <div className='keyplayers-carousel-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className='section-heading text-center'> {pageData.keyplayersheading.value}</h2>
                    </div>
                </div>

                <div className='keyplayers-carousel owl-carousel mt-lg-5 mt-3'>
                    {pageData.keyplayersitems.value.map((m: any, index: number) => {
                        var item: Partnerspageitem = m;
                        return (
                            <div className='key-players-wrap' key={`keyplayers-${index}`}>
                                <div className="keyplayers-card">

                                    <img width={175} height={175} src={item.logo?.value[0]?.url} alt={item.name.value}
                                        style={{ objectFit: "contain", marginRight: "10px" }} className='key-player-image' />
                                </div>


                                <div className="card-body-speaker">
                                    <p className="key-player-name text-dark" >{item.name.value}</p>

                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default KeyPlayersSME;
