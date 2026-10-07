const alturaValor = document.getElementById("alturaValor");
const pesoValor = document.getElementById("pesoValor");
const botaoCalcular = document.getElementById("botaoCalcular");
const botaoLimpar = document.getElementById("botaoLimpar");
const valorIMC = document.getElementById("valorIMC");
const situacaoIMC = document.getElementById("situacaoIMC");

const formIMC = document.getElementById("formIMC");

formIMC.addEventListener("submit", function (event) {
  event.preventDefault();

  if (alturaValor.value === "" || pesoValor.value === "") {
    return;
  }

  const imc = pesoValor.value / alturaValor.value ** 2;

  valorIMC.textContent = "Seu IMC é: " + imc.toFixed(2).replace(".", ",");
  valorIMC.style.display = "flex";

  let situacao = "";

  if (imc < 18.5) {
    situacao = "Abaixo do peso normal";
  } else if (imc < 25) {
    situacao = "Peso normal";
  } else if (imc < 30) {
    situacao = "Excesso de peso";
  } else if (imc < 35) {
    situacao = "Obesidade classe I";
  } else if (imc < 40) {
    situacao = "Obesidade classe II";
  } else {
    situacao = "Obesidade classe III";
  }

  situacaoIMC.textContent = "Sua classificação é: " + situacao;
  situacaoIMC.style.display = "flex";
});

botaoLimpar.addEventListener("click", function () {
  valorIMC.style.display = "none";
  situacaoIMC.style.display = "none";

  alturaValor.value = "";
  pesoValor.value = "";
  alturaValor.focus();
});
