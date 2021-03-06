var container = document.getElementById("container");
container.style.border = "3px solid black";
container.style.backgroundColor = "lightgray";
container.style.width = "600px";
container.style.height = "550px";
container.style.margin = "0 auto";

var list = document.createElement("ul");
list.style.listStyle = "none";
list.style.textAlign = "center";

var lineCounter = 0;

for (let i = 0; i < 5; i++) {
    var word = document.createElement("li");
    word.id = "WORD"+i;
    word.style.padding = "10px";
    word.style.margin = "20px";
    var letters = document.createElement("ul");
    letters.style.listStyle = "none";
    letters.style.margin = "10px 0";
    for (let j = 0; j < 5; j++) {
        var letter = document.createElement("li");
        letter.innerText = "_";
        letter.id = "LETTER"+i+j;
        letter.style.padding = "10px";
        letter.style.margin = "20px";
        letter.style.color = "white";
        letter.style.display = "inline";
        letter.style.border = "solid 2px black";
        letter.style.backgroundColor = "blue";
        letters.appendChild(letter);
    }
    word.appendChild(letters);
    list.appendChild(word);
}

container.appendChild(list);

var controls = document.createElement("div");
controls.id = "controls";
controls.style.textAlign = "center";
controls.style.margin = "60px"
var label = document.createElement("label");
label.innerHTML = "Vul hier een woord in.";
label.htmlFor = "wordInput";
controls.appendChild(label);
controls.innerHTML += "<br>";
var input  = document.createElement("input");
input.id = "guess"
input.type = "text";
input.name = "wordInput";
controls.appendChild(input);
controls.innerHTML += "<br>";
var button = document.createElement("button");
button.id = "button";
button.innerHTML = "Submit";
button.onclick = checkWord;
controls.appendChild(button);
container.appendChild(controls);

var rand = Math.floor(Math.random() * 478);
var winWord = words[rand].toUpperCase().split('');
for (let i = 0; i < 5; i++) {
    document.getElementById("LETTER"+i+"0").innerHTML = winWord[0];
}
console.log(winWord);

function checkWord(){
    var word = document.getElementById("guess").value.toUpperCase().split('');
    console.log(word);
    var wincheck = 0;
    if(word.length == 5){
        for (let i = 0; i < 5; i++) {
            var letterField = document.getElementById("LETTER"+lineCounter+i);
            letterField.innerHTML = word[i];
            letterField.style.borderRadius = "0px";
            if(word[i] == winWord[i]){
                letterField.style.backgroundColor = "green";
                winWord[i] = "";
                wincheck++;
            }
        }
        for (let i = 0; i < 5; i++) {
            var letterField = document.getElementById("LETTER"+lineCounter+i);
            for (let j = 0; j < 5; j++) {
                if(word[i] == winWord[j] && letterField.style.backgroundColor != "green"){
                    letterField.style.backgroundColor = "#f2c200";
                    letterField.style.borderRadius = "20px";
                    winWord[j] = "";
                }
            }          
        }
        lineCounter++;     
        if(wincheck == 5){
            setTimeout(function(){
                alert("U heeft het woord juist geraden.");
            }, 0);
            location.reload();
        }
        else if(lineCounter == 5){
            setTimeout(function(){
                alert("GAME OVER. \nHET WOORD WAS: "+words[rand].toUpperCase());
            }, 0);   
            location.reload();      
        }
    }
    else{
        for (let i = 0; i < 5; i++) {
            var letterField = document.getElementById("LETTER"+lineCounter+i);
            if(word[i] != undefined){
                letterField.innerHTML = word[i];
            }
        }
        lineCounter++;
        setTimeout(function(){
            alert("Uw woord heeft geen geldig aantal letters.");
        }, 0); 
        if(lineCounter == 5){
            setTimeout(function(){
                alert("GAME OVER. \nHET WOORD WAS: "+words[rand].toUpperCase());
            }, 0);   
            location.reload();      
        }      
    }
    winWord = words[rand].toUpperCase().split('');
}