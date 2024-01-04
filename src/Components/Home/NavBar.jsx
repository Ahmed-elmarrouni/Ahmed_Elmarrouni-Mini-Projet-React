import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            command: () => navigate('/Purchases'),
        },
        { label: 'Contact', icon: 'pi pi-phone' },
    ];

    return (
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TabMenu model={items} />
            <InputText placeholder="Search ..." />
        </div>
    );
}

export default NavBar;

