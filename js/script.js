let canAccess = true
var $window = $(window);
var counter = 0
let save = 0
let isRunning = false



class CoffeeMachine {
    constructor() {
        this.name = ""
        this.coffeeList = { list: [] }
        this.shoppingCard = { list: [] }
        this.save = 0
        this.tokenList = { list: [] }
        this.money = 0
        this.shoppingCardAmount = 0
    }

    addCoffe(coffee) {
        this.coffeeList.list.push(coffee)
    }
    addToken(token) {
        this.tokenList.list.push(token)
    }
    addToCart(item) {
        this.shoppingCard.list.push(item)
    }
    createToken() {
        this.token.coffeeList.list.push(coffeeMachine.shoppingCard.list)
    }

    setNavIcons() {
        let saveClass = "navIcon"
        let closed = "fa-solid fa-lock-open navIcon"
        const navIcons = [
            "fa-solid fa-house",
            "fa-solid fa-sd-card",
            "fa-solid fa-money-bills"
        ]
        const navId = [
            "user",
            "coins",
            "moneyBill"
        ]
        document.getElementById('nav').innerHTML = `
            <i class="${navIcons[0]} ${saveClass}" id="${navId[0]}" onclick="showHome()"></i>
            <i class="${navIcons[1]} ${saveClass}" id="${navId[1]}" onclick="showTokens()"></i>
            <i class="${navIcons[2]} ${saveClass}" id="${navId[2]}" onclick="getMoneyScreen()"></i>
        `
    }
    addMoney(amount) {
        let newAmount = 0
        if (!isNaN(parseFloat(amount))) {
            newAmount = parseFloat(amount)
            if (this.money <= 50) {
                this.money += newAmount
                document.getElementById('moneyAmount').placeholder = "added"
                document.getElementById('moneyAmount').value = ""
            }

        } else {
            if (amount > 0) {
                if (this.money <= 50) {
                    this.money += parseFloat(amount)
                    document.getElementById('moneyAmount').placeholder = "added"
                    document.getElementById('moneyAmount').value = ""
                }
            }
        }

    }

    updateMoney(diff){
        this.money -= diff
    }

    calcShoppingCartAmount() {
        if (this.shoppingCard.list.length > 0) {
            let sum = 0
            for (let i = 0; i < this.shoppingCard.list.length; i++) {
                sum += this.shoppingCard.list[i].price
            }
            this.shoppingCardAmount = sum.toFixed(2)
            return this.shoppingCardAmount
        }
        return 0
    }

    calcDiff() {
        if (this.shoppingCard.list.length > 0 ) {
            if((this.calcShoppingCartAmount() - this.money) > 0 ){
                 document.getElementById('moneyAmount').placeholder = `${(this.calcShoppingCartAmount() - this.money).toFixed(2)}€ needed`
            }else{
                document.getElementById('moneyAmount').placeholder = `0€ needed`
            }
           
        }
    }

    updateAmount() {
        document.getElementById('ktoStd').innerHTML = `${this.money.toFixed(2)}€`

    }

