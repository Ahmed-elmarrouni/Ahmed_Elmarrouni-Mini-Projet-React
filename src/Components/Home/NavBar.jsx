// // import { TabMenu } from 'primereact/tabmenu';
// // import { InputText } from 'primereact/inputtext';
// // import 'primeicons/primeicons.css';
// // import { useNavigate } from 'react-router-dom';

// // function NavBar() {
// //     const navigate = useNavigate();

// //     // const [myProduct, setMyProducts] = useState([]);
// //     // const [myFilteredProduct, setMyFilteredProducts] = useState([]);

// //     // useEffect(() => {
// //     //     getData();
// //     // }, []);

// //     // function getData() {
// //     //     axios
// //     //         .get(`http://localhost:3000/products`)
// //     //         .then((res) => {
// //     //             setMyProducts(res.data)
// //     //             setMyFilteredProducts(res.data)
// //     //         })
// //     //         .catch((error) => console.error('Error fetching data:', error));
// //     // }




// //     // const handleSearchProd = (e) => {
// //     //     const searchText = e.target.value.toLowerCase();
// //     //     const filteredList = myProduct.filter((product) => {
// //     //         return product.name.toLowerCase().includes(searchText);
// //     //     });
// //     //     setMyFilteredProducts(filteredList);
// //     //     console.log(filteredList)
// //     // };


// //     const items = [
// //         { label: 'Home', icon: 'pi pi-fw pi-home' },
// //         {
// //             label: 'Cart',
// //             icon: 'pi pi-shopping-cart',
// //             command: () => navigate('/Purchases'),
// //         },
// //         { label: 'Contact', icon: 'pi pi-phone' },
// //     ];


// //     return (
// //         <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
// //             <TabMenu model={items} />
// //             <InputText placeholder="Search ..."  />
// //         </div>
// //     );
// // }

// // export default NavBar;


// import { TabMenu } from 'primereact/tabmenu';
// import { InputText } from 'primereact/inputtext';
// import 'primeicons/primeicons.css';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function NavBar() {
//     const navigate = useNavigate();

//     const [myProducts, setMyProducts] = useState([]);

//     useEffect(() => {
//         getData();
//     }, []);

//     function getData() {
//         axios
//             .get(`http://localhost:3000/products`)
//             .then((res) => {
//                 setMyProducts(res.data);
//             })
//             .catch((error) => console.error('Error fetching data:', error));

//     }

//     const handleSearchProd = (e) => {
//         const searchText = e.target.value.toLowerCase();
//         const filteredList = myProducts.filter((product) => {
//             return product.name.toLowerCase().includes(searchText);
//         });
//         setMyProducts(filteredList);
//         console.log(filteredList)
//     };

//     const items = [
//         { label: 'Home', icon: 'pi pi-fw pi-home' },
//         {
//             label: 'Cart',
//             icon: 'pi pi-shopping-cart',
//             command: () => navigate('/Purchases'),
//         },
//         { label: 'Contact', icon: 'pi pi-phone' },
//     ];

//     return (
//         <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <TabMenu model={items} />
//             <InputText placeholder="Search ..." onChange={(e) => handleSearchProd(e)} />
//         </div>
//     );
// }

// export default NavBar;


function NavBar() {
    return (
        <div>
            
        </div>
    )
}

export default NavBar
