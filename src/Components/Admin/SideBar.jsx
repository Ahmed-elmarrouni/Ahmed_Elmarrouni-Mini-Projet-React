import React from 'react';
import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        {
            label: 'Costomers', icon: 'pi pi-users',
            command: () => navigate('/Costomers')
        },
        {
            label: 'Add New costomer', icon: 'pi pi-user-plus',
            command: () => navigate('/NewCostom')
        },
        {
            label: 'Products', icon: 'pi pi-shopping-bag',
            command: () => navigate('/MyProd')
        },
        {
            label: 'Add new product', icon: 'pi pi-plus-circle',
            command: () => navigate('/AddProd')
        },
        {
            label: 'Chart', icon: 'pi pi-chart-bar',
            command: () => navigate('/Chart')
        }
    ];

    return (
        // TieredMenu
        <>
            {/* <div className='card' style={{ display: "flex" }}> */}
                <TieredMenu model={items} orientation="left" style={{ height: "37rem", width: "20%" }} />
                {/* <div className='card' id="content" style={{ backgroundColor: "green", width: "100%" }}>

                </div> */}
            {/* </div> */}
        </>
    );
}
