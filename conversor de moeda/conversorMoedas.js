let valoresConversao = {
    real: {
        dolar: 0.27,
        euro: 0.18
    },
    dolar: {
        real: 5.03,
        euro: 1.09
    },
    euro: {
        real: 5.47,
        dolar: 0.92
    }
}

let botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

let botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

let botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

let botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);


let valorUsuario = document.getElementById("valor-usuario");
valorUsuario.addEventListener("keypress", function(event) {

    console.log(event);

    if(event.ctrlKey == true && event.code == "KeyI") {
        inverter();
    }

    if(event.ctrlKey == true && event.code == "KeyL") {
        limpar();
    }

    if(event.key == "Enter") {
        converter();
    }

});

if(localStorage.getItem("aceitouCookie") == "1") {
    aceitaMensagem();
}

function aceitaMensagem() {
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}

function limpar() {
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");

    valorUsuario.value = "";
    resultado.textContent = "";
}

function converter() {
    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem  = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;

    if(valorUsuario == "") {
        alert("Valor não pode ser vazio!");
        return;
    }

    if(moedaOrigem == moedaDestino) {
        alert("As moedas são iguais, não é possível converter");
        return;
    }

    let conversao = valorUsuario * valoresConversao[moedaOrigem][moedaDestino];

    let simbolo = "";
    if (moedaDestino == "real") {
        simbolo = "R$";
    }
    if (moedaDestino == "dolar") {
        simbolo = "US$"
    }
    if (moedaDestino == "euro") {
        simbolo = "€";
    }

let resultadoDaConversao = {
    valor: valorUsuario,
    moeda1: moedaOrigem,
    moeda2: moedaDestino,
    resultado: conversao
}
    salvarResultadoNoHistorioco(resultadoDaConversao);

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + conversao.toFixed(2);

}

function salvarResultadoNoHistorioco(conversao) {
    let historico = recuperaHistoriocoDeConversoes();

    historico.push(conversao);
    
    let conversaoEmJson = JSON.stringify(historico);
    localStorage.setItem("historico", conversaoEmJson);
}

function recuperaHistoriocoDeConversoes() {
    let historico = localStorage.getItem("historico");
    
    if(!historico) {
        return [];
    }
    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;


    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;
}