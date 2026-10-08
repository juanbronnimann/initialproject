const books = {
  "computacao-grafica": {
    title: "Computação Gráfica: Teoria e Prática — Análise de Imagens, Vol. 2",
  },
  algoritmos: {
    title: "Algoritmos e Programação",
    file: "../assets/images/algoritmos-e-programacao.pdf",
    filename: "Algoritmos-e-Programacao.pdf",
  },
};

const form = document.querySelector("#download-form");

if (form) {
  const selectedBook = books[new URLSearchParams(window.location.search).get("livro")];
  const title = document.querySelector("#book-title");
  const status = document.querySelector("#status");
  const downloadButton = document.querySelector("#download-button");
  const downloadLink = document.querySelector("#download-link");

  if (selectedBook?.file) {
    title.textContent = selectedBook.title;
    status.textContent = "Seus dados não serão enviados nem armazenados.";
    downloadButton.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      downloadLink.href = selectedBook.file;
      downloadLink.download = selectedBook.filename;
      downloadLink.hidden = false;
      downloadLink.click();
      status.textContent = "Download iniciado. Se não começou, use o link abaixo.";
    });
  } else if (selectedBook) {
    title.textContent = selectedBook.title;
    status.textContent = "O PDF correto deste livro ainda não foi adicionado ao projeto.";
  } else {
    title.textContent = "Livro indisponível";
    status.textContent = "Não foi possível identificar o livro. Volte à página inicial e tente novamente.";
  }
}