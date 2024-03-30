import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from 'primereact/chart';

function ChartComponent() {
    // Product Stock
    const [productsData, setProductsData] = useState("");
    const [chartOptions,] = useState({});

    useEffect(() => {
        getProdData();
        getUsersData();

    }, []);

    function getProdData() {
        axios.get(`http://localhost:3000/products`)
            .then((res) => {
                const data = {
                    labels: res.data.map(product => product.name),
                    datasets: [
                        {
                            label: 'Stock',
                            data: res.data.map(product => product.stock),
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgb(75, 192, 192)',
                            ],
                            borderWidth: 2
                        }
                    ]
                };

                setProductsData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    // Users orders
    const [usersData, setUsersData] = useState("")

    // useEffect(() => {
    //     getUsersData();
    // }, []);

    function getUsersData() {
        axios.get(`http://localhost:3000/orders`)
            .then((res) => {
                const userOrders = {};

                res.data.forEach(order => {
                    const userId = order.user_id;
                    const totalOrder = order.total;

                    if (userOrders[userId]) {
                        userOrders[userId] += totalOrder;
                    } else {
                        userOrders[userId] = totalOrder;
                    }
                });

                const data = {
                    labels: Object.keys(userOrders),
                    datasets: [
                        {
                            label: 'Total price',
                            data: Object.values(userOrders),
                            backgroundColor: [
                                'rgba(54, 162, 23, 0.2)',
                            ],
                            borderColor: [
                                'rgb(54, 162, 35)',
                            ],
                            borderWidth: 2
                        }
                    ]
                };

                setUsersData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }
    return (
        <>
            <div className="card">
                <h1 style={{ textAlign: "center" }}>Chart</h1>
            </div>
            <div >
                <div className="card">
                    <p>Products stock</p>
                    <Chart type="bar" data={productsData} options={chartOptions} />
                </div>
                <div className="card" >
                    <p>Total Orders per User</p>
                    <Chart type="bar" data={usersData} options={chartOptions} />
                </div>
            </div>
        </>
    );
}

export default ChartComponent;

