// Get form and list elements
const form = document.getElementById('itemForm');
const wardrobeList = document.getElementById('wardrobeList');
const imageInput = document.getElementById('image'); // New: image input
let wardrobe = []; // Our wardrobe data
const reader = new FileReader();

// Load from localStorage if available
const savedWardrobe = localStorage.getItem('wardrobe');
wardrobe = savedWardrobe ? JSON.parse(savedWardrobe) : [];
renderWardrobe(); // Render existing items on page load

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing

  const file = imageInput.files[0]; // Get the selected image file

  // Once the image is loaded, create the item and store it
  reader.onload = function () {
    const userDate = document.getElementById('fakeDate').value; //lets user choose date of input
    const item = {
      name: document.getElementById('itemName').value,
      brand: document.getElementById('brand').value,
      size: document.getElementById('size').value,
      price: document.getElementById('price').value,
      fit: document.getElementById('fit').value,
      notes: document.getElementById('notes').value,
      image: reader.result, // base64 string of the uploaded image
      dateAdded: userDate ? new Date(userDate + '-01').toISOString() : new Date().toISOString() // stores the added data with "fakedate" first or if empty use current date
    };

    wardrobe.push(item); // Save item to memory
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
    renderWardrobe();    // Show it on the screen
    form.reset();        // Clear the form
  };

  // If an image was uploaded, read it
  if (file) {
    reader.readAsDataURL(file); // Converts image to base64
  } else {
    reader.onload(); // No image → still save other data
  }
});

// Display wardrobe items on the page
function renderWardrobe() {
  wardrobeList.innerHTML = ''; // Clear previous list

  wardrobe.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 100%; margin-bottom: 10px;" />` : ''}
      <strong>${item.name}</strong> (${item.brand})<br>
      👕 Size: ${item.size} | Fit: ${item.fit}/5<br>
      💰 $${item.price || 'N/A'}<br>
      📝 ${item.notes || 'No notes'}
    `;
    wardrobeList.appendChild(li);
  });
}
