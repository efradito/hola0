class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    
    gameStateRef.on("value", function(data) {
       gameState = data.val();
    });
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("Yellow");
    fill(0);
    textSize(30);
    text("Resultados del quiz",340, 50);
    text("----------------------------",330, 65);
    
    // Se obtiene la información de las respuestas
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      var display_Answers = 230;

      // Texto Azul de nota
      fill("Blue");
      textSize(20);
      text("*NOTA: ¡Los participantes que respondieron correctamente están resaltados en color verde!",20,230);

      // Recorrido de las respuestas
      for(var plr in allContestants){
        var cont = allContestants[plr];
        var correctAns = "2";
        console.log(cont.answer);
        console.log(cont.answer === correctAns);
        text("respuesta: "+correctAns,200,200);

        // Marca la condición cuando la respuesta del jugador y la respuesta correcta son iguales
        if (cont.answer === correctAns){
          // Si son iguales, rellena con verde
          fill("Green");
          textSize(20);
          
        } else {
          // Si no son iguales, rellena con rojo
          fill("Red");
          textSize(20);
          //text("respuesta"+cont.answer,200,200)
        }

        display_Answers+=30;
        textSize(20);
        text(cont.name + ": " + cont.answer, 250,display_Answers)
      }
    }
  }
}
