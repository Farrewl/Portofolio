// Efek Reveal saat Scroll
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Jalankan sekali saat load untuk cek posisi awal
reveal();

// Smooth scroll untuk tombol "View Projects"
document.querySelector('.btn-outline').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#work').scrollIntoView({
        behavior: 'smooth'
    });
});