# IoT_LoRaWAN
RECEBER DADOS DE IOT VIA TRANSMISSÃO LORA 



## v0.1_payload_incremento
* inicialização do sistema lendo o payload recebido e decriptografando da base64 
* faz incremento a cada post 


## v0.2 reset+analize requisicoes
* requisição de reset requisição  HTTP `GET`  via `/reset`
* agora em `/lorahion` cada requisição HTTP é contada e, também, as requisições bem sucedidas. Dessa forma é apresentado a contagem de cada uma e a porcetagem de dado efetivamente perdido. 
* TAMBÉM estou lendo a contagem que o lora passa no body `req.body.params.counter_up`

## v0.3 analise precisa  da eficiencia
* analiso a eficiencia da transmissão