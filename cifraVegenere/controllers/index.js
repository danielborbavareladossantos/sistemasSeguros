var alfa = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
];
var arrayChave = [];
var posicao = 0;

var postE = (req, res, next) => {
  arrayChave = [];
  posicao = 0;
  var retorno = crypt(req.body.texto,req.body.chave);
  return res.render('index', { result: retorno });
}

var postD = (req, res, next) => {
    arrayChave = [];
    posicao = 0;
    var retorno = decrypt(req.body.texto,req.body.chave);
    // var retorno = req.body.texto;
    return res.render('index', { result: retorno });
}

var crypt = (frase,chave) => {
    
    //descobrir sequencia da chave
    for (let i = 0; i < chave.length; i++) {
      var letra = chave[i];
      for (let x = 0; x < 26; x++) {
        if (letra.includes(alfa[x])) {
          arrayChave.push(x);
        }
      }
    }
    
    var l = "";
    for (let i = 0; i < frase.length; i++) {
       l += cesar(frase[i],arrayChave[getNextSeq()]);
    }
    
    return l;
    
}

var decrypt = (frase,chave) => {
    
  //descobrir sequencia da chave
  for (let i = 0; i < chave.length; i++) {
    var letra = chave[i];
    for (let x = 0; x < 26; x++) {
      if (letra.includes(alfa[x])) {
        arrayChave.push(x);
      }
    }
  }
  
  var l = "";
  for (let i = 0; i < frase.length; i++) {
    var a = checkPosition(frase[i]);
    var b = arrayChave[getNextSeq()];
    l += cesar(frase[i],a-b-a);
  }
  
  return l;
  
}

var checkPosition = (letra) => {
  for (let i = 26; i < 52; i++) {
    if (alfa[i].includes(letra)) {
      return i;
    }
  }
}

var getNextSeq = () => {
  posicao++;
  if (posicao > arrayChave.length)
    posicao = 1;
  return posicao-1;
}

var cesar = (frase,deslocamento) => {
  var x = parseInt(deslocamento);
  var keep = [];
  
  for (var i = 0; i < frase.length; i++) {

    if(frase[i] != ' ') {
      
      for (var j = 26; j < 52; j++) {
        if (frase[i] == alfa[j]) {
          keep[i] = alfa[(j + x) % 26];
          break;
        }
      }

    } else {
      keep[i] = ' ';
    }
    
  }

   return keep.join("");
}

module.exports = {
    postE:postE,
    postD:postD
}