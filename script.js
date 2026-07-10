/* ==================================================
   ELEMENTOS
================================================== */

const btn = document.querySelector(".hamburguer");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

const cards = document.querySelectorAll(".card, .card-diferencial");
const links = document.querySelectorAll('a[href^="#"]');
const contadores = document.querySelectorAll(".contador-numero");
const elementosAnimados = document.querySelectorAll(".animar");

/* ==================================================
   MENU MOBILE
================================================== */

function alternarMenu() {

    const aberto = btn.getAttribute("aria-expanded") === "true";

    btn.setAttribute("aria-expanded", !aberto);

    btn.classList.toggle("ativo");
    menu.classList.toggle("aberto");
    nav.classList.toggle("aberto");

}

btn.addEventListener("click", alternarMenu);

menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        btn.setAttribute("aria-expanded", "false");

        btn.classList.remove("ativo");
        menu.classList.remove("aberto");
        nav.classList.remove("aberto");

    });

});


/* ==================================================
   SCROLL SUAVE
================================================== */

links.forEach(link => {

    link.addEventListener("click", e => {

        const alvo = document.querySelector(link.getAttribute("href"));

        if (!alvo) return;

        e.preventDefault();

        alvo.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ==================================================
   EFEITO DOS CARDS
================================================== */

cards.forEach(card => {

    card.addEventListener("pointerdown", () => {
        card.classList.add("tocado");
    });

    card.addEventListener("pointerup", () => {

        setTimeout(() => {
            card.classList.remove("tocado");
        }, 300);

    });

});


/* ==================================================
   CONTADOR
================================================== */

let contadorAtivado = false;

function animarContador(elemento) {

    const alvo = Number(elemento.dataset.alvo);
    const prefixo = elemento.dataset.prefixo;
    const sufixo = elemento.dataset.sufixo;

    const duracao = 2000;

    let inicio = null;

    function atualizar(timestamp) {

        if (!inicio) inicio = timestamp;

        const progresso = timestamp - inicio;

        const valor = Math.min(
            Math.floor((progresso / duracao) * alvo),
            alvo
        );

        elemento.textContent = `${prefixo}${valor}${sufixo}`;

        if (valor < alvo) {
            requestAnimationFrame(atualizar);
        }

    }

    requestAnimationFrame(atualizar);

}

function verificarContador() {

    if (contadorAtivado) return;

    contadores.forEach(contador => {

        if (contador.getBoundingClientRect().top < window.innerHeight) {

            contadorAtivado = true;

            contadores.forEach(animarContador);

        }

    });

}


/* ==================================================
   ANIMAÇÕES
================================================== */

function verificarAnimacoes() {

    elementosAnimados.forEach(elemento => {

        if (elemento.getBoundingClientRect().top < window.innerHeight - 60) {

            elemento.classList.add("visivel");

        }

    });

}


/* ==================================================
   EVENTOS
================================================== */

window.addEventListener("scroll", verificarAnimacoes);
window.addEventListener("scroll", verificarContador);

window.addEventListener("resize", verificarAnimacoes);

window.addEventListener("load", () => {

    verificarAnimacoes();
    verificarContador();

});

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(verificarAnimacoes, 200);
    setTimeout(verificarContador, 100);

});