    initCoffees() {
        const coffeeLatte = new Coffee();
        const coffeeBlack = new Coffee();
        const coffeCappunchino = new Coffee();
        const coffeCaramel = new Coffee();
        const coffeeIced = new Coffee();
        const redBull = new Coffee();
        const whiteCoffee = new Coffee();
        const webmaster = new Coffee();

        coffeeLatte.setValues("Latte Macchiato", 1.60, 30.0, 3, "../pics/coffeeLatte.png", 18, 75)
        coffeeBlack.setValues("Black Coffee", 1.20, 20.0, 5, "../pics/coffeeBlack.png", 4, 95)
        coffeCappunchino.setValues("Cappuccino", 1.60, 35, 2, "../pics/coffeeCappuchino.png", 12, 64)

        coffeCaramel.setValues("Coffee Caramel", 2.10, 45, 1, "../pics/coffeeCaramel.png", 20, 50)
        whiteCoffee.setValues("White Coffee", 1.90, 30, 2, "../pics/whiteCoffee.png", 18, 65)
        coffeeIced.setValues("Iced Coffee", 1.60, 25, 2, "../pics/coffeeIced.png", 15, 60)
        redBull.setValues("Red Bull", 2.70, 5, 3, "../pics/energyDrink.png", 27, 85)
        webmaster.setValues("Webmaster", 4.20, 10, 5, "../pics/can.png", 100, 200)


        coffeeMachine.addCoffe(coffeeLatte)
        coffeeMachine.addCoffe(coffeeBlack)
        coffeeMachine.addCoffe(coffeCappunchino)
        coffeeMachine.addCoffe(webmaster)
        coffeeMachine.addCoffe(coffeCaramel)
        coffeeMachine.addCoffe(whiteCoffee)
        coffeeMachine.addCoffe(redBull)
    }

    generateCoffees() {
        var html = ""

        for (var i = 0; i < this.coffeeList.list.length; i++) {
            if (this.coffeeList.list[i].imgsrc == "undefined") {
                console.log('err');
            } else {
                html += `
        <div class ="coffeeBox">
            
            <img onclick="showStats(${i})" class="coffeePic" src="${this.coffeeList.list[i].imgsrc}" alt="not found" >
            <div class ="boxHead">${this.coffeeList.list[i].name}</div>
            
            <div class="coffeeGrid">
                <div class="coffeeButton" onclick="addToShoppingCart(${i})">Add</div>
                <div class ="priceBox">
                <div class="priceTitle">Price: </div>
                <div class="coffeePrice">${this.coffeeList.list[i].price}0 €</div>
                </div>
            </div>
        </div>
        `
            }

        }
        document.querySelector('#coffeeGrid').innerHTML += html

    }

    updateShoppingCart() {
        if (this.shoppingCard.list != null || this.shoppingCard.list == []) {
            console.log(this.coffeeList.list);
            let html = ``
            for (let i = 0; i < this.shoppingCard.list.length; i++) {
                html += `
            <div class="shoppingCartItem">
                    <img class="shoppingCartImg" src="${this.shoppingCard.list[i].imgsrc}" alt="not here yet">
                    <div>
                        <div class="itemName">${this.shoppingCard.list[i].name}</div>
                        <div class="beans"></div>
                    </div>
                    <div class="itemPrice">${this.shoppingCard.list[i].price}0€</div>
                    <i class="fa-solid fa-xmark xIcon" onclick="removeItem(${i})"></i>
                </div>       
            `
            }


            html += `
         <div class="saveItem">
                     <img class="shoppingCartImg" src="../pics/save.png" alt="not here yet">
                    <div>
                        <div class="itemName">Save your order here</div>
                    </div>
                    <i class="fa-solid fa-download saveIcon" onclick="createToken()"></i>
                </div>   
        `

            document.querySelector('#items').innerHTML = html


            for (let i = 0; i < this.shoppingCard.list.length; i++) {
                for (let j = 0; j < 5; j++) {
                    if (j < this.shoppingCard.list[i].strength) {
                        document.getElementsByClassName('beans')[i].innerHTML += `<img class="bean" src="../pics/bean.png"></img>`
                    }
                    else {
                        document.getElementsByClassName('beans')[i].innerHTML += `<img class="bean gray" src="../pics/bean.png"></img>`
                    }
                }
            }

            this.updateSum()
        } else {
            document.querySelector('#items').innerHTML = ``
        }
    }

    updateSum() {
        var sum = 0
        for (let i = 0; i < this.shoppingCard.list.length; i++) {
            sum += this.shoppingCard.list[i].price
        }
        document.getElementById('sum').innerHTML = parseFloat(sum).toFixed(2) + "€"
    }

