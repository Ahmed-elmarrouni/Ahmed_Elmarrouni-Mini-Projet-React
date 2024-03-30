import axios from "axios";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Toast } from 'primereact/toast';
import { useCounter } from 'primereact/hooks';



function CheckoutPg() {
    const { id } = useParams();
    const [checkoutProd, setCheckoutProd] = useState({});


    useEffect(() => {
        async function fetchSingleProduct() {
            try {
                const res = await axios.get(`http://localhost:3000/products/${id}`);
                setCheckoutProd(res.data);
            } catch (error) {
                console.error("this is the error", error);
            }
        }
        fetchSingleProduct();
    }, [id]);

    const toast = useRef(null);

    const handleBuyProd = () => {
        if (count > 0) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Thanks for Buying the totale price is ${totalPrice.toFixed(2)} dh` });
        } else {
            toast.current.show({ severity: 'warn', summary: 'Error ', detail: `Select how much do u need of this product` });
        }
    }

    const { count, increment, decrement, reset } = useCounter(0);

    const handleDecrement = () => {
        if (count > 0) {
            decrement();
        }
    };


    const totalPrice = checkoutProd.price * count;

    return (
        <>
            <h1 className="card  text-2xl font-bold" style={{ textAlign: "center", color: "red" }}>Checkout</h1>

            <Link to="/">
                <Button label="Back to home page" icon="pi pi-arrow-left" />
            </Link>

            <Toast ref={toast} />

            <div className="card" style={{ textAlign: "center", display: "flex" }}>
                <img id="cardImg"
                    className="card"
                    alt="ecommerce"
                    src={checkoutProd.image}
                    style={{ width: "20rem", height: "20rem", border: "2px solid", boxShadow: "5px 10px #888888" }}
                />
                <div style={{ marginLeft: "10%" }}>
                    <h1>{checkoutProd.name}</h1>
                    <h3>Price : {checkoutProd.price} dh</h3>

                    <div className="card flex flex-column align-items-center">
                        <h3 className="font-bold text-4xl mb-5">{count} Unite</h3>
                        <div className="flex flex-auto gap-3" style={{ width: "175px", display: "flex", marginLeft: "43%" }}>
                            <Button icon="pi pi-plus" className="p-button-outlined   p-button-success" onClick={increment}></Button>
                            <Button icon="pi pi-minus" style={{ marginLeft: "15px" }} className="p-button-outlined  " onClick={handleDecrement}></Button>
                            <Button icon="pi pi-times" style={{ marginLeft: "15px" }} className="p-button-outlined  p-button-danger" onClick={reset}></Button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="card" style={{ textAlign: "center", color: "red" }}>
                Total Price : <b>{totalPrice.toFixed(2)}</b> mad
            </h2>

            <Button severity="danger" style={{ textAlign: "center" }} label="BUY" onClick={handleBuyProd} icon="pi pi-" />

        </>
    )
}

export default CheckoutPg
