const brandsMain = document.querySelector('.brands__main');
const readMoreShow = document.querySelector('.brands__read-more_show');
const readMoreHide = document.querySelector('.brands__read-more_hide');

function showBrands() {
    brandsMain.style.height = '100%';
    readMoreShow.style.display = 'none';
    readMoreHide.style.display = 'inline';
}

function hideBrands() {
    brandsMain.style.height = '150px';
    readMoreShow.style.display = 'inline';
    readMoreHide.style.display = 'none';
}

const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    loop: true,
    spaceBetween: 30,
    breakpoints: {
        320: {
            slidesPerView: 1.3
        },
        380: {
            slidesPerView: 1.5
        },
        420: {
            slidesPerView: 1.7
        },
        460: {
            slidesPerView: 1.9
        },
        540: {
            slidesPerView: 2
        },
        580: {
            slidesPerView: 2.4
        },
        620: {
            slidesPerView: 2.5
        },
        700: {
            slidesPerView: 2.8
        },
    }
});