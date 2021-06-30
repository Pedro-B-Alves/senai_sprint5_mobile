

// Define a constante usuarioAutenticado para verificar se o usuário está logado
export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null;

// Define a constante parseJwt que retorna o payload do usuário convertido em JSON
export const parseJwt = () => {
    // Define a variável base64 que recebe o payload do usuário logado codificado
    let base64 = localStorage.getItem('usuario-login').split('.')[1];

    // Decodifica a base64 para string, através do método a to b
    // e converte a string para JSON
    return JSON.parse(window.atob(base64));
}

export const linkPermissao = () => {
    if (parseJwt().role === '1') {
        return "/cadastro";
    }

    else{
        return "/descricao";
    }
}

export const sair = () => {
    localStorage.removeItem('usuario-login');
}