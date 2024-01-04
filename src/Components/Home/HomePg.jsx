import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React from 'react';
import NavBar from './NavBar';
import Products from './Products';
import Footer from './Footer';
// import Purchases from '../Cart/Purchases';


function HomePg() {
    return (
        <>
            <PrimeReactProvider>
                <NavBar />
                <div>
                    {/* <Purchases /> */}
                    <Products />
                    <Footer />
                </div>
            </PrimeReactProvider>

        </>
    );
}

export default HomePg;
