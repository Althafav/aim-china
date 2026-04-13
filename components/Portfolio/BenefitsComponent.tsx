import { Portfoliopage } from '@/models/portfoliopage'
import React from 'react'

export default function BenefitsComponent(props: Portfoliopage) {

    return (
        <section className='startup-benefits-wrapper'>
            <div className="section-container">
                <div className="row">
                    <div className="col-lg-4">
                        <div>
                            <h1 className='mainHead'>{props.pageData.benefitsheading.value}</h1>
                            <h2 className='subHead'>{props.pageData.benefitsSubHeading.value}</h2>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-12">
                                <div className="startup-benefit-card">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
