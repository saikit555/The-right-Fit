const form = document.getElementById('itemForm');
const wardrobeList = document.getElementById('wardrobeList');
let wardrobe = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const item = {
    name: document.getElementById('itemName').value,
    brand: document.getElementById('brand').value,
    size: document.getElementById('size').value,
    price: document.getElementById('price').value,
    fit: document.getElementById('fit').value,
    notes: document.getElementById('notes').value,
  };

  wardrobe.push(item);
  renderWardrobe();
  form.reset();
});

function renderWardrobe() {
  wardrobeList.innerHTML = '';
  wardrobe.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong> (${item.brand})<br>
      👕 Size: ${item.size} | Fit: ${item.fit}/5<br>
      💰 $${item.price || 'N/A'}<br>
      📝 ${item.notes || 'No notes'}
    `;
    wardrobeList.appendChild(li);
  });
}
