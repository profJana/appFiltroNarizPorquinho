// Posenet é uma rede neural pré treinada usada para identificar pontos-chave na imagem.
// Na atividade o posenet está treinado para verificar 17 pontos chave do corpo humano:
// nariz, olhos, orelhas, ombros, cotovelos, pulsos, quadris, joelhos, tornozelos
// o que faremos: utilizar ponto chave para trocar por alguma imagem e criar filtros
console.log("teste");
noseX = 0;
noseY = 0;

function preload() {
    narizPorco = loadImage('https://i.postimg.cc/mDqvrVxn/Design-sem-nome-62.png');
}

function setup() {
  canvas = createCanvas(300, 300); //criando o canvas e inserindo o tamanho
  video = createCapture(VIDEO); //acessa a webcam
  video.size(300,300);
  video.hide(); //precisamos ocultar pois o p5.js cria um outro componente de vídeo, e ao ocultar ele aparecerá corretamente no canva
  poseNet = ml5.poseNet(video,modelLoaded);  //inicializando a função do ml5 que se chama poseNet
  poseNet.on('pose',gotPoses);
  //inicaliza o poseNet, nos parametros colocamos:
  // pose para obter coordenadas x e y das partes do corpo da biblioteca
  // gotPoses obtem todas as poses
}

function modelLoaded(){
  console.log("PoseNet foi inicializado");
}

function gotPoses(results){ // o results contém as coordenadas x e y de todas as 17 partes do corpo
  if(results.length > 0){ //se o resultado não for vazio, então:
    console.log(results); //irá mostrar todas as 17 partes do corpo que tem coordenadas
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("nariz x = " + results[0].pose.nose.x); //pegando as coordenadas x do nariz
    console.log("nariz y = " + results[0].pose.nose.y); //pegando as coordenadas y do nariz
  }
}

function draw() {
  image(video,0,0,300,300); //"desenha na tela" o nosso video da webcam ao vivo
  //fill(255,0,0);
  //stroke(255,0,0);
  //circle(noseX, noseY,25);
  image(narizPorco,noseX -15,noseY - 15,30,30);
}

function takeSnapshot(){    
  save('meuFiltro.png');
}

