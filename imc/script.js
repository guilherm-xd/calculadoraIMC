const alturaValor = document.getElementById("alturaValor");
const pesoValor = document.getElementById("pesoValor");
const nomeValor = document.getElementById("nomeValor");
const botaoLimpar = document.getElementById("botaoLimpar");
const valorIMC = document.getElementById("valorIMC");
const situacaoIMC = document.getElementById("situacaoIMC");
const divCadastro = document.getElementById("divCadastro");
const informacoesCadastro = document.getElementById("informacoesCadastro");
const quantidadePessoas = document.getElementById("quantidadePessoas");
const formIMC = document.getElementById("formIMC");
const mediaPeso = document.getElementById("mediaPeso");
const mediaAltura = document.getElementById("mediaAltura");
const mediaIMC = document.getElementById("mediaIMC");
const menorIMC = document.getElementById("menorIMC");
const maiorIMC = document.getElementById("maiorIMC");
const campoPesquisa = document.getElementById("campoPesquisa");
const semResultados = document.getElementById("semResultados");

const pessoas = [];

function atualizarResumo() {
  const somaAltura = pessoas.reduce(function (acumulador, pessoa) {
    return acumulador + Number(pessoa.altura);
  }, 0);

  const somaPeso = pessoas.reduce(function (acumulador, pessoa) {
    return acumulador + Number(pessoa.peso);
  }, 0);

  const somaIMC = pessoas.reduce(function (acumulador, pessoa) {
    return acumulador + Number(pessoa.imc);
  }, 0);

  const pessoaMaior = pessoas.reduce(function (candidato, atual) {
    if (atual.imc > candidato.imc) {
      return atual;
    }
    return candidato;
  });

  const pessoaMenor = pessoas.reduce(function (candidato, atual) {
    if (atual.imc < candidato.imc) {
      return atual;
    }
    return candidato;
  });

  const alturaMedia = somaAltura / pessoas.length;
  const pesoMedio = somaPeso / pessoas.length;
  const imcMedio = somaIMC / pessoas.length;

  mediaPeso.textContent = pesoMedio.toFixed(1).replace(".", ",") + " kg";
  mediaAltura.textContent = alturaMedia.toFixed(2).replace(".", ",") + " m";
  mediaIMC.textContent = imcMedio.toFixed(2).replace(".", ",");
  maiorIMC.textContent =
    pessoaMaior.imc.toFixed(2).replace(".", ",") + " (" + pessoaMaior.nome + ")";
  menorIMC.textContent =
    pessoaMenor.imc.toFixed(2).replace(".", ",") + " (" + pessoaMenor.nome + ")";
}

function classificar(imc) {
  if (imc < 18.5) return "Abaixo do peso normal";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Excesso de peso";
  if (imc < 35) return "Obesidade classe I";
  if (imc < 40) return "Obesidade classe II";
  return "Obesidade classe III";
}

function mostrarLista(lista) {
  informacoesCadastro.innerHTML = "";

  lista.forEach(function (pessoa) {
    const bloco = document.createElement("div");
    bloco.className = "pessoa";

    const linhas = [
      "Nome: " + pessoa.nome,
      "Peso: " + pessoa.peso + " kg",
      "Altura: " + pessoa.altura + " m",
      "IMC: " + pessoa.imc.toFixed(2).replace(".", ","),
      "Classificação: " + pessoa.situacao,
    ];

    linhas.forEach(function (texto) {
      const p = document.createElement("p");
      p.textContent = texto;
      bloco.appendChild(p);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
      excluirPessoa(pessoa.id);
    });

    bloco.appendChild(botaoExcluir);

    informacoesCadastro.appendChild(bloco);
  });

  if (lista.length === 0) {
    semResultados.style.display = "block";
  } else {
    semResultados.style.display = "none";
  }
}

function excluirPessoa(id) {
  const posicao = pessoas.findIndex(function (pessoa) {
    return pessoa.id === id;
  });

  if (posicao === -1) {
    return;
  }

  pessoas.splice(posicao, 1);

  campoPesquisa.value = "";

  if (pessoas.length === 0) {
    divCadastro.style.display = "none";
    return;
  }

  mostrarPessoas();
}

function mostrarPessoas() {
  quantidadePessoas.textContent = "Quantidade de pessoas: " + pessoas.length;
  mostrarLista(pessoas);
  atualizarResumo();
}

campoPesquisa.addEventListener("input", function () {
  const texto = campoPesquisa.value.toLowerCase();

  const resultado = pessoas.filter(function (pessoa) {
    return pessoa.nome.toLowerCase().includes(texto);
  });

  mostrarLista(resultado);
});

formIMC.addEventListener("submit", function (event) {
  event.preventDefault();

  if (alturaValor.value === "" || pesoValor.value === "") {
    return;
  }

  const imc = pesoValor.value / alturaValor.value ** 2;
  const situacao = classificar(imc);

  valorIMC.textContent = "Seu IMC é: " + imc.toFixed(2).replace(".", ",");
  valorIMC.style.display = "flex";
  situacaoIMC.textContent = "Sua classificação é: " + situacao;
  situacaoIMC.style.display = "flex";

  pessoas.push({
    id: Date.now(),
    nome: nomeValor.value,
    peso: pesoValor.value,
    altura: alturaValor.value,
    imc: imc,
    situacao: situacao,
  });

  divCadastro.style.display = "block";
  campoPesquisa.value = "";
  mostrarPessoas();
});

botaoLimpar.addEventListener("click", function () {
  valorIMC.style.display = "none";
  situacaoIMC.style.display = "none";

  nomeValor.value = "";
  alturaValor.value = "";
  pesoValor.value = "";
  nomeValor.focus();
});