import { Fragment, useState } from 'react'
import Footer from '@/components/TheFooter';
import Navbar from '@/components/TheNavbar';
import TheOneex from '@/pages/TheLanding/TheOneex';
import TheTable from '@/pages/TheLanding/TheTable';
import TheCounter from '@/pages/TheLanding/TheCounter';
import TheFeatures from '@/pages/TheLanding/TheFeatures';
import TheGetToken from '@/pages/TheLanding/TheGetToken';
import TheResponsive from '@/pages/TheLanding/TheResponsive';
import Style from './index.module.css'
const TheLanding = (): JSX.Element => {
    return (
        <Fragment>

            <Navbar />

            <main className={Style.Amir}>
      
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
