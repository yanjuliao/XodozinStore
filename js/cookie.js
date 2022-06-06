//Criar um cookie
function setCookie(name, value, duration) {
        var cookie = name + "=" + value + "; " +
        duration;
 
        document.cookie = cookie;
}

//Ler um cookie
function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
 
        begin = cookies.indexOf(prefix);
         
        if (begin != 0) {
            return null;
        }
 
    } else {
        begin += 2;
    }
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) {
        end = cookies.length;                        
    }
 
    return unescape(cookies.substring(begin + prefix.length, end));
}

function verificaNome() {
    username = prompt("Digite seu nome: ");
    if(username != "" && username != null) {
        setCookie("username", username, "tue, 01 jan 2115 12:00:00 UTC");
    }
}

function verificaCookie() {
    var username = getCookie('username');
    if(username != null) {
        alert("Bem vindo novamente " + username);
    }
}

function apagarTelaCookie() {
    var container = document.querySelector('.cookies-content'); 
    container.style.display = 'none';
}

function exibirTelaCookie() {
    var container = document.querySelector('.cookies-content'); 
    var username = getCookie('username'); 
        if(username == null || "") {
            container.style.display = 'grid';
        }
}