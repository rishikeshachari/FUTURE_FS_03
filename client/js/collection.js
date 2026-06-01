// Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');

// Product Grid
const productGrid = document.getElementById('collectionGrid');

// Jewellery Products
const products = [

    {
        id: 1,
        name: 'Gold Antique Chain',
        category: 'Chains',
        price: '₹85,000',
        image: 'https://i.pinimg.com/236x/2f/d9/58/2fd9583a87cb99ed3f263c9eb249042b.jpg',
        description: '22K hallmarked antique chain'
    },

    {
        id: 2,
        name: 'Pearl Drop Earrings',
        category: 'Earrings',
        price: '₹24,500',
        image: 'https://cdn.orra.co.in/media/catalog/product/cache/10238651d5f95594b9023f998383bb67/o/e/oer23109_1.jpg',
        description: 'Elegant pearl earrings'
    },

    {
        id: 3,
        name: 'Temple Bangles',
        category: 'Bangles',
        price: '₹67,000',
        image: 'https://zevana.co/cdn/shop/files/Laxmi_Bangles_Set_of_2_Gold_Plated.jpg?v=1778724790&width=1080',
        description: 'Traditional temple bangles'
    },

    {
        id: 4,
        name: 'Diamond Ring',
        category: 'Rings',
        price: '₹1,20,000',
        image: 'https://lh3.googleusercontent.com/p/AF1QipPZhDeieSSHo61PPa6dML5rZsWeiCZ1cXkdcrhA=w141-h141-n-k-no-nu',
        description: 'Luxury diamond ring'
    },

    {
        id: 5,
        name: 'Mangalsutra Chain',
        category: 'Chains',
        price: '₹39,900',
        image: 'https://m.media-amazon.com/images/I/61CjJKDxmyL._SY695_.jpg',
        description: 'Traditional mangalsutra design'
    },

    {
        id: 6,
        name: 'Jhumka Earrings',
        category: 'Earrings',
        price: '₹18,000',
        image: 'https://rimli.in/cdn/shop/files/ShilohPolkiJhumkaEarrings-Red_Whitenonsilverrimli01.webp?v=1762415699&width=800',
        description: 'Traditional gold jhumkas'
    },

    {
        id: 7,
        name: 'Gold Bangles',
        category: 'Bangles',
        price: '₹45,000',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crophttps://lh3.googleusercontent.com/p/AF1QipNaSeRKUOvLmgJoCApYicerUr3SS2oGyzXpV1Ev=s1360-w1360-h1020-rw',
        description: 'Daily wear gold bangles'
    },

   
];

// Display Products
function displayProducts(category) {

    const filteredProducts =
        category === 'all'
        ? products
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <div class="text-center" style="padding:40px;">
                No products found.
            </div>
        `;

        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `

        <div class="product-card">

            <div class="product-image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-image"
                    loading="lazy"
                >
            </div>

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-price">
                    ${product.price}
                </div>

                <button 
                    class="enquire-btn"
                    data-name="${product.name}"
                >
                    ✨ Enquire Now ✨
                </button>

            </div>

        </div>

    `).join('');

    // Enquire Buttons
    document.querySelectorAll('.enquire-btn').forEach(button => {

        button.addEventListener('click', () => {

            const productName =
                button.getAttribute('data-name');

            window.location.href =
                `contact.html?product=${encodeURIComponent(productName)}`;

        });

    });

}

// Filter Buttons
filterBtns.forEach(button => {

    button.addEventListener('click', () => {

        // Reset buttons
        filterBtns.forEach(btn => {

            btn.style.background = 'transparent';
            btn.style.color = '#800000';
            btn.style.border = '1px solid #D4AF37';

        });

        // Active button
        button.style.background = '#D4AF37';
        button.style.color = '#800000';
        button.style.border = 'none';

        // Filter products
        const category =
            button.getAttribute('data-category');

        displayProducts(category);

    });

});

// Initial Products
displayProducts('all');