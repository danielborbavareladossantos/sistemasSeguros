
var postE = (req, res, next) => {
    var retorno = crypt(req.body.texto,3);
    // var retorno = req.body.texto;
    return res.render('index', { result: retorno });
}

var postD = (req, res, next) => {
    var retorno = crypt(req.body.texto,-3);
    // var retorno = req.body.texto;
    return res.render('index', { result: retorno });
}

var crypt = (frase,deslocamento) => {
    var alfa = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var x = parseInt(deslocamento);
    var keep = [];
    
    for (var i = 0; i < frase.length; i++) {

     if(frase[i] != ' ') {

       for (var j = 0; j < alfa.length; j++) {
         if (frase[i] == alfa[j]) {
           keep[i] = alfa[(j + x) % alfa.length];
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