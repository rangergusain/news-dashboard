"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function NewsAnalytics() {
    const data = {
        labels: ["Technology", "Health", "Business", "Sports", "Entertainment"],
        datasets: [
            {
                label: "Number of Articles",
                data: [12, 8, 15, 10, 6],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                ],
                hoverBorderColor: "rgba(0, 0, 0, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#4B5563",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
            tooltip: {
                backgroundColor: "#F9FAFB",
                titleColor: "#1F2937",
                bodyColor: "#374151",
                borderColor: "#E5E7EB",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#374151",
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "#E5E7EB",
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#374151",
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "#E5E7EB",
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 h-72">
            <h2 className="text-xl font-bold text-gray-700 mb-4">News Analytics</h2>
            <Bar data={data} options={options} />
        </div>
    );
}
