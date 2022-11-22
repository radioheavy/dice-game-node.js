let start_game = false; // game is by default not started. (variable)
let player_array = []; // array of player json objects. (variable)
let rounds = 0; // amount of rounds. (variable) 

// adding event listeners to buttons. (html)
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("submit").addEventListener("click", addPlayer);

// function adds a player to the player_container. (DONE)
function addPlayer(){
    // can't add another player once game has started.
    if (start_game == true){
        return;
    }
    
    // player object
    let player = {
        "name" : document.getElementById("new_player").value,
        "score" : 0,
        "guessed" : false,
        "guess" : undefined,
        "playing" : true
    }

    console.log(player); // testing purposes.

    player_array.push(player); // add player json to array.

    const new_player = document.createElement("p"); // create a p-tag.
    new_player.setAttribute("class", "remove_margin"); // add a class with customized margin.
    new_player.innerHTML = player.name; // set p-tag text to name of the player.
    document.getElementById("player_container").appendChild(new_player); // add p tag as a child to div tag.
    document.getElementById("new_player").value = ""; // reset the value of the input field.
}

// function hides buttons once game starts.
function startGame(){
    start_game = true;

    // display: none
    document.getElementById("start").style.display = "none";
    document.getElementById("new_player").style.display = "none";
    document.getElementById("submit").style.display = "none";

    createPlayerList(); // create player list.
}

// creates a list of players with using html code. creating tags with javascript.
function createPlayerList(){
    document.getElementById("player_container").style.display = "none"; // display : none

    // for each player created, which are inside the playerArray.
    for (let i = 0; i < player_array.length; i++){
        console.log(i); // testing purposes
        console.log(player_array[i]); // testing purposes

        // if player's playing property is set to true, we can generate the player's inputs.
        if (player_array[i].playing == true){
            let h3 = document.createElement("h3"); // create h3 tag.
            let div = document.createElement("div"); // create div tag.
            let textInput = document.createElement("input"); // create input tag type = text.
            let submitInput = document.createElement("input"); // create input tag type = submit.

            h3.innerHTML = player_array[i].name; // set h3 tag to player's name.
            textInput.placeholder = player_array[i].name + "'s guess 1-6"; // placeholder of text input field.
            submitInput.type = "submit"; // set type of input field submit.
            submitInput.value = "Guess"; // set text of input field submit.

            h3.setAttribute("id", player_array[i].name + "h3"); // set id of h3 to player's name + h3
            div.setAttribute("id", player_array[i].name + "div"); // set id of div to player's name + div
            textInput.setAttribute("id", player_array[i].name + "textInput"); // set id of input text field to player's name + textInput
            submitInput.setAttribute("id", player_array[i].name + "submitInput"); // set id of input submit field to player's name + submitInput

            // set class of textInput and submitInput.
            textInput.setAttribute("class", "text_input");
            submitInput.setAttribute("class", "submit_input");

            // append tags as children to container tag.
            div.appendChild(h3);
            div.appendChild(textInput);
            div.appendChild(submitInput);

            // append div tag to player_game_container div tag.
            document.getElementById("player_game_container").appendChild(div);

            // adding eventlistener to each player's submit button.
            submitInput.addEventListener("click", function(){
                playerGuess(textInput.value, player_array[i].name);
            });
        }
    }
}

