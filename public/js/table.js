document.addEventListener('DOMContentLoaded', async () => {
    const merchForm = document.querySelector('#merchForm');
    const generatedTable = document.querySelector('#generatedTable');

    const preloader = document.createElement('div');
    preloader.className = 'tenor-gif-embed';
    preloader.setAttribute('data-postid', '7599056546983191152');
    preloader.setAttribute('data-share-method', 'host');
    preloader.setAttribute('data-aspect-ratio', '1.0375');
    preloader.setAttribute('data-width', '50%');
    preloader.setAttribute('data-height', '800px');
    preloader.setAttribute('data-speed', '0.5');
    document.body.appendChild(preloader);

    merchForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const preloaderScript = document.createElement('script');
        preloaderScript.type = 'text/javascript';
        preloaderScript.async = true;
        preloaderScript.src = 'https://tenor.com/embed.js';
        document.body.appendChild(preloaderScript);

        const errorMessage = document.createElement('p');
        errorMessage.id = 'error-message';
        errorMessage.style.display = 'none';
        errorMessage.textContent = "Oh shit, I'm sorry!";
        document.body.appendChild(errorMessage);

        preloader.style.display = 'block';
        generatedTable.innerHTML = '';
        errorMessage.style.display = 'none';

        const merchType = getCheckedValues('merchType');
        const designType = getCheckedValues('designType');
        const collectionType = getCheckedValues('collectionType');

        try {
            await generateTable({ merchType, designType, collectionType });
        } catch (error) {
            console.error(error);
            errorMessage.style.display = 'block';
        } finally {
            preloader.style.display = 'none';
        }
    });

    function getCheckedValues(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(cb => cb.value);
    }

    async function generateTable({ merchType, designType, collectionType }) {

        generatedTable.innerHTML = `
            <tr>
                <th>Merch Type</th>
                <th>Design Type</th>
                <th>Collection</th>
                <th>Product</th>
                <th>Image</th>
            </tr>`;

        const merch = await generateRandomMerch(merchType, designType, collectionType, 3);

        if (merch.length === 0) {
            generatedTable.innerHTML += '<tr><td colspan="5">No matching items. Try selecting again</td></tr>';
            return;
        }

        merch.forEach(elem => {
            const tableRow = `
                <tr>
                    <td>${elem.merchType}</td>
                    <td>${elem.designType}</td>
                    <td>${elem.collection}</td>
                    <td>${elem.title}</td>
                    <td><img src="${elem.thumbnailUrl}" alt="${elem.title}" class="product-image"></td>
                </tr>`;
            generatedTable.innerHTML += tableRow;
        });
    }

    async function generateRandomMerch(merchTypes, designTypes, collectionTypes, merchLimit) {
        const merch = [];
        const usedIds = new Set();

        while (merch.length < merchLimit) {

            const randomId = Math.floor(Math.random() * 5000) + 2;

            if (usedIds.has(randomId)) continue;
            usedIds.add(randomId);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${randomId}`);
                if (!response.ok) continue;

                const data = await response.json();

                const merchType = merchTypes[Math.floor(Math.random() * merchTypes.length)] || "Random Merch";
                const designType = designTypes[Math.floor(Math.random() * designTypes.length)] || "Random Design";
                const collection = collectionTypes[Math.floor(Math.random() * collectionTypes.length)] || "Random Collection";

                merch.push({
                    merchType,
                    designType,
                    collection,
                    title: data.title,
                    thumbnailUrl: data.thumbnailUrl
                });
            } catch(e) {
                console.error("pupupu: " + e);
            }
        }
        return merch;
    }
});