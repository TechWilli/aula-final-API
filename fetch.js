let id = document.querySelector("#validação");
let pedido = document.querySelector("#resultado");

// Fetch para GET
function clicar() {
    let btn = document.querySelector("#btn");
    btn.onclick = getDados;

};

function getDados(){
    fetch("https://hamburgueria-willu.herokuapp.com/hamburgueria").then(promessa => promessa.json()).then(dados => {
        // if (id === true) {
        //     console.log(dados._id);
        //     return;
        // }
        // console.log(dados);
        for(let hamburguer of dados){
            console.log(hamburguer._id);
            if (id.value === _id) {
                pedido.p.innerHTML = hamburguer.numero;
            };
            
            // pedido.innerHTML = hamburguer.numero;
        }
    });
    // console.log(`seu id é ${id.value}`);

};



// Fetch para POST
// fetch("https://hamburgueria-willu.herokuapp.com/hamburguer", {
//     headers: {
//         "Content-Type": "application/json"
//     },
//     method: "POST",
//     // body: JSON.stringify(dados)
// }).then(promessa => promessa.json()).then(dados => {
//     // Digite aqui o que fazer com os dados.
// });

clicar()