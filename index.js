const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

function getElement(element) {
  const el = document.querySelector(element);
  if (!el)
    return console.log(
      `Please check your ${element} selector, no such element exists`
    );
  return el;
}
const btn = getElement('.submit-btn');
const input = getElement('.form-input');
const content = getElement('.content');
function showAlert(parentEl, message, className) {
  parentEl.innerHTML = `<div class="${className}">${message}</div>`;

  setTimeout(() => {
    parentEl.innerHTML = '';
  }, 2000);
}
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value === '') {
    showAlert(content, 'Please enter a value', 'alert-message');
    return;
  }
  getResults(`${url}${input.value}`);
});
async function getResults(url) {
  content.innerHTML = `<div class="loading"></div>`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Problem getting data');
    const data = await res.json();
    if (data.query.search.length < 1) {
      return (content.textContent = 'No results found');
    }
    displayResults(data.query.search);
  } catch (error) {
    content.textContent = 'Something went wrong';
  }
}
function displayResults(results) {
  console.log(results);
  const allResults = results
    .map((item) => {
      console.log(item);
      const { pageid, snippet, title } = item;
      return `<a class="wiki-card" href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join('');
  content.innerHTML = allResults;
}
