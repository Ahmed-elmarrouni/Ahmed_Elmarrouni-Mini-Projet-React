import axios from "axios";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { useCounter } from 'primereact/hooks';
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../../reducers/cartSlice";

function ProdDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch()
    const [prodDetails, setProdDetails] = useState({});
    const { count, increment, decrement, reset } = useCounter(0);

    const handleDecrement = () => {
        if (count > 0) {
            decrement();
        }
    };
    const totalPrice = prodDetails.price * count;

    const handleAddCart = () => {
        dispatch(handleAddToCart(prodDetails))
        navigate("/Purchases")
    }
    useEffect(() => {
        async function fetchSingleProduct() {
            try {
                const res = await axios.get(`http://localhost:3000/products/${id}`);
                setProdDetails(res.data);
            } catch (error) {
                console.error("this is the error", error);
            }
        }
        fetchSingleProduct();
    }, [id]);

    const toast = useRef(null);

    const handleBuyProd = () => {
        if (count > 0) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Thanks for Buying the totale price is ${totalPrice} dh` });
        } else {
            toast.current.show({ severity: 'warn', summary: 'Error ', detail: `Select how much do u need of this product` });
        }
    }

    // const totalPrice = prodDetails.price * count;

    // const handleAddCart = () => {
    //     dispatch(handleAddToCart(prodDetails))
    //     navigate("/Purchases")
    // }

    return (
        <>
            <Link to="/">
                <Button severity="success" label="Back to home page" icon="pi pi-arrow-left" />
            </Link>
            <Toast ref={toast} />

            <div className="card flex justify-content-center p-4">
                <h1 style={{ textAlign: "center" }}>Product Detail</h1>
            </div>

            <div className="card flex flex-auto gap-3" style={{ display: "flex" }} id="cardDetails" >

                <img id="cardImg"
                    className="card"
                    alt="ecommerce"
                    src={prodDetails.image}
                    style={{ width: "35rem", height: "40rem", border: "2px solid" }}
                />

                <div className="card" id="cardInfo" style={{ width: "35rem", height: "40rem" }}>
                    <span >BRAND NAME :</span>
                    <h1 style={{ fontStyle: "oblique" }}>{prodDetails.name}</h1>
                    <h3>Price : {prodDetails.price} dh</h3>

                    <h2 className="">Description : <i>{prodDetails.description}</i></h2>

                    <div className="card flex flex-column align-items-center">
                        <h3 className="font-bold text-4xl mb-5">{count} Unite</h3>
                        <div className="flex flex-auto gap-3" style={{ width: "160px", display: "flex" }}>
                            <Button icon="pi pi-plus" className="p-button-outlined p-button-rounded  p-button-success" onClick={increment}></Button>
                            <Button icon="pi pi-minus" style={{ marginLeft: "15px" }} className="p-button-outlined p-button-rounded " onClick={handleDecrement}></Button>
                            <Button icon="pi pi-times" style={{ marginLeft: "15px" }} className="p-button-outlined p-button-rounded p-button-danger" onClick={reset}></Button>
                        </div>
                    </div>
                    <div className="flex">
                        <h2>
                            Total Price : <b>{totalPrice.toFixed(2)}</b> mad
                        </h2>
                        <div style={{ display: "flex" }}>
                            <Button severity="danger" label="BUY NOW" onClick={handleBuyProd} />
                            <Button onClick={handleAddCart} label="Add to cart" style={{ marginLeft: "15px" }} />
                            {/* <AddToCartBtn label="add to cart" onClickFunction={handleAddCart}/> */}
                        </div>
                    </div>

                </div>


            </div>

        </>
    );
}
// import PropTypes from 'prop-types';

// export const AddToCartBtn = ({ label, onClickFunction }) => {
    
//     return (
//         <Button
//             onClick={onClickFunction}
//             label={label}
//             style={{ marginLeft: "15px" }}
//         />
//     );
// }

// AddToCartBtn.propTypes = {
//     label: PropTypes.string.isRequired,
//     onClickFunction: PropTypes.func.isRequired,
// };




export default ProdDetails;
