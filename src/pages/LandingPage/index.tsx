import { Fragment, useState } from 'react'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LGetToken from '@/pages/LandingPage/LGetToken';
import LCounter from '@/pages/LandingPage/LCounter';
import LFeatures from '@/pages/LandingPage/LFeatures';
import LTable from '@/pages/LandingPage/LTable';
import LOneex from '@/pages/LandingPage/LOneex';

const Landing = (): JSX.Element => {
    return (
        <Fragment>

            <Navbar />

            <main>
                <LOneex />
                <LTable />
                <LFeatures />
                <LCounter />
                <LGetToken />
            </main>

            <Footer />

        </Fragment>
    )
};

export default Landing
