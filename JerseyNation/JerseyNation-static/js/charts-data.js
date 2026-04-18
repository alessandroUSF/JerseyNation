document.addEventListener("DOMContentLoaded", function () {
    // Shared chart colors
    const chartTextColor = "#e9f7ee";
    const gridColor = "rgba(255, 255, 255, 0.08)";
    const usInteger = (value) => Number(value).toLocaleString("en-US");
    const usMoney = (value) => Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const usPercent = (value) => `${Number(value).toFixed(1)}%`;

    // Format seconds as minutes and seconds
    function formatDuration(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}m ${sec}s`;
    }

    // Calculate change against the previous value
    function calcPctChange(current, previous) {
        if (!previous || previous === 0) return null;
        return ((current - previous) / previous) * 100;
    }

    // Choose the trend color class
    function trendClass(value, lowerIsBetter = false) {
        if (value === null) return "trend-neutral";
        if (Math.abs(value) < 1) return "trend-neutral";

        if (lowerIsBetter) {
            return value < 0 ? "trend-up" : "trend-down";
        }

        return value > 0 ? "trend-up" : "trend-down";
    }

    // Build the trend label shown in cards and tables
    function trendLabel(value, lowerIsBetter = false) {
        if (value === null) return "→ Stable";
        const absValue = Math.abs(value).toFixed(1);
        if (Math.abs(value) < 1) return `→ ${absValue}%`;

        if (lowerIsBetter) {
            return value < 0 ? `↓ ${absValue}%` : `↑ ${absValue}%`;
        }

        return value > 0 ? `↑ ${absValue}%` : `↓ ${absValue}%`;
    }

    // Create one comparison row for the detail table
    function metricRow(label, current, previous, formatter = (v) => v, lowerIsBetter = false) {
        const change = calcPctChange(current, previous);
        const klass = trendClass(change, lowerIsBetter);

        return `
            <tr>
                <th>${label}</th>
                <td>${formatter(current)}</td>
                <td>${formatter(previous)}</td>
                <td><span class="${klass}">${trendLabel(change, lowerIsBetter)}</span></td>
            </tr>
        `;
    }

    // Executive summary values by period
    const executiveSummaryData = {
        thisMonth: {
            visits: 12480,
            avgClicks: 8.9,
            avgPages: 6.5,
            avgProductsViewed: 5.0,
            avgTimeOnSiteSec: 326,
            orders: 914,
            conversionRate: 7.3,
            addToCartRate: 19.1,
            checkoutRate: 11.7,
            cartAbandonmentRate: 38.8,
            forYouConversion: 10.9,
            robotRecommendationConversion: 9.8,
            totalProductsSold: 1518,
            salesRevenue: 134820.60,
            avgOrderValue: 147.51,
            avgProductTicket: 88.82,
            revenuePerVisit: 10.80,
            returningVisitorRate: 39.4,
            refundRate: 1.9,
            grossMarginRate: 58.3,
            netMarginRate: 10.4,
            productCost: 55980.00,
            technologyCost: 6180.00,
            marketingInvestment: 15490.00,
            deliveryCost: 12540.00,
            peopleCost: 14320.00,
            taxesCost: 16290.00,
            totalExpenses: 120800.00,
            netMarginValue: 14020.60,
            roiPercent: 90.4,
            cac: 27.37,
            campaignCount: 4,
            campaignInvestmentAvg: 3872.50,
            chatbotAssistedOrders: 214,
            chatbotResolutionRate: 84.0,
            supportTickets: 168,
            complaints: 22,
            complaintRate: 2.4
        },
        lastMonth: {
            visits: 10960,
            avgClicks: 8.1,
            avgPages: 5.9,
            avgProductsViewed: 4.5,
            avgTimeOnSiteSec: 298,
            orders: 748,
            conversionRate: 6.8,
            addToCartRate: 17.6,
            checkoutRate: 10.5,
            cartAbandonmentRate: 41.2,
            forYouConversion: 9.4,
            robotRecommendationConversion: 8.7,
            totalProductsSold: 1197,
            salesRevenue: 106744.90,
            avgOrderValue: 142.71,
            avgProductTicket: 89.18,
            revenuePerVisit: 9.74,
            returningVisitorRate: 36.2,
            refundRate: 2.3,
            grossMarginRate: 56.7,
            netMarginRate: 8.9,
            productCost: 47080.00,
            technologyCost: 5910.00,
            marketingInvestment: 12940.00,
            deliveryCost: 10210.00,
            peopleCost: 13620.00,
            taxesCost: 7505.00,
            totalExpenses: 97265.00,
            netMarginValue: 9479.90,
            roiPercent: 81.2,
            cac: 27.42,
            campaignCount: 4,
            campaignInvestmentAvg: 3235.00,
            chatbotAssistedOrders: 182,
            chatbotResolutionRate: 86.0,
            supportTickets: 149,
            complaints: 16,
            complaintRate: 2.1
        },
        last7: {
            visits: 3180,
            avgClicks: 8.7,
            avgPages: 6.1,
            avgProductsViewed: 4.8,
            avgTimeOnSiteSec: 315,
            orders: 226,
            conversionRate: 7.1,
            addToCartRate: 18.6,
            checkoutRate: 11.4,
            cartAbandonmentRate: 39.4,
            forYouConversion: 10.4,
            robotRecommendationConversion: 9.2,
            totalProductsSold: 364,
            salesRevenue: 32375.40,
            avgOrderValue: 143.25,
            avgProductTicket: 88.94,
            revenuePerVisit: 10.18,
            returningVisitorRate: 37.1,
            refundRate: 2.0,
            grossMarginRate: 57.8,
            netMarginRate: 9.7,
            productCost: 13390.00,
            technologyCost: 1590.00,
            marketingInvestment: 3720.00,
            deliveryCost: 2960.00,
            peopleCost: 3340.00,
            taxesCost: 3980.00,
            totalExpenses: 28980.00,
            netMarginValue: 3395.40,
            roiPercent: 84.5,
            cac: 26.95,
            campaignCount: 4,
            campaignInvestmentAvg: 930.00,
            chatbotAssistedOrders: 48,
            chatbotResolutionRate: 85.3,
            supportTickets: 39,
            complaints: 5,
            complaintRate: 2.2
        },
        last30: {
            visits: 18420,
            avgClicks: 8.6,
            avgPages: 6.2,
            avgProductsViewed: 4.7,
            avgTimeOnSiteSec: 312,
            orders: 1348,
            conversionRate: 7.3,
            addToCartRate: 18.4,
            checkoutRate: 11.2,
            cartAbandonmentRate: 39.1,
            forYouConversion: 10.2,
            robotRecommendationConversion: 9.6,
            totalProductsSold: 2216,
            salesRevenue: 198742.40,
            avgOrderValue: 147.43,
            avgProductTicket: 89.69,
            revenuePerVisit: 10.79,
            returningVisitorRate: 38.5,
            refundRate: 2.1,
            grossMarginRate: 58.6,
            netMarginRate: 9.3,
            productCost: 82360.00,
            technologyCost: 8740.00,
            marketingInvestment: 23180.00,
            deliveryCost: 18460.00,
            peopleCost: 21450.00,
            taxesCost: 15980.00,
            totalExpenses: 170170.00,
            netMarginValue: 18572.40,
            roiPercent: 86.2,
            cac: 22.55,
            campaignCount: 4,
            campaignInvestmentAvg: 5795.00,
            chatbotAssistedOrders: 302,
            chatbotResolutionRate: 84.9,
            supportTickets: 274,
            complaints: 31,
            complaintRate: 2.3
        }
    };

    // Goal text used in the executive cards
    const executiveGoals = {
        salesRevenue: "Goal: Above US$ 130,000",
        totalExpenses: "Goal: Below US$ 118,000",
        netMarginValue: "Goal: Above US$ 15,000",
        netMarginRate: "Goal: Above 10.0%",
        grossMarginRate: "Goal: Above 58.0%",
        orders: "Goal: Above 900",
        totalProductsSold: "Goal: Above 1,500",
        avgOrderValue: "Goal: Above US$ 145",
        avgProductTicket: "Goal: Above US$ 88",
        roiPercent: "Goal: Above 85%",
        cac: "Goal: Below US$ 27",
        marketingInvestment: "Goal: Between US$ 14,000 and US$ 15,500",
        campaignCount: "Goal: 4 to 5 campaigns",
        campaignInvestmentAvg: "Goal: Below US$ 4,000 per campaign",
        productCost: "Goal: Below US$ 57,000",
        deliveryCost: "Goal: Below US$ 12,200",
        peopleCost: "Goal: Below US$ 14,000",
        technologyCost: "Goal: Below US$ 6,300",
        taxesCost: "Goal: Below US$ 15,500",
        visits: "Goal: Above 12,000",
        conversionRate: "Goal: Above 7.0%",
        addToCartRate: "Goal: Above 18.5%",
        checkoutRate: "Goal: Above 11.0%",
        cartAbandonmentRate: "Goal: Below 40.0%",
        forYouConversion: "Goal: Above 10.5%",
        robotRecommendationConversion: "Goal: Above 9.5%",
        avgClicks: "Goal: Above 8.5",
        avgPages: "Goal: Above 6.0",
        avgProductsViewed: "Goal: Above 4.8",
        avgTimeOnSiteSec: "Goal: Above 5m 10s",
        returningVisitorRate: "Goal: Above 38.0%",
        revenuePerVisit: "Goal: Above US$ 10.50",
        chatbotAssistedOrders: "Goal: Above 200",
        chatbotResolutionRate: "Goal: Above 85.0%",
        supportTickets: "Goal: Below 160",
        complaints: "Goal: Below 20",
        complaintRate: "Goal: Below 2.2%",
        refundRate: "Goal: Below 2.0%"
    };

    // Executive metrics shown in the summary cards
    const executiveMetricDefinitions = [
        { id: "salesRevenue", label: "Sales Revenue", group: "financial", formatter: v => `US$ ${usMoney(v)}` },
        { id: "totalExpenses", label: "Total Expenses", group: "financial", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "netMarginValue", label: "Net Margin", group: "financial", formatter: v => `US$ ${usMoney(v)}` },
        { id: "netMarginRate", label: "Net Margin %", group: "financial", formatter: v => usPercent(v) },
        { id: "grossMarginRate", label: "Gross Margin %", group: "financial", formatter: v => usPercent(v) },
        { id: "roiPercent", label: "ROI", group: "financial", formatter: v => usPercent(v) },
        { id: "revenuePerVisit", label: "Revenue per Visit", group: "financial", formatter: v => `US$ ${usMoney(v)}` },

        { id: "orders", label: "Orders", group: "sales", formatter: v => usInteger(v) },
        { id: "totalProductsSold", label: "Products Sold", group: "sales", formatter: v => usInteger(v) },
        { id: "avgOrderValue", label: "Average Order Value", group: "sales", formatter: v => `US$ ${usMoney(v)}` },
        { id: "avgProductTicket", label: "Average Product Ticket", group: "sales", formatter: v => `US$ ${usMoney(v)}` },

        { id: "productCost", label: "Product Cost", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "marketingInvestment", label: "Marketing Investment", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "deliveryCost", label: "Delivery Cost", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "peopleCost", label: "People Cost", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "technologyCost", label: "Technology Cost", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "taxesCost", label: "Taxes", group: "expenses", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },

        { id: "campaignCount", label: "Campaign Count", group: "marketing", formatter: v => usInteger(v) },
        { id: "campaignInvestmentAvg", label: "Average Campaign Investment", group: "marketing", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "cac", label: "CAC", group: "marketing", formatter: v => `US$ ${usMoney(v)}`, lowerIsBetter: true },
        { id: "forYouConversion", label: "\"For You\" Conversion", group: "marketing", formatter: v => usPercent(v) },
        { id: "robotRecommendationConversion", label: "Robot Recommendation Conversion", group: "marketing", formatter: v => usPercent(v) },

        { id: "visits", label: "Total Visits", group: "navigation", formatter: v => usInteger(v) },
        { id: "conversionRate", label: "Conversion Rate", group: "navigation", formatter: v => usPercent(v) },
        { id: "addToCartRate", label: "Add-to-Cart Rate", group: "navigation", formatter: v => usPercent(v) },
        { id: "checkoutRate", label: "Checkout Rate", group: "navigation", formatter: v => usPercent(v) },
        { id: "cartAbandonmentRate", label: "Cart Abandonment", group: "navigation", formatter: v => usPercent(v), lowerIsBetter: true },
        { id: "avgClicks", label: "Average Clicks", group: "navigation", formatter: v => v.toFixed(1) },
        { id: "avgPages", label: "Average Pages", group: "navigation", formatter: v => v.toFixed(1) },
        { id: "avgProductsViewed", label: "Average Products Viewed", group: "navigation", formatter: v => v.toFixed(1) },
        { id: "avgTimeOnSiteSec", label: "Average Time on Site", group: "navigation", formatter: v => formatDuration(v) },
        { id: "returningVisitorRate", label: "Returning Visitor Rate", group: "navigation", formatter: v => usPercent(v) },

        { id: "chatbotAssistedOrders", label: "Chatbot Assisted Orders", group: "service", formatter: v => usInteger(v) },
        { id: "chatbotResolutionRate", label: "Chatbot Resolution Rate", group: "service", formatter: v => usPercent(v) },
        { id: "supportTickets", label: "Support Tickets", group: "service", formatter: v => usInteger(v), lowerIsBetter: true },
        { id: "complaints", label: "Complaints", group: "service", formatter: v => usInteger(v), lowerIsBetter: true },
        { id: "complaintRate", label: "Complaint Rate", group: "service", formatter: v => usPercent(v), lowerIsBetter: true },
        { id: "refundRate", label: "Refund Rate", group: "service", formatter: v => usPercent(v), lowerIsBetter: true }
    ];

    // Group names for the executive summary
    const executiveGroupTitles = {
        financial: "Financial Results",
        sales: "Orders and Sales",
        expenses: "Expenses",
        marketing: "Marketing Performance",
        navigation: "Site Navigation",
        service: "Customer Service"
    };

    // Default metrics shown in the main executive view
    const keyMetricIds = [
        "salesRevenue",
        "totalExpenses",
        "netMarginValue",
        "netMarginRate",
        "grossMarginRate",
        "roiPercent",
        "orders",
        "totalProductsSold",
        "avgOrderValue",
        "marketingInvestment",
        "cac",
        "conversionRate",
        "cartAbandonmentRate",
        "chatbotResolutionRate",
        "complaints"
    ];

    // Sales and profit chart data by time view
    const performanceData = {
        daily: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            sold: [28, 35, 31, 39, 47, 56, 49],
            revenue: [2580, 3190, 2870, 3640, 4380, 5170, 4560],
            costs: [1320, 1630, 1470, 1860, 2240, 2690, 2380],
            profit: [1260, 1560, 1400, 1780, 2140, 2480, 2180]
        },
        weekly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            sold: [318, 352, 387, 461],
            revenue: [28490, 31580, 34760, 39990],
            costs: [14920, 16510, 18170, 20860],
            profit: [13570, 15070, 16590, 19130]
        },
        monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            sold: [420, 580, 760, 915, 748, 914],
            revenue: [38220, 51760, 71680, 134820.60, 106744.90, 134820.60],
            costs: [22010, 29750, 41260, 120800.00, 97265.00, 120800.00],
            profit: [16210, 22010, 30420, 14020.60, 9479.90, 14020.60]
        }
    };

    // Reference revenue values used to estimate average order value in the marketing chart
    const weeklyRevenueReference = [28490, 31580, 34760, 39990, 42740, 44860];

    // Team performance data for the country comparison chart
    const teamData = [
        { team: "Brazil", countryKey: "Brazil", flag: "images/flags/br.png", views: 1120, purchases: 148, revenue: 21965.00, cost: 13240.00 },
        { team: "Argentina", countryKey: "Argentina", flag: "images/flags/ar.png", views: 980, purchases: 129, revenue: 19140.00, cost: 11620.00 },
        { team: "USA", countryKey: "United States", flag: "images/flags/us.png", views: 840, purchases: 101, revenue: 14450.00, cost: 9280.00 },
        { team: "Mexico", countryKey: "Mexico", flag: "images/flags/mx.png", views: 890, purchases: 108, revenue: 15340.00, cost: 10160.00 },
        { team: "England", countryKey: "England", flag: "images/flags/gb-eng.png", views: 760, purchases: 91, revenue: 13690.00, cost: 8740.00 },
        { team: "France", countryKey: "France", flag: "images/flags/fr.png", views: 720, purchases: 86, revenue: 12890.00, cost: 8395.00 }
    ];

    // Country sales split by jersey type and period
    const countrySalesData = {
        thisMonth: {
            "Argentina": { flag: "images/flags/ar.png", orders: 129, views: 980, types: [{ type: "Home Jersey", quantity: 128, value: 11392.00 }, { type: "Away Jersey", quantity: 54, value: 4984.20 }, { type: "Match-Worn / Special", quantity: 18, value: 2763.80 }] },
            "Brazil": { flag: "images/flags/br.png", orders: 148, views: 1120, types: [{ type: "Home Jersey", quantity: 142, value: 12638.00 }, { type: "Away Jersey", quantity: 63, value: 5831.20 }, { type: "Signed / Special", quantity: 22, value: 3495.80 }] },
            "England": { flag: "images/flags/gb-eng.png", orders: 91, views: 760, types: [{ type: "Home Jersey", quantity: 81, value: 7330.50 }, { type: "Away Jersey", quantity: 46, value: 4179.70 }, { type: "Special Edition", quantity: 14, value: 2179.80 }] },
            "France": { flag: "images/flags/fr.png", orders: 86, views: 720, types: [{ type: "Home Jersey", quantity: 78, value: 6942.00 }, { type: "Away Jersey", quantity: 44, value: 4026.40 }, { type: "Goalkeeper / Special", quantity: 13, value: 1921.60 }] },
            "Mexico": { flag: "images/flags/mx.png", orders: 108, views: 890, types: [{ type: "Home Jersey", quantity: 96, value: 8352.00 }, { type: "Training Jersey", quantity: 51, value: 3927.00 }, { type: "Special Edition", quantity: 18, value: 3061.00 }] },
            "United States": { flag: "images/flags/us.png", orders: 101, views: 840, types: [{ type: "Home Jersey", quantity: 88, value: 7832.00 }, { type: "Goalkeeper Jersey", quantity: 43, value: 3921.30 }, { type: "Training-Worn / Special", quantity: 16, value: 2696.70 }] }
        },
        lastMonth: {
            "Argentina": { flag: "images/flags/ar.png", orders: 108, views: 910, types: [{ type: "Home Jersey", quantity: 101, value: 8928.40 }, { type: "Away Jersey", quantity: 46, value: 4236.80 }, { type: "Match-Worn / Special", quantity: 13, value: 2089.60 }] },
            "Brazil": { flag: "images/flags/br.png", orders: 126, views: 1010, types: [{ type: "Home Jersey", quantity: 118, value: 10384.00 }, { type: "Away Jersey", quantity: 58, value: 5298.80 }, { type: "Signed / Special", quantity: 17, value: 2699.10 }] },
            "England": { flag: "images/flags/gb-eng.png", orders: 78, views: 690, types: [{ type: "Home Jersey", quantity: 69, value: 6175.50 }, { type: "Away Jersey", quantity: 37, value: 3326.70 }, { type: "Special Edition", quantity: 9, value: 1365.30 }] },
            "France": { flag: "images/flags/fr.png", orders: 74, views: 650, types: [{ type: "Home Jersey", quantity: 66, value: 5814.00 }, { type: "Away Jersey", quantity: 35, value: 3178.00 }, { type: "Goalkeeper / Special", quantity: 11, value: 1568.60 }] },
            "Mexico": { flag: "images/flags/mx.png", orders: 92, views: 780, types: [{ type: "Home Jersey", quantity: 82, value: 7052.00 }, { type: "Training Jersey", quantity: 44, value: 3322.00 }, { type: "Special Edition", quantity: 14, value: 2264.40 }] },
            "United States": { flag: "images/flags/us.png", orders: 86, views: 730, types: [{ type: "Home Jersey", quantity: 75, value: 6637.50 }, { type: "Goalkeeper Jersey", quantity: 38, value: 3458.60 }, { type: "Training-Worn / Special", quantity: 12, value: 1940.40 }] }
        },
        last30: {
            "Argentina": { flag: "images/flags/ar.png", orders: 219, views: 1760, types: [{ type: "Home Jersey", quantity: 206, value: 18320.00 }, { type: "Away Jersey", quantity: 92, value: 8487.60 }, { type: "Match-Worn / Special", quantity: 31, value: 5735.20 }] },
            "Brazil": { flag: "images/flags/br.png", orders: 248, views: 1980, types: [{ type: "Home Jersey", quantity: 228, value: 20292.00 }, { type: "Away Jersey", quantity: 108, value: 9984.00 }, { type: "Signed / Special", quantity: 38, value: 6614.40 }] },
            "England": { flag: "images/flags/gb-eng.png", orders: 171, views: 1490, types: [{ type: "Home Jersey", quantity: 152, value: 13619.20 }, { type: "Away Jersey", quantity: 79, value: 7315.40 }, { type: "Special Edition", quantity: 26, value: 4373.40 }] },
            "France": { flag: "images/flags/fr.png", orders: 164, views: 1430, types: [{ type: "Home Jersey", quantity: 145, value: 12847.50 }, { type: "Away Jersey", quantity: 76, value: 6992.00 }, { type: "Goalkeeper / Special", quantity: 24, value: 4072.10 }] },
            "Mexico": { flag: "images/flags/mx.png", orders: 132, views: 1180, types: [{ type: "Home Jersey", quantity: 116, value: 9987.60 }, { type: "Training Jersey", quantity: 63, value: 4863.60 }, { type: "Special Edition", quantity: 21, value: 4262.40 }] },
            "United States": { flag: "images/flags/us.png", orders: 147, views: 1290, types: [{ type: "Home Jersey", quantity: 127, value: 11303.00 }, { type: "Goalkeeper Jersey", quantity: 64, value: 5862.40 }, { type: "Training-Worn / Special", quantity: 23, value: 4281.90 }] }
        }
    };

    // Marketing traffic and order data
    const marketingData = {
        weekly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
            spend: [1400, 1680, 1590, 1920, 2140, 2050],
            visits: [5100, 5960, 5710, 6830, 7540, 7280],
            orders: [138, 161, 154, 189, 208, 201]
        },
        monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            spend: [1900, 2600, 4200, 6800, 5900, 6420],
            visits: [4200, 6100, 8450, 12480, 10960, 12480],
            orders: [92, 136, 214, 914, 748, 914]
        }
    };

    // Cost structure used in the profitability view
    const profitabilityData = {
        thisMonth: {
            revenue: 134820.60,
            orders: 914,
            units: 1518,
            newCustomers: 566,
            costs: {
                product: 55980.00,
                technology: 6180.00,
                marketing: 15490.00,
                delivery: 12540.00,
                people: 14320.00,
                taxes: 16290.00,
                netMargin: 14020.60
            }
        },
        lastMonth: {
            revenue: 106744.90,
            orders: 748,
            units: 1197,
            newCustomers: 472,
            costs: {
                product: 47080.00,
                technology: 5910.00,
                marketing: 12940.00,
                delivery: 10210.00,
                people: 13620.00,
                taxes: 7505.00,
                netMargin: 9479.90
            }
        },
        last30: {
            revenue: 198742.40,
            orders: 1348,
            units: 2216,
            newCustomers: 1028,
            costs: {
                product: 82360.00,
                technology: 8740.00,
                marketing: 23180.00,
                delivery: 18460.00,
                people: 21450.00,
                taxes: 15980.00,
                netMargin: 18572.40
            }
        }
    };

    // Combined campaign totals by period
    const allCampaignsByPeriod = {
        thisMonth: {
            name: "All Campaigns",
            revenue: 58760.00,
            orders: 401,
            units: 642,
            avgOrderValue: 146.53,
            conversionRate: 6.8,
            spend: {
                media: 13140.00,
                couponImpact: 4250.00,
                deliverySupport: 4630.00,
                productCost: 24380.00,
                taxes: 4710.00,
                margin: 7650.00
            }
        },
        lastMonth: {
            name: "All Campaigns",
            revenue: 48240.00,
            orders: 348,
            units: 554,
            avgOrderValue: 138.62,
            conversionRate: 6.1,
            spend: {
                media: 11480.00,
                couponImpact: 3980.00,
                deliverySupport: 4120.00,
                productCost: 20720.00,
                taxes: 3860.00,
                margin: 4080.00
            }
        },
        last30: {
            name: "All Campaigns",
            revenue: 131460.00,
            orders: 913,
            units: 1488,
            avgOrderValue: 143.99,
            conversionRate: 6.7,
            spend: {
                media: 26600.00,
                couponImpact: 9500.00,
                deliverySupport: 10170.00,
                productCost: 54720.00,
                taxes: 10560.00,
                margin: 9910.00
            }
        }
    };

    // Individual campaign results by period
    const campaignPeriodData = {
        facebookAds: {
            thisMonth: { name: "Facebook Ads", revenue: 14620.00, orders: 101, units: 160, avgOrderValue: 144.75, conversionRate: 6.3, spend: { media: 3420.00, couponImpact: 720.00, deliverySupport: 1100.00, productCost: 5980.00, taxes: 1190.00, margin: 2210.00 } },
            lastMonth: { name: "Facebook Ads", revenue: 12840.00, orders: 92, units: 148, avgOrderValue: 139.57, conversionRate: 5.9, spend: { media: 3190.00, couponImpact: 680.00, deliverySupport: 980.00, productCost: 5320.00, taxes: 1020.00, margin: 1650.00 } },
            last30: { name: "Facebook Ads", revenue: 41280.00, orders: 282, units: 448, avgOrderValue: 146.38, conversionRate: 6.4, spend: { media: 9400.00, couponImpact: 2100.00, deliverySupport: 3180.00, productCost: 17120.00, taxes: 3320.00, margin: 6160.00 } }
        },
        instagramAds: {
            thisMonth: { name: "Instagram Ads", revenue: 15380.00, orders: 104, units: 168, avgOrderValue: 147.88, conversionRate: 7.1, spend: { media: 3340.00, couponImpact: 610.00, deliverySupport: 1090.00, productCost: 6290.00, taxes: 1240.00, margin: 2810.00 } },
            lastMonth: { name: "Instagram Ads", revenue: 11120.00, orders: 82, units: 132, avgOrderValue: 135.61, conversionRate: 6.0, spend: { media: 2870.00, couponImpact: 590.00, deliverySupport: 930.00, productCost: 4740.00, taxes: 980.00, margin: 1010.00 } },
            last30: { name: "Instagram Ads", revenue: 38760.00, orders: 261, units: 421, avgOrderValue: 148.51, conversionRate: 6.9, spend: { media: 8700.00, couponImpact: 1800.00, deliverySupport: 2940.00, productCost: 16080.00, taxes: 3110.00, margin: 6130.00 } }
        },
        youtube: {
            thisMonth: { name: "YouTube", revenue: 10460.00, orders: 72, units: 118, avgOrderValue: 145.28, conversionRate: 5.6, spend: { media: 2320.00, couponImpact: 310.00, deliverySupport: 760.00, productCost: 4380.00, taxes: 840.00, margin: 1850.00 } },
            lastMonth: { name: "YouTube", revenue: 9180.00, orders: 66, units: 104, avgOrderValue: 139.09, conversionRate: 5.1, spend: { media: 2110.00, couponImpact: 280.00, deliverySupport: 690.00, productCost: 3940.00, taxes: 760.00, margin: 1400.00 } },
            last30: { name: "YouTube", revenue: 28740.00, orders: 193, units: 311, avgOrderValue: 148.91, conversionRate: 5.8, spend: { media: 6400.00, couponImpact: 900.00, deliverySupport: 2210.00, productCost: 11960.00, taxes: 2310.00, margin: 4960.00 } }
        },
        coupons: {
            thisMonth: { name: "Coupon Campaign", revenue: 8300.00, orders: 64, units: 104, avgOrderValue: 129.69, conversionRate: 8.0, spend: { media: 920.00, couponImpact: 2610.00, deliverySupport: 680.00, productCost: 3730.00, taxes: 720.00, margin: 760.00 } },
            lastMonth: { name: "Coupon Campaign", revenue: 7120.00, orders: 58, units: 92, avgOrderValue: 122.76, conversionRate: 7.2, spend: { media: 820.00, couponImpact: 2430.00, deliverySupport: 610.00, productCost: 3220.00, taxes: 620.00, margin: 420.00 } },
            last30: { name: "Coupon Campaign", revenue: 22680.00, orders: 177, units: 308, avgOrderValue: 128.14, conversionRate: 8.3, spend: { media: 2100.00, couponImpact: 4700.00, deliverySupport: 1840.00, productCost: 9560.00, taxes: 1820.00, margin: 2660.00 } }
        }
    };

    // Preload team flags for the country chart
    const teamFlagImages = {};
    teamData.forEach(item => {
        const img = new Image();
        img.src = item.flag;
        teamFlagImages[item.team] = img;
    });

    // Show conversion labels above the team bars
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

    // Draw team flags below the x-axis
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

    // Show conversion labels in the marketing chart
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

    // Show average order value below the marketing bars
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

                if (labels.length >= 4 && performanceData.monthly.revenue[index] !== undefined) {
                    revenueReference = performanceData.monthly.revenue[index];
                } else {
                    revenueReference = weeklyRevenueReference[index] || 0;
                }

                const avgOrderValue = value ? (revenueReference / value).toFixed(2) : "0.00";
                ctx.fillText(`$${avgOrderValue}`, bar.x, chart.scales.y1.bottom - 22);
            });

            ctx.restore();
        }
    };

    // Executive summary controls
    const executiveSummaryContainer = document.getElementById("executiveSummaryCards");
    const executivePeriodFilter = document.getElementById("executivePeriodFilter");
    const executiveGroupFilter = document.getElementById("executiveGroupFilter");

    // Pick the comparison period for the executive summary
    function getPreviousExecutivePeriod(periodKey) {
        const map = {
            thisMonth: "lastMonth",
            lastMonth: "last30",
            last7: "last30",
            last30: "lastMonth"
        };
        return map[periodKey] || "lastMonth";
    }

    // Build one executive summary card
    function summaryMetricCard(metric, source, previous, showGroupLabel) {
        const currentValue = source[metric.id];
        const previousValue = previous[metric.id];
        const change = calcPctChange(currentValue, previousValue);
        const klass = trendClass(change, metric.lowerIsBetter);
        const goalText = executiveGoals[metric.id] || "Goal: Monitor";
        const previousText = metric.formatter(previousValue);
        const changeText = change === null ? "–" : `${change.toFixed(1)}%`;

        return `
            <div class="summary-card summary-group-${metric.group}"
                 data-group="${metric.group}">
                ${showGroupLabel ? `<span class="summary-group-tag">${executiveGroupTitles[metric.group]}</span>` : ""}
                <span class="summary-label">${metric.label}</span>
                <strong class="summary-value">${metric.formatter(currentValue)}</strong>
                <span class="summary-trend"><span class="${klass}">${trendLabel(change, metric.lowerIsBetter)}</span></span>
                <div class="summary-hover-card">
                    <div><strong>${goalText}</strong></div>
                    <div>Previous period: ${previousText}</div>
                    <div>Change vs previous: ${changeText}</div>
                </div>
            </div>
        `;
    }

    // Return the metrics for the selected filter
    function getExecutiveMetricsToShow(filterValue) {
        if (filterValue === "all") {
            return executiveMetricDefinitions;
        }

        if (filterValue === "keyMetrics") {
            return executiveMetricDefinitions.filter(metric => keyMetricIds.includes(metric.id));
        }

        return executiveMetricDefinitions.filter(metric => metric.group === filterValue);
    }

    // Render the executive summary cards
    function renderExecutiveSummary() {
        if (!executiveSummaryContainer) return;

        const periodKey = executivePeriodFilter ? executivePeriodFilter.value : "thisMonth";
        const groupFilter = executiveGroupFilter ? executiveGroupFilter.value : "keyMetrics";

        const source = executiveSummaryData[periodKey];
        const previousKey = getPreviousExecutivePeriod(periodKey);
        const previous = executiveSummaryData[previousKey];

        const metrics = getExecutiveMetricsToShow(groupFilter);
        let lastGroup = null;

        const cards = metrics.map(metric => {
            const showGroupLabel = metric.group !== lastGroup;
            lastGroup = metric.group;
            return summaryMetricCard(metric, source, previous, showGroupLabel);
        });

        executiveSummaryContainer.innerHTML = cards.join("");
    }

    if (executivePeriodFilter) {
        renderExecutiveSummary();
        executivePeriodFilter.addEventListener("change", renderExecutiveSummary);
    }

    if (executiveGroupFilter) {
        executiveGroupFilter.addEventListener("change", renderExecutiveSummary);
    }

    // Main performance chart
    const performanceCtx = document.getElementById("dailyPerformanceChart");
    const performanceFilter = document.getElementById("performanceView");
    let performanceChart = null;

    // Build the main sales performance chart
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
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw;

                                if (label.includes("US$") || label.includes("Revenue") || label.includes("Costs") || label.includes("Profit")) {
                                    return `${label}: US$ ${usMoney(value)}`;
                                }

                                return `${label}: ${usInteger(value)}`;
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
                        ticks: { color: chartTextColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        position: "left",
                        ticks: {
                            color: chartTextColor,
                            callback: function (value) { return usInteger(value); }
                        },
                        grid: { color: gridColor },
                        title: {
                            display: true,
                            text: "Jerseys Sold",
                            color: chartTextColor
                        }
                    },
                    y1: {
                        position: "right",
                        ticks: {
                            color: chartTextColor,
                            callback: function (value) { return "US$ " + usMoney(value); }
                        },
                        grid: { drawOnChartArea: false },
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

    if (performanceCtx) buildPerformanceChart("monthly");
    if (performanceFilter) performanceFilter.addEventListener("change", function () { buildPerformanceChart(this.value); });

    // Country comparison chart
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
                        yAxisID: "y",
                        order: 4
                    },
                    {
                        type: "bar",
                        label: "Purchases",
                        data: teamData.map(x => x.purchases),
                        backgroundColor: "rgba(255, 255, 255, 0.72)",
                        borderColor: "rgba(255, 255, 255, 1)",
                        borderWidth: 1,
                        yAxisID: "y",
                        order: 4
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
                        yAxisID: "y1",
                        order: 1
                    },
                    {
                        type: "line",
                        label: "Costs (US$)",
                        data: teamData.map(x => x.cost),
                        borderColor: "rgba(255, 99, 132, 0.95)",
                        backgroundColor: "rgba(255, 99, 132, 0.10)",
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
                onClick: function (event, elements) {
                    if (!elements.length) return;
                    const index = elements[0].index;
                    const countryKey = teamData[index].countryKey || teamData[index].team;
                    if (typeof updateCountryChart === "function") updateCountryChart(countryKey);
                },
                responsive: true,
                layout: { padding: { bottom: 26 } },
                plugins: {
                    legend: { labels: { color: chartTextColor } },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw;
                                if (label.includes("Revenue") || label.includes("Costs")) {
                                    return `${label}: US$ ${usMoney(value)}`;
                                }
                                return `${label}: ${usInteger(value)}`;
                            },
                            afterBody: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const team = teamData[index];
                                const conversion = ((team.purchases / team.views) * 100).toFixed(1);
                                const grossMargin = team.revenue ? (((team.revenue - team.cost) / team.revenue) * 100).toFixed(1) : "0.0";

                                return [
                                    `Cost: US$ ${usMoney(team.cost)}`,
                                    `Gross Margin: ${grossMargin}%`,
                                    `Conversion Rate: ${conversion}%`
                                ];
                            }
                        }
                    }
                },
                interaction: { mode: "index", intersect: false },
                scales: {
                    x: {
                        ticks: { color: chartTextColor, padding: 10 },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        position: "left",
                        ticks: {
                            color: chartTextColor,
                            callback: function (value) { return usInteger(value); }
                        },
                        grid: { color: gridColor },
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
                            color: chartTextColor,
                            callback: function (value) { return "US$ " + usMoney(value); }
                        },
                        grid: { drawOnChartArea: false },
                        title: {
                            display: true,
                            text: "Revenue / Costs (US$)",
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
                const clickedFlag = clickX >= box.x && clickX <= box.x + box.width && clickY >= box.y && clickY <= box.y + box.height;
                const clickedLabelArea = clickX >= box.labelLeft && clickX <= box.labelRight && clickY >= box.labelTop && clickY <= box.labelBottom;
                if (clickedFlag || clickedLabelArea) matchedCountry = box.country;
            });

            if (matchedCountry && typeof updateCountryChart === "function") {
                updateCountryChart(matchedCountry);
            }
        });
    }

    // Country detail chart and summary
    const countryPieCtx = document.getElementById("countryTypePieChart");
    const countrySelector = document.getElementById("countrySalesSelector");
    const countryPeriodFilter = document.getElementById("countryPeriodFilter");
    const selectedCountryName = document.getElementById("selectedCountryName");
    const selectedCountryQty = document.getElementById("selectedCountryQty");
    const selectedCountryValue = document.getElementById("selectedCountryValue");
    const selectedCountryOrders = document.getElementById("selectedCountryOrders");
    const selectedCountryAov = document.getElementById("selectedCountryAov");
    const selectedCountryUnitsPerOrder = document.getElementById("selectedCountryUnitsPerOrder");
    const selectedCountryConversion = document.getElementById("selectedCountryConversion");
    const countrySalesSummary = document.getElementById("countrySalesSummary");
    const countrySalesBreakdownBody = document.getElementById("countrySalesBreakdownBody");

    let countryPieChart = null;
    let selectedCountryKey = "Brazil";

    // Get the selected period for the country chart
    function getCurrentCountryPeriod() {
        return countryPeriodFilter ? countryPeriodFilter.value : "thisMonth";
    }

    // Build the country buttons below the chart
    function buildCountrySelector() {
        if (!countrySelector) return;
        const activePeriod = getCurrentCountryPeriod();
        countrySelector.innerHTML = "";

        Object.keys(countrySalesData[activePeriod]).forEach(function (country) {
            const data = countrySalesData[activePeriod][country];
            const button = document.createElement("button");
            button.type = "button";
            button.className = "flag-link country-sales-link";
            button.dataset.country = country;

            if (country === selectedCountryKey) button.classList.add("active-country");

            button.innerHTML =
                '<img src="' + data.flag + '" alt="' + country + ' flag" class="flag-img" />' +
                '<span class="flag-name">' + country + '</span>';

            button.addEventListener("click", function () { updateCountryChart(country); });
            countrySelector.appendChild(button);
        });
    }

    // Highlight the active country button
    function updateCountrySelectorActiveState() {
        document.querySelectorAll(".country-sales-link").forEach(function (link) {
            if (link.dataset.country === selectedCountryKey) link.classList.add("active-country");
            else link.classList.remove("active-country");
        });
    }

    // Render the country sales breakdown table
    function renderCountryTable(source, totalQty) {
        if (!countrySalesBreakdownBody) return;

        countrySalesBreakdownBody.innerHTML = source.types.map(function (item) {
            const share = totalQty ? (item.quantity / totalQty) * 100 : 0;
            const avgPrice = item.quantity ? item.value / item.quantity : 0;

            return `
                <tr>
                    <td>${item.type}</td>
                    <td>${usInteger(item.quantity)}</td>
                    <td>US$ ${usMoney(item.value)}</td>
                    <td>${usPercent(share)}</td>
                    <td>US$ ${usMoney(avgPrice)}</td>
                </tr>
            `;
        }).join("");
    }

    // Update the country pie chart and detail cards
    function updateCountryChart(country) {
        if (!countryPieCtx) return;
        const activePeriod = getCurrentCountryPeriod();
        if (!countrySalesData[activePeriod] || !countrySalesData[activePeriod][country]) return;

        selectedCountryKey = country;
        const source = countrySalesData[activePeriod][country];

        const labels = source.types.map(function (x) { return x.type; });
        const quantities = source.types.map(function (x) { return x.quantity; });
        const totalQty = source.types.reduce(function (sum, x) { return sum + x.quantity; }, 0);
        const totalValue = source.types.reduce(function (sum, x) { return sum + x.value; }, 0);
        const avgOrderValue = source.orders ? totalValue / source.orders : 0;
        const avgUnitsPerOrder = source.orders ? totalQty / source.orders : 0;
        const conversion = source.views ? (source.orders / source.views) * 100 : 0;

        if (countryPieChart) countryPieChart.destroy();

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
                    legend: { labels: { color: chartTextColor } },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                const item = source.types[index];
                                return item.type + ": " + usInteger(item.quantity) + " units | US$ " + usMoney(item.value);
                            }
                        }
                    }
                }
            }
        });

        if (selectedCountryName) selectedCountryName.textContent = country;
        if (selectedCountryQty) selectedCountryQty.textContent = usInteger(totalQty);
        if (selectedCountryValue) selectedCountryValue.textContent = "US$ " + usMoney(totalValue);
        if (selectedCountryOrders) selectedCountryOrders.textContent = usInteger(source.orders);
        if (selectedCountryAov) selectedCountryAov.textContent = "US$ " + usMoney(avgOrderValue);
        if (selectedCountryUnitsPerOrder) selectedCountryUnitsPerOrder.textContent = avgUnitsPerOrder.toFixed(2);
        if (selectedCountryConversion) selectedCountryConversion.textContent = usPercent(conversion);

        if (countrySalesSummary) {
            countrySalesSummary.textContent =
                "Sales distribution for " + country +
                " during the selected period, including quantity by jersey type, total sales value, average order value, average products per order, and conversion rate.";
        }

        renderCountryTable(source, totalQty);
        updateCountrySelectorActiveState();
    }

    if (countryPieCtx) {
        buildCountrySelector();
        updateCountryChart(selectedCountryKey);
    }

    if (countryPeriodFilter) {
        countryPeriodFilter.addEventListener("change", function () {
            const activePeriod = this.value;
            const availableCountries = Object.keys(countrySalesData[activePeriod]);

            if (!availableCountries.includes(selectedCountryKey)) {
                selectedCountryKey = availableCountries[0];
            }

            buildCountrySelector();
            updateCountryChart(selectedCountryKey);
        });
    }

    // Marketing chart controls
    const marketingCtx = document.getElementById("marketingPerformanceChart");
    const marketingFilter = document.getElementById("marketingView");
    let marketingChart = null;

    // Build the marketing performance chart
    function buildMarketingChart(viewKey) {
        const source = marketingData[viewKey];

        if (marketingChart) marketingChart.destroy();

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
                layout: { padding: { bottom: 26 } },
                plugins: {
                    legend: { labels: { color: chartTextColor } },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw;

                                if (label.includes("US$") || label.includes("Spend")) {
                                    return `${label}: US$ ${usMoney(value)}`;
                                }

                                return `${label}: ${usInteger(value)}`;
                            },
                            afterBody: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                const visits = source.visits[index];
                                const orders = source.orders[index];
                                const conversion = ((orders / visits) * 100).toFixed(2);

                                let revenueReference = 0;
                                if (viewKey === "monthly") revenueReference = performanceData.monthly.revenue[index] || 0;
                                else revenueReference = weeklyRevenueReference[index] || 0;

                                const avgOrderValue = orders ? usMoney(revenueReference / orders) : "0.00";

                                return [
                                    `Conversion Rate: ${conversion}%`,
                                    `Average Order Value: US$ ${avgOrderValue}`
                                ];
                            }
                        }
                    }
                },
                interaction: { mode: "index", intersect: false },
                scales: {
                    x: {
                        ticks: { color: chartTextColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        position: "left",
                        ticks: {
                            color: chartTextColor,
                            callback: function (value) { return usInteger(value); }
                        },
                        grid: { color: gridColor },
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
                            color: chartTextColor,
                            callback: function (value) { return usInteger(value); }
                        },
                        grid: { drawOnChartArea: false },
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

    if (marketingCtx) buildMarketingChart("monthly");
    if (marketingFilter) marketingFilter.addEventListener("change", function () { buildMarketingChart(this.value); });

    // Cost composition chart controls
    const costCompositionCtx = document.getElementById("costCompositionChart");
    const costViewMode = document.getElementById("costViewMode");
    const costPeriodFilter = document.getElementById("costPeriodFilter");
    const costComparePeriodFilter = document.getElementById("costComparePeriodFilter");
    const campaignFilter = document.getElementById("campaignFilter");
    const campaignCompareFilter = document.getElementById("campaignCompareFilter");
    const costBreakdownBody = document.getElementById("costBreakdownBody");
    const costBreakdownHead = document.getElementById("costBreakdownHead");
    const costCompositionSummary = document.getElementById("costCompositionSummary");

    let costCompositionChart = null;

    // Get the comparison source for the campaign table
    function getCampaignComparisonSource(compareKey, periodKey) {
        if (compareKey === "allCampaigns") return allCampaignsByPeriod[periodKey];
        return campaignPeriodData[compareKey][periodKey];
    }

    // Render the cost comparison table
    function renderCostBreakdownTable(mode, periodKey, campaignKey) {
        if (!costBreakdownBody) return;

        if (mode === "period") {
            const compareKey = costComparePeriodFilter ? costComparePeriodFilter.value : "lastMonth";
            const source = profitabilityData[periodKey];
            const compare = profitabilityData[compareKey];

            const sourceCosts = source.costs;
            const compareCosts = compare.costs;

            const sourceGrossMarginPct = ((source.revenue - sourceCosts.product) / source.revenue) * 100;
            const compareGrossMarginPct = ((compare.revenue - compareCosts.product) / compare.revenue) * 100;

            const sourceNetMarginPct = (sourceCosts.netMargin / source.revenue) * 100;
            const compareNetMarginPct = (compareCosts.netMargin / compare.revenue) * 100;

            const sourceAvgOrderValue = source.orders ? source.revenue / source.orders : 0;
            const compareAvgOrderValue = compare.orders ? compare.revenue / compare.orders : 0;

            const sourceAvgProductTicket = source.units ? source.revenue / source.units : 0;
            const compareAvgProductTicket = compare.units ? compare.revenue / compare.units : 0;

            const sourceUnitsPerOrder = source.orders ? source.units / source.orders : 0;
            const compareUnitsPerOrder = compare.orders ? compare.units / compare.orders : 0;

            const sourceCac = source.newCustomers ? sourceCosts.marketing / source.newCustomers : 0;
            const compareCac = compare.newCustomers ? compareCosts.marketing / compare.newCustomers : 0;

            if (costBreakdownHead) {
                costBreakdownHead.innerHTML = `
                    <tr>
                        <th>Metric</th>
                        <th>${costPeriodFilter.options[costPeriodFilter.selectedIndex].text}</th>
                        <th>${costComparePeriodFilter.options[costComparePeriodFilter.selectedIndex].text.replace("Compare to ", "")}</th>
                        <th>Change</th>
                    </tr>
                `;
            }

            costBreakdownBody.innerHTML = `
                ${metricRow("Revenue", source.revenue, compare.revenue, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Orders", source.orders, compare.orders, v => usInteger(v))}
                ${metricRow("Units Sold", source.units, compare.units, v => usInteger(v))}
                ${metricRow("Average Order Value", sourceAvgOrderValue, compareAvgOrderValue, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Average Product Ticket", sourceAvgProductTicket, compareAvgProductTicket, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Products per Order", sourceUnitsPerOrder, compareUnitsPerOrder, v => v.toFixed(2))}
                ${metricRow("Product Cost", sourceCosts.product, compareCosts.product, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Technology", sourceCosts.technology, compareCosts.technology, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Marketing", sourceCosts.marketing, compareCosts.marketing, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Delivery", sourceCosts.delivery, compareCosts.delivery, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("People", sourceCosts.people, compareCosts.people, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Taxes", sourceCosts.taxes, compareCosts.taxes, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Net Margin", sourceCosts.netMargin, compareCosts.netMargin, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Gross Margin %", sourceGrossMarginPct, compareGrossMarginPct, v => `${v.toFixed(1)}%`)}
                ${metricRow("Net Margin %", sourceNetMarginPct, compareNetMarginPct, v => `${v.toFixed(1)}%`)}
                ${metricRow("CAC", sourceCac, compareCac, v => `US$ ${usMoney(v)}`, true)}
            `;

            if (costCompositionSummary) {
                costCompositionSummary.textContent =
                    "Financial composition for the selected period with automatic comparison against another selected period.";
            }
        } else {
            const selectedPeriod = costPeriodFilter ? costPeriodFilter.value : "thisMonth";
            const compareCampaignKey = campaignCompareFilter ? campaignCompareFilter.value : "allCampaigns";

            const source = campaignPeriodData[campaignKey][selectedPeriod];
            const compare = getCampaignComparisonSource(compareCampaignKey, selectedPeriod);

            const sourceSpend = source.spend;
            const compareSpend = compare.spend;

            const sourceCampaignSpend = sourceSpend.media + sourceSpend.couponImpact;
            const compareCampaignSpend = compareSpend.media + compareSpend.couponImpact;

            const sourceClicks = Math.round(source.orders / (source.conversionRate / 100));
            const compareClicks = Math.round(compare.orders / (compare.conversionRate / 100));

            const sourceRoas = sourceCampaignSpend ? source.revenue / sourceCampaignSpend : 0;
            const compareRoas = compareCampaignSpend ? compare.revenue / compareCampaignSpend : 0;

            const sourceMarginRoi = sourceCampaignSpend ? sourceSpend.margin / sourceCampaignSpend : 0;
            const compareMarginRoi = compareCampaignSpend ? compareSpend.margin / compareCampaignSpend : 0;

            const sourceRevenuePerClick = sourceClicks ? source.revenue / sourceClicks : 0;
            const compareRevenuePerClick = compareClicks ? compare.revenue / compareClicks : 0;

            const sourceMarginPerClick = sourceClicks ? sourceSpend.margin / sourceClicks : 0;
            const compareMarginPerClick = compareClicks ? compareSpend.margin / compareClicks : 0;

            if (costBreakdownHead) {
                costBreakdownHead.innerHTML = `
                    <tr>
                        <th>Metric</th>
                        <th>${source.name}</th>
                        <th>${compare.name}</th>
                        <th>Change</th>
                    </tr>
                `;
            }

            costBreakdownBody.innerHTML = `
                ${metricRow("Revenue", source.revenue, compare.revenue, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Orders", source.orders, compare.orders, v => usInteger(v))}
                ${metricRow("Units Sold", source.units, compare.units, v => usInteger(v))}
                ${metricRow("Average Order Value", source.avgOrderValue, compare.avgOrderValue, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Conversion Rate", source.conversionRate, compare.conversionRate, v => usPercent(v))}
                ${metricRow("Estimated Clicks", sourceClicks, compareClicks, v => usInteger(v))}
                ${metricRow("Direct Sales from Clicks", source.orders, compare.orders, v => usInteger(v))}
                ${metricRow("Campaign Spend", sourceCampaignSpend, compareCampaignSpend, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Media", sourceSpend.media, compareSpend.media, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Coupon Impact", sourceSpend.couponImpact, compareSpend.couponImpact, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Delivery Support", sourceSpend.deliverySupport, compareSpend.deliverySupport, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Product Cost", sourceSpend.productCost, compareSpend.productCost, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Taxes", sourceSpend.taxes, compareSpend.taxes, v => `US$ ${usMoney(v)}`, true)}
                ${metricRow("Margin", sourceSpend.margin, compareSpend.margin, v => `US$ ${usMoney(v)}`)}
                ${metricRow("ROAS", sourceRoas, compareRoas, v => `${v.toFixed(2)}x`)}
                ${metricRow("Margin ROI", sourceMarginRoi * 100, compareMarginRoi * 100, v => `${v.toFixed(1)}%`)}
                ${metricRow("Revenue per Click", sourceRevenuePerClick, compareRevenuePerClick, v => `US$ ${usMoney(v)}`)}
                ${metricRow("Margin per Click", sourceMarginPerClick, compareMarginPerClick, v => `US$ ${usMoney(v)}`)}
            `;

            if (costCompositionSummary) {
                costCompositionSummary.textContent =
                    "Campaign comparison for the selected period, including individual campaign performance versus another campaign or all campaigns combined.";
            }
        }
    }

    // Build the cost composition pie chart
    function buildCostCompositionChart() {
        if (!costCompositionCtx) return;

        const mode = costViewMode ? costViewMode.value : "period";
        let labels = [];
        let values = [];

        if (mode === "period") {
            const periodKey = costPeriodFilter ? costPeriodFilter.value : "thisMonth";
            const source = profitabilityData[periodKey];

            labels = ["Product", "Technology", "Marketing", "Delivery", "People", "Taxes", "Net Margin"];
            values = [
                source.costs.product,
                source.costs.technology,
                source.costs.marketing,
                source.costs.delivery,
                source.costs.people,
                source.costs.taxes,
                source.costs.netMargin
            ];

            renderCostBreakdownTable("period", periodKey, null);
        } else {
            const selectedPeriod = costPeriodFilter ? costPeriodFilter.value : "thisMonth";
            const source = campaignPeriodData[campaignFilter.value][selectedPeriod];

            labels = ["Media", "Coupon Impact", "Delivery Support", "Product Cost", "Taxes", "Margin"];
            values = [
                source.spend.media,
                source.spend.couponImpact,
                source.spend.deliverySupport,
                source.spend.productCost,
                source.spend.taxes,
                source.spend.margin
            ];

            renderCostBreakdownTable("campaign", selectedPeriod, campaignFilter.value);
        }

        if (costCompositionChart) costCompositionChart.destroy();

        costCompositionChart = new Chart(costCompositionCtx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: [
                            "rgba(87, 227, 137, 0.75)",
                            "rgba(255, 255, 255, 0.78)",
                            "rgba(255, 166, 0, 0.80)",
                            "rgba(255, 99, 132, 0.75)",
                            "rgba(80, 180, 255, 0.75)",
                            "rgba(176, 124, 255, 0.72)",
                            "rgba(255, 214, 10, 0.78)"
                        ],
                        borderColor: "rgba(16, 20, 24, 0.85)",
                        borderWidth: 2,
                        radius: "84%"
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: 6 },
                plugins: {
                    legend: { labels: { color: chartTextColor } },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: US$ ${usMoney(context.raw)}`;
                            },
                            afterBody: function () {
                                const mode = costViewMode ? costViewMode.value : "period";

                                if (mode === "period") {
                                    const periodKey = costPeriodFilter ? costPeriodFilter.value : "thisMonth";
                                    const source = profitabilityData[periodKey];
                                    const costs = source.costs;
                                    const summary = executiveSummaryData[periodKey];

                                    const totalCampaigns = summary.campaignCount;
                                    const campaignSpend = totalCampaigns ? costs.marketing / totalCampaigns : 0;
                                    const estimatedClicks = Math.round(source.orders / (summary.conversionRate / 100));
                                    const directSales = source.orders;
                                    const marketingInvestment = costs.marketing;
                                    const roas = marketingInvestment ? source.revenue / marketingInvestment : 0;
                                    const marginRoi = marketingInvestment ? costs.netMargin / marketingInvestment : 0;
                                    const revenuePerClick = estimatedClicks ? source.revenue / estimatedClicks : 0;
                                    const marginPerClick = estimatedClicks ? costs.netMargin / estimatedClicks : 0;

                                    return [
                                        `Campaigns in Period: ${usInteger(totalCampaigns)}`,
                                        `Average Spend per Campaign: US$ ${usMoney(campaignSpend)}`,
                                        `Estimated Clicks: ${usInteger(estimatedClicks)}`,
                                        `Direct Sales from Clicks: ${usInteger(directSales)}`,
                                        `ROAS: ${roas.toFixed(2)}x`,
                                        `Margin ROI: ${(marginRoi * 100).toFixed(1)}%`,
                                        `Revenue per Click: US$ ${usMoney(revenuePerClick)}`,
                                        `Margin per Click: US$ ${usMoney(marginPerClick)}`
                                    ];
                                }

                                const selectedPeriod = costPeriodFilter ? costPeriodFilter.value : "thisMonth";
                                const source = campaignPeriodData[campaignFilter.value][selectedPeriod];
                                const spend = source.spend;
                                const totalCampaignSpend = spend.media + spend.couponImpact;
                                const estimatedClicks = Math.round(source.orders / (source.conversionRate / 100));
                                const directSales = source.orders;
                                const roas = totalCampaignSpend ? source.revenue / totalCampaignSpend : 0;
                                const marginRoi = totalCampaignSpend ? source.spend.margin / totalCampaignSpend : 0;
                                const revenuePerClick = estimatedClicks ? source.revenue / estimatedClicks : 0;
                                const marginPerClick = estimatedClicks ? source.spend.margin / estimatedClicks : 0;

                                return [
                                    `Period: ${costPeriodFilter.options[costPeriodFilter.selectedIndex].text}`,
                                    `Campaigns: 1`,
                                    `Campaign Spend: US$ ${usMoney(totalCampaignSpend)}`,
                                    `Estimated Clicks: ${usInteger(estimatedClicks)}`,
                                    `Direct Sales from Clicks: ${usInteger(directSales)}`,
                                    `Conversion Rate: ${usPercent(source.conversionRate)}`,
                                    `ROAS: ${roas.toFixed(2)}x`,
                                    `Margin ROI: ${(marginRoi * 100).toFixed(1)}%`,
                                    `Revenue per Click: US$ ${usMoney(revenuePerClick)}`,
                                    `Margin per Click: US$ ${usMoney(marginPerClick)}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }

    if (costCompositionCtx) buildCostCompositionChart();

    if (costViewMode) {
        costViewMode.addEventListener("change", function () {
            const isCampaign = this.value === "campaign";

            if (campaignFilter) campaignFilter.classList.toggle("d-none", !isCampaign);
            if (campaignCompareFilter) campaignCompareFilter.classList.toggle("d-none", !isCampaign);
            if (costPeriodFilter) costPeriodFilter.classList.remove("d-none");
            if (costComparePeriodFilter) costComparePeriodFilter.classList.toggle("d-none", isCampaign);

            buildCostCompositionChart();
        });
    }

    if (costPeriodFilter) costPeriodFilter.addEventListener("change", buildCostCompositionChart);
    if (costComparePeriodFilter) costComparePeriodFilter.addEventListener("change", buildCostCompositionChart);
    if (campaignFilter) campaignFilter.addEventListener("change", buildCostCompositionChart);
    if (campaignCompareFilter) campaignCompareFilter.addEventListener("change", buildCostCompositionChart);
});