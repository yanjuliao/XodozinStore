//Função para checar se o email é válido//
function validaEmail(){
    if(formataEmail())
        {
            return true
        }
    else {
        alert( "Por favor, informe um E-MAIL válido!" );
            return false
    }
}

function formataEmail() {
    if( document.forms[0].email.value=="" 
    || document.forms[0].email.value.indexOf('@')==-1 
        || document.forms[0].email.value.indexOf('.')==-1)
    {
        return false;
    }
    else
        return true;
}

//Função para validação do CPF//
function validaCPF(){
    if(formataCPF(document.getElementById('cpf').value))
        return true;
    else
        alert('CPF Inválido')
        return false;
}

function formataCPF(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
          return false;
}

//Função para validar o nome do usuário//
function validaNome() {
    if(formataNome(document.getElementById('nome').value)) {
        return true;
    }
    else {
        alert("Nome inválido, O campo deve conter no mínimo 3 letras");
        return false;
    }
}

function formataNome(nome) {
    if(nome.length <= 2)
        return false;
    else 
        return true;
}

//Função para validar senha//
function validaSenha() {
    if(verificaSenha())
        return true;
    else
        alert('Os campos de senha são divergentes')
        return false;
}

function verificaSenha() {
    if(document.getElementById('senha').value != document.getElementById('senhaConfirm').value)
        return false
    else
        return true
}

//As funções abaixo são para realizar a busca por CEP//
function atualizarFormulario() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} 
else {
    atualizarFormulario();
    alert("CEP não encontrado.");
}
}

function buscarCep(valor) {
var cep = valor.replace(/\D/g, '');

if (cep != "") {

    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {

        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        var script = document.createElement('script');

        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        document.body.appendChild(script);

    }
    else {
        atualizarFormulario();
        alert("Formato de CEP inválido.");
    }
}
else {
    atualizarFormulario();
}
};

// Função para validar complemento e número//
function validaComplementoNum() {
    if(verificaComplementoNum()){
        return true;
    }
    else
        alert("Complemento ou Número não estão preenchidos. Verifique")
        return false;
}

function verificaComplementoNum() {
    if ((document.getElementById('complemento').value == '') 
        || (document.getElementById('numero').value == '')) {
            return false;
    }
    else
        return true;
}

//Função para cadastrar os dados//
function cadastrarDados() {

    if((formataCPF(document.getElementById('cpf').value)) && (formataEmail()) &&
        (formataNome(document.getElementById('nome').value)) && (verificaSenha()) && (verificaComplementoNum())) {

        alert('Dados salvos no localstorage com sucesso');
        let listaDados = JSON.parse(localStorage.getItem('listaDados') || '[]')

        listaDados.push(
            {
                nomeCad:        nome.value, 
                cpfCad:         cpf.value,
                emailCad:       email.value,
                senhaCad:       senha.value,
                cepCad:         cep.value,
                ruaCad:         rua.value,
                bairroCad:      bairro.value,
                cidadeCad:      cidade.value,
                complementoCad: complemento.value,
                numeroCad:      numero.value, 
                ufCad:          uf.value
            }
        )

        localStorage.setItem('listaDados', JSON.stringify(listaDados))
    }

    else {
        alert("Dados inválidos, verifique");
    }
}