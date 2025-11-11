// === Список всех товаров ===
const defaultProducts = [
    { id: 1, name: "Кроссовки Nike Air", price: 120, img: "./photo_2025-09-20_19-25-52.jpg" },
    { id: 2, name: "Перчатки для зала", price: 40, img: "./gloves.jpg" },
    { id: 3, name: "Beta-Alanine 200г", price: 35, img: "./beta-alanine.jpg" },
    { id: 4, name: "Гантели 10 кг", price: 90, img: "./gear.jpg" },
    { id: 5, name: "Футболка GAP", price: 45, img: "./gap.png" },
    { id: 6, name: "Скамья для жима", price: 150, img: "./benchpress.jpg" },
    { id: 7, name: "L-Citrulline Malate", price: 30, img: "./l-citrulline_malate_200g.png" },
    { id: 8, name: "Футболка Nike", price: 50, img: "./eshop-produits_t-shirt_04.jpg" },
    { id: 9, name: "Капа для бокса", price: 15, img: "./mouth.jpg" },
    { id: 10, name: "Ibutamoren 60g", price: 30, img: "./recktol-ibutamoren.jpg" },
    { id: 11, name: "Шлем", price: 15, img: "./helmet.jpg" },
    { id: 12, name: "Бутылка", price: 10, img: "gatorade.jpg" },
    { id: 13, name: "Футболка", price: 45, img: "niket.jpg" },
    { id: 14, name: "Куртка", price: 75, img: "./helmet.jpg" },
    { id: 15, name: "Шорты", price: 35, img: "./helmet.jpg" },
    { id: 16, name: "Nike tech", price: 105, img: "./helmet.jpg" },
    { id: 17, name: "Under armour спортивка", price: 50, img: "./helmet.jpg" },
    { id: 18, name: "Рашгард", price: 20, img: "./helmet.jpg" },
    { id: 19, name: "Nike носки", price: 10, img: "./helmet.jpg" },
    { id: 20, name: "Женский рашгард", price: 20, img: "./helmet.jpg" },
    { id: 21, name: "Fear of god спортивка", price: 170, img: "./helmet.jpg" },
    { id: 22, name: "Air Jordan", price: 200, img: "./helmet.jpg" },
    { id: 23, name: "Nike TN", price: 135, img: "./helmet.jpg" },
    { id: 24, name: "Air Jordan 11", price: 180, img: "./helmet.jpg" },
    { id: 25, name: "Скамья для жима", price: 150, img: "./helmet.jpg" },
    { id: 26, name: "Перчатки", price: 40, img: "./helmet.jpg" },
    { id: 27, name: "Гантелли", price: 90, img: "./helmet.jpg" },
    { id: 28, name: "Жгут", price: 20, img: "./helmet.jpg" },
    { id: 29, name: "Гиря", price: 50, img: "./helmet.jpg" },
    { id: 30, name: "Скакалка", price: 10, img: "./helmet.jpg" },
    { id: 31, name: "Beta alanine", price: 35, img: "./helmet.jpg" },
    { id: 32, name: "L-citrulline malatate", price: 30, img: "./helmet.jpg" },
    { id: 33, name: "Ibutamoren 60g", price: 50, img: "./helmet.jpg" },
    { id: 34, name: "Testosteron enanthate", price: 250, img: "./helmet.jpg" },
    { id: 35, name: "Trenbolone acetate", price: 300, img: "./helmet.jpg" },
    { id: 36, name: "Protein", price: 100, img: "./helmet.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// === Обновление количества в корзине ===
function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = cart.length;
}

// === Добавление товара в корзину ===
function addToCart(id) {
    const product = defaultProducts.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} добавлен в корзину 🛒`);
    }
}

// === Удаление товара из корзины ===
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// === Отображение товаров на странице product.html ===
function renderProducts() {
    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";
    defaultProducts.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Добавить в корзину</button>
    `;
        container.appendChild(div);
    });
}

// === Отображение корзины на cart.html ===
function renderCart() {
    const list = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    if (!list || !totalEl) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${i})">❌</button>
    `;
        list.appendChild(li);
    });

    totalEl.textContent = `Итого: $${total}`;
}

// === Тема ===
function setupTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", currentTheme === "dark");

    if (themeToggle) {
        themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();
    setupTheme();
    updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            toggleBtn.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
        });
    }
});

// === Карусель изображений ===
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");
    let current = 0;

    // Создание точек
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
    }

    function goToSlide(index) {
        current = (index + slides.length) % slides.length;
        showSlide(current);
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);

    // Автопрокрутка каждые 4 секунды
    setInterval(nextSlide, 4000);
});

document.getElementById("search").addEventListener("input", function () {
    const search = this.value.toLowerCase();
    document.querySelectorAll(".product").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(search) ? "block" : "none";
    });
});

const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".product").forEach((product) => {
            const name = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = name.includes(query) ? "block" : "none";
        });
    });
}

async function getWeather() {
    const weatherEl = document.getElementById("weather");
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=51.16&longitude=71.43&current_weather=true"
        );
        const data = await response.json();
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        weatherEl.innerHTML = `🌤 Погода в Астане: ${temp}°C, ветер ${wind} км/ч`;
    } catch (error) {
        weatherEl.innerHTML = "🌧 Ошибка при загрузке погоды";
    }
}

getWeather();
