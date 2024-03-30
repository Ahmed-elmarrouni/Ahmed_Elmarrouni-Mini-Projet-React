import { TabMenu } from 'primereact/tabmenu';
// import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';

export default function SideBar() {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => navigate('/Dashboard/MainPg') },
        { label: 'Costomers', icon: 'pi pi-users', command: () => navigate('Costomers') },
        // { label: 'Add New costomer', icon: 'pi pi-user-plus', command: () => navigate('NewCostom') },
        { label: 'Products', icon: 'pi pi-shopping-bag', command: () => navigate('MyProd') },
        // { label: 'Add new product', icon: 'pi pi-plus-circle', command: () => navigate('AddProd') },
        { label: 'Chart', icon: 'pi pi-chart-bar', command: () => navigate('Chart') },
        { label: 'Orders', icon: 'pi pi-box', command: () => navigate('Orders') },
    ];

    return (
        <>
            <div className='card' style={{ display: "flex" }}>
                <TabMenu model={items} orientation="left" />
            </div>
            <ScrollTop style={{ width: "40px" }} />

        </>
    );
}
