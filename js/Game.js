class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }
  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;
    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
    cars = [car1, car2];
  }
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }
  play() {
    this.handleElements();
    Player.getPlayersInfo();
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        //identificar o jogador de acordo com o indice ativo usando um circulo de cor vermelha ---- C38
        if (index === player.index) {
          stroke(10); //contorno tamanho 10 ---- C38
          fill("red"); //preenche cor vermelha ---- C38
          ellipse(x, y, 60, 60); //cria uma forma circular de tamanho 60 por 60 ---- C38
          //alterar a posição da câmera na direção x seguindo o jogador ativo do indice ---- C38
          camera.position.x = cars[index - 1].position.x;
          //alterar a posição da câmera na direção y seguindo o jogador ativo do indice ---- C38
          camera.position.y = cars[index - 1].position.y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
