//=======================================================================
//
//  TESTE PARA RECEBER PAYLOAD DO LORA WAN 
//------------------------------------------------------------------------
// Autor: Leonardo T Tancredi
//------------------------------------------------------------------------ 
// Edições: v0.1_payload_incremento - 14/06/2023
//          
//
//=======================================================================



// inicializar o acesso externo 
    const express = require('express');  //permite receber a requisição http
    const app = express();               
    const port = 3000;                  // porta de entrada


// sistemas para ler a requisição http que virá via json
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

// constante global para incrementar a cada requisição
    app.vini = 0;

// rota de acesso via http . Nela está a função de tratamento dos dados recebidos 
    app.post('/lorahion', function (req, res) {
        
        //quando recebeu a requisição
            let timer = new Date();
            timer = timer.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
            console.log('=====NOVO NOVO ===============================');
            console.log('Seu pacote chegou com sucesso!');
            console.log(timer);
            console.log('Contagem: ',app.vini)
            console.log('  ');

        //contador de requisições recebidas 
            app.vini ++;

        if((req.body.params.payload != undefined || req.body.params.payload != null)){
            //dado da requisição
                console.log("req.body");
                console.log(req.body);
                   
            //decriptografar a base 64
                const msg_decrypt = Buffer.from(req.body.params.payload, 'base64').toString('utf-8')
    
                let bytes = [];
                console.log('O pacote decriptografado é:');
                console.log(msg_decrypt);
        }

        return res.status(200).send("AQUI VINI! 200"); //resposta a requisição http

    });


//abertura da porta da máquina para acessar via http


app.listen(port, () => {
    console.log(`IoT_LoRaWAN, via render, rodando na porta: ${port}`);
  })