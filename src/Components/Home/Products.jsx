import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import axios from "axios";


function Products() {
    const [value, setValue] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/products`)
            .then((res) => setProducts(res.data))
            .catch((error) => console.error("Error fetching data:", error));
    }

    return (
        <>
            <div className="card flex justify-content-cente p-4">
                <h1 className="text-2xl font-bold" style={{ textAlign: "center" }}>Elevate Your Tech Game: Explore an Array of Phones, Laptops, and Accessories for Every Lifestyle</h1>
            </div>

            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 " id="cardContainer">
                {products.map((prod) => (
                    <div className="p-4 border-1 surface-border surface-card border-round" id="cardProducts" key={prod.id}>

                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <img
                                id="prodImg"
                                className="w-4  shadow-2 border-round"
                                src={prod.image}
                                alt="Product"
                                style={{ width: "100%" }}
                                preview
                            />

                            <div className="text-2xl font-bold"><h3>{prod.name}</h3></div>
                            <div className="text-2xl font-bold" style={{ marginBottom: "10px" }}><b>Price : </b>{prod.price} Dh</div>
                            <div className="text-2xl font-bold"><i><b>Description : </b>{prod.description}</i></div>

                        </div>

                        <div className="flex align-items-center justify-content-between">
                            <Button
                                label="Add to cart"
                                icon="pi pi-shopping-cart"
                                severity="danger"
                                className="w-10rem"
                            ></Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Products;


