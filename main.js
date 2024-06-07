// Menuju ke Menu Koleksi dan Hubungi Kami
document.addEventListener("DOMContentLoaded", function () {
    // Menambahkan event listener untuk tautan "Koleksi"
    document.querySelector('.custom-hyperlink-menu').addEventListener('click', function (event) {
        event.preventDefault();

        // Menggulir ke bagian "Koleksi"
        document.getElementById('menu-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
    // Menambahkan event listener untuk tautan "Hubungi Kami"
    document.querySelector('.custom-hyperlink-hubungi').addEventListener('click', function (event) {
        event.preventDefault();

        // Menggulir ke bagian "Hubungi Kami"
        document.getElementById('hubungi-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Langkah 1: Variabel untuk makanan acak
let makananAcak;

// Langkah 2: Variabel untuk kategori
let kategori = [];

// Langkah 3: Variabel untuk makanan berdasarkan kategori
let makananKategori;

// Langkah 4: Fungsi untuk mendapatkan makanan acak
async function getRandomMeal() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    makananAcak = data.meals[0];
    console.log('Makanan Acak:', makananAcak);

    // Tampilkan makanan acak di DOM
    const foodName = document.getElementById('foodName');
    foodName.innerHTML = `<a>${makananAcak.strMeal}</a>`;
    const foodImage = document.getElementById('foodImage');
    foodImage.src = makananAcak.strMealThumb;
    foodImage.alt = makananAcak.strMeal;

  } catch (error) {
    console.error('Error:', error);
  }
}

// Langkah 5: Fungsi untuk mendapatkan kategori
async function getCategories() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    kategori = data.categories;
    console.log('Kategori:', kategori);

    // Tampilkan kategori di dropdown
    const categorySelect = document.getElementById('categorySelect');
    kategori.forEach(category => {
      const option = document.createElement('option');
      option.value = category.strCategory;
      option.text = category.strCategory;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Langkah 6: Fungsi untuk mendapatkan makanan berdasarkan kategori
async function getMealsByCategory(category) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    makananKategori = data.meals;
    console.log('Makanan Kategori:', makananKategori);


// Tampilkan makanan berdasarkan kategori di DOM
const mealList = document.getElementById('mealList');
mealList.innerHTML = ''; // Menghapus konten sebelumnya

makananKategori.forEach(meal => {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'col-4 mt-4';

  const customCard = document.createElement('div');
  customCard.className = 'custom-card';

  const imgElement = document.createElement('img');
  imgElement.src = meal.strMealThumb;
  imgElement.className = 'card-img-top';
  imgElement.alt = meal.strMeal;
  imgElement.style.height = '250px';
  imgElement.id = 'makanan';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardText = document.createElement('p');
  cardText.className = 'custom-card-text text-center';
  cardText.textContent = meal.strMeal;

  cardBody.appendChild(cardText);
  customCard.appendChild(imgElement);
  customCard.appendChild(cardBody);
  cardContainer.appendChild(customCard);

  mealList.appendChild(cardContainer);
});


  } catch (error) {
    console.error('Error:', error);
  }
}

// Langkah 7: Event Listener untuk Button "Makanan Acak"
document.getElementById('tombolRandom').addEventListener('click', getRandomMeal);

// Langkah 8: Event Listener untuk Dropdown "Kategori"
document.getElementById('categorySelect').addEventListener('change', function() {
  const selectedCategory = this.value;
  if (selectedCategory) {
    getMealsByCategory(selectedCategory);
  }
});

// Panggil fungsi untuk mendapatkan kategori pada saat halaman dimuat
document.addEventListener('DOMContentLoaded', getCategories);
