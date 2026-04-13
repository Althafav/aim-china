import Link from 'next/link'
import React from 'react'

export default function FCMenuComponent() {
    return (
        <div className='Future-Cities-menu-component-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <ul className='menu-items'>

                            <Link href="/future-cities">

                                <li>Home</li>
                            </Link>

                            <Link href="/future-cities/about">

                                <li>About</li>
                            </Link>

                            {/* <Link href="/foreign-direct-investment/agenda">

                                <li>Agenda</li>
                            </Link> */}

                            <Link href="/future-cities/awards">

                                <li>Awards</li>
                            </Link>


                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
