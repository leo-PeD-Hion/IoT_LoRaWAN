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
const { reset } = require('nodemon');
    app.use(bodyParser.json());

// constante global para incrementar a cada requisição
    app.vini = 0;
    app.httpRecebido = 0;
    let resultado = 0;
    let LORAresultado = 0;
    let totalLora = 0;
//rota para recetar as variáveis
            app.get('/reset', function (req, res) {
                                app.vini = 0;
                                app.httpRecebido = 0;
                                resultado = 0;
                                LORAresultado = 0;
                                totalLora = 0;
                                console.log("resetar as variáveis internas");
                                return res.status(200).send("Reiniciado as variáveis");

                                }); 

// rota de acesso via http . Nela está a função de tratamento dos dados recebidos 
    app.post('/lorahion', function (req, res) {
        
        //quando recebeu a requisição
            let timer = new Date();
            timer = timer.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
            app.httpRecebido ++;    
        

        if((req.body.params.payload != undefined || req.body.params.payload != null)){
            
            //dado da requisição
            //contador de requisições recebidas 
                app.vini ++;
            //printas valores 
            console.log('=====NOVO NOVO ===============================');
            
            console.log("CONTAGEM DO LORA ");
            console.log("req.body.params.counter_up");
            console.log(req.body.params.counter_up);
            console.log('  ');
            console.log('Seu pacote chegou com sucesso!');
            console.log(timer);
            console.log('  ');
            console.log('Contagem que efetivamente eu recebi: ',app.vini);
            console.log('  ');
            console.log('Contagem http request: ',app.httpRecebido);
            console.log('  ');
            resultado = app.httpRecebido - app.vini;
            console.log('Diferença entre request recebido vazio para recebido com payload: ',resultado);
            console.log('  ');
            console.log('  ');
            LORAresultado = Math.floor(100*((req.body.params.counter_up-app.httpRecebido)/(req.body.params.counter_up)));
            resultado = Math.floor(100*( app.httpRecebido - app.vini)/app.httpRecebido);
            totalLora = Math.floor(100*(1-((req.body.params.counter_up-app.vini)/(req.body.params.counter_up))));
            console.log('Porcentagem de mensagens vazias: ',resultado);
            console.log('Porcentagem de mensagens perdidas durante a transmissão: ',LORAresultado);
            console.log('Porcentagem de mensagens efetivamente lida: ',LORAresultado);

    
                   
            //decriptografar a base 64
                const msg_decrypt = Buffer.from(req.body.params.payload, 'base64').toString('utf-8')
    
                let bytes = [];
                console.log('O pacote decriptografado é:');
                console.log(msg_decrypt);
                console.log('  ');
        }

        return res.status(200).send("AQUI VINI! 200"); //resposta a requisição http

    });


//abertura da porta da máquina para acessar via http


app.listen(port, () => {
    console.log(`IoT_LoRaWAN, via render, rodando na porta: ${port}`);
  })