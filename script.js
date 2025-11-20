// -------------------------------------------
// Parallax Cloud Movement
// -------------------------------------------

const cloud1 = document.querySelector('.cloud1');
const cloud2 = document.querySelector('.cloud2');
const cloud3 = document.querySelector('.cloud3');

document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    cloud1.style.transform =
        `translateX(${scrolled * 0.4}px) scale(0.8)`;

    cloud2.style.transform =
        `translateX(${scrolled * 0.2}px) scale(0.8)`;

    cloud3.style.transform =
        `translateX(${scrolled * -0.4}px) scale(0.8)`;
});