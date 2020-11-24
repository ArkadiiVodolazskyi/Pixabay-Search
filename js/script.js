window.addEventListener("load", () => {
  // DOM Elements for input/output
  const query = document.querySelector("section#nav input#query");
  const itemsCount = document.querySelector("select#itemsCount");
  const results = document.querySelector("section#results div#images");
  const spinner = document.querySelector("span.spinner.v1");

  // Pixabay options
  const apiKey = "19235993-1e87979f17ae035554f0699f7";

  // Request delay
  const delay = 1000;

  // Initial state
  results.innerHTML = `<h3>Start typing any query to get results.</h3>`;

  // Delay on showing images
  const sleep = (m) => new Promise((r) => setTimeout(r, m));

  // Function to process user requests
  async function getImages(query, itemsCount) {
    results.innerHTML = ``;

    spinner.classList.toggle("active");
    results.classList.toggle("search");

    // Get images
    let response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${query}&per_page=${itemsCount}`
    );
    await sleep(delay);
    let data = await response.json();

    if (data.hits.length === 0) {
      results.innerHTML = `<h3>There are no images that suit your criteria</h3>`;
    }

    // Show images
    data.hits.forEach((element) => {
      let newImage = `<a href="${element.pageURL}" class="fadeIn">
				<img src="${element.webformatURL}"/>
			</a>`;

      results.innerHTML += newImage;
    });

    spinner.classList.toggle("active");
    results.classList.toggle("search");
  }

  // Query handler
  query.addEventListener("keyup", () => {
    getImages(query.value, itemsCount.value);
  });

  // itemsCount handler
  itemsCount.addEventListener("change", () => {
    getImages(query.value, itemsCount.value);
  });
});
