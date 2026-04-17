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
        { team: "Brazil", countryKey: "Brazil", flag: "/images/flags/br.png", views: 820, purchases: 96, revenue: 8420 },
        { team: "Argentina", countryKey: "Argentina", flag: "/images/flags/ar.png", views: 760, purchases: 88, revenue: 7950 },
        { team: "USA", countryKey: "United States", flag: "/images/flags/us.png", views: 690, purchases: 79, revenue: 7010 },
        { team: "Mexico", countryKey: "Mexico", flag: "/images/flags/mx.png", views: 710, purchases: 83, revenue: 7340 },
        { team: "England", countryKey: "England", flag: "/images/flags/gb-eng.png", views: 540, purchases: 61, revenue: 5860 },
        { team: "France", countryKey: "France", flag: "/images/flags/fr.png", views: 500, purchases: 57, revenue: 5480 }
    ];

    const countrySalesData = {
        "Argentina": {
            flag: "/images/flags/ar.png",
            types: [
                { type: "Home Jersey", quantity: 82, value: 6559.18 },
                { type: "Match-Worn / Special", quantity: 6, value: 3899.94 }
            ]
        },
        "Brazil": {
            flag: "/images/flags/br.png",
            types: [
                { type: "Home Jersey", quantity: 64, value: 5439.36 },
                { type: "Away Jersey", quantity: 32, value: 3039.68 },
                { type: "Signed / Special", quantity: 8, value: 1839.92 }
            ]
        },
        "England": {
            flag: "/images/flags/gb-eng.png",
            types: [
                { type: "Away Jersey", quantity: 61, value: 6099.39 }
            ]
        },
        "France": {
            flag: "/images/flags/fr.png",
            types: [
                { type: "Home Jersey", quantity: 57, value: 4559.43 },
                { type: "Limited Goalkeeper / Away", quantity: 9, value: 1979.91 }
            ]
        },
        "Mexico": {
            flag: "/images/flags/mx.png",
            types: [
                { type: "Training Jersey", quantity: 83, value: 5394.17 }
            ]
        },
        "United States": {
            flag: "/images/flags/us.png",
            types: [
                { type: "Goalkeeper Jersey", quantity: 52, value: 4835.48 },
                { type: "Training-Worn / Special", quantity: 7, value: 2099.93 }
            ]
        },
        "South Africa": {
            flag: "/images/flags/za.png",
            types: [
                { type: "Away Jersey", quantity: 28, value: 2239.72 }
            ]
        }
    };

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

            chart._flagHitboxes = [];

            ctx.save();

            teamData.forEach((item, index) => {
                const xPos = x.getPixelForValue(index);
                const yPos = x.bottom - 2;
                const img = teamFlagImages[item.team];

                if (img && img.complete) {
                    const flagX = xPos - 12;
                    const flagY = yPos;
                    const flagW = 24;
                    const flagH = 16;

                    ctx.drawImage(img, flagX, flagY, flagW, flagH);

                    chart._flagHitboxes.push({
                        country: item.countryKey || item.team,
                        x: flagX,
                        y: flagY,
                        width: flagW,
                        height: flagH,
                        labelLeft: xPos - 80,
                        labelRight: xPos + 80,
                        labelTop: flagY - 30,
                        labelBottom: flagY + 50
                    });
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
                        yAxisID: "y",
                        order: 3
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
                        yAxisID: "y1",
                        order: 1
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
                        yAxisID: "y1",
                        order: 1
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
                        yAxisID: "y1",
                        order: 1
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
    let teamPerformanceChart = null;

    if (teamCtx) {
        teamPerformanceChart = new Chart(teamCtx, {
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
                onClick: function (event, elements) {
                    if (!elements.length) return;

                    const index = elements[0].index;
                    const countryKey = teamData[index].countryKey || teamData[index].team;

                    if (typeof updateCountryChart === "function") {
                        updateCountryChart(countryKey);
                    }
                },
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



    if (teamCtx) {
        teamCtx.addEventListener("click", function (event) {
            if (!teamPerformanceChart || !teamPerformanceChart._flagHitboxes) return;

            const rect = teamCtx.getBoundingClientRect();
            const scaleX = teamCtx.width / rect.width;
            const scaleY = teamCtx.height / rect.height;

            const clickX = (event.clientX - rect.left) * scaleX;
            const clickY = (event.clientY - rect.top) * scaleY;

            let matchedCountry = null;

            teamPerformanceChart._flagHitboxes.forEach(function (box) {
                const clickedFlag =
                    clickX >= box.x &&
                    clickX <= box.x + box.width &&
                    clickY >= box.y &&
                    clickY <= box.y + box.height;

                const clickedLabelArea =
                    clickX >= box.labelLeft &&
                    clickX <= box.labelRight &&
                    clickY >= box.labelTop &&
                    clickY <= box.labelBottom;

                if (clickedFlag || clickedLabelArea) {
                    matchedCountry = box.country;
                }
            });

            if (matchedCountry && typeof updateCountryChart === "function") {
                updateCountryChart(matchedCountry);
            }
        });
    }


    // Flags Click

    function handleTeamFlagClick(event, chart) {
        if (!chart) return false;

        const xScale = chart.scales.x;
        const canvasRect = chart.canvas.getBoundingClientRect();

        const clickX = event.clientX - canvasRect.left;
        const clickY = event.clientY - canvasRect.top;

        let clickedCountry = null;

        teamData.forEach((item, index) => {
            const xPos = xScale.getPixelForValue(index);
            const yPos = xScale.bottom - 2;

            const flagLeft = xPos - 12;
            const flagRight = xPos + 12;
            const flagTop = yPos;
            const flagBottom = yPos + 16;

            const labelLeft = xPos - 45;
            const labelRight = xPos + 45;
            const labelTop = yPos - 4;
            const labelBottom = yPos + 24;

            const clickedFlag =
                clickX >= flagLeft &&
                clickX <= flagRight &&
                clickY >= flagTop &&
                clickY <= flagBottom;

            const clickedLabelZone =
                clickX >= labelLeft &&
                clickX <= labelRight &&
                clickY >= labelTop &&
                clickY <= labelBottom;

            if (clickedFlag || clickedLabelZone) {
                clickedCountry = item.countryKey || item.team;
            }
        });

        if (clickedCountry && typeof updateCountryChart === "function") {
            updateCountryChart(clickedCountry);
            return true;
        }

        return false;
    }


    // Chart 3 - Jerseys by Type

    const countryPieCtx = document.getElementById("countryTypePieChart");
    const countrySelector = document.getElementById("countrySalesSelector");
    const selectedCountryName = document.getElementById("selectedCountryName");
    const selectedCountryQty = document.getElementById("selectedCountryQty");
    const selectedCountryValue = document.getElementById("selectedCountryValue");
    const countrySalesSummary = document.getElementById("countrySalesSummary");

    let countryPieChart = null;
    let selectedCountryKey = "Brazil";

    function buildCountrySelector() {
        if (!countrySelector) return;

        countrySelector.innerHTML = "";

        Object.keys(countrySalesData).forEach(function (country) {
            const data = countrySalesData[country];

            const button = document.createElement("button");
            button.type = "button";
            button.className = "flag-link country-sales-link";
            button.dataset.country = country;

            if (country === selectedCountryKey) {
                button.classList.add("active-country");
            }

            button.innerHTML =
                '<img src="' + data.flag + '" alt="' + country + ' flag" class="flag-img" />' +
                '<span class="flag-name">' + country + '</span>';

            button.addEventListener("click", function () {
                updateCountryChart(country);
            });

            countrySelector.appendChild(button);
        });
    }

    function updateCountrySelectorActiveState() {
        document.querySelectorAll(".country-sales-link").forEach(function (link) {
            if (link.dataset.country === selectedCountryKey) {
                link.classList.add("active-country");
            } else {
                link.classList.remove("active-country");
            }
        });
    }

    function updateCountryChart(country) {
        if (!countryPieCtx) return;
        if (!countrySalesData[country]) return;

        selectedCountryKey = country;
        const source = countrySalesData[country];

        const labels = source.types.map(function (x) { return x.type; });
        const quantities = source.types.map(function (x) { return x.quantity; });

        const totalQty = source.types.reduce(function (sum, x) { return sum + x.quantity; }, 0);
        const totalValue = source.types.reduce(function (sum, x) { return sum + x.value; }, 0);

        if (countryPieChart) {
            countryPieChart.destroy();
        }

        countryPieChart = new Chart(countryPieCtx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Units Sold",
                        data: quantities,
                        backgroundColor: [
                            "rgba(87, 227, 137, 0.75)",
                            "rgba(255, 255, 255, 0.78)",
                            "rgba(255, 166, 0, 0.80)",
                            "rgba(255, 99, 132, 0.75)",
                            "rgba(80, 180, 255, 0.75)"
                        ],
                        borderColor: "rgba(16, 20, 24, 0.85)",
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: chartTextColor
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                const item = source.types[index];
                                return item.type + ": " + item.quantity + " units | US$ " + item.value.toFixed(2);
                            }
                        }
                    }
                }
            }
        });

        if (selectedCountryName) selectedCountryName.textContent = country;
        if (selectedCountryQty) selectedCountryQty.textContent = totalQty;
        if (selectedCountryValue) selectedCountryValue.textContent = "US$ " + totalValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        if (countrySalesSummary) {
            countrySalesSummary.textContent =
                "Simulated sales distribution for " + country +
                ", showing quantity by jersey type and value details in the chart tooltip.";
        }

        updateCountrySelectorActiveState();
    }

    if (countryPieCtx) {
        buildCountrySelector();
        updateCountryChart(selectedCountryKey);
    }



    // Chart 4 - Marketing Performance

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
                layout: {
                    padding: {
                        bottom: 26
                    }
                },
                onClick: function (event, elements) {
                    if (!elements.length) return;
                    const index = elements[0].index;
                    const countryKey = teamData[index].countryKey || teamData[index].team;
                    updateCountryChart(countryKey);
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