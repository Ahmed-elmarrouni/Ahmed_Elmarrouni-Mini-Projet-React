import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Messages } from 'primereact/messages';
import { Password } from 'primereact/password';

function Login() {
    const msgs = useRef(null);
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [pswrdInput, setPswrdInput] = useState("");

    const handleLogIn = async () => {
        if (!emailInput || !pswrdInput) {
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Please fill in all the required fields', closable: false }
            ]);
            return;
        }

        // You can add additional validation here if needed before making the API call

        const response = await axios.get(`http://localhost:3000/users`, {
            params: {
                email: emailInput,
                password: pswrdInput,
            }
        });

        const user = response.data.find(user => user.email === emailInput && user.password === pswrdInput);

        if (user) {
            navigate("/");
        } else {
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Invalid email or password', closable: false }
            ]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2>"Hello again! Log in to your account to continue your shopping journey.<br></br> We're delighted to have you back!"
            </h2>
            <Messages ref={msgs} />

            <div className='container' style={{ 'display': "flex", 'justifyContent': "center", "boxShadow": "10px 5px 5px 10px #aaaaaa", "backgroundColor": "#ffffff" }}>
                <div className='LoginImg'>
                    <img src='/public/Login.gif' alt='Login img'></img>
                </div>
                <form className="card" onSubmit={handleSubmit} >
                    <div >
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2" style={{ marginBottom: '20px', marginTop: "30px" }}>
                            <label className="w-6rem">Enter your email :</label><br></br>
                            <InputText tooltip="Email" id="emailInpt" type="email" className="w-12rem" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2" style={{ marginBottom: '15px' }}>
                            <label className="w-6rem">Enter your Password :</label><br></br>
                            <InputText tooltip="Password"  toggleMask id="pswdInpt" type="password" className="w-14rem" value={pswrdInput} onChange={(e) => setPswrdInput(e.target.value)} />
                        </div>
                        <br></br>
                        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                            <Button
                                onClick={() => handleLogIn()}
                                label={"Log in"}
                                icon="pi pi-user"
                                className="w-10rem mx-auto "
                            ></Button>
                        </div>
                    </div>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>

                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                        <Link to="/Signup">
                            <Button
                                label="Sign Up"
                                icon="pi pi-user-plus"
                                severity="success"
                                className="w-10rem"
                            ></Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
