import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Messages } from 'primereact/messages';
import axios from "axios";
import 'primeicons/primeicons.css';
import { DataView } from 'primereact/dataview';

function Purchases() {
    const msgs = useRef(null);
    const [stateOrders, setStateOrders] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/orders`)
            .then((res) => setStateOrders(res.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                if (msgs.current) {
                    msgs.current.show([
                        { sticky: true, severity: 'error', summary: 'Error', detail: 'There are no orders', closable: false }
                    ]);
                }
            });
    }


    // Delete Prod function
    // const onDeleteProd = (index) => {
    // Define the logic for deleting a product
    // };

    // const totalPrice = stateOrders.reduce((sum, product) => sum + product.price, 0);

    return (
        <>
            {/* Back to home page button */}
            <Link to="/">
                <Button label="Back to home page" icon="pi pi-arrow-left" />
            </Link>
            {/* Total price display */}
            {/* <div className="card flex p-4">
                <h1>Total price : {totalPrice.toFixed(2)}</h1>
            </div> */}
            <Messages ref={msgs} />


            <div className="card flex p-2">
                {stateOrders.map((product, index) => (
                    <div className="p-4 border-1 surface-border surface-card border-round" id="cardProducts" key={product.id}>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <img
                                id="prodImg"
                                className="w-4  shadow-2 border-round"
                                src={product.image}
                                alt="Product"
                                style={{ width: "100%" }}
                                preview
                            />
                            <div className="text-2xl font-bold"><h3>{product.name}</h3></div>
                            <div className="text-2xl font-bold" style={{ marginBottom: "10px" }}><b>Price : </b>{product.price} Dh</div>
                            <div className="text-2xl font-bold"><i><b>Description : </b>{product.description}</i></div>
                        </div>
                        <Button className="deleteBtn" severity="danger" onClick={() => onDeleteProd(index)}>Delete </Button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Purchases;




