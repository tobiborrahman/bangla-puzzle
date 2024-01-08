const cartIcon = document.getElementById('cartIcon');
const cartSection = document.getElementById('cartSection');
const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', () => {
	cartSection.classList.toggle('hidden');
});

cartIcon.addEventListener('click', () => {
	cartSection.classList.toggle('hidden');
});

// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((addButton) => {
	addButton.addEventListener('click', () => {
		cartSection.classList.remove('hidden');
	});
});

const totalItemSpan = document.querySelector('.total-item');

document.addEventListener('DOMContentLoaded', function () {
	const cartSummary = document.getElementById('cart-summary');
	const cartTotalPriceSpan = document.getElementById('cart-total-price');
	let totalPrice = 0;
	let totalItems = 0;

	// const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

	addToCartButtons.forEach((addButton) => {
		addButton.addEventListener('click', function () {
			if (!addButton.classList.contains('disabled')) {
				const card = addButton.closest('.card-item');
				const productName = card.querySelector('.heading').textContent;
				const productPrice = parseFloat(
					card.querySelector('.price').textContent
				);

				const cartItem = document.createElement('div');
				cartItem.classList.add(
					'border',
					'm-3',
					'p-2',
					'flex',
					'rounded'
				);
				cartItem.innerHTML = `
				<img class="w-[70px] h-[90px] rounded" src="${
					card.querySelector('img').src
				}" alt="${productName}" />
				<div class="ml-3 relative text-white">
				<h1 class="font-semibold">${productName}</h1>
				<p class="text-[13px]">
					<span class="price">${productPrice}</span>$/Each
				</p>
				<div class="flex justify-center ml-2 w-[68px] rounded items-center text-black mt-2">
					<span class="minus cursor-pointer bg-gray-100 py-0 px-2 border h-7 rounded-l">-</span>
					<span class="num px-3 bg-white">1</span>
					<span class="plus cursor-pointer bg-gray-100 py-0 px-2 border h-7 rounded-r">+</span>
				</div>
				<span class="total-price text-white font-semibold absolute top-[77px] -right-[107px]">${productPrice}$</span>
				<button class="delete-btn bg-white  text-[12px] text-white absolute -top-[26px] -right-[116px] px-1 py-[.7px] rounded mt-2"><i class="fa-solid fa-trash-can text-[#52b788]"></i></button>
				</div>
			`;

				cartSummary.appendChild(cartItem);

				totalPrice += productPrice;
				totalItems++;
				updateCartTotalPrice();

				addButton.classList.add('disabled');

				const quantitySpan = cartItem.querySelector('.num');
				const plusSpan = cartItem.querySelector('.plus');
				const minusSpan = cartItem.querySelector('.minus');
				const totalSpan = cartItem.querySelector('.total-price');
				const deleteBtn = cartItem.querySelector('.delete-btn');

				plusSpan.addEventListener('click', function () {
					const quantity = parseInt(quantitySpan.textContent, 10);
					quantitySpan.textContent = quantity + 1;
					totalPrice += productPrice;
					totalSpan.textContent = `${
						productPrice * quantitySpan.textContent
					}$`;
					updateCartTotalPrice();
				});

				minusSpan.addEventListener('click', function () {
					const quantity = parseInt(quantitySpan.textContent, 10);
					if (quantity > 1) {
						quantitySpan.textContent = quantity - 1;
						totalPrice -= productPrice;
						totalSpan.textContent = `${
							productPrice * quantitySpan.textContent
						}$`;
						updateCartTotalPrice();
					}
				});

				deleteBtn.addEventListener('click', function () {
					totalPrice -=
						productPrice * parseInt(quantitySpan.textContent, 10);
					cartItem.remove();
					totalItems--;
					updateCartTotalPrice();
					addButton.classList.remove('disabled');
				});
			}
		});
	});

	function updateCartTotalPrice() {
		const totalItemSpans = document.querySelectorAll('.total-item');
		cartTotalPriceSpan.textContent = `Place Order ${totalPrice} $`;
		totalItemSpans.forEach((span) => {
			span.textContent = `${totalItems}`;
		});
	}
});
