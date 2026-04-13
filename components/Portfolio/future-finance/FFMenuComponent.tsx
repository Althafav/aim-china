import Link from 'next/link'
import React from 'react'

export default function FFMenuComponent() {
    return (
        <div className='Future-finance-component-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <ul className='menu-items'>

                            <Link href="/future-finance">

                                <li>Home</li>
                            </Link>

                            <Link href="/future-finance/about">

                                <li>About</li>
                            </Link>

                            {/* <Link href="/foreign-direct-investment/agenda">

                                <li>Agenda</li>
                            </Link> */}

                            <Link href="/future-finance/awards">

                                <li>Awards</li>
                            </Link>


                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
