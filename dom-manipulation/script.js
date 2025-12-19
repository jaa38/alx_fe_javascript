document.addEventListener('DOMContentLoaded', function () {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');

  const quotes = [
    { text: 'Stay hungry, stay foolish.', category: 'Motivation' },
    {
      text: 'Code is like humor. When you have to explain it, it’s bad.',
      category: 'Programming',
    },
    { text: 'Simplicity is the soul of efficiency.', category: 'Design' },
  ];

  // Load quotes from LocalStorage
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes.push(...JSON.parse(storedQuotes));
  }

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

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

  function createAddQuoteForm() {
    const form = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
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

      // Save updated quotes to localStorage
      saveQuotes();

      quoteInput.value = '';
      categoryInput.value = '';

      showRandomQuote();
    });
  }

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

  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);

        if (!Array.isArray(importedQuotes)) {
          alert('Invalid JSON format');
          return;
        }

        quotes.push(...importedQuotes);
        saveQuotes();

        alert('Quotes imported successfully!');
        showRandomQuote();
      } catch (error) {
        alert('Error reading JSON file');
      }
    };

    fileReader.readAsText(file);
  }

  newQuoteButton.addEventListener('click', showRandomQuote);

  document
    .getElementById('exportQuotesBtn')
    .addEventListener('click', exportQuotesToJson);

  document
    .getElementById('importFile')
    .addEventListener('change', importFromJsonFile);

  createAddQuoteForm();
});
