import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import axios from 'axios';
import { Link } from 'react-router-dom';


function NewCostom() {
    const msgs = useRef(null);
    const successMsg = useRef(null);


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

    const [userNameInput, setUserNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [pswrdInput, setPswdInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [zipCodeInput, setZipCodeInput] = useState("");



    const handleAddNewCostomer = async () => {
        if (!userNameInput || !emailInput || !pswrdInput || !addressInput || !cityInput || !zipCodeInput) {
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Please fill in all the required fields to add new user', closable: false }
            ]);
            return;
        }

        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`http://localhost:3000/users`, {
            id: "",
            username: userNameInput,
            email: emailInput,
            password: pswrdInput,
            address: addressInput,
            city: cityInput,
            zipCode: zipCodeInput
        });

        setUserNameInput('');
        setEmailInput('');
        setPswdInput('');
        setAddressInput('');
        setCityInput('');
        setZipCodeInput('');

        successMsg.current.show([
            { sticky: true, severity: 'success', summary: 'Success', detail: 'Congratulations! Your account has been created successfully.', closable: false }
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <Link to="/Dashboard/Costomers">
                <Button
                    label='BACK'
                    icon="pi pi-arrow-left"
                    severity='success'
                />
            </Link>
            <div className='card'>
                <h1 style={{ textAlign: "center" }}>Add New Costomer</h1>
            </div>

            <Messages ref={msgs} />
            <Messages ref={successMsg} />

            <div className='card'>

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6" style={{ marginTop: '40px' }}>
                        <label htmlFor="inputUserNAme" className="form-label">Enter costomer name :</label><br />
                        <InputText type='text' style={{ width: "100%" }} id="inputUserNAme" className="form-control" required value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputEmail4" className="form-label" >Enter costomer email :</label><br />
                        <InputText type='email' style={{ width: "100%" }} id="inputEmail4" className="form-control" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputPassword4" className="form-label">Enter  password :</label><br />
                        <Password toggleMask style={{ width: "100%" }} id="inputPassword4" className="form-control" required value={pswrdInput} onChange={(e) => setPswdInput(e.target.value)} />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputAddress" className="form-label">Enter costomer address :</label><br />
                        <InputText id="inputAddress" style={{ width: "100%" }} className="form-control" required placeholder="Av FAR Tetouan 123" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                    </div>

                    <div className="col-md-4" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputState" className="form-label" >Choose costomer City :</label><br />
                        <Dropdown id="inputState" style={{ width: "100%" }} options={cities} required placeholder="Choose..." className="form-select" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
                    </div>

                    <div className="col-md-2" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputZip" className="form-label">Enter Zip code :</label><br />
                        <InputText id="inputZip" style={{ width: "100%" }} className="form-control" required value={zipCodeInput} onChange={(e) => setZipCodeInput(e.target.value)} />
                    </div>
                    <div className="col-12 margin-around-button">
                        <Button type="submit" style={{ width: "100%" }} label="Add new costomer" id='signupBtn' className="btn btn-primary" onClick={() => handleAddNewCostomer()} />
                    </div>
                </form>
            </div>

        </>
    )
}

export default NewCostom
