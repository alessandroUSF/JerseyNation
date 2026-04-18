document.addEventListener("DOMContentLoaded", async function () {
  const chartTextColor = "#e9f7ee";
  const gridColor = "rgba(255, 255, 255, 0.08)";
  const usNumber = new Intl.NumberFormat('en-US');
  const usMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const chartData = await fetchJson('data/chart-data.json');
  const { performanceData, teamData, countrySalesData, marketingData } = chartData;

  const baseTooltip = {
    mode: 'index',
    intersect: false,
    backgroundColor: 'rgba(22, 27, 34, 0.96)',
    borderColor: 'rgba(255,255,255,0.28)',
    borderWidth: 2,
    titleColor: '#ffffff',
    bodyColor: '#ffffff',
    padding: 12,
    boxPadding: 4,
    usePointStyle: true
  };

  function formatAxisNumber(value) { return usNumber.format(value); }
  function formatAxisMoney(value) { return usMoney.format(value); }

  const performanceCtx = document.getElementById("dailyPerformanceChart");
  const performanceFilter = document.getElementById("performanceView");
  let performanceChart = null;

  function buildPerformanceChart(viewKey) {
    const source = performanceData[viewKey];
    if (performanceChart) performanceChart.destroy();
    performanceChart = new Chart(performanceCtx, {
      data: {
        labels: source.labels,
        datasets: [
          { type:"bar", label:"Jerseys Sold", data: source.sold, backgroundColor:"rgba(87, 227, 137, 0.65)", borderColor:"rgba(87, 227, 137, 1)", borderWidth:1.5, yAxisID:"y", order:3 },
          { type:"line", label:"Revenue (US$)", data: source.revenue, borderColor:"rgba(255,255,255,0.95)", backgroundColor:"rgba(255,255,255,0.95)", tension:0.3, yAxisID:"y1", order:1 },
          { type:"line", label:"Costs (US$)", data: source.costs, borderColor:"rgba(255,99,132,0.95)", backgroundColor:"rgba(255,99,132,0.95)", tension:0.3, yAxisID:"y1", order:1 },
          { type:"line", label:"Profit (US$)", data: source.profit, borderColor:"rgba(255,166,0,0.95)", backgroundColor:"rgba(255,166,0,0.95)", tension:0.3, yAxisID:"y1", order:1 }
        ]
      },
      options: {
        responsive:true,
        plugins:{
          legend:{labels:{color:chartTextColor, boxWidth:18, boxHeight:10, borderRadius:2}},
          tooltip:{
            ...baseTooltip,
            callbacks:{
              label(context){
                const label = context.dataset.label || '';
                const value = context.raw;
                return context.dataset.yAxisID === 'y1' ? `${label}: ${formatAxisMoney(value)}` : `${label}: ${formatAxisNumber(value)}`;
              }
            }
          }
        },
        interaction:{mode:"index", intersect:false},
        scales:{
          x:{ticks:{color:chartTextColor}, grid:{color:gridColor}},
          y:{ticks:{color:chartTextColor, callback: value => formatAxisNumber(value)}, grid:{color:gridColor}, title:{display:true,text:"Jerseys Sold",color:chartTextColor}},
          y1:{position:"right", ticks:{color:chartTextColor, callback: value => formatAxisMoney(value)}, grid:{drawOnChartArea:false}, title:{display:true,text:"US$",color:chartTextColor}}
        }
      }
    });
  }

  const conversionLabelPlugin = {
    id:"conversionLabelPlugin",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(1);
      const purchases = chart.data.datasets[1].data;
      const views = chart.data.datasets[0].data;
      ctx.save();
      ctx.font = "bold 11px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      purchases.forEach((value,index)=>{
        const bar=meta.data[index];
        if(!bar || !views[index]) return;
        ctx.fillText(((value/views[index])*100).toFixed(1)+"%", bar.x, bar.y-6);
      });
      ctx.restore();
    }
  };

  const teamCtx = document.getElementById("teamPerformanceChart");
  const teamChart = new Chart(teamCtx, {
    data:{
      labels: teamData.map(x=>x.team),
      datasets:[
        {type:"bar", label:"Views", data:teamData.map(x=>x.views), backgroundColor:"rgba(255,255,255,0.30)", borderColor:"rgba(255,255,255,0.65)", borderWidth:1.5, yAxisID:"y"},
        {type:"bar", label:"Purchases", data:teamData.map(x=>x.purchases), backgroundColor:"rgba(87, 227, 137, 0.70)", borderColor:"rgba(87, 227, 137, 1)", borderWidth:1.5, yAxisID:"y"},
        {type:"line", label:"Revenue", data:teamData.map(x=>x.revenue), borderColor:"rgba(255, 166, 0, 0.95)", backgroundColor:"rgba(255, 166, 0, 0.95)", tension:0.3, yAxisID:"y1"}
      ]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{labels:{color:chartTextColor, boxWidth:18, boxHeight:10, borderRadius:2}},
        tooltip:{
          ...baseTooltip,
          callbacks:{
            label(context){
              const label = context.dataset.label || '';
              const value = context.raw;
              return context.dataset.yAxisID === 'y1' ? `${label}: ${formatAxisMoney(value)}` : `${label}: ${formatAxisNumber(value)}`;
            },
            afterBody(items){
              const index = items[0]?.dataIndex;
              if (index == null) return [];
              const item = teamData[index];
              const conversion = item.views ? ((item.purchases / item.views) * 100).toFixed(1) : '0.0';
              return [`Conversion: ${conversion}%`];
            }
          }
        }
      },
      interaction:{mode:'index', intersect:false},
      scales:{
        x:{ticks:{display:false, color:chartTextColor}, grid:{display:false}},
        y:{ticks:{color:chartTextColor, callback: value => formatAxisNumber(value)}, grid:{color:gridColor}, title:{display:true,text:"Views / Purchases",color:chartTextColor}},
        y1:{position:"right", ticks:{color:chartTextColor, callback: value => formatAxisMoney(value)}, grid:{drawOnChartArea:false}, title:{display:true,text:"Revenue (US$)",color:chartTextColor}}
      },
      onClick(evt){
        const points = teamChart.getElementsAtEventForMode(evt, 'nearest', {intersect:true}, true);
        if (points.length) openCountry(teamData[points[0].index].countryKey);
      }
    },
    plugins:[conversionLabelPlugin]
  });

  const teamLabelsWrap = document.createElement('div');
  teamLabelsWrap.className = 'chart-country-labels chart-country-labels-absolute';
  const teamLabelButtons = [];
  teamData.forEach(item => {
    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'chart-country-label';
    label.title = item.team;
    label.innerHTML = `<img src="${item.flag}" alt="${item.team} flag"><span>${item.team}</span>`;
    label.addEventListener('click', ()=>openCountry(item.countryKey));
    teamLabelsWrap.appendChild(label);
    teamLabelButtons.push(label);
  });
  teamCtx.parentNode.appendChild(teamLabelsWrap);

  function alignTeamLabelsToPlotArea() {
    if (!teamChart || !teamChart.chartArea || !teamChart.scales || !teamChart.scales.x || !teamCtx) return;
    const xScale = teamChart.scales.x;
    const canvasBox = teamCtx.getBoundingClientRect();
    const parentBox = teamCtx.parentNode.getBoundingClientRect();
    const canvasOffsetWithinParent = Math.max(0, canvasBox.left - parentBox.left);
    teamLabelsWrap.style.position = 'relative';
    teamLabelsWrap.style.height = '86px';
    teamLabelsWrap.style.width = `${teamCtx.clientWidth}px`;
    teamLabelsWrap.style.marginLeft = `${canvasOffsetWithinParent}px`;

    teamLabelButtons.forEach((label, index) => {
      const x = xScale.getPixelForTick(index);
      label.style.position = 'absolute';
      label.style.left = `${x}px`;
      label.style.top = '0';
      label.style.transform = 'translateX(-50%)';
      label.style.width = '92px';
      label.style.maxWidth = '92px';
    });
  }

  setTimeout(alignTeamLabelsToPlotArea, 0);
  alignTeamLabelsToPlotArea();
  window.addEventListener('resize', () => setTimeout(alignTeamLabelsToPlotArea, 80));

  const pieCtx = document.getElementById('countryTypePieChart');
  let pieChart = null;
  function setActiveCountryButton(country) {
    document.querySelectorAll('#countrySalesSelector .flag-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.country === country);
    });
  }

  function openCountry(country) {
    const entry = countrySalesData[country];
    if (!entry) return;
    const labels = entry.types.map(t=>t.type);
    const quantities = entry.types.map(t=>t.quantity);
    const totalQty = entry.types.reduce((a,b)=>a+b.quantity,0);
    const totalValue = entry.types.reduce((a,b)=>a+b.value,0);
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCtx, {
      type:'pie',
      data:{labels, datasets:[{data:quantities, backgroundColor:['rgba(255,255,255,0.92)','rgba(87, 227, 137, 0.82)','rgba(31, 122, 77, 0.88)','rgba(214, 181, 86, 0.88)','rgba(160, 223, 182, 0.78)'], borderColor:['rgba(255,255,255,1)','rgba(87, 227, 137, 1)','rgba(31, 122, 77, 1)','rgba(214, 181, 86, 1)','rgba(160, 223, 182, 1)'], borderWidth:1.5}]},
      options:{
        plugins:{
          legend:{labels:{color:chartTextColor}},
          tooltip:{
            ...baseTooltip,
            callbacks:{
              label(context){
                const label = context.label || '';
                const qty = context.raw;
                const value = entry.types[context.dataIndex]?.value || 0;
                return `${label}: ${formatAxisNumber(qty)} jerseys | ${formatAxisMoney(value)}`;
              },
              afterBody(){
                return [`Total jerseys sold: ${formatAxisNumber(totalQty)}`, `Total sales value: ${formatAxisMoney(totalValue)}`];
              }
            }
          }
        }
      }
    });
    setActiveCountryButton(country);
    document.getElementById('selectedCountryName').textContent = country;
    document.getElementById('selectedCountryQty').textContent = usNumber.format(totalQty);
    document.getElementById('selectedCountryValue').textContent = formatAxisMoney(totalValue);
    document.getElementById('countrySalesSummary').textContent = `Simulated sales mix for ${country}, including jersey type distribution and total commercial value.`;
  }
  const selector = document.getElementById('countrySalesSelector');
  Object.entries(countrySalesData).forEach(([country, info])=>{
    const btn = document.createElement('button');
    btn.type='button'; btn.className='flag-option'; btn.dataset.country = country;
    btn.innerHTML = `<img src="${info.flag}" alt="${country} flag"><span>${country}</span>`;
    btn.addEventListener('click', ()=>openCountry(country));
    selector.appendChild(btn);
  });

  const marketingCtx = document.getElementById("marketingPerformanceChart");
  const marketingFilter = document.getElementById("marketingView");
  let marketingChart = null;
  function buildMarketingChart(viewKey){
    const source = marketingData[viewKey];
    if (marketingChart) marketingChart.destroy();
    marketingChart = new Chart(marketingCtx, {
      data:{
        labels: source.labels,
        datasets:[
          {type:'line', label:'Marketing Spend (US$)', data: source.spend, borderColor:'rgba(255,255,255,0.95)', backgroundColor:'rgba(255,255,255,0.95)', yAxisID:'y1', tension:0.3},
          {type:'bar', label:'Visits', data: source.visits, backgroundColor:'rgba(87, 227, 137, 0.45)', borderColor:'rgba(87, 227, 137, 1)', borderWidth: 1.5, yAxisID:'y'},
          {type:'bar', label:'Orders', data: source.orders, backgroundColor:'rgba(255, 166, 0, 0.55)', borderColor:'rgba(255, 166, 0, 1)', borderWidth: 1.5, yAxisID:'y'}
        ]
      },
      options:{
        responsive:true,
        plugins:{
          legend:{labels:{color:chartTextColor, boxWidth:18, boxHeight:10, borderRadius:2}},
          tooltip:{
            ...baseTooltip,
            callbacks:{
              label(context){
                const label = context.dataset.label || '';
                const value = context.raw;
                return context.dataset.yAxisID === 'y1' ? `${label}: ${formatAxisMoney(value)}` : `${label}: ${formatAxisNumber(value)}`;
              },
              afterBody(items){
                const index = items[0]?.dataIndex;
                if (index == null) return [];
                const visits = source.visits[index] || 0;
                const orders = source.orders[index] || 0;
                const spend = source.spend[index] || 0;
                const conversion = visits ? ((orders / visits) * 100).toFixed(2) : '0.00';
                const aov = orders ? (spend / orders) : 0;
                return [`Conversion rate: ${conversion}%`, `Spend per order: ${formatAxisMoney(aov)}`];
              }
            }
          }
        },
        interaction:{mode:'index', intersect:false},
        scales:{
          x:{ticks:{color:chartTextColor}, grid:{color:gridColor}},
          y:{ticks:{color:chartTextColor, callback: value => formatAxisNumber(value)}, grid:{color:gridColor}, title:{display:true,text:'Visits / Orders',color:chartTextColor}},
          y1:{position:'right', ticks:{color:chartTextColor, callback: value => formatAxisMoney(value)}, grid:{drawOnChartArea:false}, title:{display:true,text:'Marketing Spend (US$)',color:chartTextColor}}
        }
      }
    });
  }

  buildPerformanceChart('daily');
  buildMarketingChart('weekly');
  openCountry('Brazil');
  performanceFilter?.addEventListener('change', e=>buildPerformanceChart(e.target.value));
  marketingFilter?.addEventListener('change', e=>buildMarketingChart(e.target.value));
});
