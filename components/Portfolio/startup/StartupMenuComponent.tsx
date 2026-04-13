import Link from 'next/link'
import React from 'react'

export default function StartupMenuComponent() {
    return (
        <div className='startup-menu-component-wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <ul className='menu-items'>
                            <Link href="/startup">

                                <li>Home</li>
                            </Link>

                            {/* <Link href="/startup/unicorns">
                                <li>Aim Unicorns</li>

                            </Link> */}
                            <Link href="/startup/pitch">
                                <li>Pitch Competition</li>

                            </Link>
                            <Link href="/startup/partners">
                                <li>our Partners</li>
                            </Link>

                            <Link target='_blank' href="/packages?portfolio=Startups-Unicorns">
                                <li>DELEGATE PASS</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
