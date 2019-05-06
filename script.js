    
const bj=(()=>{
  
  const suits = ['hearts','clubs','spades','diams'];
  const numbers =['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  let deck=[];
  let player={
      score:null,
      card:[],
      cash:100,
      bet:0
    };
  let dealer={
      score:null,
      card:[]
    };

  const playerCash=document.getElementById('player-cash');
        playerCash.innerHTML=`players Balance=${player.cash}`;
  
  let betBalance=()=>{
    const betAmount=document.getElementById('bet').value;
          player.bet=betAmount;
          player.cash-=player.bet
   
          playerCash.innerHTML=`players Balance= ${player.cash}`;

    }
 

 let playerWins=()=>{
   let winnings = player.bet*2;
   let totalReturns=player.cash+winnings;
   player.cash=totalReturns;
   playerCash.innerHTML=`players Balance= ${player.cash}`;

 }  

 let push=()=>{
player.cash+=parseInt(player.bet)
   playerCash.innerHTML=`players Balance= ${player.cash}`;

 }

 let blackJack=()=>{
 let winnings = player.bet*2.5;
   let totalReturns=player.cash+winnings;
   player.cash=totalReturns;
   playerCash.innerHTML=`players Balance= ${player.cash}`;

 }

 let checkBlackJack=(checkbj)=>{
if(checkbj===21){

  alert('blackjack')
}

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
                checkBlackJack(player.score)
                checkBlackJack(dealer.score)
        }
       

        showCards.innerHTML= ` <div class="cards"> <span class="individualCard" style=color:${whosego.card[0].bgcolor} data-value=&${whosego.card[0].suit};>${whosego.card[0].number};<span class="suit" >&${whosego.card[0].suit};</span><span class="card-reverse">${whosego.card[0].number}</span>  </span> 
                  <span class=" ${turn} hidden individualCard" style=color:${whosego.card[1].bgcolor} data-value=&${whosego.card[1].suit};> ${whosego.card[1].number} <span class="suit"> &${whosego.card[1].suit}; <span class="card-reverse">${whosego.card[1].number}</span></span> </div>
                  <div class="totalScore ${turn}Total"> ${turn} total is: ${whosego.score};</span> </div>`  
     

   
}

let toggle=(className)=>{
  let testing = document.querySelectorAll(`.${className}`)
  console.log(testing)
          for(var i=0;i<testing.length;i++){
           testing[i].classList.toggle("animate");
          }
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
          showCards.innerHTML+= `<span class="individualCard test" data-value=&${card1.suit};> ${card1.weight}<span class="suit">&${card1.suit};</span> <span class="card-reverse">${card1.weight}</span>  </span>`
          total.innerHTML= 'players total is :'+ player.score
          toggle('test')
          
        }
        
        
        let stand=()=>{
          let showCards=document.querySelector('#dealer .cards');
          let totals=document.querySelector('#dealer .totalScore');
          let card1;
          let show=document.querySelector('.dealer');
           let showTotal=document.querySelector('.dealerTotal');
          show.style.backgroundColor='#fff'
                showTotal.style.display='block'

          while(dealer.score<17){
 
            card1=deck.pop();
            dealer.score+=card1.weight;
            showCards.innerHTML+= `<span class="individualCard stand" data-value=&${card1.suit};><span class="suit"> ${card1.weight}</span> &${card1.suit};<span class="card-reverse">${card1.weight}</span></span>`
            totals.innerHTML= 'dealer total is :'+ dealer.score
           toggle('stand')
             
          }
         
          
         if(dealer.score>21){
             totals.innerHTML= 'dealer total is :'+ dealer.score + ' BUST, player wins';
              
              playerWins()

             


          }
        
          if(dealer.score > player.score && dealer.score <21){
             totals.innerHTML= 'dealer wins with '+ dealer.score
         
        
          }
          if(dealer.score ===player.score){
            totals.innerHTML= `dealer has ${dealer.score} PUSH`
            push()
              
          }
          
          if(player.score >21 && player.score>dealer.score){
            totals.innerHTML= `dealer is bust with ${dealer.score} player wins`
           playerWins()
        
          }




          if(player.score ===21){
            totals.innerHTML= `PLAYER HAS BLACKJACK`
              blackJack()

          }

          if(dealer.score ===21){
            totals.innerHTML= `DEALER HAS BLACKJACK`


          }
          
        }
        



let startGame=()=>{
  deckOfCards()
  betBalance()
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
    


  