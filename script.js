fetch("donnes.json")
    .then((response) => response.json())
    .then((episodes) => {
        const container = document.getElementById("episodes-container");

        episodes.forEach((episode) => {
            const episodeCard = document.createElement("div");
            episodeCard.classList.add("episode-card");

            const title = document.createElement("h2");
            title.textContent = episode.title;
            episodeCard.appendChild(title);

            const episodeNumber = document.createElement("p");
            episodeNumber.textContent = `Episode ${episode.episode}`;
            episodeCard.appendChild(episodeNumber);

            const image = document.createElement("img");
            image.src = episode.image;
            episodeCard.appendChild(image);

            episodeCard.addEventListener("click", () => {
                openModal(episode);
            });

            container.appendChild(episodeCard);
        });
    })
    .catch((error) =>
        console.error("Erreur lors du chargement du JSON:", error),
    );

document.getElementById("menu-toggle").addEventListener("click", function () {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
});

function openModal(episode) {
    const modal = document.getElementById("episodeModal");
    modal.classList.add("modal-active");

    const carouselWrapper = document.querySelector(".swiper-wrapper");
    carouselWrapper.innerHTML = "";

    episode.scenes.forEach((item) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = "Scene image";
        img.classList.add("carousel-image");
        slide.appendChild(img);

        const description = document.createElement("p");
        description.textContent = item.text;
        description.classList.add("carousel-description");
        slide.appendChild(description);

        carouselWrapper.appendChild(slide);
    });

    const swiper = new Swiper(".swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 1,
        loop: false,
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("modal-active");
            swiper.destroy();
        }
    });
}
