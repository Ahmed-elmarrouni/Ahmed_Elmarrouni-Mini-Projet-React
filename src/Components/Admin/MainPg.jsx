import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from 'primereact/chart';


function MainPg() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        getData();
        getCartData();
    }, []);

    function getData() {
        // FETCHING PROD DATA
        axios.get(`http://localhost:3000/products`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => console.error('Error products:', error));
        // FETCHING USERS ADATA
        axios.get(`http://localhost:3000/users`)
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((error) => console.error('Error customers:', error));
        // FETCHING ORDERS DATA
        axios.get(`http://localhost:3000/orders`)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => console.error('Error orders:', error));
    }


    // CHART
    const [cartData, setCartData] = useState([]);
    const [chartOptions, setChartOptions] = useState({});


    function getCartData() {
        // FETCHING CHART CART DATA
        axios.get(`http://localhost:3000/carts`)
            .then((res) => {
                const data = {
                    labels: res.data.map(cart => cart.user_id),
                    datasets: res.data.map(cart => ({
                        label: `User ${cart.user_id} orders`,
                        data: cart.items.map(item => item.quantity),
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 2
                    }))
                };

                const chartOptions = {
                    tooltips: {
                        callbacks: {
                            title: (tooltipItem, data) => {
                                const userId = data.labels[tooltipItem[0].index];
                                return `User ${userId}'s Orders`;
                            },
                            label: (tooltipItem, data) => {
                                const productId = res.data[tooltipItem.datasetIndex].items[tooltipItem.index].product_id;
                                const quantity = tooltipItem.yLabel;
                                return `Product ID: ${productId}, Quantity: ${quantity}`;
                            }
                        }
                    }
                };

                setCartData(data);
                setChartOptions(chartOptions);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }







    return (
        <>
            {/* MAIN PAGE */}
            <div style={{ display: "flex", width: "100%", marginTop: "30px" }}>
                <div className="card" style={{ width: "30%", textAlign: "center" }}>
                    <h1 style={{ color: "red", textAlign: "center" }}>N° of my products : <i> {products.length}</i></h1>
                </div>
                <div className="card" style={{ width: "30%", marginLeft: "60px", textAlign: "center" }}>
                    <h1 style={{ color: "green", textAlign: "center" }}>N° of my customers : <i>{customers.length}</i></h1>
                </div>
                <div className="card" style={{ width: "30%", marginLeft: "60px", textAlign: "center" }}>
                    <h1 style={{ color: "blue" }}>N° of orders : <i>{orders.length}</i></h1>
                </div>
            </div>
            {/* SAMPLE CHART */}
            <div className="card" style={{ width: "75%", marginLeft: "10%" }}>
                <p>CART DATA</p>
                <Chart type="bar" data={cartData} options={chartOptions} />
            </div>

        </>
    )
}

export default MainPg
