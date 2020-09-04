const form = document.getElementById('search-form');

form.addEventListener('submit', event => {
    event.preventDefault();

    let ingredientes = event.target.ingredientes.value;

    if (ingredientes.indexOf(',') != -1)
        ingredientes = ingredientes.replace(/,/g, ' ');

    ingredientes = ingredientes.split(/\s+/g);
    console.log(ingredientes);

    const promise = fetch('http://localhost:8000/?ingredientes=' + ingredientes.join(','));

    promise.then((response) => {
        const jsonPromise = response.json();
        return jsonPromise;
    }).then(jsonResponse => {
        console.log(jsonResponse);
    });
})

// http methods:
// GET
// POST
// PUT
// DELETE
// OPTIONS