import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

export default function Customers() {
    const emptyProduct = {
        id: null,
        username: '',
        email: '',
        city: ''
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);

    const cities = [
        { label: 'Tetouan', value: 'Tetouan' },
        { label: 'Casablanca', value: 'Casablanca' },
        { label: 'Rabat', value: 'Rabat' },
        { label: 'Marrakech', value: 'Marrakech' },
        { label: 'Fes', value: 'Fes' },
        { label: 'Tangier', value: 'Tangier' },
        { label: 'Agadir', value: 'Agadir' },
        { label: 'Meknes', value: 'Meknes' },
        { label: 'Ouarzazate', value: 'Ouarzazate' },
        { label: 'Chefchaouen', value: 'Chefchaouen' },
        { label: 'Essaouira', value: 'Essaouira' },
    ];

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/users`)
            .then((res) => setProducts(res.data))
            .catch((error) => console.error('Error fetching data:', error));
    }

    const handleSearchProd = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredList = products.filter((product) =>
            product.username.toLowerCase().includes(searchText) ||
            product.email.toLowerCase().includes(searchText) ||
            product.city.toLowerCase().includes(searchText)
        );

        setProducts(filteredList);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.username.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        axios.delete(`http://localhost:3000/users/${product.id}`)
            .then(() => {
                setProducts(products.filter((val) => val.id !== product.id));
                setDeleteProductDialog(false);
                setProduct(emptyProduct);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        if (selectedProducts && selectedProducts.length > 0) {
            const deletePromises = selectedProducts.map((selectedProduct) =>
                axios.delete(`http://localhost:3000/users/${selectedProduct.id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    const remainingProducts = products.filter((product) => !selectedProducts.includes(product));
                    setProducts(remainingProducts);
                    setDeleteProductsDialog(false);
                    setSelectedProducts(null);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
                })
                .catch((error) => console.error('Error deleting selected products:', error));
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[name] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedProducts || !selectedProducts.length}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const headerTemplate = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    onChange={(e) => handleSearchProd(e)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={headerTemplate}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="id" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="username" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="city" header="City" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field" style={{ marginBottom: '10px' }}>
                    <label htmlFor="username" className="font-bold">
                        Name
                    </label>
                    <InputText
                        id="name"
                        value={product.username}
                        onChange={(e) => onInputChange(e, 'username')}
                        required
                        autoFocus
                        className={classNames({ 'p-invalid': submitted && !product.username })}
                    />
                    {submitted && !product.username && <small className="p-error">User name is required.</small>}
                </div>
                <div className="field" style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText
                        id="email"
                        value={product.email}
                        onChange={(e) => onInputChange(e, 'email')}
                        required
                        autoFocus
                        className={classNames({ 'p-invalid': submitted && !product.email })}
                    />
                    {submitted && !product.email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="city" className="font-bold">
                        Choose customer City:
                    </label>
                    <Dropdown
                        id="inputState"
                        options={cities}
                        value={product.city}
                        onChange={(e) => onInputChange(e, 'city')}
                        required
                        placeholder="Choose..."
                        className="form-select"
                        style={{ width: '100%' }}
                    />
                    {submitted && !product.city && <small className="p-error">City is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.username}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

