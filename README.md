# Site Cotseguro — Seguros de Transporte

Site institucional de 4 páginas (Home, Quem Somos, Produtos e Contato), feito em **HTML + Tailwind CSS** (via CDN) e um pouco de **JavaScript**. Não precisa instalar nada nem rodar build: é só abrir os arquivos.

## Estrutura de arquivos

```
cotseguro-site/
├── index.html          → Home
├── quem-somos.html     → Quem Somos
├── produtos.html       → Produtos
├── contato.html        → Contato (com formulário e mapa)
├── README.md           → este arquivo
└── assets/
    ├── css/
    │   └── styles.css  → estilos extras (animações, gradientes)
    └── js/
        └── main.js     → menu mobile, animações, formulário, ano
```

## Como abrir no VSCode

1. Abra a pasta `cotseguro-site` no VSCode (Arquivo → Abrir Pasta).
2. Para visualizar, dê duplo clique em `index.html` (abre no navegador) **ou**
   instale a extensão **Live Server** no VSCode, clique com o botão direito em
   `index.html` → **Open with Live Server**. Assim o site recarrega sozinho ao editar.

> Importante: o Tailwind é carregado pela internet (CDN), então mantenha conexão
> ativa ao visualizar. Para publicar, veja a seção "Publicar".

## Onde editar os dados de contato

Os dados vieram do site de referência e estão marcados com o comentário
`<!-- TODO: trocar pelos dados reais da Cotseguro ... -->`. Procure por **TODO**
(Ctrl/Cmd + Shift + F no VSCode) e troque em **todas as 4 páginas**:

- **Telefones:** `(11) 94782-8559` e `(11) 98371-4043`
- **E-mail:** `contato@cottransp.com.br`
- **Endereço:** `Rua Serra de Botucatu, 1195 ...`
- **WhatsApp:** todos os links `https://wa.me/5511947828559`
  (formato: `55` + DDD + número, só dígitos)
- **Instagram:** `https://www.instagram.com/cottransp.seguros/`
- **WhatsApp do formulário:** abra `assets/js/main.js` e ajuste a constante
  `WHATSAPP_NUMBER` no topo do arquivo.

Dica: para trocar tudo de uma vez, use "Substituir em arquivos" (Ctrl/Cmd + Shift + H).

## Como o formulário funciona

A página de Contato não envia e-mail por conta própria (é um site estático).
Ao clicar em **Enviar**, o formulário monta uma mensagem com os dados preenchidos
e abre o **WhatsApp** da empresa em uma nova aba. É o caminho mais simples e que
mais converte. Se preferir receber por e-mail, dá para integrar um serviço
gratuito como [Formspree](https://formspree.io) — me avise que eu adapto.

## Trocar cores e logo

- **Cores:** estão definidas no bloco `tailwind.config` no topo de cada HTML
  (`navy`, `brand`, `amber` etc.) e também em `assets/css/styles.css` (`:root`).
- **Logo:** hoje é um símbolo em SVG + o nome "Cotseguro". Se tiver um logo em
  imagem (PNG/SVG), me envie que eu troco, ou substitua o `<svg>` do cabeçalho
  por `<img src="assets/img/logo.png" alt="Cotseguro" class="h-9">`.

## Publicar (colocar no ar)

Qualquer hospedagem de site estático serve. Opções gratuitas e fáceis:

- **Netlify** ou **Vercel:** arraste a pasta `cotseguro-site` na tela deles.
- **GitHub Pages:** suba a pasta em um repositório e ative o Pages.
- **Hospedagem tradicional (cPanel):** envie os arquivos para a pasta `public_html`.

Para produção, é recomendável trocar o Tailwind CDN por uma build otimizada
(deixa o site mais leve). Me avise se quiser que eu prepare essa versão.

---
© Cotseguro — Seguros de Transporte.
