document.addEventListener('DOMContentLoaded', function () {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');

  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  const addQuotebutton = document.getElementById('addQuoteBtn');

  const quotes = [
    { text: 'Stay hungry, stay foolish.', category: 'Motivation' },
    {
      text: 'Code is like humor. When you have to explain it, it’s bad.',
      category: 'Programming',
    },
    { text: 'Simplicity is the soul of efficiency.', category: 'Design' },
  ];

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p>
  <small>Category: ${randomQuote.category}</small>
  `;
  }

  function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === '' || quoteCategory === '') {
      alert('Please enter both a quote and a category');
      return;
    }

    const newQuote = {
      text: quoteText,
      category: quoteCategory,
    };

    quotes.push(newQuote);

    newQuoteText.value = '';
    newQuoteCategory.value = '';

    showRandomQuote();
  }

  newQuoteButton.addEventListener('click', showRandomQuote);
  addQuotebutton.addEventListener('click', addQuote);
});
