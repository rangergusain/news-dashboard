'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
    const [authorData, setAuthorData] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const NEWS_API_KEY = 'e67ebc55860642f0818ef63b9742a394';

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=technology&apiKey=${NEWS_API_KEY}`
                );
                const data = await response.json();

                if (data.articles) {
                    const authorCounts = {};
                    const typeCounts = {};

                    data.articles.forEach((article) => {
                        const author = article.author || 'Unknown';
                        authorCounts[author] = (authorCounts[author] || 0) + 1;

                        const type = article.source.name || 'Unknown';
                        typeCounts[type] = (typeCounts[type] || 0) + 1;
                    });

                    setAuthorData({
                        labels: Object.keys(authorCounts),
                        datasets: [
                            {
                                label: 'Articles by Author',
                                data: Object.values(authorCounts),
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                        ],
                    });

                    setTypeData({
                        labels: Object.keys(typeCounts),
                        datasets: [
                            {
                                label: 'Articles by Type',
                                data: Object.values(typeCounts),
                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h1>Article Trends Analytics</h1>
            {authorData && (
                <div>
                    <h2>Articles by Author</h2>
                    <Bar data={authorData} />
                </div>
            )}
            {typeData && (
                <div>
                    <h2>Articles by Type</h2>
                    <Bar data={typeData} />
                </div>
            )}
        </div>
    );
};

export default Analytics;
