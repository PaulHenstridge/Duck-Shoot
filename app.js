/* 
    as score icreases, += difficulty
        start from both sides of screen
        vary y axis, speed, size
            specific colours and behaviours for specific classes of duck
            more points for harder shots


                TODO - AFTER THIS PROJECT, WATCH FREECODECAMP PYTHON VERSION!
*/
const container = document.querySelector('.container')
const scoreBox = document.querySelector('.score-box')
const sky = document.querySelector('.sky')
const UIBar = document.querySelector('.UI-bar')
const shotsBox = document.querySelector('.shots-fired')
const ammoBox = document.querySelector('.ammo-left')
const ammoDisp = document.querySelector('.ammo-display')
const magazine = document.querySelector('.magazine')

let score = 0
let shotsFired = 0
let holeDiameter = 15   // this can be maipulated to simulate bigger.smaller guns
let birdsArray = []
let ammo = 10

const rounds = {
    1: ['pigeon', 'pigeon', 'pigeon'],
    2: ['pigeon', 'swallow', 'pigeon', 'swallow']

}



const updateMagazine = () => {
    magazine.innerHTML = ''
    for (let i = ammo; i > 0; i--) {
        let bullet = document.createElement('div')
        bullet.classList.add('bullet')
        magazine.appendChild(bullet)
    }
}
updateMagazine()
// firing a shot
container.addEventListener('click', (e) => {
    console.log('SHOT:', e.x, e.y)
    shotsFired++
    shotsBox.innerHTML = `<h4>shots: ${shotsFired}</h4>`

    ammo--
    ammoDisp.innerHTML = ammo
    updateMagazine()



    /*
     rows of 8
    */



    // check for a HIT
    birdsArray.forEach(bird => {
        let rect = bird.getBoundingClientRect()
        console.log(bird, rect.x, rect.y)
        if (e.x > (rect.x - rect.width / 2) && e.x < (rect.x + rect.width * 1.5)
            &&
            e.y > (rect.y - rect.height / 2) && e.y < (rect.y + rect.height * 1.5)) {
            console.log('HIT!!!!',)
            bird.remove()
            score += 1
            scoreBox.innerHTML = score
        }
    })
    // bullet holes (event x,y - width, height of hole div)
    let hole = document.createElement('div')
    hole.classList.add('hole')
    hole.style.width = `${holeDiameter}px`
    hole.style.height = `${holeDiameter}px`
    hole.style.left = `${e.x - holeDiameter}px`
    hole.style.top = `${e.y - holeDiameter}px`
    sky.appendChild(hole)
})


function createBird(birdType) {
    let bird = document.createElement('div')
    let altitude = Math.floor(Math.random() * 75)
    bird.classList.add(birdType)
    bird.style.top = `${altitude}%`

    birdsArray.push(bird)
    container.appendChild(bird)
}

createBird('pigeon')
createBird('swallow')
createBird('snipe')
createBird('osprey')
createBird('curlew')


/*
WIN CONDITIONS
    shoot all birds
    need ot know number of birds in game
        how to set up a game...
            pass array of strings [pigeon, hawk etc], or pass array of numbers to switch statement
        either way, array.length = number of birds = no of hits to win/progress
LOSE CONDITIONS
    run out of ammo

have ammo drops floating in from above



    START GAME ->
        round = 1
        pass rounds[round] into function to make birds

        *****for birdtype in rounds[round]
            ---randomDelay----
            makeBird(birdtype)*****

     if no of hits === length of passed array (rounds[round])
        WIN!
            round++
            if round === rounds.length
                YOU COMPLETED THE GAME!!

            clear the DOM
            *****for birdtype in rounds[round]
            ---randomDelay----
            makeBird(birdtype)*****


    if ammo <= 0
        LOSE!
        *****for birdtype in rounds[round]
            ---randomDelay----
            makeBird(birdtype)*****
*/