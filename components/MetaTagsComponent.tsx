
import Globals from '@/modules/Globals'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'

export default function MetaTagsComponent() {
    var title = ''
    var description = ''
    const router = useRouter();
    const pathname = router.asPath;
    const image = 'https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png'
    var url = `${Globals.BASE_URL.slice(0, -1)}${pathname}`;

    return (
        <>
            <Head>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="keywords" content={title} />

                <meta property="og:title" content={title} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta name="twitter:card" content={image} />

                <meta property="og:description" content={description} />
                <meta property="og:site_name" content={Globals.SITE_NAME} />
                <meta name="twitter:image:alt" content={title} />
                <link href={url} rel="canonical" />
            </Head>
        </>
    )
}
