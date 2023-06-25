const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('wrapper_navlink');


window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        navLinks.classList.add('inactive');
        hamburger.classList.remove('open');
    }
});

document.addEventListener('DOMContentLoaded', () => {


    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navLinks.classList.add('inactive');
        } else {
            navLinks.classList.remove('inactive');
            navLinks.classList.add('active');
        }
    });
});

