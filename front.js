
const toggle = document.getElementById("dark-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* =====================================================
   SITE DE ESTUDOS ENEM - FRONTEND COMPLETO
   Autor: você 😎
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       SAUDAÇÃO DINÂMICA
    ===================================== */
    const saudacao = document.getElementById("saudacao");
    if (saudacao) {
        const hora = new Date().getHours();
        saudacao.textContent =
            hora < 12 ? "☀️ Bom dia! Bons estudos!"
            : hora < 18 ? "📘 Boa tarde! Continue firme!"
            : "🌙 Boa noite! Hora de revisar!";
    }

    /* =====================================
       MODO ESCURO
    ===================================== */
    const toggleDark = document.getElementById("darkMode");
    const darkAtivo = localStorage.getItem("darkMode");

    if (darkAtivo === "true") {
        document.body.classList.add("dark");
    }

    if (toggleDark) {
        toggleDark.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark")
            );
        });
    }

    /* =====================================
       BUSCA GLOBAL
    ===================================== */
    const busca = document.getElementById("busca");
    if (busca) {
        busca.addEventListener("input", () => {
            const termo = busca.value.toLowerCase();
            document.querySelectorAll(
                ".videos li, .noticias li, .card, .temas li"
            ).forEach(item => {
                item.style.display =
                    item.innerText.toLowerCase().includes(termo)
                        ? "block"
                        : "none";
            });
        });
    }

    /* =====================================
       FAVORITOS (REPERTÓRIOS)
    ===================================== */
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    document.querySelectorAll(".card").forEach(card => {
        const btn = document.createElement("button");
        btn.textContent = "⭐ Favoritar";
        btn.classList.add("fav-btn");
        card.appendChild(btn);

        const texto = card.innerText;

        if (favoritos.includes(texto)) {
            btn.textContent = "⭐ Favorito";
            btn.classList.add("ativo");
        }

        btn.addEventListener("click", () => {
            if (favoritos.includes(texto)) {
                favoritos = favoritos.filter(f => f !== texto);
                btn.textContent = "⭐ Favoritar";
                btn.classList.remove("ativo");
            } else {
                favoritos.push(texto);
                btn.textContent = "⭐ Favorito";
                btn.classList.add("ativo");
            }
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });
    });

    /* =====================================
       PROGRESSO DE ESTUDOS
    ===================================== */
    let progresso = JSON.parse(localStorage.getItem("progresso")) || 0;
    const barra = document.getElementById("barraProgresso");

    if (barra) {
        barra.style.width = progresso + "%";
    }

    document.querySelectorAll(".videos a").forEach(link => {
        link.addEventListener("click", () => {
            progresso = Math.min(progresso + 5, 100);
            localStorage.setItem("progresso", progresso);
            if (barra) barra.style.width = progresso + "%";
        });
    });

});

/* =====================================
   NAVEGAÇÃO
===================================== */
function irPara(pagina) {
    window.location.href = pagina;
}

/* =====================================
   SCROLL SUAVE
===================================== */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document
            .querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});
