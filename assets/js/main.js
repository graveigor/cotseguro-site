/* =====================================================================
   Cotseguro — JavaScript do site
   - Menu mobile
   - Sombra no header ao rolar
   - Animação de entrada das seções (scroll reveal)
   - Ano automático no rodapé
   - Formulário de contato -> envia via WhatsApp
   ===================================================================== */

(function () {
  "use strict";

  // Número de WhatsApp usado no formulário (apenas dígitos, com DDI 55).
  // >>> Para trocar, altere também os links wa.me/... no HTML.
  var WHATSAPP_NUMBER = "5511947828559";

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initYear();
    initContactForm();
    initActiveNav();
  });

  /* ----- Tema claro/escuro (persiste no localStorage) ----- */
  function initTheme() {
    var root = document.documentElement;

    function apply(theme) {
      var dark = theme === "dark";
      root.classList.toggle("dark", dark);
      document.querySelectorAll("[data-icon-sun]").forEach(function (el) {
        el.classList.toggle("hidden", !dark);
      });
      document.querySelectorAll("[data-icon-moon]").forEach(function (el) {
        el.classList.toggle("hidden", dark);
      });
      document.querySelectorAll("[data-theme-label]").forEach(function (el) {
        el.textContent = dark ? "Modo claro" : "Modo escuro";
      });
    }

    var saved = "light";
    try { if (localStorage.getItem("theme") === "dark") saved = "dark"; } catch (e) {}
    apply(saved);

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dark = !root.classList.contains("dark");
        try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
        apply(dark ? "dark" : "light");
      });
    });
  }

  /* ----- Menu mobile (abre/fecha) ----- */
  function initMobileMenu() {
    var btn = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-mobile-menu]");
    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Sombra/fundo no header ao rolar ----- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----- Animação de entrada ao rolar ----- */
  function initScrollReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(function (el) {
      // Se o elemento já está visível no viewport ao carregar,
      // exibe imediatamente sem esperar rolagem
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* ----- Ano atual no rodapé ----- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----- Destaca o link da página atual ----- */
  function initActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /* ----- Formulário de contato -> WhatsApp ----- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = (form.querySelector("#nome") || {}).value || "";
      var email = (form.querySelector("#email") || {}).value || "";
      var assunto = (form.querySelector("#assunto") || {}).value || "";
      var mensagem = (form.querySelector("#mensagem") || {}).value || "";

      var texto =
        "Olá, Cotseguro! Gostaria de mais informações." +
        "\n\n*Nome:* " + nome +
        "\n*E-mail:* " + email +
        "\n*Assunto:* " + assunto +
        (mensagem ? "\n*Mensagem:* " + mensagem : "");

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");

      var ok = form.querySelector("[data-form-feedback]");
      if (ok) ok.classList.remove("hidden");
      form.reset();
    });
  }
})();
