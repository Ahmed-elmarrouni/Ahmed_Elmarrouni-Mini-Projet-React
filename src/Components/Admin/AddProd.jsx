import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddProd() {
    const msgs = useRef(null);
    const successMsg = useRef(null);

    const [prodName, setProdName] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [prodDescp, setProdDescrip] = useState("");
    const [prodStock, setProdStock] = useState("");
    const [prodImg, setProdImg] = useState([]);

    const handleAddProd = async () => {
        try {
            if (!prodDescp || !prodName || !prodPrice || !prodStock || !prodImg) {
                msgs.current.show([
                    { sticky: true, severity: 'error', summary: 'Error', detail: 'Please fill in all the required fields to add new product', closable: false }
                ]);
                return;
            }

            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`http://localhost:3000/products`, {
                id: "",
                name: prodName,
                price: prodPrice,
                description: prodDescp,
                stock: prodStock,
                image: prodImg
            });

            setProdName("");
            setProdPrice("");
            setProdDescrip("");
            setProdStock("");
            // setProdImg("");


            successMsg.current.show([
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Product added successfully.', closable: false }
            ]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <>

            <Link to="/Dashboard/MyProd" >
                <Button
                    label='BACK'
                    icon="pi pi-arrow-left"
                    severity='success'
                />
            </Link>

            <div className="card">
                <h1 style={{ textAlign: "center" }}>Add new Products</h1>
            </div>
            <Messages ref={msgs} />
            <Messages ref={successMsg} />

            <div className='card'>
                <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="col-md-6" style={{ marginTop: '40px' }}>
                        <label htmlFor="inputProdName" className="form-label">Enter product name:</label><br />
                        <InputText type='text' style={{ width: "100%" }} id="inputProdName" className="form-control" required value={prodName} onChange={(e) => setProdName(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="priceInput" className="form-label" >Enter product price:</label><br />
                        <InputText type='number' style={{ width: "100%" }} id="priceInput" className="form-control" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputDescrip" className="form-label">Enter product description:</label><br />
                        <InputText id="inputDescrip" style={{ width: "100%" }} className="form-control" required value={prodDescp} onChange={(e) => setProdDescrip(e.target.value)} />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputAddress" className="form-label">Enter product stock number:</label><br />
                        <InputText type='number' id="inputAddress" style={{ width: "100%" }} className="form-control" required  value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="imageInput" className="form-label">Upload product image:</label><br />
                        <input type="file" id="imageInput"  onChange={(e) => setProdImg(e.target.files[0])} />
                    </div>

                    <div className="col-12 margin-around-button">
                        <Button type="button" label="Add new product" style={{ width: "100%" }} className="btn btn-primary" onClick={handleAddProd} />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProd;