    calcSum() {
        var sum = 0

        for (let i = 0; i < this.shoppingCard.list.length; i++) {
            sum += this.shoppingCard.list[i].price
        }
        document.getElementById('sum').innerHTML = parseFloat(sum).toFixed(2) + "€"

        return sum;
    }

}


class Token {
    constructor() {
        this.name = ""
        this.coffee = ""
        this.coffeeList = { list: [] }
        this.price = 0
    }
    addCoffeeList(list) {
        this.coffeeList.list = (list)
        console.log(this.coffeeList.list);
    }

    calcTokenPrice() {
        for (let i = 0; i < this.coffeeList.list.length; i++) {
            this.price += this.coffeeList.list[i].price
        }
        return this.price
    }
}

class Coffee {
    constructor() {
        this.name = ""
        this.price = 0
        this.time = 0.0
        this.imgsrc = ""
        this.strength = 0
        this.sugar = 0
        this.caffeine = 0
        this.values = []
        this.titelArray = ["caffeeine", "sugar", "time", "strength"]
        this.colors = ["#e34444", "#7944e3", "#44e35c", "#e3d044"]
    }
    setValues(name, price, time, strength, imgsrc, sugar, caffeine) {
        this.name = name
        this.price = price
        this.time = time
        this.strength = strength
        this.imgsrc = imgsrc
        this.sugar = sugar
        this.caffeine = caffeine
    }
    setCoffeeValues() {
        this.values = [this.caffeine + "mg", this.sugar + "g", this.time + "s", this.strength + "/5"]
    }

}

const coffeeMachine = new CoffeeMachine();

coffeeMachine.setNavIcons()

coffeeMachine.initCoffees()

coffeeMachine.generateCoffees()






function run() {
    var fName = arguments[0],
        aArgs = Array.prototype.slice.call(arguments, 1);
    try {
        fName.apply(window, aArgs);
    } catch (err) {

    }
};

/* chart
================================================== */
function _chart() {
    $('.b-skills').appear(function () {
        setTimeout(function () {
            $('.chart').easyPieChart({
                easing: 'easeOutElastic',
                delay: 3000,
                barColor: '#8800ff',
                trackColor: '#fff',
                scaleColor: true,
                lineWidth: 30,
                trackWidth: 25,
                size: 250,
                lineCap: 'round',
                onStep: function (from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }
            });
        }, 150);
    });
};



function showStats(index) {

    document.getElementById('coffeeStats').style.display = "block"
    document.getElementById('coffeeGrid').style.display = "none"
    document.getElementById('coffeePicStats').style.display = "block"
    document.getElementById('coffeePicStats2').innerHTML = `<img id="picCoffee" src="${coffeeMachine.coffeeList.list[index].imgsrc}"></img>`

    document.getElementById('coffeeName').innerHTML = `${coffeeMachine.coffeeList.list[index].name}`

    let html = ``
    const names = [
        "price in %",
        "strength in %",
        "caffeine in %",
        "time in s"
    ]
    const values =
        [parseFloat((coffeeMachine.coffeeList.list[index].price / 4.20)).toFixed(2) * 100,
        (coffeeMachine.coffeeList.list[index].strength / 5 * 100),
        coffeeMachine.coffeeList.list[index].caffeine / 200 * 100,
        coffeeMachine.coffeeList.list[index].time
        ]

    const colors = [
        "#04A777",
        "#D1345B",
        "#F5BB00",
        "#C81D25"
    ]

    for (let i = 0; i < values.length; i++) {
        document.getElementById('coffeeCharts').innerHTML += `
            <div class="b-skills">
            <div class="chart" data-percent="${values[i]}" data-bar-color="${colors[i]}"> 
            <span class="percent" data-after="%">65%</span>
            </div>
            <div class="chartNames">${names[i]}</div>

             
            `
    }


    console.log("generated");

    run(_chart)
}




