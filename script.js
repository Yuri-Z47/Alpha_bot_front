const API_URL = "https://SEU_BACKEND.onrender.com";

async function enviar() {
  const fileInput = document.getElementById("fileInput");
  const pergunta = document.getElementById("pergunta").value;
  const saida = document.getElementById("saida");

  if (!fileInput.files[0] || !pergunta) {
    alert("Envie uma planilha e escreva uma pergunta!");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("pergunta", pergunta);

  saida.innerText = "Analisando... ⏳";

  const response = await fetch(`${API_URL}/analisar/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  saida.innerText = data.resposta || "Erro ao gerar resposta.";

  atualizarHistorico();
}

async function atualizarHistorico() {
  const lista = document.getElementById("lista-historico");
  const res = await fetch(`${API_URL}/historico/`);
  const historico = await res.json();
  lista.innerHTML = "";
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.pergunta} → ${item.resposta}`;
    lista.appendChild(li);
  });
}

window.onload = atualizarHistorico;
