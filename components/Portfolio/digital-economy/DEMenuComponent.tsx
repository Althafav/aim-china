import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function DEMenuComponent() {
    const router = useRouter();
    const isAICRoute = router.pathname.startsWith('/digital-economy/ai-alliance')
    const isAboutRoute = router.pathname.startsWith('/digital-economy/about')
    return (
        <>
            <div className='FDI-menu-component-wrapper DE'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <ul className='menu-items'>


                                <Link href="/digital-economy/">

                                    <li>Home</li>
                                </Link>

                                <Link href="/digital-economy/about">

                                    <li>About</li>
                                </Link>

                                <Link href="/digital-economy/ai-alliance">

                                    <li>AI World Championship</li>
                                </Link>





                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            {/* {!isAICRoute && !isAboutRoute && (
                <div className='promo-ai-wrapper'>
                    <div className="container">
                        <div className="row">
                            <div className="promo-ai-container">
                                <p className=' text-white'>JOIN THE AI COMMUNITY TODAY!</p>
                                <Link href="https://survey.zohopublic.com/zs/dKDHDr" >
                                    <button className='promo-ai-btn'>Apply Now</button>

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            )} */}



        </>
    )
}
