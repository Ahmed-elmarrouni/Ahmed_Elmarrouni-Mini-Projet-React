import { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';


function MyProd() {
    const emptyProduct = {
        id: null,
        name: '',
        stock: '',
        price: '',
        image: ''
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const [filteredProducts, setFilteredProducts] = useState([]);






    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/products`)
            .then((res) => {
                setProducts(res.data), setFilteredProducts(res.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }

    const handleSearchProd = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchText)
        );

        setFilteredProducts(filteredProducts);
    };


    function hideDialog() {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim() && product.stock && product.price) {
            let _products = [...products];
            let _product = { ...product };

                axios.put(`http://localhost:3000/products/${product.id}`, _product)
                    .then((response) => {
                        console.log('Update Success:', response);
                        const index = findIndexById(product.id);
                        _products[index] = _product;
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated, Refresh Page', life: 3000 });
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                    })
                    .catch((error) => {
                        console.error('Update Error:', error);
                    });
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
        axios.delete(`http://localhost:3000/products/${product.id}`)
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


    const exportPDF = () => {
        const columns = [
            { title: 'ID', dataKey: 'id' },
            { title: 'Name', dataKey: 'name' },
            { title: 'stock', dataKey: 'stock' },
            { title: 'price', dataKey: 'price' },
        ];

        const data = products.map((product) => ({
            id: product.id,
            name: product.name,
            stock: product.stock,
            price: product.price,
        }));

        const pdf = new jsPDF();
        pdf.autoTable({
            head: [columns.map((col) => col.title)],
            body: data.map((row) => columns.map((col) => row[col.dataKey])),
        });
        pdf.save('ProductDAta.pdf');
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        if (selectedProducts && selectedProducts.length > 0) {
            const deletePromises = selectedProducts.map((selectedProduct) =>
                axios.delete(`http://localhost:3000/products/${selectedProduct.id}`)
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
                <Link to="/Dashboard/AddProd">
                    <Button
                        label='Add New Product'
                        icon='pi pi-plus-circle'

                    />
                </Link>

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
        return (
            <Button
                icon="pi pi-download"
                label="Export PDF"
                className="p-button-help"
                onClick={exportPDF}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const headerTemplate = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onChange={(e) => handleSearchProd(e)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </>
    );

    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </>
    );


    const imageBodyTemplate = (rowData) => {
        return (
            <img src={`${rowData.image}`} alt="Product Image" style={{ width: '25%' }} />
        );
    };

    return (
        <>

            <div>

                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={filteredProducts}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        header={headerTemplate}

                    >
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="stock" header="Stock" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="price" header="Price" sortable style={{ minWidth: '12rem' }}></Column>

                        <Column field="image" header="Product Image" body={imageBodyTemplate} style={{ minWidth: '12rem' }}></Column>

                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                    </DataTable>

                </div>

                <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field" style={{ marginBottom: '10px' }}>
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <InputText
                            id="name"
                            value={product.name}
                            onChange={(e) => onInputChange(e, 'name')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !product.name })}
                        />
                        {/* {submitted && !product.name && <small className="p-error">Name is required.</small>} */}
                    </div>
                    <div className="field" style={{ marginBottom: '10px' }}>
                        <label htmlFor="stock" className="font-bold">
                            stock
                        </label>
                        <InputText
                            type='number'
                            id="stock"
                            value={product.stock}
                            onChange={(e) => onInputChange(e, 'stock')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !product.stock })}
                        />
                        {/* {submitted && !product.stock && <small className="p-error">stock is required.</small>} */}
                    </div>

                    <div className="field" style={{ marginBottom: '10px' }}>
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputText
                            id="price"
                            type='number'
                            value={product.price}
                            onChange={(e) => onInputChange(e, 'price')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !product.price })}
                        />
                        {/* {submitted && !product.price && <small className="p-error">Price is required.</small>} */}
                    </div>

                </Dialog>

                <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {product && (
                            <span>
                                Are you sure you want to delete <b>{product.name}</b>?
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
            </div >
        </>

    );
}

export default MyProd