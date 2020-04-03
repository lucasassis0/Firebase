var admin = require("firebase-admin");
var user = require("readline-sync")
var serviceAccount = require("./Credenciais.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://atividade-arbyte.firebaseio.com"
});

var db = admin.database().ref('Carro')

function cadCarro() {
    var nome = user.question("Nome do carro: ")
    var valor = user.question("Valor do carro: ")

    db.push({
        nome: nome,
        valor: valor
    }, 
    console.log("Carro cadastrado com sucesso!\n"),
    menu())
}

function mostrar(){
    db.on('child_added', snapshot => {
        console.log(`Nome: ${snapshot.val().nome}\nValor: ${snapshot.val().valor}\n`)
    })
}

function mostraMaior() {
    var inicio = user.questionFloat("A partir de: ")
    db.orderByChild('valor').startAt(inicio)
        .on('child_added', snapshot => {
            console.log(`Nome: ${snapshot.val().nome}\nValor: ${snapshot.val().valor}\n`)
        })
}

function mostraMenor() {
    var ate = user.questionFloat("Até que valor: ")
    db.orderByChild('valor').endAt(ate)
        .on('child_added', snapshot => {
            console.log(`Nome: ${snapshot.val().nome}\nValor: ${snapshot.val().valor}\n`)
        })
}

function mostraExato() {
    var eq = user.questionFloat("Exatamente ao valor: ")
    db.orderByChild('valor').equalTo(eq)
        .on('child_added', snapshot => {
            console.log(`Nome: ${snapshot.val().nome}\nValor: ${snapshot.val().valor}\n`)
        })
}

function menu() {
    console.log("1. Cadastrar carro\n2. Mostrar atividade\n3. Mostrar valor maior\n4. Mostrar valor menor\n5. Mostrar valor exato\n6. Sair")
    var esc = user.question("Escolha uma opcao: ")

    if (esc == 1) {
        cadCarro()
    }else if (esc == 2) {
        mostrar()
    }else if (esc == 3) {
        mostraMaior()
    }else if (esc == 4) {
        mostraMenor()
    }else if (esc == 5) {
        mostraExato()
    }else if (esc == 6) {
        process.exit()
    }else{
        console.log("Opcao incorreta. Digitar apenas de 1 a 6")
        menu()
    }
}

menu()