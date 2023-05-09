async function cadastrar() {
    let user1 = document.getElementById("usuario1").value;
    let pass1 = document.getElementById("password1").value;
    var hashSenha1 = await getSHA256Hash(pass1);
    window.location.href = "login.html" + "?senha1=" + hashSenha1 + "&user1=" + user1;
  }

  async function login() {
    let user2 = document.getElementById("usuario2").value;
    let pass2 = document.getElementById("password2").value;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const senha1 = urlParams.get('senha1');
    const user1 = urlParams.get('user1');
  

    const senha2 = await getSHA256Hash(pass2);

    compareSenhas(senha1,senha2, user2, user1);
  }

  const getSHA256Hash = async (input) => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
    return hash;
   };

   const compareSenhas = (senha1, senha2,user1,user2) => {
    if (senha1 == senha2 && user1== user2) {
      window.location.href = "bemvindo.html";
    } else {
      erro.innerHTML = `Nome de usuário ou senha inválidos! Por favor tente outra vez.`
    }
};