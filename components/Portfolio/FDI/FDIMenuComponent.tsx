import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function FDIMenuComponent() {
    const router = useRouter();
    const isFDIAwardsRoute = router.pathname.startsWith('/foreign-direct-investment/awards')
    return (
        <>

            <div className='FDI-menu-component-wrapper'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <ul className='menu-items'>

                                <Link href="/foreign-direct-investment">

                                    <li>Home</li>
                                </Link>

                                <Link href="/foreign-direct-investment/investment-destinations">

                                    <li>Investment Destinations</li>
                                </Link>

                                {/* <Link href="/foreign-direct-investment/agenda">

                                <li>Agenda</li>
                            </Link> */}

                                <Link href="/foreign-direct-investment/awards">

                                    <li>Awards</li>
                                </Link>


                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {isFDIAwardsRoute && (
                <div className='survey-submit-menu bg-white w-100'>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 ">
                                <div className='d-flex justify-content-center gap-lg-5 gap-2 align-items-center flex-lg-row flex-column'>
                                    <p>AIM PERCEPTION STUDY </p>

                                    <div>
                                        <Link href="https://awards.strategic.ae/event/form/0b7bad57-29a7-415e-837a-8b0f9b0140cf">
                                            <button className='cta-btn'>Fill-out the survey</button>
                                        </Link>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}
