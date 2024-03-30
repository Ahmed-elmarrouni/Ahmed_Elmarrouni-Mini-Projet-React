import { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import axios from "axios";
import { TabMenu } from 'primereact/tabmenu';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';


import { useDispatch } from "react-redux";
import { handleAddToCart } from "../../reducers/cartSlice";
// import { AddToCartBtn } from "./ProdDetails";

// import { useScrollIndicator } from "react-use-scroll-indicator";


function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows] = useState(8);
    // using REDUX
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleSearchProd = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredList = products.filter((product) => {
            return product.name.toLowerCase().includes(searchText);
        });
        setFilteredProducts(filteredList);
    };

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        {
            label: 'My Cart',
            icon: 'pi pi-shopping-cart',
            command: () => navigate('/Purchases'),
        },
        {
            label: 'Contact',
            icon: 'pi pi-phone',
            command: () => scrollWin(),
        },
    ];

    function scrollWin() {
        window.scrollTo(0, 1400);
    }

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/products`)
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
            })
            .catch((error) => {
                console.error("Error fetching produc data:", error);
            });

        // FETCHING CARRTS DATA
        // axios.get(`http://localhost:3000/carts`)
        //     .then((res) => {
        //         setCart(res.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching carts Data", error);
        //     });
    }

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    // ***************
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            scrollFunction();
        };
        return () => {
            window.onscroll = null;
        };
    }, []);

    const scrollFunction = () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 30) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const topFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // *****ADD PRODUCT TO CART*******
    const toast = useRef(null);


    const handleAddProdToCart = async (product) => {
        dispatch(handleAddToCart(product))
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product Add to cart Successfully' });
    };


    // ******BUY PRODUCT FUNCTION*******


    // const handleBuyProd = () => {
    //     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Buy Prduct' });
    // }


    // ******SCROOLL INDICATOR******
    // const [state] = useScrollIndicator();

    return (
        < >
            {/* Messages */}
            <Toast ref={toast} />
            {/*  */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }} >
                <TabMenu model={items} />
                <InputText placeholder="Search ..." onChange={(e) => handleSearchProd(e)} />
            </div >
            <br></br>

            <div className="card flex justify-content-center p-4">
                <h1 className="text-2xl font-bold" style={{ textAlign: "center" }}>Elevate Your Tech Game: Explore an Array of Phones, Laptops, and Accessories for Every Lifestyle</h1>
            </div>
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" id="cardContainer">
                {filteredProducts.length === 0 ? (
                    <div className="card" style={{ marginLeft: "30%" }}>
                        <h1 style={{ color: "red" }}>Sorry, these products were not found</h1>
                    </div>
                ) : (
                    <>
                        {filteredProducts.slice(first, first + rows).map((prod) => (
                            <div className="p-4 border-1 surface-border surface-card border-round" id="cardProducts" key={prod.id}>

                                <div className="flex flex-column align-items-center gap-3 py-5">

                                    {/* <Link to="/Dashboard">
                                        <img
                                            id="prodImg"
                                            className="w-4 shadow-2 border-round"
                                            src={prod.image}
                                            alt="Product"
                                            style={{ width: "100%" }}
                                        />
                                    </Link> */}
                                    {/* ************************************************************** */}
                                    <Link to={`ProdDetails/${prod.id}`}>
                                        <div className="container">
                                            <img
                                                id="prodImg"
                                                className="w-4 shadow-2 border-round"
                                                src={prod.image}
                                                alt="Product"
                                                style={{ width: "100%" }}
                                            />
                                            <div className="overlay">
                                                <div className="text">See Product Details</div>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* ************************************************************** */}

                                    <div className="text-2xl font-bold"><h3>{prod.name}</h3></div>
                                    <div className="text-2xl font-bold" style={{ marginBottom: "10px" }}><b>Price : </b>{prod.price} Dh</div>
                                </div>
                                <div className="flex justify-content-center" >
                                    <Button
                                        style={{ width: "40%" }}
                                        label="Add to cart"
                                        icon="pi pi-shopping-cart"
                                        severity="success"
                                        className="w-10rem"
                                        onClick={() => handleAddProdToCart(prod)}
                                        key={prod.id}
                                    ></Button>
                                    {/* <AddToCartBtn label="add to cart" onClickFunction={handleAddProdToCart} /> */}
                                    <Link to={`CheckoutPg/${prod.id}`}>
                                        <Button
                                            style={{ width: "40%", marginLeft: "40px" }}

                                            label="Buy now"
                                            icon="pi pi-shopping-bag"
                                            severity="warning"
                                            className="w-10rem"
                                        // onClick={handleBuyProd}
                                        ></Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {/* Pagination */}
            <Paginator
                style={{ justifySelf: 'center', display: 'grid', gridColumn: '1 / -1' }}
                first={first}
                rows={rows}
                totalRecords={filteredProducts.length}
                onPageChange={onPageChange}
                template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }}
                className="custom-paginator"
            />

            {/* Scroll top Button */}

            <Button
                onClick={topFunction}
                id="scrolTopBtn"
                title="Go to top"
                severity="help"
                style={{ display: showButton ? 'block' : 'none' }}
                icon="pi pi-arrow-up text-base"
            >
                <b>Top</b>
            </Button>

        </>
    );
}

export default Products;
