document.addEventListener('DOMContentLoaded', function () {
  //variação da operação no display, em forma de string
  let calculoDisplay = '0';
  let igualFlag = false;
  let on = true;

  //variáreis para botões
  const umAoNove = {
    'botao-1': '1',
    'botao-2': '2',
    'botao-3': '3',
    'botao-4': '4',
    'botao-5': '5',
    'botao-6': '6',
    'botao-7': '7',
    'botao-8': '8',
    'botao-9': '9',
  };

  const operadoresBasicos = {
    'botao-mais': '+',
    'botao-menos': '-',
    'botao-vezes': '*',
    'botao-divisao': '/',
  };

  const botaoZero = document.getElementById('botao-0');
  const botaoZeroZero = document.getElementById('botao-00');
  const botaoPorcentagem = document.getElementById('botao-porcentagem');
  const botaoAbreParenteses = document.getElementById('botao-abre-parenteses');
  const botaoFechaParenteses = document.getElementById(
    'botao-fecha-parenteses'
  );
  const botaoRaiz = document.getElementById('botao-raiz');
  const botaoMMenos = document.getElementById('botao-m-');
  const botaoApagar = document.getElementById('botao-apagar');
  const botaoIgual = document.getElementById('botao-igual');
  const botaoPonto = document.getElementById('botao-ponto');
  const botaoOnOff = document.getElementById('botao-on-off');

  //display - saída
  const resultado = document.getElementById('resultado');

  //FUNÇÕES
  //mostrar número no display
  function toDisplay() {
    resultado.value = calculoDisplay.replace(/\*/g, '×').replace(/\//g, '÷');
  }
  toDisplay();

  //limpar display inicial
  const clear = function () {
    if (resultado.value === '0') {
      resultado.value = '';
      calculoDisplay = '';
    }
  };

  //resetar display após operação
  function igualReset(isNumero) {
    if (igualFlag) {
      if (isNumero) {
        //novo cálculo, limpa tudo
        resultado.value = '';
        calculoDisplay = '';
      }

      //se não for número, apenas continua com o resultado atual
      igualFlag = false;
    }
  }

  //não resetar caso queira usar o resultado
  function naoReset() {
    if (igualFlag === true) {
      igualFlag = false;
    }

    const ultimoChar = calculoDisplay.slice(-1);
    const podeConverter = !['+', '-', '*', '/'].includes(ultimoChar);

    if (podeConverter && String(calculoDisplay).length > 4) {
      const valorNumerico = Number(calculoDisplay);
      if (!isNaN(valorNumerico)) {
        if (valorNumerico % 1 === 0) {
          calculoDisplay = valorNumerico.toString();
        } else {
          calculoDisplay = valorNumerico.toFixed(2);
        }
        toDisplay();
      }
    }
  }

  //verificação último operador
  function verificarOperador() {
    return ['+', '-', '*', '/'].includes(calculoDisplay.slice(-1));
  }

  //adicionar ao display
  function adicionarDisplay(valor) {
    const ultimoChar = calculoDisplay.slice(-1);

    const precisaDeMultiplicacao =
      (/\d|\)/.test(ultimoChar) && valor === '(') ||
      (ultimoChar === ')' && /\d/.test(valor));

    if (calculoDisplay.length < 12) {
      if (precisaDeMultiplicacao) {
        calculoDisplay += '*';
      }
      calculoDisplay += valor;
      toDisplay();
    }
  }

  //BOTÕES
  //um ao nove
  for (let id in umAoNove) {
    document.getElementById(id).addEventListener('click', function () {
      clear();
      igualReset();
      adicionarDisplay(umAoNove[id]);
    });
  }
  //botão zero
  botaoZero.addEventListener('click', function () {
    clear();
    igualReset(true);
    adicionarDisplay('0');
  });

  //botão zero zero
  botaoZeroZero.addEventListener('click', function () {
    igualReset(true);
    if (calculoDisplay === '0') {
      return;
    } else {
      adicionarDisplay('00');
    }
  });

  //botão ponto
  botaoPonto.addEventListener('click', function () {
    igualReset(true);
    naoReset();

    const ultimoChar = calculoDisplay.slice(-1);

    //se começa a expressão ou depois de operador, adiciona 0
    if (['+', '-', '*', '/', '(', ''].includes(ultimoChar)) {
      adicionarDisplay('0.');
      return;
    }

    //evitar vários pontos no mesmo número
    const partes = calculoDisplay.split(/[\+\-\*\/\(\)]/);
    const ultimoNumero = partes[partes.length - 1];

    if (!ultimoNumero.includes('.')) {
      adicionarDisplay('.');
    }
  });

  //botao abre parenteses
  let parentesesFlag = false; //flag para detectar se foi aberto

  botaoAbreParenteses.addEventListener('click', function () {
    if (parentesesFlag === false) {
      clear();
      igualReset(true);
      adicionarDisplay('(');
      parentesesFlag = true;
    }
  });

  //botao fecha parenteses
  botaoFechaParenteses.addEventListener('click', function () {
    if (parentesesFlag === true) {
      clear();
      igualReset(true);
      adicionarDisplay(')');
      parentesesFlag = false;
    }
  });

  //apagar
  botaoApagar.addEventListener('click', function () {
    calculoDisplay = calculoDisplay.slice(0, -1);
    if (calculoDisplay === '') {
      calculoDisplay = '0';
    }
    toDisplay();
  });

  //OPERAÇÕES
  //mais, menos, vezes e dividido
  for (let id in operadoresBasicos) {
    document.getElementById(id).addEventListener('click', function () {
      if (verificarOperador()) return;
      clear();
      naoReset();
      igualReset(false);
      adicionarDisplay(operadoresBasicos[id]);
    });
  }

  //botão igual
  botaoIgual.addEventListener('click', function () {
    clear();
    let calculoNumber = eval(calculoDisplay);
    calculoDisplay = parseFloat(calculoNumber.toPrecision(9)).toString();
    toDisplay();
    igualFlag = true;
  });

  //botao on-off
  botaoOnOff.addEventListener('click', function () {
    if (on === true) {
      on = false;
      resultado.style.color = '#333a5700';
    } else {
      calculoDisplay = '0';
      igualFlag = false;
      on = true;
      resultado.style.color = 'white';
      toDisplay();
    }
  });
});
