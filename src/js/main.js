const books = {
  "computacao-grafica": {
    title: "Computação gráfica e boas práticas.",
    file: "../assets/images/Guia da Computacao em Nuvem.pdf",
    filename: "Guia-da-Computacao-em-Nuvem.pdf",
  },
  algoritmos: {
    title: "Algoritmos e Programação",
    file: "../assets/images/algoritmos-e-programacao.pdf",
    filename: "Algoritmos-e-Programacao.pdf",
  },
};

const form = document.querySelector("#download-form");
if (form) {
  const bookKey = new URLSearchParams(window.location.search).get("livro");
  const book = books[bookKey];
  const titleEl = document.querySelector("#book-title");
  const statusEl = document.querySelector("#status");
  const linkEl = document.querySelector("#download-link");

  titleEl.textContent = book?.title ?? "Livro indisponível";
  
  if (!book) {
    statusEl.textContent = "Não foi possível identificar o livro. Volte à página inicial e tente novamente.";
  } else if (!book.file) {
    statusEl.textContent = "O PDF correto deste livro ainda não foi adicionado ao projeto.";
  } else {
    statusEl.textContent = "";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      Object.assign(linkEl, { href: book.file, download: book.filename, hidden: false });
      linkEl.click();
      statusEl.textContent = `Download de ${book.filename} iniciado. Se não começou, use o link abaixo.`;
    });
  }
}