const container = document.querySelector(".testimonials-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

container.innerHTML += container.innerHTML;

const cards = document.querySelectorAll(".testimonials-box");

let index = 0;
const total = cards.length / 2;
const gap = 50;
let isAnimating = false;

function move() {

    const gap = 50;

    const cardWidth =
        cards[0].getBoundingClientRect().width + gap;

    container.style.transform =
        `translateX(-${index * cardWidth}px)`;
}

function nextSlide() {

    if (isAnimating) return;
    isAnimating = true;

    index++;

    container.style.transition = "transform .8s ease";

    move();

    if (index >= total) {

        setTimeout(() => {

            container.style.transition = "none";
            index = 0;
            move();

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    container.style.transition = "transform .8s ease";
                    isAnimating = false;
                });
            });

        }, 800);

    } else {
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
}

function prevSlide() {

    if (isAnimating) return;
    isAnimating = true;

    if (index === 0) {

        container.style.transition = "none";
        index = total;

        move();

        requestAnimationFrame(() => {

            index--;

            container.style.transition = "transform .8s ease";

            move();

            setTimeout(() => {
                isAnimating = false;
            }, 800);

        });

    } else {

        index--;

        move();

        setTimeout(() => {
            isAnimating = false;
        }, 800);

    }
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 3500);

move();