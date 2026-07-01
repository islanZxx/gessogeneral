// Menu hamburguer
const btn = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

btn.addEventListener('click', () => {
    const aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !aberto);
    btn.classList.toggle('ativo');
    menu.classList.toggle('aberto');
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('ativo');
        menu.classList.remove('aberto');
    });
});

// Animacao de scroll
function verificar() {
    var elementos = document.querySelectorAll('.animar');
    var altura = window.innerHeight;

    for (var i = 0; i < elementos.length; i++) {
        var topo = elementos[i].getBoundingClientRect().top;
        if (topo < altura - 60) {
            elementos[i].classList.add('visivel');
        }
    }
}

window.addEventListener('scroll', verificar);
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(verificar, 100);
});