// When player clicks their submit button.
function playerGuess(guess, player) {
    // avoid the same player clicking twice for loop playerHasGuessed. 

    // if player has not guessed already. set guessed to true, set guess to be the input.
    for (let i = 0; i < player_array.length; i++){
        if (player_array[i].name == player) {
            player_array[i].guessed = true;
            player_array[i].guess = guess;

            // disable the players inputs (easy).
            document.getElementById(player + "textInput").style.display = "none";
            document.getElementById(player + "submitInput").style.display = "none";

            // disable the players inputs. (for loops)
            // 1. Find the parent tag.
            // 2. loop through children (div tags)
            // 3. loop through the children of the div tag matching the player's name.
            // 4. find children of specific ID. input x 2. and set display to none.
            let con = document.getElementById("player_game_container");

            for (let j = 0; j < con.children.length; j++){
                if (con.children[j].id == player + "div"){
                    console.log("found the correct child div tag of player_game_container"); // testing purposes.

                    for (let c = 0; c < con.children[j].children.length; c++){
                        let elm = con.children[j].children[c]; // h3 and 2 input tags.

                        if (elm.id == player + "textInput"){
                            elm.style.display = "none";
                        }

                        else if (elm.id == player + "submitInput"){
                            elm.style.display = "none";
                        }
                    }
                }
            }
        }
    }

    // update player's name with (player's name + guess).
    document.getElementById(player + "h3").innerHTML = player + "(" + guess + ")";

    // 1. ready by default. roll dice if all players are ready.
    // 2. if any player has not guessed already, ready is turned false.
    let ready = true; 
    for (let i = 0; i < player_array.length; i++){
        // all players playing are NOT ready yet.
        if (player_array[i].guessed == false && player_array[i].playing == true){
            ready = false;
        }
    }

    // reactivate once dices are rolled.
    // if ready is true, all players have guessed. roll dice if all players are ready.
    if (ready == true){
        console.log("All players are ready."); // for testing purposes.

        // all ready so let's roll dices.

        // reactivate all player's input fields. the text input and submit button.
        // 1. loop through players.
        for (let i = 0; i < player_array.length; i++){
            // document.getElementById(player_array[i].name + "textInput").style.display = "inline-block";
            // document.getElementById(player_array[i].name + "submitInput").style.display = "inline-block";

            // 2. loop through children (div tags) of playerGameContainer.
            // 3. loop through the children of the div tag matching the player's name.
            // 4. find children of specific ID. input x 2. and set display to inline-block.
            let con = document.getElementById("player_game_container");
            for (let j = 0; j < con.children.length; j++) {
                if (con.children[j].id == player_array[i].name + "div") {
                    for (let c = 0; c < con.children[j].children.length; c++) {
                        let elm = con.children[j].children[c];
                        if (elm.id == player_array[i].name + "textInput") {
                            elm.style.display = "inline-block";
                        }
                        if (elm.id == player_array[i].name + "submitInput") {
                            elm.style.display = "inline-block";
                        }
                    }
                }
            }
        }

        rollDices(); // all ready so let's roll dices.
    }
}

// roll dice and figure out if players guess was correct.
function rollDices(){
    // 1. for looping each player in the playerArray.
    for (let i = 0; i < player_array.length; i++){
        if (player_array[i].playing == true){
            let dice_number = Math.floor(Math.random() * 6) + 1; // random number 1-6.
            console.log(dice_number); // testing purposes.

            // create p-tag and set text. players name, guess, dicenumber generated.
            let p = document.createElement("p");
            p.innerHTML = player_array[i].name + " guessed " + player_array[i].guess + " and the dice rolled " + dice_number;

            // set color. add class (green = correct guess).
            if (dice_number == player_array[i].guess){
                player_array[i].score++;
                p.style.color = "green";
            }

            // set color. add class (red = incorrect guess).
            else if (dice_number != player_array[i].guess){
                p.style.color = "red";
            }

            // add p-tag as a child to playerLog.
            document.getElementById("player_log").appendChild(p);

            // reset each player name and input field.
            document.getElementById(player_array[i].name + "h3").innerHTML = player_array[i].name;
            document.getElementById(player_array[i].name + "textInput").value = "";
        }
    }

    // increase rounds by 1.
    rounds++;

    // reset players guess and guessed status
    for (let i = 0; i < player_array.length; i++){
        if (player_array[i].playing == true){
            player_array[i].guess = undefined;
            player_array[i].guessed = false;
        }
    }

    // after round 5, we will eliminate players and crown a winner. or continue playing.
    if (rounds == 2){
        eliminatePlayers(); // function eliminates players.
        rounds = 0; // reset rounds.
    }
}

// 5 rounds have passed, find out which players has lowest score.
function eliminatePlayers(){
    let playing_array = []; // this array will be filled with players able to play.

    // loop through players, only add the players that are able to play.
    for (let i = 0; i < player_array.length; i++){
        if (player_array[i].playing == true){
            playing_array.push(player_array[i]);
        }
    }

    // sort by lowest score.
    const sortedArray = playing_array?.sort((a, b) => (a.score > b.score ? 1 : -1));

    // testing purposes.
    console.log(sortedArray);

    let lowest_score = undefined; // holds the player with lowest score. (so we can compare)
    let eliminate = []; // array with players that is to be eliminated. (array of json)

    // 1. loop through sortedArray array, all players. 
    // 2. store player with lowest score, the first player in the array.
    // 3. once lowest_score is populated, if next player matches score, add those to eliminate array.
    for (let i = 0; i < sortedArray.length; i++){
        if (lowest_score == undefined){
            lowest_score = sortedArray[i];
            eliminate.push(sortedArray[i]);
        }

        else if (lowest_score != undefined){
            if (lowest_score.score == sortedArray[i].score){
                eliminate.push(sortedArray[i]);
            }
        }
    }

    console.log("Eliminated players:"); // for testing purposes
    console.log(eliminate); // for testing purposes

    // function handles gamestatus based of outcome of the game.
    gameStatus(eliminate, playing_array.length);
}

