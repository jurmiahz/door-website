// Simple login functionality
const users = [
    { username: 'admin', password: 'password' }
];

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials!');
    }
});

// Logout functionality
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Check login on dashboard
if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
} else {
    document.getElementById('username-display').innerText = localStorage.getItem('username');
}

// Handle orders (just a basic example)
let orders = JSON.parse(localStorage.getItem('orders')) || [];

document.getElementById('order-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const order = {
        customerName: document.getElementById('customer-name').value,
        productType: document.getElementById('product-type').value,
        size: document.getElementById('size').value,
        hardware: document.getElementById('hardware').value,
        notes: document.getElementById('notes').value
    };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('Order submitted!');
});

const ordersList = document.getElementById('orders-list');
if (ordersList) {
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.innerHTML = `<strong>${order.customerName}</strong> - ${order.productType} (${order.size})`;
        ordersList.appendChild(orderItem);
    });
}
