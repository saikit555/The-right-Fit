// Load wardrobe data from localStorage
const savedWardrobe = localStorage.getItem('wardrobe');
const wardrobe = savedWardrobe ? JSON.parse(savedWardrobe) : [];

// Group spending by month
const monthlyTotals = {};

wardrobe.forEach(item => {
  if (item.dateAdded) {
    const date = new Date(item.dateAdded);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Example: "2024-04"
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + price;
    }
  }
});

// Display monthly spending list
const monthlyList = document.getElementById('monthlySpendingList');

if (Object.keys(monthlyTotals).length === 0) {
  monthlyList.innerHTML = "<p>No spending data available yet.</p>";
} else {
  monthlyList.innerHTML = '<h2>Monthly Spending</h2>';
  for (const [month, total] of Object.entries(monthlyTotals)) {
    monthlyList.innerHTML += `<p><strong>${month}</strong>: $${total.toFixed(2)}</p>`;
  }
}

// Create line chart for monthly spending
const ctx = document.getElementById('spendingChart').getContext('2d');
const spendingChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Object.keys(monthlyTotals),
    datasets: [{
      label: 'Monthly Spending',
      data: Object.values(monthlyTotals),
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
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  }
});
