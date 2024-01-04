// import React from 'react';
// import { InputText } from 'primereact/inputtext';
// import React, { useState, useRef } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Messages } from 'primereact/messages';
// import axios from 'axios';

// function AddProd() {
//     const msgs = useRef(null);
//     const successMsg = useRef(null);

//     const [prodName, setProdName] = useState("");
//     const [prodPrice, setProdPrice] = useState("");
//     const [prodDescp, setProdDescrip] = useState("");
//     const [prodStock, setProdStock] = useState("");
//     const [prodImg, setProdImg] = useState("");

//     const cities = [
//         { label: 'Tetouan', value: 'Tetouan' },
//         { label: 'Casablanca', value: 'Casablanca' },
//         { label: 'Rabat', value: 'Rabat' },
//         { label: 'Marrakech', value: 'Marrakech' },
//         { label: 'Fes', value: 'Fes' },
//         { label: 'Tangier', value: 'Tangier' },
//         { label: 'Agadir', value: 'Agadir' },
//         { label: 'Meknes', value: 'Meknes' },
//         { label: 'Ouarzazate', value: 'Ouarzazate' },
//         { label: 'Chefchaouen', value: 'Chefchaouen' },
//         { label: 'Essaouira', value: 'Essaouira' },
//     ];


//     const handleAddProd = async () => {
//         if (!prodDescp || !prodName || !prodPrice || !prodImg || !prodStock) {
//             msgs.current.show([
//                 { sticky: true, severity: 'error', summary: 'Error', detail: 'Please fill in all the required fields', closable: false }
//             ]);
//             return;
//         }

// const response = await axios.post(`http://localhost:3000/products`, {
//     id: "",
//     name: prodName,
//     price: prodPrice,
//     description: prodDescp,
//     stock: prodStock,
//     image: prodImg
// });

// setProdName("");
// setProdPrice("");
// setProdDescrip("");
// setProdStock("");
// setProdImg("");

//         successMsg.current.show([
//             { sticky: true, severity: 'success', summary: 'Success', detail: 'Congratulations! Your account has been created successfully.', closable: false }
//         ]);


//     }


//     const handleSubmit = (event) => {
//         event.preventDefault();
//     };

//     return (
//         <>
//             <Messages ref={msgs} />
//             <Messages ref={successMsg} />

//             <h1>Add new Products</h1>

//             <div className='SignupContainer'>

//                 <form className="row g-3" style={{ width: '50%' }} onSubmit={handleSubmit}>
//                     <div className="col-md-6" style={{ marginTop: '40px' }}>
//                         <label htmlFor="inputProdName" className="form-label">Enter product name :</label><br />
//                         <InputText type='text' id="inputProdName" className="form-control" required value={prodName} onChange={(e) => setProdName(e.target.value)} />
//                     </div>

//                     <div className="col-md-6" style={{ marginBottom: '10px' }}>
//                         <label htmlFor="priceInput" className="form-label" keyfilter="price">Enter product price :</label><br />
//                         <InputText type='number' id="priceInput" className="form-control" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
//                     </div>

//                     <div className="col-md-6" style={{ marginBottom: '10px' }}>
//                         <label htmlFor="inputDescrip" className="form-label">Enter product description:</label><br />
//                         <InputText toggleMask id="inputDescrip" className="form-control" required value={prodDescp} onChange={(e) => setProdDescrip(e.target.value)} />
//                     </div>

//                     <div className="col-12" style={{ marginBottom: '10px' }}>
//                         <label htmlFor="inputAddress" className="form-label">Enter product stock number :</label><br />
//                         <InputText id="inputAddress" className="form-control" required placeholder="123 " value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
//                     </div>

//                     <div className="col-12 margin-around-button">
//                         <Button type="submit" label="Add new product" id='newProd' className="btn btn-primary" onClick={() => handleAddProd()} />
//                     </div>
//                 </form>
//             </div>

//         </>
//     )
// }

// export default AddProd



import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import axios from 'axios';

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
            <Messages ref={msgs} />
            <Messages ref={successMsg} />

            <h1>Add new Products</h1>

            <div className='card'>
                <form className="row g-3" style={{ width: '50%' }} onSubmit={(e) => e.preventDefault()}>
                    <div className="col-md-6" style={{ marginTop: '40px' }}>
                        <label htmlFor="inputProdName" className="form-label">Enter product name:</label><br />
                        <InputText type='text' id="inputProdName" className="form-control" required value={prodName} onChange={(e) => setProdName(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="priceInput" className="form-label" keyfilter="price">Enter product price:</label><br />
                        <InputText type='number' id="priceInput" className="form-control" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputDescrip" className="form-label">Enter product description:</label><br />
                        <InputText toggleMask id="inputDescrip" className="form-control" required value={prodDescp} onChange={(e) => setProdDescrip(e.target.value)} />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputAddress" className="form-label">Enter product stock number:</label><br />
                        <InputText id="inputAddress" className="form-control" required placeholder="123 " value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="imageInput" className="form-label">Upload product image:</label><br />
                        <input type="file" id="imageInput" accept="image/*" onChange={(e) => setProdImg(e.target.files[0])} />
                    </div>

                    <div className="col-12 margin-around-button">
                        <Button type="button" label="Add new product" style={{width: "50%"}}  className="btn btn-primary" onClick={handleAddProd} />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProd;
