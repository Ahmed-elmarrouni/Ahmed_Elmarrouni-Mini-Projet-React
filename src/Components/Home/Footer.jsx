
const Footer = () => {
    return (
        <div id="footer-basic" className="cardContainer" >
            <footer>
                <div className="social" style={{ justifyContent: "space-around" }}>
                    <i className="pi pi-facebook" style={{ fontSize: '2.5rem', marginRight:"20px" }}></i>
                    <i className="pi pi-instagram" style={{ fontSize: '2.5rem', marginRight: "20px" }}></i>
                    <i className="pi pi-twitter" style={{ fontSize: '2.5rem', marginRight: "20px" }}></i>
                    <i className="pi pi-whatsapp" style={{ fontSize: '2.5rem', marginRight: "20px" }}></i>
                    <i className="pi pi-map-marker" style={{ fontSize: '2.5rem', marginRight: "20px" }}></i>
                </div>
                <ul className="list-inline" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <li className="list-inline-item"><a href="#">Home</a></li>
                    <li className="list-inline-item"><a href="#">Services</a></li>
                    <li className="list-inline-item"><a href="#">About</a></li>
                    <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                </ul>
                <ul className="list-inline" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Location</a></li>
                    <li className="list-inline-item"><a href="#">Contact</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
                <br></br>
                <div className="card">

                    <h3 className="copyright">Electro-El_Marrouni © 2024</h3>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
