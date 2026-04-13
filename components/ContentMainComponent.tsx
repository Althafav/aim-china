import Link from 'next/link'
import React from 'react'

export default function ContentMainComponent(props: any) {
    return (
        <>
            <div className="inner-banner-wrapper">
                <div className="container container-bg">
                    <img src="/assets/imgs/content-bg.svg" alt="" className='bg-pattern' />

                    <div className="inner-banner-content">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                            </ol>
                        </nav>
                        <h1 className='page-heading'>{props.title}</h1>
                    </div>
                </div>


                <div>
                    {props.children}
                </div>
            </div>
        </>
    )
}
