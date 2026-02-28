import "./style.css"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = 1600
const height = 900
let animationTick = 0
const layerHeight = 400
let objects = [
    { type: "spike", x: 1000, y: 0, width: 50, height: 50 },
    { type: "nextlayer", x: 2000, y: 200, width: 100, height: 50, used: false },
    {
        type: "prevlayer",
        x: 3000,
        y: 50 - layerHeight,
        width: 100,
        height: 50,
        used: false,
    },
]
let player = { x: 50, y: 0, width: 50, height: 50, yVel: 0 }
let speed = 0.8
let gravity = 0.004
let camera = { x: 0, y: 0 }
let mainFloorHeight = 400
let currentLayer = 0
let lowestFadedLayer = 0
let floorY = currentLayer * -layerHeight
function draw() {
    ctx.save()
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    ctx.translate(camera.x, camera.y)
    ctx.fillStyle = "black"
    for (let i = 0; i <= currentLayer + 2; i++) {
        ctx.fillRect(0, height - mainFloorHeight + i * layerHeight, width, 50)
    }
    objects.forEach((obj) => {
        switch (obj.type) {
            case "spike":
                ctx.fillStyle = "red"
                ctx.beginPath()
                ctx.moveTo(obj.x, height - mainFloorHeight - obj.y)
                ctx.lineTo(obj.x + obj.width, height - mainFloorHeight - obj.y)
                ctx.lineTo(
                    obj.x + obj.width / 2,
                    height - mainFloorHeight - obj.y - obj.height,
                )
                ctx.closePath()
                ctx.fill()
                break
            case "nextlayer":
                ctx.fillStyle = "#0f0"
                ctx.beginPath()
                ctx.moveTo(
                    obj.x,
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.lineTo(
                    obj.x + obj.width,
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.lineTo(
                    obj.x + obj.width / 2,
                    height - mainFloorHeight - obj.y - obj.height,
                )
                ctx.closePath()
                ctx.fill()
                break
            case "prevlayer":
                ctx.fillStyle = "#0f0"
                ctx.beginPath()
                ctx.moveTo(
                    obj.x,
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.lineTo(
                    obj.x + obj.width,
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.lineTo(
                    obj.x + obj.width / 2,
                    height - mainFloorHeight - obj.y,
                )
                ctx.closePath()
                ctx.fill()
                break
            default:
                return
        }
    })

    ctx.fillStyle = "blue"
    ctx.fillRect(
        player.x,
        height - mainFloorHeight - player.y - player.height,
        player.width,
        player.height,
    )

    ctx.fillStyle = "black"
    let currentPlayerLayer = -Math.floor(player.y / layerHeight)
    if (currentPlayerLayer > lowestFadedLayer) {
        ctx.globalAlpha = 1 - (-(player.y + 1) % layerHeight) / layerHeight
        ctx.fillRect(
            0,
            height - mainFloorHeight + layerHeight * (currentPlayerLayer - 1),
            width,
            height * 2,
        )
        if (ctx.globalAlpha < 0.01) {
            lowestFadedLayer = currentPlayerLayer
        }
        ctx.globalAlpha = 1
    }
    ctx.fillRect(
        0,
        height - mainFloorHeight + layerHeight * currentPlayerLayer,
        width,
        height,
    )

    ctx.restore()
    requestAnimationFrame(draw)
}
let lastUpdate = Date.now()
let keys = []
let jumpingUp = false
function update() {
    const delta = -lastUpdate + (lastUpdate = Date.now())
    animationTick += delta
    objects.forEach((obj) => {
        obj.x -= speed * delta
    })
    objects = objects.filter((obj) => obj.x > -obj.width - 100)
    objects.forEach((obj) => {
        function collides(x1, y1, w1, h1, x2, y2, w2, h2) {
            return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
        }
        switch (obj.type) {
            case "spike":
                if (
                    collides(
                        player.x,
                        player.y,
                        player.width,
                        player.height,
                        obj.x + obj.width / 4,
                        obj.y,
                        obj.width / 2,
                        obj.height * 0.8,
                    )
                ) {
                    alert("Game over")
                    location.reload()
                }
                break
            case "nextlayer":
                if (
                    !obj.used &&
                    collides(
                        player.x,
                        player.y,
                        player.width,
                        player.height,
                        obj.x,
                        obj.y,
                        obj.width,
                        obj.height,
                    )
                ) {
                    player.yVel = -1
                    currentLayer++
                    floorY = currentLayer * -layerHeight
                    obj.used = true
                }
                break
            case "prevlayer":
                if (
                    !obj.used &&
                    collides(
                        player.x,
                        player.y,
                        player.width,
                        player.height,
                        obj.x,
                        obj.y,
                        obj.width,
                        obj.height,
                    )
                ) {
                    player.yVel = 2
                    jumpingUp = true
                    lowestFadedLayer--
                    obj.used = true
                }
                break
            default:
                break
        }
    })
    if (
        keys.includes("ArrowUp") ||
        keys.includes("KeyW") ||
        keys.includes("Space")
    ) {
        if (player.y == floorY) {
            player.yVel = 1.3
        }
    }
    player.y += player.yVel * delta
    player.yVel -= gravity * delta
    if (player.y <= floorY && !jumpingUp) {
        player.yVel = 0
        player.y = floorY
    } else if (jumpingUp && player.y > floorY + layerHeight) {
        currentLayer--
        floorY = currentLayer * -layerHeight
        jumpingUp = false
    }
    camera.y += (player.y - camera.y) / 20
    setTimeout(update, 1000 / 60)
}
draw()
update()
addEventListener("keydown", (ev) => {
    if (keys.includes(ev.code)) return
    keys.push(ev.code)
    if (ev.code == "ShiftRight") {
        // Testing
        currentLayer++
        floorY = currentLayer * -layerHeight
    }
})
addEventListener("keyup", (ev) => {
    if (!keys.includes(ev.code)) return
    keys.splice(keys.indexOf(ev.code), 1)
})
addEventListener("blur", (ev) => {
    keys = []
})
