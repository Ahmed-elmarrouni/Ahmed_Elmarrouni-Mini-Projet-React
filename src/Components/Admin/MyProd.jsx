import  { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

function MyProd() {
    const [myProduct, setMyProducts] = useState([]);
    const [myFilteredProduct, setMyFilteredProducts] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios
            .get(`http://localhost:3000/products`)
            .then((res) => {
                setMyProducts(res.data)
                setMyFilteredProducts(res.data)
            })
            .catch((error) => console.error('Error fetching data:', error));
    }

    const handleSearchProd = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredList = myProduct.filter((product) => {
            return product.name.toLowerCase().includes(searchText);
        });
        setMyFilteredProducts(filteredList);
        console.log(filteredList)
    };


    const deleteProduct = () => {
        alert(`Deleting Product with ID`);
    };

    const deleteButton = (prod) => {
        return <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={() => deleteProduct(prod.id)}
        />
    }

    return (
        <>
            <h1>My products</h1>
            <div className="card">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder="Search for product ..."
                        onChange={(e) => handleSearchProd(e)}
                        style={{ width: '25rem' }}
                    />
                </span>
            </div>

            <div className="card">
                <DataTable value={myFilteredProduct} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Product name" sortable></Column>
                    <Column field="price" header="Price per one" sortable></Column>
                    <Column field="stock" header="Stock" sortable></Column>
                    <Column body={deleteButton} header="Delete Product" />
                </DataTable>

            </div>
        </>
    );
}

export default MyProd;