let c = 0
function addToShoppingCart(index) {
   
    counter++
    if (c < 7) {
        coffeeMachine.shoppingCard.list.push(coffeeMachine.coffeeList.list[index])
        coffeeMachine.updateShoppingCart()
        c++
        console.log(c);
    } else {
        console.log("too much");
    } 
    coffeeMachine.calcDiff()
}
showHome()
function showHome() {
    if (isRunning == false) {
        document.getElementById('moneyGrid').style.display = "none"
        document.getElementById('buyGrid').style.display = "none"
        document.querySelector('#coffeeBar').style.display = "none"
        document.querySelector('#coffeeStats').style.display = "none"
        document.querySelector('#coffeeGrid').style.display = "grid"
        document.querySelector('#tokenGrid').style.display = "none"
        document.getElementById('coffeeCharts').innerHTML = ''
        document.getElementById('coffeePicStats').style.display = "none"
    } else {
        addMsgLogger(`Running process!`)
    }

}



function showTokens() {
    if (isRunning == false) {
        document.getElementById('moneyGrid').style.display = "none"
        document.getElementById('buyGrid').style.display = "none"
        document.querySelector('#coffeeBar').style.display = "none"
        document.querySelector('#tokenGrid').style.display = "grid"
        document.querySelector('#coffeeStats').style.display = "none"
        document.querySelector('#coffeeGrid').style.display = "none"
        document.getElementById('coffeeCharts').innerHTML = ''
        document.getElementById('coffeePicStats').style.display = "none"

        //coffeeMachine.generateTokens();
        let tokenBoxLength = document.getElementsByClassName('tokenBox').length


        for (let i = 0; i < 8; i++) {
            console.log(tokenBoxLength);
            tokenBoxLength = document.getElementsByClassName('tokenBox').length
            if (tokenBoxLength < 8) {
                document.getElementById('tokenGrid').innerHTML += `
            <div class = "tokenBox">
              <i class = "fa-solid fa-plus"></i>
            </div>
        `
            }
        }
    } else {
        addMsgLogger(`Access denied!`)
    }
}



let saveCode = ""
let saveIdx = 0

function createToken() {
    if (isRunning == false) {
        if (coffeeMachine.shoppingCard.list.length > 0) {

            showTokens()
            console.log(coffeeMachine.shoppingCard.list);
            //create new Token and add current 
            const newToken = new Token()
            newToken.addCoffeeList(coffeeMachine.shoppingCard.list)

            //add Token to TokenList
            coffeeMachine.addToken(newToken)


            let html = ""

            //zugriff: coffeeMachine.tokenList.list[].coffeeList.list.length
            for (let cIdx = 0; cIdx < coffeeMachine.tokenList.list[saveIdx].coffeeList.list.length; cIdx++) {
                html += `
        <li>${coffeeMachine.tokenList.list[saveIdx].coffeeList.list[cIdx].name}</li>
        `
            }

            document.getElementsByClassName('tokenBox')[saveIdx].innerHTML = `
     <h1 class="tokenName">Token: ${saveIdx + 1}</h1>
            <ul class="tokenNames">
            ${html}
            </ul>
        <div class="tokenFlex">
            <div class="buyToken" onclick="buyToken(${saveIdx})">Buy</div>
            <div class="tokenPrice">${coffeeMachine.tokenList.list[saveIdx].calcTokenPrice().toFixed(2)}€</div>
        </div>
        `
            saveIdx++;
            console.log("token created");
        } else {

            console.log("");
        }
    } else {
        console.log("running Porcess");
        addMsgLogger(`Access denied!`)
    }
}

function createCoffeeBar() {
    let html = ""
    for (let i = 0; i < coffeeMachine.shoppingCard.list.length; i++) {
        html += `
         <div class="buyItemImage"><img class="singleCoffee" src="${coffeeMachine.shoppingCard.list[i].imgsrc}" alt="not here yet"></img></div>   
        `
    }
    document.querySelector('#coffeeBar').innerHTML = html
}


