import React, { useEffect, useState } from 'react';
import SalesChart from '../components/SalesChart';
import { getNumsOfOrderDaily, getRevenueMonthly } from '../../../api/OrderApi';
import PieChartMostSoldProduct from '../components/PieChartMostSoldProduct';


export type SalesMonthlyData = {
    month: string;
    sales: number;
};

const Dashboard = () => {

    const [numsOfOrderDaily, setNumsOfOrderDaily] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState<SalesMonthlyData[]>([]);


    useEffect(() => {
        const fetchNumsOfOrderDaily = async () => {
            const response = await getNumsOfOrderDaily();
            setNumsOfOrderDaily(response.result);
        }
        fetchNumsOfOrderDaily();
    }, []);

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            const response = await getRevenueMonthly();
            setMonthlyRevenue(response.result);
        }
        fetchMonthlyRevenue();
    }, []);

    const salesData = monthlyRevenue.map(item => {
        return {
            month: item.month,
            sales: item.sales,
        };
    });

    return (
        <div>
            <h2 className='mb-5'>Sales Chart</h2>

            <div className="row mb-3">
                <div className="col-md-4">
                    <div style={{ backgroundColor: "#86c7f3", width: "100%", height: "100px", borderRadius: "10px", padding: "15px" }}>
                        <h4 style={{ color: "white" }}>Order Sales Daily</h4>
                        <p style={{ color: "white" }}>{numsOfOrderDaily}</p>
                    </div>

                </div>
                <div className="col-md-4">
                    <div style={{ backgroundColor: "#86c7f3", width: "100%", height: "100px", borderRadius: "10px", padding: "15px" }}>
                        <h4 style={{ color: "white" }}>Daily sales</h4>
                        <p style={{ color: "white" }}>1000</p>
                    </div>

                </div>
                <div className="col-md-4">
                    <div style={{ backgroundColor: "#86c7f3", width: "100%", height: "100px", borderRadius: "10px", padding: "15px" }}>
                        <h4 style={{ color: "white" }}>Daily sales</h4>
                        <p style={{ color: "white" }}>1000</p>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <SalesChart salesData={salesData} />
                </div>
                <div className="col-md-6">
                    <PieChartMostSoldProduct />
                </div>

            </div>


        </div >
    );
};

export default Dashboard;
