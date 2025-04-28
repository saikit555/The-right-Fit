// Load sold and disposed data
const savedSold = localStorage.getItem('soldItems');
const savedDisposed = localStorage.getItem('disposedItems');

const soldItems = savedSold ? JSON.parse(savedSold) : [];
const disposedItems = savedDisposed ? JSON.parse(savedDisposed) : [];

// Get list elements
const soldList = document.getElementById('soldList');
const disposedList = document.getElementById('disposedList');

// Display sold items
function renderSold() {
  soldList.innerHTML = '';

  soldItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 100%; margin-bottom: 10px;" />` : ''}
      <strong>${item.name}</strong> (${item.brand})<br>
      👕 Size: ${item.size} | Fit: ${item.fit}/5<br>
      💰 Bought for: $${item.price || 'N/A'}<br>
      🛒 Sold for: $${item.soldPrice || 'N/A'}<br>
      ✏️ Reason: ${item.soldReason || 'No reason given'}<br>
      📝 ${item.notes || 'No notes'}
    `;
    soldList.appendChild(li);
  });
}
  

// Display disposed items
function renderDisposed() {
  disposedList.innerHTML = '';

  disposedItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 100%; margin-bottom: 10px;" />` : ''}
      <strong>${item.name}</strong> (${item.brand})<br>
      👕 Size: ${item.size} | Fit: ${item.fit}/5<br>
      💰 $${item.price || 'N/A'}<br>
      📝 ${item.notes || 'No notes'}
    `;
    disposedList.appendChild(li);
  });
}

// Render everything on page load
renderSold();
renderDisposed();