function createCoffeeBarToken(index) {
    let html = ""
    for (let i = 0; i < coffeeMachine.tokenList.list[index].coffeeList.list.length; i++) {
        html += `
         <div class="buyItemImage"><img class="singleCoffee" src="${coffeeMachine.tokenList.list[index].coffeeList.list[i].imgsrc}" alt="not here yet"></img></div>   
        `
    }
    document.querySelector('#coffeeBar').innerHTML = html
}



function showStatsSingleCoffeeToken(index, n) {
    console.log("current idx: " + index);
    console.log("current n: " + n);
    console.log(coffeeMachine.tokenList.list[index].coffeeList.list[n].price);
    let html = ``

    const names = [
        "price in %",
        "strength in %",
        "caffeine in %",
        "time in s"
    ]

    const values =
        [parseFloat((coffeeMachine.tokenList.list[index].coffeeList.list[n].price / 4.20)).toFixed(2) * 100,
        (coffeeMachine.tokenList.list[index].coffeeList.list[n].strength / 5 * 100),
        coffeeMachine.tokenList.list[index].coffeeList.list[n].caffeine / 200 * 100,
        coffeeMachine.tokenList.list[index].coffeeList.list[n].time
        ]

    const colors = [
        "#04A777",
        "#D1345B",
        "#F5BB00",
        "#C81D25"
    ]
    for (let i = 0; i < values.length; i++) {
        document.getElementById('coffeeCharts2').innerHTML += `
            <div class="b-skills">
            <div class="chart" data-percent="${values[i]}" data-bar-color="${colors[i]}"> 
            <span class="percent" data-after="%">65%</span>
            </div>
            <div class="chartNames">${names[i]}</div>
            `
    }

    console.log("generated");
    run(_chart)
}


const delay = ms => new Promise(r => setTimeout(r, ms))


async function buyToken(idx) {
    let diff = coffeeMachine.money - coffeeMachine.calcShoppingCartAmount()
    
    console.log("put token: " + idx);
   
    let timeValues = []
    if (isRunning == false && diff >= 0) {
        coffeeMachine.updateMoney(coffeeMachine.calcShoppingCartAmount())
        coffeeMachine.updateAmount()
        isRunning = true
        document.getElementById('moneyGrid').style.display = "none"
        document.getElementById('buyGrid').style.display = "block"
        document.querySelector('#coffeeBar').style.display = "flex"
        document.querySelector('#coffeeStats').style.display = "none"
        document.querySelector('#coffeeGrid').style.display = "none"
        document.querySelector('#tokenGrid').style.display = "none"
        document.getElementById('coffeeCharts').innerHTML = ''
        document.getElementById('coffeePicStats').style.display = "block"
        createCoffeeBarToken(idx)


        for (let i = 0; i < coffeeMachine.tokenList.list[idx].coffeeList.list.length; i++) {

            timeValues = getTokenTimeValuesArray(idx)

            let playlist = ["../audio/coconut.mp3", "../audio/heyey.mp3", "../audio/majahu.mp3"]


            const currSong = new Audio("../audio/coffeeMaking.mp3")
            currSong.play()


            let elem = document.getElementsByClassName('singleCoffee')[i]

            elem.style.border = "none"
            elem.style.border = "solid .5em #115a04"

            document.getElementById('coffeePicStats').innerHTML = `<img id="picCoffee2" src="${coffeeMachine.tokenList.list[idx].coffeeList.list[i].imgsrc}"></img>`
            document.getElementById('coffeeName2').innerHTML = `${coffeeMachine.tokenList.list[idx].coffeeList.list[i].name}`

            showStatsSingleCoffeeToken(idx, i)

            elem.style.backgroundPosition = "right"
            elem.style.transition = `background-position ${timeValues[i]}s ease`

            console.log(parseInt(coffeeMachine.tokenList.list[idx].coffeeList.list[i].time));

            //trigger animation
            setTimeout(function () {
                elem.style.backgroundPosition = "left"
                console.log("set Timeout enter");
            }, 10)


            console.log("index: " + i);
            await delay(coffeeMachine.tokenList.list[idx].coffeeList.list[i].time * 1000)
            addMsgLogger(`${coffeeMachine.tokenList.list[idx].coffeeList.list[i].name} finished`)
            document.getElementById('coffeeCharts2').innerHTML = ``
            currSong.pause()
        }

        isRunning = false
        document.getElementById('logger').innerHTML = ` <h1 style="text-align: center; font-family: SourceSansProBlack;">Console</h1>`
        
        showHome()
        clearShoppingCart()
    } else {
        addMsgLogger("Access denied!")
    }
}


