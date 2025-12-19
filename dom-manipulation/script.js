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

  function createAddQuoteForm() {
    const form = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';

    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);

    document.body.appendChild(form);

    addButton.addEventListener('click', function () {
      const quoteText = quoteInput.value.trim();
      const quoteCategory = categoryInput.value.trim();

      if ((quoteText === quoteCategory) === '') {
        alert('Please enter both a quote and a category');
        return;
      }

      quotes.push({
        text: quoteText,
        category: quoteCategory,
      });

      quoteInput.value = '';
      categoryInput.value = '';
    });

    showRandomQuote();
  }

  createAddQuoteForm();

  newQuoteButton.addEventListener('click', showRandomQuote);
});
