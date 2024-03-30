import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import NavBar from './NavBar';
import Products from './Products';
import Footer from './Footer';
import ContactForm from './ContactForm';
// import Purchases from '../Cart/Purchases';


function HomePg() {
    return (
        <>
            <PrimeReactProvider>
                {/* <NavBar /> */}
                <div>
                    {/* <Purchases /> */}
                    <Products />
                    <br></br>
                    <ContactForm />
                    <Footer />
                </div>
            </PrimeReactProvider>

        </>
    );
}

export default HomePg;