function addMsgLogger(err) {
    //init audios
    const errSound = new Audio("../audio/errSound.mp3")
    const doneSound = new Audio("../audio/done.mp3")

    if (document.getElementsByClassName('errMsg').length < 11) {
        console.log(document.getElementsByClassName('errMsg').length);
        switch (err) {
            case "Access denied!":
                errSound.play()
                console.log("red");
                document.getElementById('logger').innerHTML += `
                <div class="errMsg" style ="
                background:#F5BB00;
                ">${err}</div>
            `
           
                break;
            case "Running process!":
                errSound.play()
                document.getElementById('logger').innerHTML += `
                <div class="errMsg" style ="background:#C81D25;
               ">${err}</div>
            `
                break;
            default: 
            doneSound.play()
            document.getElementById('logger').innerHTML += `
        <div class="errMsg" style ="background:#04A777;
       ">${err}</div>
    `
        }
    } else {
        console.log("tooMuch");
    }
}



function showStatsSingleCoffee(index) {
    let html = ``
    const names = [
        "price in %",
        "strength in %",
        "caffeine in %",
        "time in s"
    ]
    const values =
        [parseFloat((coffeeMachine.shoppingCard.list[index].price / 4.20)).toFixed(2) * 100,
        (coffeeMachine.shoppingCard.list[index].strength / 5 * 100),
        coffeeMachine.shoppingCard.list[index].caffeine / 200 * 100,
        coffeeMachine.shoppingCard.list[index].time
        ]

    const colors = [
        "#04A777",
        "#D1345B",
        "#F5BB00",
        "#C81D25"
    ]

    for (let i = 0; i < values.length; i++) {
        document.getElementById('coffeeCharts2').innerHTML += `
            <div class="b-skills">
            <div class="chart" data-percent="${values[i]}" data-bar-color="${colors[i]}"> 
            <span class="percent" data-after="%">65%</span>
            </div>
            <div class="chartNames">${names[i]}</div>
            `
    }

    console.log("generated");
    run(_chart)
}

