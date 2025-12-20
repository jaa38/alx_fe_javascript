document.addEventListener('DOMContentLoaded', function () {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const categoryFilter = document.getElementById('categoryFilter');

  // Initial quotes
  const quotes = [
    { text: 'Stay hungry, stay foolish.', category: 'Motivation' },
    {
      text: 'Code is like humor. When you have to explain it, it’s bad.',
      category: 'Programming',
    },
    { text: 'Simplicity is the soul of efficiency.', category: 'Design' },
  ];

  // Load quotes from localStorage
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes.push(...JSON.parse(storedQuotes));
  }

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
      <p>"${randomQuote.text}"</p>
      <small>Category: ${randomQuote.category}</small>
    `;

    // Save last viewed quote (session storage)
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  }

  // Create Add Quote form dynamically
  function createAddQuoteForm() {
    const form = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';

    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);
    document.body.appendChild(form);

    addButton.addEventListener('click', function () {
      const quoteText = quoteInput.value.trim();
      const quoteCategory = categoryInput.value.trim();

      if (quoteText === '' || quoteCategory === '') {
        alert('Please enter both a quote and a category');
        return;
      }

      quotes.push({
        text: quoteText,
        category: quoteCategory,
      });

      saveQuotes();
      
      //update category dropdown immediately
      populateCategories();

      filterQuotes();

      quoteInput.value = '';
      categoryInput.value = '';
    });
  }

  // Populate category dropdown dynamically
  function populateCategories() {
    const categories = [
        ...new Set(
            quotes.map(quote => quote.category)
        ),
    ];

    categoryFilter.innerHTML = `
      <option value="all">All Categories</option>
    `;

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  // Filter quotes (must be global because HTML calls it)
  window.filterQuotes = function () {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes =
      selectedCategory === 'all'
        ? quotes
        : quotes.filter((q) => q.category === selectedCategory);

    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = '<p>No quotes found.</p>';
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  };

  // Export quotes to JSON
  function exportQuotesToJson() {
    const jsonData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();

    URL.revokeObjectURL(url);
  }

  // Import quotes from JSON
  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);

        if (!Array.isArray(importedQuotes)) {
          alert('Invalid JSON format');
          return;
        }

        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();

        alert('Quotes imported successfully!');
      } catch {
        alert('Error reading JSON file');
      }
    };

    reader.readAsText(file);
  }

  // Restore saved category filter
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }

  // Event listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  document
    .getElementById('exportQuotesBtn')
    .addEventListener('click', exportQuotesToJson);
  document
    .getElementById('importFile')
    .addEventListener('change', importFromJsonFile);

  // Initial setup
  populateCategories();
  createAddQuoteForm();
  filterQuotes();
});
