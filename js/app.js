// ===============================
// 1. Global Variables
// ===============================

// Get form and list elements
const form = document.getElementById('itemForm');
const wardrobeList = document.getElementById('wardrobeList');
const imageInput = document.getElementById('image'); // Image input
const reader = new FileReader(); // Only need one global reader

// Wardrobe data
let wardrobe = [];
let soldItems = [];
let disposedItems = [];

// ===============================
// 2. Load LocalStorage Data
// ===============================

const savedWardrobe = localStorage.getItem('wardrobe');
const savedSold = localStorage.getItem('soldItems');
const savedDisposed = localStorage.getItem('disposedItems');

wardrobe = savedWardrobe ? JSON.parse(savedWardrobe) : [];
soldItems = savedSold ? JSON.parse(savedSold) : [];
disposedItems = savedDisposed ? JSON.parse(savedDisposed) : [];

renderWardrobe(); // Render existing items on page load

// ===============================
// 3. Event Listeners
// ===============================

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing

  const file = imageInput.files[0]; // Get the selected image file

  reader.onload = function () {
    const userDate = document.getElementById('fakeDate').value; // Allow user-chosen fake date

    const item = {
      name: document.getElementById('itemName').value,
      brand: document.getElementById('brand').value,
      size: document.getElementById('size').value,
      price: document.getElementById('price').value,
      fit: document.getElementById('fit').value,
      notes: document.getElementById('notes').value,
      image: reader.result,
      dateAdded: userDate ? new Date(userDate + '-01').toISOString() : new Date().toISOString()
    };

    wardrobe.push(item); // Save to wardrobe
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
    renderWardrobe(); // Update screen
    form.reset(); // Clear form
  };

  if (file) {
    reader.readAsDataURL(file); // Upload image
  } else {
    reader.onload(); // No image — still save item
  }
});

// ===============================
// 4. Main Render Functions
// ===============================

function renderWardrobe() {
  wardrobeList.innerHTML = ''; // Clear previous list

  wardrobe.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 100%; margin-bottom: 10px;" />` : ''}
      <strong>${item.name}</strong> (${item.brand})<br>
      👕 Size: ${item.size} | Fit: ${item.fit}/5<br>
      💰 $${item.price || 'N/A'}<br>
      📝 ${item.notes || 'No notes'}<br>
      <button onclick="markAsSold(${index})" style="margin-top: 5px;">Mark as Sold</button>
      <button onclick="markAsDisposed(${index})" style="margin-top: 5px;">Mark as Disposed</button>
    `;
    wardrobeList.appendChild(li);
  });
}

// ===============================
// 5. Helper Functions
// ===============================

function markAsSold(index) {
  const item = wardrobe.splice(index, 1)[0];
  soldItems.push(item);
  localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
  localStorage.setItem('soldItems', JSON.stringify(soldItems));
  renderWardrobe();
}

function markAsDisposed(index) {
  const item = wardrobe.splice(index, 1)[0];
  disposedItems.push(item);
  localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
  localStorage.setItem('disposedItems', JSON.stringify(disposedItems));
  renderWardrobe();
}
