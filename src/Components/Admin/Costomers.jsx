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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';


export default function Costomers() {
    const emptyCostomer = {
        id: null,
        username: '',
        email: '',
        city: ''
    };

    const [costomers, setCostomers] = useState(null);
    const [costomerDialog, setcostomerDialog] = useState(false);
    const [deletecostomerDialog, setDeletecostomerDialog] = useState(false);
    const [deletecostomersDialog, setDeletecostomersDialog] = useState(false);
    const [costomer, setCostomer] = useState(emptyCostomer);
    const [selectedcostomers, setSelectedcostomers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
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

    const [filteredCostomers, setFilteredCostomers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/users`)
            .then((res) => {
                setCostomers(res.data), setFilteredCostomers(res.data);
            })
            .catch((error) => console.error('Error fetching data:', error));

        // .then((res) => setCostomers(res.data))
        // .catch((error) => console.error('Error fetching data:', error));
    }

    const handleSearchCstmr = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredCostomers = costomers.filter((costomer) =>
            costomer.username.toLowerCase().includes(searchText) ||
            costomer.email.toLowerCase().includes(searchText) ||
            costomer.city.toLowerCase().includes(searchText)
        );

        setFilteredCostomers(filteredCostomers);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setcostomerDialog(false);
    };

    const hideDeletecostomerDialog = () => {
        setDeletecostomerDialog(false);
    };

    const hideDeletecostomersDialog = () => {
        setDeletecostomersDialog(false);
    };

    const saveCostomer = () => {
        setSubmitted(true);

        if (costomer.username.trim() && costomer.email && costomer.city) {
            let _costomers = [...costomers];
            let _costomer = { ...costomer };

            axios.put(`http://localhost:3000/users/${costomer.id}`, _costomer)
                .then((response) => {
                    console.log('Updat Success', response);
                    const index = findIndexById(costomer.id);
                    _costomers[index] = _costomer;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Costomer Update, Refresh the page', life: 3000 });

                    setCostomers(_costomers);
                    setcostomerDialog(false);
                    setCostomer(emptyCostomer);

                })
                .catch((error) => {
                    console.error('Update Error', error);
                })
            // setCostomers(_costomers);
            // setcostomerDialog(false);
            // setCostomer(emptyCostomer);
        }
    };

    const editcostomer = (costomer) => {
        setCostomer({ ...costomer });
        setcostomerDialog(true);
    };

    const confirmdeleteCostomer = (costomer) => {
        setCostomer(costomer);
        setDeletecostomerDialog(true);
    };

    const deleteCostomer = () => {
        axios.delete(`http://localhost:3000/users/${costomer.id}`)
            .then(() => {
                setCostomers(costomers.filter((val) => val.id !== costomer.id));
                setDeletecostomerDialog(false);
                setCostomer(emptyCostomer);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Costomer Deleted', life: 3000 });
            })
            .catch((error) => console.error('Error deleting costomer:', error));
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < costomers.length; i++) {
            if (costomers[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }

    //     return id;
    // };


    const exportPDF = () => {
        const columns = [
            { title: 'ID', dataKey: 'id' },
            { title: 'Name', dataKey: 'username' },
            { title: 'Email', dataKey: 'email' },
            { title: 'City', dataKey: 'city' },
        ];

        const data = costomers.map((costomer) => ({
            id: costomer.id,
            username: costomer.username,
            email: costomer.email,
            city: costomer.city,
        }));

        const pdf = new jsPDF();
        pdf.autoTable({
            head: [columns.map((col) => col.title)],
            body: data.map((row) => columns.map((col) => row[col.dataKey])),
        });
        pdf.save('table.pdf');
    };



    const confirmDeleteSelected = () => {
        setDeletecostomersDialog(true);
    };

    const deleteSelectedcostomers = () => {
        if (selectedcostomers && selectedcostomers.length > 0) {
            const deletePromises = selectedcostomers.map((selectedcostomer) =>
                axios.delete(`http://localhost:3000/users/${selectedcostomer.id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    const remainingcostomers = costomers.filter((costomer) => !selectedcostomers.includes(costomer));
                    setCostomers(remainingcostomers);
                    setDeletecostomersDialog(false);
                    setSelectedcostomers(null);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'costomers Deleted', life: 3000 });
                })
                .catch((error) => console.error('Error deleting selected costomers:', error));
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _costomer = { ...costomer };

        _costomer[name] = val;

        setCostomer(_costomer);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link to="/Dashboard/NewCostom">
                    <Button
                        label='Add New Costomer'
                        icon="pi pi-user-plus"
                    />
                </Link>
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedcostomers || !selectedcostomers.length}
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
            <React.Fragment>
                <Button icon="pi pi-pencil" outlined className="mr-2" onClick={() => editcostomer(rowData)} />
                <Button icon="pi pi-trash" outlined severity="danger" onClick={() => confirmdeleteCostomer(rowData)} />
            </React.Fragment>
        );
    };

    const headerTemplate = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Costomers</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onChange={(e) => handleSearchCstmr(e)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const costomerDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCostomer} />
        </React.Fragment>
    );

    const deletecostomerDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletecostomerDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCostomer} />
        </React.Fragment>
    );

    const deletecostomersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletecostomersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedcostomers} />
        </React.Fragment>
    );

    return (
        <>
            <div>
                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={filteredCostomers}
                        selection={selectedcostomers}
                        onSelectionChange={(e) => setSelectedcostomers(e.value)}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} costomers"
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

                <Dialog visible={costomerDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="costomer Details" modal className="p-fluid" footer={costomerDialogFooter} onHide={hideDialog}>
                    <div className="field" style={{ marginBottom: '10px' }}>
                        <label htmlFor="username" className="font-bold">
                            Name
                        </label>
                        
                        <InputText
                            id="name"
                            value={costomer.username}
                            onChange={(e) => onInputChange(e, 'username')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !costomer.username })}
                        />
                        {submitted && !costomer.username && <small className="p-error">User name is required.</small>}
                    </div>
                    <div className="field" style={{ marginBottom: '10px' }}>
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <InputText
                            id="email"
                            value={costomer.email}
                            onChange={(e) => onInputChange(e, 'email')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !costomer.email })}
                        />
                        {submitted && !costomer.email && <small className="p-error">Email is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="city" className="font-bold">
                            Choose customer City:
                        </label>
                        <Dropdown
                            id="inputState"
                            options={cities}
                            value={costomer.city}
                            onChange={(e) => onInputChange(e, 'city')}
                            required
                            placeholder="Choose..."
                            className="form-select"
                            style={{ width: '100%' }}
                        />
                        {submitted && !costomer.city && <small className="p-error">City is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={deletecostomerDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletecostomerDialogFooter} onHide={hideDeletecostomerDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {costomer && (
                            <span>
                                Are you sure you want to delete <b>{costomer.username}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog visible={deletecostomersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletecostomersDialogFooter} onHide={hideDeletecostomersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {costomer && <span>Are you sure you want to delete the selected costomers?</span>}
                    </div>
                </Dialog>
            </div>
        </>
    );
}

