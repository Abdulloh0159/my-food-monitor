// O'zgaruvchilar
const mealForm = document.getElementById("meal-form");
const mealTable = document.getElementById("meal-table").getElementsByTagName('tbody')[0];
const mealChartCtx = document.getElementById("meal-chart").getContext('2d');

// Ovqatlar ro'yxati
let meals = [];

// Chart.js konfiguratsiyasi
let mealChart = new Chart(mealChartCtx, {
    type: 'pie',  // Grafik turi (saf)
    data: {
        labels: [],  // Ovqat turlari (nonushta, tushlik, kechki ovqat)
        datasets: [{
            label: 'Kaloriya taqsimoti',
            data: [],  // Kaloriya miqdori
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],  // Ranglar
            borderColor: ['#FF5733', '#33FF57', '#3357FF'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' Kaloriya';
                    }
                }
            }
        },
        // Zoom va pan (siljitish) uchun sozlamalar
        interaction: {
            mode: 'nearest',
            intersect: false
        },
        scales: {
            x: {
                ticks: { display: false } // X o'qidagi raqamlarni yashirish
            },
            y: {
                ticks: { display: false } // Y o'qidagi raqamlarni yashirish
            }
        },
        // Zoom va pan imkoniyatlari
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true, // Mouse wheel yordamida zoom qilish
                    },
                    pinch: {
                        enabled: true, // Multi-touch pinch yordamida zoom qilish
                    },
                    mode: 'xy', // Har ikki o'qni ham kattalashtirish
                },
                pan: {
                    enabled: true, // Grafikni siljitish
                    mode: 'xy', // Har ikki o'qni ham siljitish
                }
            }
        }
    }
});

// Ovqat qo'shish funksiyasi
mealForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const mealName = document.getElementById("meal-name").value;
    const mealType = document.getElementById("meal-type").value;
    const mealCalories = parseInt(document.getElementById("meal-calories").value);

    // Yangi ovqatni qo'shish
    const newMeal = { name: mealName, type: mealType, calories: mealCalories };
    meals.push(newMeal);

    // Jadvalga yangi ovqatni qo'shish
    addMealToTable(newMeal);

    // Grafikni yangilash
    updateChart();

    // Formani tozalash
    mealForm.reset();
});

// Ovqatni jadvalga qo'shish
function addMealToTable(meal) {
    const row = mealTable.insertRow();

    row.innerHTML = `
        <td>${meal.name}</td>
        <td>${meal.type}</td>
        <td>${meal.calories}</td>
    `;
}

// Grafikni yangilash
function updateChart() {
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    const caloriesByType = [0, 0, 0];

    // Ovqatlarni turiga ko'ra saralash va kaloriyalarni hisoblash
    meals.forEach(meal => {
        const typeIndex = mealTypes.indexOf(meal.type);
        if (typeIndex !== -1) {
            caloriesByType[typeIndex] += meal.calories;
        }
    });

    // Grafikdagi ma'lumotlarni yangilash
    mealChart.data.labels = mealTypes;
    mealChart.data.datasets[0].data = caloriesByType;
    mealChart.update();
}