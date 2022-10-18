// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// <div class="cella">
// {/* <span>1</span>
// </div> */}
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
const btn = document.getElementById("btn")
const field= document.getElementById("game")
const numeriCasuali=[]
const numBomb=16
function gioca(){
    const seleziona= document.getElementById("dif")
    const level= seleziona.value;
    let numcell;
    let score=0
console.log("inizio gioco....")
if(level==1){
    numcell=100
    console.log(level)
}else if(level==2){
    numcell=81
    console.log(level)
}else if(level==3){
    numcell=49
    console.log(level)
}
    function cell(num){
        const cella= document.createElement("div")
        const celr=Math.sqrt(numcell)
        cella.className="cella"
        cella.innerHTML=`<span>${num}</span>`
        cella.style.width=`calc(100% / ${celr})`;
        cella.style.height=`calc(100% / ${celr})`;
        cella.addEventListener("click",colore)
        return cella
    }
    function colore(){
        this.removeEventListener("click",colore)
        if(numeriCasuali.includes((parseInt(this.innerText)))){
            this.style.backgroundColor="red"
           gameOver();
        }else{
            this.className="azzurro cella"
            score++
            console.log(score)
            if(score==max_volte){
                gameOver()
            }
        }
      
    }
    const max_volte=numcell-numBomb;
    function drawGrid(){
        const griglia = document.createElement("div")
        griglia.className="griglia"
        for(let i=1;i<=numcell;i++){
            console.log(i)
           const cella= cell(i);
            griglia.appendChild(cella);
        }
        field.appendChild(griglia);
    }
    drawGrid();
    function genera(){
        while(numeriCasuali.length<numBomb){
         let random = Math.floor(Math.random() * numcell) + 1;
        if(!numeriCasuali.includes(random)){
            numeriCasuali.push(random)
        }
        }
    }
    genera();
    console.log(numeriCasuali)
    function gameOver(){
        const squares= document.getElementsByClassName("cella")
        console.log(squares)
        for(let i=0; i <squares.length;i++){
        squares[i].removeEventListener("click",colore)
        let numm=i+1
        if(numeriCasuali.includes(numm)){
            squares[i].classList.add("rosso")
        }
        }
        console.log("gameOver")
        if(score===max_volte){
            console.log(score)
            document.getElementById("score").innerHTML="il tuo punteggio è"+ score
        }else{
            console.log(score)
            document.getElementById("score").innerHTML="il tuo punteggio è"+ score
        }
    }
}
btn.addEventListener("click", gioca)