import Link from 'next/link'
import React from 'react'

export default function GlobalTradeMenuComponent() {
    return (
        <div className='FDI-menu-component-wrapper GT'>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <ul className='menu-items'>

                            <Link href="/global-trade">

                                <li>Home</li>
                            </Link>

                            <Link href="/global-trade/about">

                                <li>About</li>
                            </Link>


                            <Link href="/global-trade/trade-tech-forum">

                                <li>Trade Tech Forum</li>
                            </Link>


                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
