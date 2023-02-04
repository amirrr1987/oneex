import { Fragment, useState } from 'react'
import Footer from '@/components/TheFooter';
import Navbar from '@/components/TheNavbar';
import TheOneex from '@/pages/TheLanding/TheOneex';
import TheTable from '@/pages/TheLanding/TheTable';
import TheCounter from '@/pages/TheLanding/TheCounter';
import TheFeatures from '@/pages/TheLanding/TheFeatures';
import TheGetToken from '@/pages/TheLanding/TheGetToken';
import TheResponsive from '@/pages/TheLanding/TheResponsive';

const TheLanding = (): JSX.Element => {
    return (
        <Fragment>

            <Navbar />

            <main>
                <TheOneex />
                <TheTable />
                <TheFeatures />
                <TheCounter />
                <TheGetToken />
                <TheResponsive />
            </main>

            <Footer />

        </Fragment>
    )
};

export default TheLanding
