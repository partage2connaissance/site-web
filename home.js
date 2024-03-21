document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.querySelectorAll('.spotify-playlists .list .item');
    let mouseX = 0;

    document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        updateHoveredItem();
    });

    document.addEventListener('scroll', function () {
        updateHoveredItem();
    });

    // Charger la base de données JSON
    fetch('bdd.json')
        .then(response => response.json())
        .then(data => {
            // Parcourir les éléments de la base de données et créer les éléments HTML
            const list = document.querySelector('.spotify-playlists .list');
            data.forEach(item => {
                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `
                    <a href="#">
                        <h4>${item.title}</h4>
                    </a>
                `;
                list.appendChild(newItem);
            });

            // Mettre à jour les éléments survolés après le chargement de la base de données
            updateHoveredItem();
        })
        .catch(error => console.error('Erreur lors du chargement de la base de données:', error));

    function updateHoveredItem() {
        itemList.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemLeft = rect.left + window.scrollX; // Coordonnées globales
            const itemRight = rect.right + window.scrollX;

            if (itemLeft <= mouseX && mouseX <= itemRight) {
                item.classList.add('hovered');
            } else {
                item.classList.remove('hovered');
            }
        });
    }
});