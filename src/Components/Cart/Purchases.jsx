import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteCart } from "../../reducers/cartSlice";
import { Toast } from 'primereact/toast';
import { useRef, useState } from "react";

function Purchases() {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart);

    const navigate = useNavigate();

    const toast = useRef(null);


    const handleBuyProd = (id) => {
        navigate(`/CheckoutPg/${id}`);
    };




    return (
        <>
            {/* Back to home page button */}
            <Link to="/">
                <Button label="Back to home page" icon="pi pi-arrow-left" />
            </Link>
            {/* * * */}
            <Toast ref={toast} />

            {/*  */}
            <div className="card" >
                <div className="p-4 border-1 surface-border surface-card border-round" id="cardproductss" >
                    {cart.map((product) => (
                        <div className="flex flex-column align-items-center gap-3 py-5" style={{ display: "flex", border: "1px ridge" }} key={product.id}>
                            <img
                                id="prodImg"
                                className="card w-4  shadow-2 border-round"
                                src={product.image}
                                alt="products"
                                style={{ width: "18rem", height: "18rem", border: "2px solid", margin: "20px", boxShadow: "5px 10px #888888" }}
                            />
                            <div className="card">
                                <h1 className="text-2xl font-bold">{product.name}</h1>
                                <h3 className="text-2xl font-bold" style={{ marginBottom: "10px" }}><b>Price : </b>{product.price} Dh</h3>
                                <div className="text-2xl font-bold"><i><b>Description : </b>{product.description}</i></div>
                                <br></br>
                                <br></br>

                                <div style={{ display: "flex" }}>
                                    <Button severity="warning" label="Buy" style={{ width: "40%" }} onClick={() => handleBuyProd(product.id)} />
                                    <Button onClick={() => dispatch(handleDeleteCart(product.id))} className="deleteBtn" severity="danger" label="Delete" style={{ width: "40%", marginLeft: "30px" }} />
                                </div>

                            </div>
                        </div>
                ))}
                    </div>
            </div>
        </>
    );
}

export default Purchases;
