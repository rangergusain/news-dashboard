"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

export default function Payout() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState(null); // Store OAuth token

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData();
                setAuthors(data);
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleExport = (format) => {
        if (format === "pdf") {
            const doc = new jsPDF();
            autoTable(doc, {
                head: [["Author Name", "Articles Written", "Total Payout ($)"]],
                body: authors.map((author) => [
                    author.name,
                    author.count,
                    `$${author.total.toFixed(2)}`,
                ]),
            });
            doc.save("authors_payout.pdf");
        } else if (format === "csv") {
            const csvContent = [
                ["Author Name", "Articles Written", "Total Payout ($)"],
                ...authors.map((author) => [
                    author.name,
                    author.count,
                    author.total.toFixed(2),
                ]),
            ]
                .map((row) => row.join(","))
                .join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, "authors_payout.csv");
        } else if (format === "google-sheets") {
            handleGoogleSheetsExport();
        }
    };

    const handleGoogleSheetsExport = async () => {
        if (!authToken) {
            alert("Google authentication required.");
            return;
        }

        const sheetData = authors.map((author) => [
            author.name,
            author.count,
            author.total.toFixed(2),
        ]);

        const spreadsheetId = "your_spreadsheet_id";  // Replace with your Google Sheets ID
        const range = "Sheet1!A1";  // Define the range (where data will be placed)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`;

        const requestBody = {
            values: [["Author Name", "Articles Written", "Total Payout ($)"], ...sheetData],
        };

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (res.ok) {
            alert("Data successfully exported to Google Sheets!");
        } else {
            alert("Failed to export data to Google Sheets.");
        }
    };

    const authenticateGoogle = () => {
        const clientId = "935718445468-s18fk82tfps9kpubqie42d1uue7vusas.apps.googleusercontent.com"; // Your Client ID
        const redirectUri = window.location.href;

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&include_granted_scopes=true&response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

        window.location.href = authUrl;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-0 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Author Payouts</h1>

            <div className="mb-4 text-right">
                <button
                    onClick={() => handleExport("pdf")}
                    className="mr-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Export PDF
                </button>
                <button
                    onClick={() => handleExport("csv")}
                    className="mr-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Export CSV
                </button>
                <button
                    onClick={() => handleExport("google-sheets")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                    Export to Google Sheets
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                    <thead className="bg-blue-600 text-white rounded-t-lg">
                        <tr>
                            <th className="py-4 px-6 text-left text-lg font-semibold rounded-tl-lg border-b border-gray-200">
                                Author Name
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold border-b border-gray-200">
                                Articles Written
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold rounded-tr-lg border-b border-gray-200">
                                Total Payout ($)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="rounded-b-lg">
                        {authors.map((author, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition duration-300`}
                            >
                                <td className="py-4 px-6 border-b border-gray-200 text-gray-800 font-medium">
                                    {author.name}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 text-gray-600">
                                    {author.count}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 text-green-600 font-bold">
                                    ${author.total.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!authToken && (
                <div className="mt-4 text-center">
                    <button
                        onClick={authenticateGoogle}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                    >
                        Authenticate with Google
                    </button>
                </div>
            )}
        </div>
    );
}

async function getData() {
    const apiKey = "e67ebc55860642f0818ef63b9742a394";

    if (!apiKey) {
        throw new Error("API Key is missing in the environment variables");
    }

    try {
        const res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch news. Status: ${res.status}, ${res.statusText}`);
        }

        const data = await res.json();
        if (data.status !== "ok") {
            throw new Error(`API error: ${data.message}`);
        }

        const articles = data.articles || [];
        const articlePrice = 20;

        const authorData = articles.reduce((acc, article) => {
            const author = article.author || "Unknown Author";
            acc[author] = (acc[author] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(authorData).map(([name, count]) => ({
            name,
            count,
            total: count * articlePrice,
        }));
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error("Failed to fetch data from the News API");
    }
}
