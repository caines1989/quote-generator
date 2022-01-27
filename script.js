const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote () {
    showLoadingSpinner ();
    // Pick a Random Quote from Apiquotes Array
    const quote = apiQuotes [Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with Unkown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote lenght to determine Styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
     quoteText.textContent = quote.text;
      removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes () {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        throw Error ('oops')
    }
}

// Tweet Quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuotebtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();