// find out what the gamestatus is. win, lose or continue playing.
function gameStatus(eliminate, length){
    // 3 outcomes. Everyone is eliminated (same points). we eliminate some players, or we have a winner!

    // 1. we begin with checking if everyone has the same score and lost. We have no winner.
    if (eliminate.length == length){
        console.log("Everyone lost! We have no winner."); // testing purposes.

        // display that everyone lost, no winner
        document.getElementById("winner_text").innerHTML = "No winner, everyone lost.";
        document.getElementById("reset").style.display = "inline-block";

        // de-activates player's option to be part of the next game.
        for (let i = 0; i < player_array.length; i++){
            player_array[i].playing = false;
        }

        // remove player's containers.
        removePlayers(true);
    }

    // 4. loop through playerArray again, and find the only player with playing property set to true.
    // display winning message.
    else if (length - eliminate.length == 1){
        console.log("we have a winner?"); // for testing purposes. prints message to the console.

        // 1. loop through all players playing the game.
        // 2. loop through all players that are being eliminated.
        // 3. find the player that hasn't been eliminated.
        for (let i = 0; i < player_array.length; i++){
            for (let j = 0; j < eliminate.length; j++){
                if (player_array[i].name == eliminate[j].name){
                    player_array[i].playing = false;
                }
            }
        }

        // 4. loop through playerArray again, and find the only player with playing property set to true.
        // display winning message.
        for (let i = 0; i < player_array.length; i++){
            if (player_array[i].playing == true){
                let winner_text = "And the winner is.. " + player_array[i].name + " with a score of " + player_array[i].score;
                console.log(winner_text); // testing
                document.getElementById("winner_text").innerHTML = winner_text;
                document.getElementById("reset").style.display = "inline-block";
            }
        }

        // display winner message and remove everyone
        removePlayers(false);
    }

    // 1. we have players with different score
    // 2. loop through all players playing the game.
    // 3. loop through all players that are being eliminated.
    // 4. find players that are eliminated and set playing property to false.
    else if (eliminate.length != length){
        for (let i = 0; i < player_array.length; i++){
            for (let j = 0; j < eliminate.length; j++){
                if (player_array[i].name == eliminate[j].name){
                    player_array[i].playing = false;
                }
            }
        }

        removePlayers(true); // removes player's before next round.
        // continue playing message, move log over to another div, display who got eliminated.
    }
}

// only called if we can continue playing the game. Basically we have no winner yet.
function removePlayers(bool){
    let con = document.getElementById("player_game_container"); // player_game_container div container.

    // 1. loop through all players. 
    // 2. then loop through all children of div container with id player_game_container.
    // 3. if div id matches player's name + div, then remove the div and all its content.
    for (let i = 0; i < player_array.length; i++){
        for (let j = 0; j < con.children.length; j++){
            if (player_array[i].name + "div" == con.children[j].id){
                con.children[j].remove();
            }
        }
    }

    // start game again or if we have no winner, this closes the game.
    if (bool == true){
        createPlayerList();
    }

    // leave the winner's name but remove input fields.
    // 1. loop through player and find the correct player, the winner.
    else if (bool == false){
        for (let i = 0; i < player_array.length; i++){
            if (player_array[i].playing == true){
                let h3 = document.createElement("h3"); // create h3 tag.
                let div = document.createElement("div"); // create div tag.

                h3.innerHTML = player_array[i].name; // set h3 tag to player's name.

                h3.setAttribute("id", player_array[i].name + "h3"); // set id of h3 to player's name + h3
                div.setAttribute("id", player_array[i].name + "div"); // set id of div to player's name + div

                // append h3 tag as children to container tag.
                div.appendChild(h3);

                // append div tag to player_game_container div tag.
                con.appendChild(div);
            }
        }
    }
}