async function buyItems() {

    let diff = coffeeMachine.money - coffeeMachine.calcShoppingCartAmount()
    

    if (isRunning == false && diff >= 0) {
        coffeeMachine.updateMoney(coffeeMachine.calcShoppingCartAmount())
        coffeeMachine.updateAmount()
        isRunning = true
        document.getElementById('buyGrid').style.display = "block"
        document.querySelector('#coffeeBar').style.display = "flex"
        document.querySelector('#coffeeStats').style.display = "none"
        document.querySelector('#coffeeGrid').style.display = "none"
        document.querySelector('#tokenGrid').style.display = "none"
        document.getElementById('coffeeCharts').innerHTML = ''
        document.getElementById('coffeePicStats').style.display = "block"
        document.getElementById('moneyGrid').style.display = "none"
        createCoffeeBar()

        let timeValues = getShoppingCartTimeValuesArray()

        for (let i = 0; i < coffeeMachine.shoppingCard.list.length; i++) {

            let playlist = ["../audio/coconut.mp3", "../audio/heyey.mp3", "../audio/majahu.mp3"]


            const currSong = new Audio("../audio/coffeeMaking.mp3")
            currSong.play()


            let elem = document.getElementsByClassName('singleCoffee')[i]
            elem.style.border = "none"
            elem.style.border = "solid .5em #115a04"

            document.getElementById('coffeePicStats').innerHTML = `<img id="picCoffee2" src="${coffeeMachine.shoppingCard.list[i].imgsrc}"></img>`
            document.getElementById('coffeeName2').innerHTML = `${coffeeMachine.shoppingCard.list[i].name}`
            showStatsSingleCoffee(i)

            elem.style.backgroundPosition = "right"
            elem.style.transition = `background-position ${timeValues[i]}s ease`

            console.log(parseInt(coffeeMachine.shoppingCard.list[i].time));

            //trigger animation
            setTimeout(function () {
                elem.style.backgroundPosition = "left"
                console.log("set Timeout enter");
            }, 10)

            console.log("index: " + i);

            await delay(coffeeMachine.shoppingCard.list[i].time * 1000)
            addMsgLogger(`${coffeeMachine.shoppingCard.list[i].name} done!`)
            document.getElementById('coffeeCharts2').innerHTML = ""
            currSong.pause()
        }

        isRunning = false
        document.getElementById('logger').innerHTML = ` <h1 style="text-align: center; font-family: SourceSansProBlack;">Console</h1>`

        showHome()
        clearShoppingCart()
    } else {
        addMsgLogger("Running process!")
    }

}


function getMoneyScreen() {

    if (isRunning == false) {
        document.getElementById('moneyGrid').style.display = "grid"
        document.getElementById('buyGrid').style.display = "none"
        document.querySelector('#coffeeBar').style.display = "none"
        document.querySelector('#coffeeStats').style.display = "none"
        document.querySelector('#coffeeGrid').style.display = "none"
        document.querySelector('#tokenGrid').style.display = "none"
        document.getElementById('coffeeCharts').innerHTML = ''
        document.getElementById('coffeePicStats').style.display = "none"



    } else {
        addMsgLogger("Running process!")
    }
}

function getShoppingCartTimeValuesArray() {
    const arr = new Array()
    for (let i = 0; i < coffeeMachine.shoppingCard.list.length; i++) {
        arr[i] = parseInt(coffeeMachine.shoppingCard.list[i].time)
    }
    console.log(arr);

    return arr;
}


function getTokenTimeValuesArray(idx) {
    const arr = new Array()

    console.log("current idx: " + idx);
    for (let i = 0; i < coffeeMachine.tokenList.list[idx].coffeeList.list.length; i++) {
        arr[i] = parseInt(coffeeMachine.tokenList.list[idx].coffeeList.list[i].time)
        console.log(arr);
    }

    return arr;
}


function clearShoppingCart() {
    counter = 0
    c = 0
    coffeeMachine.shoppingCard.list = []
    coffeeMachine.updateShoppingCart()
}

function removeItem(index) {
    if (isRunning == false) {
        counter--
        coffeeMachine.shoppingCard.list.splice(index, 1)
        c--
        coffeeMachine.updateShoppingCart()
    } else {
        addMsgLogger("Access denied!")
    }
    coffeeMachine.calcDiff()
}


coffeeMachine.calcDiff()


function addMoney() {
    coffeeMachine.addMoney(document.getElementById("moneyAmount").value)
    console.log(coffeeMachine.money);
    coffeeMachine.updateAmount()
    coffeeMachine.calcDiff()
}

function getMoneyBack() {
    coffeeMachine.money = 0
    coffeeMachine.updateAmount()
}
//duplikation :)
function addMoney2(value) {
    coffeeMachine.addMoney(value)
    console.log(coffeeMachine.money);
    coffeeMachine.updateAmount()
    coffeeMachine.calcDiff()
}