document.addEventListener("DOMContentLoaded", function () {
    const chartTextColor = "#e9f7ee";
    const gridColor = "rgba(255, 255, 255, 0.08)";

    // Dummy Data

    const performanceData = {
        daily: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            sold: [18, 24, 20, 29, 35, 42, 31],
            revenue: [1650, 2240, 1910, 2780, 3360, 4210, 3050],
            costs: [820, 1080, 930, 1360, 1650, 2060, 1490],
            profit: [830, 1160, 980, 1420, 1710, 2150, 1560]
        },
        weekly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            sold: [122, 138, 149, 161],
            revenue: [11250, 12840, 13980, 15120],
            costs: [5480, 6260, 6820, 7410],
            profit: [5770, 6580, 7160, 7710]
        },
        monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            sold: [20, 70, 210, 560],
            revenue: [3400, 10900, 26850, 52100],
            costs: [1900, 6100, 15000, 29200],
            profit: [1500, 4800, 11850, 22900]
        }
    };

    const teamData = [
        { team: "Brazil", flag: "/images/flags/br.png", views: 820, purchases: 96, revenue: 8420 },
        { team: "Argentina", flag: "/images/flags/ar.png", views: 760, purchases: 88, revenue: 7950 },
        { team: "USA", flag: "/images/flags/us.png", views: 690, purchases: 79, revenue: 7010 },
        { team: "Mexico", flag: "/images/flags/mx.png", views: 710, purchases: 83, revenue: 7340 },
        { team: "England", flag: "/images/flags/gb-eng.png", views: 540, purchases: 61, revenue: 5860 },
        { team: "France", flag: "/images/flags/fr.png", views: 500, purchases: 57, revenue: 5480 }
    ];

    const weeklyRevenueReference = [6200, 7800, 7350, 10100, 11850, 11200];

    const marketingData = {
        weekly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
            spend: [900, 1200, 1100, 1500, 1700, 1600],
            visits: [3200, 4100, 3950, 5200, 5900, 5650],
            orders: [72, 89, 83, 114, 132, 126]
        },
        monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            spend: [600, 1200, 2600, 5200],
            visits: [900, 2400, 7200, 18000],
            orders: [14, 45, 120, 310]
        }
    };

    // Team flags

    const teamFlagImages = {};
    teamData.forEach(item => {
        const img = new Image();
        img.src = item.flag;
        teamFlagImages[item.team] = img;
    });

    // Plugins

    const conversionLabelPlugin = {
        id: "conversionLabelPlugin",
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const purchasesDatasetIndex = 1;
            const meta = chart.getDatasetMeta(purchasesDatasetIndex);
            const purchases = chart.data.datasets[purchasesDatasetIndex].data;
            const views = chart.data.datasets[0].data;

            ctx.save();
            ctx.font = "bold 11px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            purchases.forEach((value, index) => {
                const bar = meta.data[index];
                if (!bar) return;

                const conversion = ((value / views[index]) * 100).toFixed(1) + "%";
                ctx.fillText(conversion, bar.x, bar.y - 6);
            });

            ctx.restore();
        }
    };

    const teamFlagPlugin = {
        id: "teamFlagPlugin",
        afterDraw(chart) {
            const { ctx, scales: { x } } = chart;

            ctx.save();

            teamData.forEach((item, index) => {
                const xPos = x.getPixelForValue(index);
                const yPos = x.bottom - 2;
                const img = teamFlagImages[item.team];

                if (img && img.complete) {
                    ctx.drawImage(img, xPos - 12, yPos, 24, 16);
                }
            });

            ctx.restore();
        }
    };

    const marketingConversionLabelPlugin = {
        id: "marketingConversionLabelPlugin",
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const ordersDatasetIndex = 2;
            const meta = chart.getDatasetMeta(ordersDatasetIndex);
            const orders = chart.data.datasets[ordersDatasetIndex].data;
            const visits = chart.data.datasets[1].data;

            ctx.save();
            ctx.font = "bold 11px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            orders.forEach((value, index) => {
                const bar = meta.data[index];
                if (!bar) return;

                const conversion = ((value / visits[index]) * 100).toFixed(1) + "%";
                ctx.fillText(conversion, bar.x, bar.y - 6);
            });

            ctx.restore();
        }
    };

    const marketingAverageValuePlugin = {
        id: "marketingAverageValuePlugin",
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const ordersDatasetIndex = 2;
            const meta = chart.getDatasetMeta(ordersDatasetIndex);
            const orders = chart.data.datasets[ordersDatasetIndex].data;
            const labels = chart.data.labels;

            ctx.save();
            ctx.font = "bold 13px Arial";
            ctx.fillStyle = "#9af7b9";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            orders.forEach((value, index) => {
                const bar = meta.data[index];
                if (!bar) return;

                let revenueReference = 0;

                if (labels.length === 4) {
                    revenueReference = performanceData.monthly.revenue[index];
                } else {
                    revenueReference = weeklyRevenueReference[index];
                }

                const avgOrderValue = (revenueReference / value).toFixed(2);
                ctx.fillText(`$${avgOrderValue}`, bar.x, chart.scales.y1.bottom - 22);
            });

            ctx.restore();
        }
    };

    // Chart 1 - Performance Chart

    const performanceCtx = document.getElementById("dailyPerformanceChart");
    const performanceFilter = document.getElementById("performanceView");

    let performanceChart = null;

    function buildPerformanceChart(viewKey) {
        const source = performanceData[viewKey];

        if (performanceChart) {
            performanceChart.destroy();
        }

        performanceChart = new Chart(performanceCtx, {
            data: {
                labels: source.labels,
                datasets: [
                    {
                        type: "bar",
                        label: "Jerseys Sold",
                        data: source.sold,
                        backgroundColor: "rgba(87, 227, 137, 0.65)",
                        borderColor: "rgba(87, 227, 137, 1)",
                        borderWidth: 1,
                        yAxisID: "y"
                    },
                    {
                        type: "line",
                        label: "Revenue (US$)",
                        data: source.revenue,
                        borderColor: "rgba(255, 255, 255, 0.95)",
                        backgroundColor: "rgba(255, 255, 255, 0.10)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: "y1"
                    },
                    {
                        type: "line",
                        label: "Costs (US$)",
                        data: source.costs,
                        borderColor: "rgba(255, 99, 132, 0.95)",
                        backgroundColor: "rgba(255, 99, 132, 0.10)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: "y1"
                    },
                    {
                        type: "line",
                        label: "Profit (US$)",
                        data: source.profit,
                        borderColor: "rgba(255, 166, 0, 0.95)",
                        backgroundColor: "rgba(255, 166, 0, 0.10)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: "y1"
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: chartTextColor
                        }
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false
                    }
                },
                interaction: {
                    mode: "index",
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    y: {
                        position: "left",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: "Jerseys Sold",
                            color: chartTextColor
                        }
                    },
                    y1: {
                        position: "right",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        title: {
                            display: true,
                            text: "Financial Values (US$)",
                            color: chartTextColor
                        }
                    }
                }
            }
        });
    }

    if (performanceCtx) {
        buildPerformanceChart("daily");
    }

    if (performanceFilter) {
        performanceFilter.addEventListener("change", function () {
            buildPerformanceChart(this.value);
        });
    }

    // Chart 2 - Performance by Team

    const teamCtx = document.getElementById("teamPerformanceChart");
    if (teamCtx) {
        new Chart(teamCtx, {
            plugins: [conversionLabelPlugin, teamFlagPlugin],
            data: {
                labels: teamData.map(x => x.team),
                datasets: [
                    {
                        type: "bar",
                        label: "Product Views",
                        data: teamData.map(x => x.views),
                        backgroundColor: "rgba(87, 227, 137, 0.65)",
                        borderColor: "rgba(87, 227, 137, 1)",
                        borderWidth: 1,
                        yAxisID: "y"
                    },
                    {
                        type: "bar",
                        label: "Purchases",
                        data: teamData.map(x => x.purchases),
                        backgroundColor: "rgba(255, 255, 255, 0.72)",
                        borderColor: "rgba(255, 255, 255, 1)",
                        borderWidth: 1,
                        yAxisID: "y"
                    },
                    {
                        type: "line",
                        label: "Revenue (US$)",
                        data: teamData.map(x => x.revenue),
                        borderColor: "rgba(255, 166, 0, 1)",
                        backgroundColor: "rgba(255, 166, 0, 0.18)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: "y1"
                    }
                ]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                        bottom: 26
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: chartTextColor
                        }
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            afterBody: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const conversion = ((teamData[index].purchases / teamData[index].views) * 100).toFixed(1);
                                return `Conversion Rate: ${conversion}%`;
                            }
                        }
                    }
                },
                interaction: {
                    mode: "index",
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            color: chartTextColor,
                            padding: 10
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    y: {
                        beginAtZero: true,
                        position: "left",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: "Views / Purchases",
                            color: chartTextColor
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: "right",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        title: {
                            display: true,
                            text: "Revenue (US$)",
                            color: chartTextColor
                        }
                    }
                }
            }
        });
    }

    // Chart 3 - Marketing Performance

    const marketingCtx = document.getElementById("marketingPerformanceChart");
    const marketingFilter = document.getElementById("marketingView");

    let marketingChart = null;

    function buildMarketingChart(viewKey) {
        const source = marketingData[viewKey];

        if (marketingChart) {
            marketingChart.destroy();
        }

        marketingChart = new Chart(marketingCtx, {
            plugins: [marketingConversionLabelPlugin, marketingAverageValuePlugin],
            data: {
                labels: source.labels,
                datasets: [
                    {
                        type: "line",
                        label: "Marketing Spend (US$)",
                        data: source.spend,
                        borderColor: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(255, 255, 255, 0.18)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        yAxisID: "y"
                    },
                    {
                        type: "line",
                        label: "Site Visits",
                        data: source.visits,
                        borderColor: "rgba(255, 166, 0, 1)",
                        backgroundColor: "rgba(255, 166, 0, 0.18)",
                        tension: 0.3,
                        fill: false,
                        pointRadius: 4,
                        yAxisID: "y"
                    },
                    {
                        type: "bar",
                        label: "Orders",
                        data: source.orders,
                        backgroundColor: "rgba(87, 227, 137, 0.65)",
                        borderColor: "rgba(87, 227, 137, 1)",
                        borderWidth: 1,
                        yAxisID: "y1"
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: chartTextColor
                        }
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            afterBody: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const visits = source.visits[index];
                                const orders = source.orders[index];
                                const conversion = ((orders / visits) * 100).toFixed(2);

                                let revenueReference = 0;

                                if (viewKey === "monthly") {
                                    revenueReference = performanceData.monthly.revenue[index];
                                } else {
                                    revenueReference = weeklyRevenueReference[index];
                                }

                                const avgOrderValue = (revenueReference / orders).toFixed(2);

                                return [
                                    `Conversion Rate: ${conversion}%`,
                                    `Average Order Value: US$ ${avgOrderValue}`
                                ];
                            }
                        }
                    }
                },
                interaction: {
                    mode: "index",
                    intersect: false
                },
                scales: {
                    x: {
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    y: {
                        beginAtZero: true,
                        position: "left",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: "Spend / Visits",
                            color: chartTextColor
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: "right",
                        ticks: {
                            color: chartTextColor
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        title: {
                            display: true,
                            text: "Orders",
                            color: chartTextColor
                        }
                    }
                }
            }
        });
    }

    if (marketingCtx) {
        buildMarketingChart("weekly");
    }

    if (marketingFilter) {
        marketingFilter.addEventListener("change", function () {
            buildMarketingChart(this.value);
        });
    }
});