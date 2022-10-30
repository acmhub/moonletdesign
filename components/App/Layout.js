import React from 'react';
import Head from 'next/head';

import Navigation from './Navigation';

export default function Layout({ title, description, pageID, children }) {
    return (
        <React.Fragment>
            <Head>
                <title>
                    {title ? `${title} - Moonlet Design&Stuff` : 'Moonlet Design & Stuff - Visual branding and design'}
                </title>
                {description && <meta name="description" content={description} />}
            </Head>

            <div className={`${pageID}-page`}>
                <Navigation />
                <main>{children}</main>
            </div>
        </React.Fragment>
    );
}
