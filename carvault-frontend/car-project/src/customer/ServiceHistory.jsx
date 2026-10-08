import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceHistory = () => {

    const [history, setHistory] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
    const [centers, setCenters] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));


    // Get data

    const getData = async () => {

        try {

            const historyResponse = await axios.get(
                'http://localhost:3000/service-history'
            );

            const vehicleResponse = await axios.get(
                'http://localhost:3000/vehicles'
            );

            const serviceResponse = await axios.get(
                'http://localhost:3000/services'
            );

            const centerResponse = await axios.get(
                'http://localhost:3000/service-centers'
            );


            const myHistory = historyResponse.data.filter(
                item =>
                    item.userId === user.id ||
                    item.userId?._id === user.id
            );


            setHistory(myHistory);
            setVehicles(vehicleResponse.data);
            setServices(serviceResponse.data);
            setCenters(centerResponse.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getData();

    }, []);


    // Total expense

    const totalExpense = history.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    );


    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold">
                SERVICE HISTORY
            </h1>

            <p className="text-gray-400 mt-2">
                View your previous vehicle services
            </p>


            {/* Total */}

            <div className="bg-[#0f172a] p-5 rounded-xl mt-6">

                <p className="text-gray-400">
                    Total Service Expense
                </p>

                <h2 className="text-3xl font-bold text-blue-400 mt-2">
                    ₹{totalExpense}
                </h2>

            </div>


            {/* History */}

            {history.length === 0 ? (

                <div className="bg-[#0f172a] p-6 rounded-xl mt-6">

                    No Service History

                </div>

            ) : (

                <div className="mt-6">

                    {history.map((item) => {

                        const vehicle = vehicles.find(
                            v => v._id === item.vehicleId
                        );

                        const service = services.find(
                            s => s._id === item.serviceId
                        );

                        const center = centers.find(
                            c =>
                                c._id === item.serviceCenterId ||
                                c.userId === item.serviceCenterId
                        );


                        return (

                            <div
                                key={item._id}
                                className="bg-[#0f172a] p-6 rounded-xl mb-4"
                            >

                                <h2 className="text-xl font-bold">
                                    Service History
                                </h2>

                                <p className="mt-4">
                                    Vehicle: {vehicle?.brand} {vehicle?.model}
                                </p>

                                <p className="mt-2">
                                    Registration Number:{' '}
                                    {vehicle?.registrationNumber}
                                </p>

                                <p className="mt-2">
                                    Service: {service?.serviceName}
                                </p>

                                <p className="mt-2">
                                    Service Center: {center?.name}
                                </p>

                                <p className="mt-2">
                                    Date:{' '}
                                    {new Date(
                                        item.serviceDate
                                    ).toLocaleDateString('en-IN')}
                                </p>

                                <p className="text-blue-400 font-bold text-xl mt-4">
                                    ₹{item.price}
                                </p>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

};

export default ServiceHistory;