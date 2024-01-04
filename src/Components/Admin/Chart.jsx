import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from 'primereact/chart';

function ChartComponent() {
    // Product Stock
    const [productsData, setProductsData] = useState("");
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(`http://localhost:3000/products`)
            .then((res) => {
                const data = {
                    labels: res.data.map(product => product.name),
                    datasets: [
                        {
                            label: 'Stock',
                            data: res.data.map(product => product.stock),
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
                        }
                    ]
                };

                setProductsData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    // Users
    const [usersData, setUsersData] = useState("")

    useEffect(() => {
        getUsersData();
    }, []);

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
                                'rgba(255, 159, 6, 0.2)',
                                'rgba(75, 192, 19, 0.2)',
                                'rgba(54, 162, 23, 0.2)',
                                'rgba(153, 102, 25, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 159, 4)',
                                'rgb(75, 192, 92)',
                                'rgb(54, 162, 35)',
                                'rgb(153, 102, 55)'
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
            <h1>Chart</h1>
            <div style={{ display: "flex" }}>
                <div className="card" style={{ width: "50%" }}>
                    <p>Products stock</p>
                    <Chart type="bar" data={productsData} options={chartOptions} />
                </div>
                <div className="card" style={{ width: "50%" }}>
                    <p>Total Orders per User</p>
                    <Chart type="bar" data={usersData} options={chartOptions} />
                </div>
            </div>
        </>
    );
}

export default ChartComponent;

