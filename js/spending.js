// Load wardrobe data
const savedWardrobe = localStorage.getItem('wardrobe');
const wardrobe = savedWardrobe ? JSON.parse(savedWardrobe) : [];

// Group spending by month
const monthlyTotals = {};

wardrobe.forEach(item => {
  if (item.dateAdded) {
    const date = new Date(item.dateAdded);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format: 2024-04
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + price;
    }
  }
});

// Sort months
const sortedMonths = Object.keys(monthlyTotals).sort();

// Display monthly spending list at the top
const monthlyList = document.getElementById('monthlySpendingList');

if (sortedMonths.length === 0) {
  monthlyList.innerHTML = "<p>No spending data available yet.</p>";
} else {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (const monthKey of sortedMonths) { // ✅ Use sortedMonths
    const total = monthlyTotals[monthKey];
    const [year, month] = monthKey.split('-');
    const displayMonth = monthNames[parseInt(month) - 1]; // 1-based to 0-index

    const div = document.createElement('div');
    div.style = "min-width: 100px; text-align: center;";
    div.innerHTML = `<strong>${displayMonth}</strong><br>$${total.toFixed(2)}`;
    monthlyList.appendChild(div);
  }
}

// Create the line chart
const ctx = document.getElementById('spendingChart').getContext('2d');
const spendingChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: sortedMonths.map(monthKey => { // ✅ Use sortedMonths
      const [year, month] = monthKey.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[parseInt(month) - 1];
    }),
    datasets: [{
      label: 'Spending ($)',
      data: sortedMonths.map(monthKey => monthlyTotals[monthKey]), // ✅ Use sortedMonths
      borderColor: 'blue',
      backgroundColor: 'lightblue',
      fill: false,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Monthly Spending Over Time'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Spending ($)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  }
});
