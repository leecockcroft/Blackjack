    
const bj=(()=>{
  const suits = ['hearts','clubs','spades','diams'];
  const numbers =['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  let deck=[];
  let player={
      score:null,
      card:[],
      cash:100
    };
    let dealer={
      score:null,
      card:[]
    };

    let reset=()=>{

 let deck=[];
  let player={
      score:null,
      card:[]
    };
    let dealer={
      score:null,
      card:[]
    };


    }

  let deckOfCards=()=>{
    
    //create deck of cards
    for(var i=0;i<suits.length;i++){
      let bgcolor=null
       if(suits[i].startsWith('h')||suits[i].startsWith('d') ){
        bgcolor='red'
      }
      else{
        bgcolor='black'
      }
      for(var j=0;j<numbers.length;j++){
        var weight=parseInt(numbers[j])
        var card={
          number:numbers[j],
          suit:suits[i],
          weight:weight,
          bgcolor:bgcolor
           }



        if(numbers[j] === 'J' ||numbers[j] === 'Q' || numbers[j] === 'K'){card.weight=10;}
        if(numbers[j] === 'A'){card.weight=11} 
              

         deck.push(card);
         }
    } 
      return deck
  }

  let shuffle=()=>{
        // for 1000 turns
        // switch the values of two random cards
        for (let i = 0; i < 1000; i++)
        {
            let location1 = Math.floor((Math.random() * deck.length));
            let location2 = Math.floor((Math.random() * deck.length));
            let tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
     
    }
        

        let dealCards=(turn,whosego)=>{
          let x=[];
          let showCards=document.getElementById(turn);
          let hit=document.getElementById('hit');
          let stand=document.getElementById('stand');
          hit.style.display='inline-block'
          stand.style.display='inline-block'
          
          for(var i=0;i<2;i++){
            let card1=deck.pop();
            whosego.card.push(card1)
            x.push(card1.weight)
            whosego.score=x.reduce((a,b)=>a+b);
        }
        console.log(whosego.card[0])

        showCards.innerHTML= ` <div class="cards"> <span class="individualCard" style=color:${whosego.card[0].bgcolor} data-value=&${whosego.card[0].suit};>${whosego.card[0].number};<span class="suit" >&${whosego.card[0].suit};</span><span class="card-reverse">${whosego.card[0].number}</span>  </span> 
                  <span class="hidden individualCard" style=color:${whosego.card[1].bgcolor} data-value=&${whosego.card[1].suit};> ${whosego.card[1].number} <span class="suit"> &${whosego.card[1].suit}; <span class="card-reverse">${whosego.card[1].number}</span></span> </div>
                  <div class="totalScore"> ${turn} total is: ${whosego.score}; </div>`  
    

    
}





        let hit=()=>{
          //get html for card display add next card
          let showCards=document.querySelector('#player .cards');
          let total=document.querySelector('#player .totalScore');
          let card1=deck.pop();
          
          player.card.push(card1);
          player.score+=card1.weight
          
          if(player.score > 21)alert('bust your score is '+ player.score);
           if(player.score === 21)alert('21');
          showCards.innerHTML+= `<span class="individualCard" data-value=&${card1.suit};> ${card1.weight}<span class="suit">&${card1.suit};</span> <span class="card-reverse">${card1.weight}</span>  </span>`
          total.innerHTML= 'players total is :'+ player.score
          
          
          
        }
        
        
        let stand=()=>{
          let showCards=document.querySelector('#dealer .cards');
          let total=document.querySelector('#dealer .totalScore');
          let card1;
          
          while(dealer.score<17){
            card1=deck.pop();
            dealer.score+=card1.weight;
            showCards.innerHTML+= `<span class="individualCard" data-value=&${card1.suit};><span class="suit"> ${card1.weight}</span> &${card1.suit};<span class="card-reverse">${card1.weight}</span></span>`
            total.innerHTML= 'dealer total is :'+ dealer.score
             
          }
         
          
         if(dealer.score>21){
             total.innerHTML= 'dealer total is :'+ dealer.score + ' BUST, player wins'
            
          }
        
          if(dealer.score > player.score && dealer.score <21){
             total.innerHTML= 'dealer wins with '+ dealer.score
            
          }
          else if(dealer.score ===player.score){
            total.innerHTML= `dealer has ${dealer.score} PUSH`
            
          }
          
          else{
            total.innerHTML= `dealer is bust with ${dealer.score} player wins`
            
          }
          if(player.score ===21){
            total.innerHTML= `PLAYER HAS BLACKJACK`

          }

          if(dealer.score ===21){
            total.innerHTML= `DEALER HAS BLACKJACK`

          }
        

          
       
     
          
        }
        



let startGame=()=>{

deckOfCards()
shuffle()
dealCards('player',player)
dealCards('dealer',dealer)


}




return {

init:()=>{
startGame()


},
  hit:()=>{
    hit();
    
  },
  stand:()=>{
    
    stand()
    
  },
  reset:()=>{
reset()


  }

}


})()
    


  