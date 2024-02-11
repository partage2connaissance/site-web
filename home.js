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