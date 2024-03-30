import { InputText } from 'primereact/inputtext';
import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import emailjs from 'emailjs-com';


const ContactForm = () => {
    const [formStatus, setFormStatus] = React.useState('Send');

    const onSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Submitting...');

        const { name, email, message } = e.target.elements;

        let formData = {
            name: name.value,
            email: email.value,
            message: message.value,
        };

        emailjs
            .send(
                'service_ptdrv8o',
                'template_5ipwmo7',
                formData,
                'ii0nhqob4Qcn5RefI'
            )
            .then(
                (response) => {
                    console.log('Email sent successfully', response);
                    setFormStatus('Sent');
                },
                (error) => {
                    console.error('Error sending email', error);
                    setFormStatus('Error');
                }
            );
    };

    return (
        <div className="card container mt-5">
            <h2 className="mb-3">Contact Me :</h2>

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                        Name :
                    </label>
                    <br></br>
                    <InputText className="form-control" type="text" id="name" name='user_name' required style={{ width: '100%' }} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Email :
                    </label>
                    <br></br>
                    <InputText className="form-control" type="email" id="email" name='user_email' required style={{ width: '100%' }} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="message">
                        Message :
                    </label>
                    <br></br>
                    <InputTextarea className="form-control" id="message" name='message' required style={{ width: '100%' }} />
                </div>
                <Button className="btn btn-danger" type="submit" style={{ justifyContent: 'center' }}>
                    {formStatus}
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;
