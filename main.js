const cartIcon = document.getElementById('cartIcon');
const cartSection = document.getElementById('cartSection');
const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', () => {
	cartSection.classList.toggle('hidden');
});

cartIcon.addEventListener('click', () => {
	cartSection.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function () {
	// Cart summary container
	const cartSummary = document.getElementById('cart-summary');

	// Add click event listener to each "Add to Cart" button
	document.addEventListener('click', function (event) {
		const addButton = event.target.closest('.add-to-cart-btn');
		const deleteButton = event.target.closest('.delete-btn');

		if (addButton && !addButton.classList.contains('disabled')) {
			// Retrieve product information from the clicked card
			const card = addButton.closest('.bg-gray-100');
			const productName =
				card.querySelector('.font-semibold').textContent;
			const productPrice = card.querySelector('.price').textContent;
			const productImage = card.querySelector('img').src;

			// Create a new cart item element
			const cartItem = document.createElement('div');
			cartItem.classList.add('border', 'm-3', 'p-2', 'flex');
			cartItem.innerHTML = `
		  <img class="w-[70px] h-[90px]" src="${productImage}" alt="${productName}" />
		  <div class="ml-2 relative">
			<h1 class="font-semibold">${productName}</h1>
			<p class="text-[13px]">
			  <span class="price text-amber-500">${productPrice}</span>/Each
			</p>
			<div class="flex bg-white w-[70px] rounded items-center mt-2">
			  <span class="minus cursor-pointer bg-gray-100 py-0 px-2 border">-</span>
			  <span class="num px-1">01</span>
			  <span class="plus cursor-pointer bg-gray-100 py-0 px-2 border">+</span>
			</div>
			<button class="delete-btn bg-gray-50 text-yellow-500 text-[10px] text-white absolute -top-[24px] -right-[90px] px-1 py-[.7px] rounded mt-2"><i class="fa-solid fa-trash-can"></i></button>
			
		  </div>
		 
		`;

			// Append the new cart item to the cart summary
			cartSummary.appendChild(cartItem);

			// Disable the "Add to Cart" button
			addButton.classList.add('disabled');
			addButton.classList.add('disabled-button');
		} else if (deleteButton) {
			// Delete the cart item
			const cartItem = deleteButton.closest('.border');
			if (cartItem) {
				cartItem.remove();
			}
		}
	});
});
