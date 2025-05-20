// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const suggestions = document.getElementById('suggestions');
const results = document.getElementById('results');
const loadingBar = document.getElementById('loadingBar');
const themeToggle = document.getElementById('themeToggle');
const logo = document.getElementById('logo');
const randomArticleBtn = document.getElementById('randomArticle');
const todayInHistoryBtn = document.getElementById('todayInHistory');
const trendingTopicsBtn = document.getElementById('trendingTopics');
const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';


// Toggle dark mode
let isDarkMode = false;
themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
    document.body.style.background = '#121212';
    document.querySelector('.ri-sun-line').style.display = 'none';
    document.querySelector('.ri-moon-line').style.display = 'block';
    } else {
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)';
    document.querySelector('.ri-sun-line').style.display = 'block';
    document.querySelector('.ri-moon-line').style.display = 'none';
    }
});

randomArticleBtn.addEventListener('click', () => {
  window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
});

todayInHistoryBtn.addEventListener('click', () => {
  window.open('https://en.wikipedia.org/wiki/Portal:Current_events', '_blank');
});

trendingTopicsBtn.addEventListener('click', () => {
  window.open('https://en.wikipedia.org/wiki/Portal:Current_events', '_blank');
});


// Fetching results based on search
searchButton.addEventListener('click', function () {
  performSearch();
});

// Perform Search
async function performSearch() {
  const query = searchInput.value.trim();

  if (query.length > 0) {
    // Show loading bar
    loadingBar.style.width = '60%';

    // Clear previous results
    results.innerHTML = '';
    results.style.opacity = '0.5';

    try {
      const response = await fetch(`${url}${query}`);
      const data = await response.json();

      if (data.query.search.length > 0) {
        displayResults(data.query.search);
      } else {
        results.innerHTML = `
          <div class="no-results">
            <div class="no-results-icon">🔎</div>
            <h3>No results found for "${query}"</h3>
            <p>Try different keywords or check your spelling</p>
          </div>
        `;
      }
    } catch (error) {
      results.innerHTML = '<div class="error">There was an error...</div>';
    }

    setTimeout(() => {
      loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingBar.style.width = '0';
        results.style.opacity = '1';
      }, 300);
    }, 800);
  }
}

// Display results
function displayResults(resultsList) {
  resultsList.forEach(item => {
    const card = createResultCard(item.title, item.snippet, item.pageid);
    results.appendChild(card);
  });
}

// Create result card
function createResultCard(title, snippet, pageid) {
  const card = document.createElement('div');
  card.className = 'result-card';

  card.innerHTML = `
    <div class="card-header">
      <h2 class="card-title">${title}</h2>
    </div>
    <div class="card-body">
      <p class="card-text">${snippet}</p>
    </div>
    <div class="card-footer">
      <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank" class="read-more">
        Read more 
      </a>
    </div>
  `;

  return card;
}

item.addEventListener('click', function () {
    searchInput.value = suggestion;
    suggestions.classList.remove('active');
    performSearch();
    });
