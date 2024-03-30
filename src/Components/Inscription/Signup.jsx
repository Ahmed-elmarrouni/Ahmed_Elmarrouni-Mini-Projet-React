/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import axios from 'axios';

const Signup = () => {
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
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Please fill in all the required fields', closable: false }
            ]);
            return;
        }

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
            <h2>Join our community today! Create an account to unlock a world of exciting deals, personalized recommendations, and a seamless shopping experience. Welcome aboard!</h2>
            <Messages ref={msgs} />
            <Messages ref={successMsg} />
            <div className='SignupContainer'>

                <div className='SignupImg' style={{ width: '50%' }}>
                    <img src='/public/Sign up.gif' alt='sign up img' />
                </div>
                <form className="row g-3" style={{ width: '50%' }} onSubmit={handleSubmit}>
                    <div className="col-md-6" style={{ marginTop: '40px' }}>
                        <label htmlFor="inputUserNAme" className="form-label">Enter your user name :</label><br />
                        <InputText type='text' id="inputUserNAme" className="form-control" required value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputEmail4" className="form-label" >Enter your email :</label><br />
                        <InputText type='email' id="inputEmail4" className="form-control" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputPassword4" className="form-label">Enter your password :</label><br />
                        <Password toggleMask id="inputPassword4" className="form-control" required value={pswrdInput} onChange={(e) => setPswdInput(e.target.value)}  />
                    </div>

                    <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputAddress" className="form-label">Enter your address :</label><br />
                        <InputText id="inputAddress" className="form-control" required placeholder="Av FAR Tetouan 123" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                    </div>

                    <div className="col-md-4" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputState" className="form-label" >Choose your City :</label><br />
                        <Dropdown id="inputState" options={cities} required placeholder="Choose..." className="form-select" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
                    </div>

                    <div className="col-md-2" style={{ marginBottom: '10px' }}>
                        <label htmlFor="inputZip" className="form-label">Enter Zip code :</label><br />
                        <InputText id="inputZip" className="form-control" required value={zipCodeInput} onChange={(e) => setZipCodeInput(e.target.value)} />
                    </div>
                    <div className="col-12 margin-around-button">
                        <Button type="submit" label="Sign in" id='signupBtn' className="btn btn-primary" onClick={() => handleAddNewCostomer()} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
