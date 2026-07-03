// Menu hamburguer
var btn = document.querySelector('.hamburguer');
var menu = document.querySelector('.menu');

btn.addEventListener('click', function() {
    var aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !aberto);
    btn.classList.toggle('ativo');
    menu.classList.toggle('aberto');
});

menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('ativo');
        menu.classList.remove('aberto');
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            e.preventDefault();
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Efeito de toque nos cards (mobile)
document.querySelectorAll('.card, .card-diferencial').forEach(function(card) {
    card.addEventListener('touchstart', function() {
        this.classList.add('tocado');
    });
    card.addEventListener('touchend', function() {
        var el = this;
        setTimeout(function() {
            el.classList.remove('tocado');
        }, 300);
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

// Contador animado
function animarContador(el) {
    var alvo = parseInt(el.getAttribute('data-alvo'));
    var prefixo = el.getAttribute('data-prefixo');
    var sufixo = el.getAttribute('data-sufixo');
    var duracao = 2000;
    var inicio = null;

    function passo(timestamp) {
        if (!inicio) inicio = timestamp;
        var progresso = timestamp - inicio;
        var atual = Math.min(Math.floor((progresso / duracao) * alvo), alvo);
        el.textContent = prefixo + atual + sufixo;
        if (atual < alvo) {
            requestAnimationFrame(passo);
        }
    }

    requestAnimationFrame(passo);
}

var contadores = document.querySelectorAll('.contador-numero');
var contadorAtivado = false;

function verificarContador() {
    if (contadorAtivado) return;
    contadores.forEach(function(el) {
        var topo = el.getBoundingClientRect().top;
        if (topo < window.innerHeight - 60) {
            contadorAtivado = true;
            contadores.forEach(function(c) {
                animarContador(c);
            });
        }
    });
}

window.addEventListener('scroll', verificarContador);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(verificarContador, 200);
});

window.addEventListener('scroll', verificar);
window.addEventListener('resize', verificar);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(verificar, 200);
});
