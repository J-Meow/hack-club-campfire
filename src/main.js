import "./style.css"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = 1600
const height = 900
let animationTick = 0
const layerHeight = 400
const sections = [
    {
        width: 4000,
        layerChange: 0,
        conditions: [{ type: "chance", value: 0.1 }],
        objects: [
            { type: "spike", x: 1000, y: 0, width: 50, height: 50 },
            {
                type: "spike",
                x: 1050,
                y: 0,
                width: 50,
                height: 50,
                animSwap: true,
            },
            { type: "spike", x: 1100, y: 0, width: 50, height: 50 },
            {
                type: "spike",
                x: 2500,
                y: 0,
                width: 50,
                height: 50,
                animSwap: true,
            },
            { type: "spike", x: 2550, y: 0, width: 50, height: 70 },
            {
                type: "spike",
                x: 2600,
                y: 0,
                width: 50,
                height: 60,
                animSwap: true,
            },
            { type: "spike", x: 2650, y: 0, width: 50, height: 90 },
            {
                type: "spike",
                x: 2700,
                y: 0,
                width: 50,
                height: 80,
                animSwap: true,
            },
            { type: "spike", x: 2750, y: 0, width: 50, height: 40 },
            {
                type: "spike",
                x: 2800,
                y: 0,
                width: 50,
                height: 80,
                animSwap: true,
            },
            { type: "spike", x: 2850, y: 0, width: 50, height: 70 },
            {
                type: "spike",
                x: 2900,
                y: 0,
                width: 50,
                height: 90,
                animSwap: true,
            },
            { type: "spike", x: 2950, y: 0, width: 50, height: 50 },
            {
                type: "nextlayer",
                x: 2000,
                y: 200,
                width: 100,
                height: 50,
            },
            {
                type: "prevlayer",
                x: 3200,
                y: 80,
                layer: 1,
                width: 100,
                height: 50,
            },
            { type: "spike", x: 3500, y: 0, layer: 1, width: 50, height: 50 },
            {
                type: "spike",
                x: 3550,
                y: 0,
                layer: 1,
                width: 50,
                height: 70,
                animSwap: true,
            },
            { type: "spike", x: 3600, y: 0, layer: 1, width: 50, height: 60 },
            {
                type: "spike",
                x: 3650,
                y: 0,
                layer: 1,
                width: 50,
                height: 90,
                animSwap: true,
            },
            { type: "spike", x: 3700, y: 0, layer: 1, width: 50, height: 80 },
            {
                type: "spike",
                x: 3750,
                y: 0,
                layer: 1,
                width: 50,
                height: 40,
                animSwap: true,
            },
            { type: "spike", x: 3800, y: 0, layer: 1, width: 50, height: 80 },
            {
                type: "spike",
                x: 3850,
                y: 0,
                layer: 1,
                width: 50,
                height: 70,
                animSwap: true,
            },
            { type: "spike", x: 3900, y: 0, layer: 1, width: 50, height: 90 },
            {
                type: "spike",
                x: 3950,
                y: 0,
                layer: 1,
                width: 50,
                height: 50,
                animSwap: true,
            },
        ],
    },
    {
        width: 2000,
        layerChange: 1,
        conditions: [{ type: "chance", value: 0.3 }],
        objects: [
            { type: "nextlayer", x: 300, y: 200, width: 100, height: 50 },
            { type: "spike", x: 600, y: 0, width: 50, height: 60 },
            {
                type: "spike",
                x: 650,
                y: 0,
                width: 50,
                height: 90,
                animSwap: true,
            },
            { type: "spike", x: 700, y: 0, width: 50, height: 80 },
            {
                type: "spike",
                x: 750,
                y: 0,
                width: 50,
                height: 40,
                animSwap: true,
            },
            { type: "spike", x: 800, y: 0, width: 50, height: 80 },
            {
                type: "spike",
                x: 850,
                y: 0,
                width: 50,
                height: 70,
                animSwap: true,
            },
            { type: "spike", x: 900, y: 0, width: 50, height: 90 },
            {
                type: "spike",
                x: 950,
                y: 0,
                width: 50,
                height: 50,
                animSwap: true,
            },
            { type: "spike", x: 1000, y: 0, width: 50, height: 50 },
            {
                type: "spike",
                x: 1050,
                y: 0,
                width: 50,
                height: 50,
                animSwap: true,
            },
        ],
    },
    {
        width: 2000,
        layerChange: -1,
        conditions: [{ type: "layerunder", value: 0 }],
        objects: [
            { type: "prevlayer", x: 900, y: 80, width: 100, height: 50 },
            { type: "spike", x: 1000, y: 0, width: 50, height: 50 },
            {
                type: "spike",
                x: 1050,
                y: 0,
                width: 50,
                height: 70,
                animSwap: true,
            },
            { type: "spike", x: 1100, y: 0, width: 50, height: 60 },
            {
                type: "spike",
                x: 1150,
                y: 0,
                width: 50,
                height: 90,
                animSwap: true,
            },
            { type: "spike", x: 1200, y: 0, width: 50, height: 80 },
            {
                type: "spike",
                x: 1250,
                y: 0,
                width: 50,
                height: 40,
                animSwap: true,
            },
            { type: "spike", x: 1300, y: 0, width: 50, height: 80 },
            {
                type: "spike",
                x: 1350,
                y: 0,
                width: 50,
                height: 70,
                animSwap: true,
            },
            { type: "spike", x: 1400, y: 0, width: 50, height: 90 },
            {
                type: "spike",
                x: 1450,
                y: 0,
                width: 50,
                height: 50,
                animSwap: true,
            },
        ],
    },
    {
        width: 1600,
        layerChange: 0,
        conditions: [{ type: "layerunder", value: 0 }],
        objects: [
            { type: "prevlayer", x: 700, y: 80, width: 100, height: 50 },
            { type: "spike", x: 1000, y: 0, layer: -1, width: 100, height: 50 },
            {
                type: "spike",
                x: 1100,
                y: 0,
                layer: -1,
                width: 100,
                height: 50,
                animSwap: true,
            },
            { type: "spike", x: 1200, y: 0, layer: -1, width: 100, height: 50 },
            {
                type: "spike",
                x: 1300,
                y: 0,
                layer: -1,
                width: 100,
                height: 50,
                animSwap: true,
            },
            { type: "spike", x: 1400, y: 0, layer: -1, width: 100, height: 50 },
            {
                type: "spike",
                x: 1500,
                y: 0,
                layer: -1,
                width: 100,
                height: 50,
                animSwap: true,
            },
        ],
    },
    {
        width: 800,
        layerChange: 0,
        objects: [
            { type: "spike", x: 200, y: 0, width: 50, height: 50 },
            {
                type: "spike",
                x: 350,
                y: 0,
                width: 50,
                height: 100,
                animSwap: true,
            },
            { type: "spike", x: 500, y: 0, width: 50, height: 50 },
        ],
    },
]
let objects = []
let player = { x: 50, y: 0, width: 50, height: 50, yVel: 0 }
let speed = 0.8
let gravity = 0.004
let camera = { x: 0, y: 0 }
let mainFloorHeight = 300
let currentLayer = 0
let lowestFadedLayer = 0
let floorY = currentLayer * -layerHeight
let currentSectionEnd = 500
let currentSectionEndLayer = 0
function addSection(index) {
    const section = sections[index]
    objects.push(
        ...section.objects.map((obj) => {
            let newObj = JSON.parse(JSON.stringify(obj))
            if (newObj.type == "nextlayer" || newObj.type == "prevlayer") {
                newObj.used = false
            }
            const layerChange = newObj.layer
                ? newObj.layer + currentSectionEndLayer
                : currentSectionEndLayer
            newObj.y -= layerChange * layerHeight
            newObj.x += currentSectionEnd
            return newObj
        }),
    )
    currentSectionEnd += section.width
    currentSectionEndLayer += section.layerChange
}
function draw() {
    ctx.save()
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "#008"
    ctx.fillRect(0, 0, width, height)
    ctx.translate(camera.x, camera.y)
    ctx.fillStyle = "#520"
    ctx.fillRect(0, height - mainFloorHeight, width, layerHeight * 3)
    ctx.fillStyle = "#220e0e"
    ctx.fillRect(
        0,
        height -
            mainFloorHeight +
            layerHeight * Math.max(3, -Math.floor(player.y / layerHeight) - 3),
        width,
        layerHeight * 6,
    )
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
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        ((animationTick % 1000 > 500) ^ obj.animSwap ? 10 : 0),
                )
                ctx.closePath()
                ctx.fill()
                break
            case "nextlayer":
                ctx.fillStyle = "#0f0"
                ctx.strokeStyle = "#0f0"
                ctx.lineWidth = 5
                ctx.lineCap = "round"
                ctx.beginPath()
                ctx.moveTo(
                    obj.x + obj.width * (1 / 4),
                    height - mainFloorHeight - obj.y - obj.height,
                )
                ctx.lineTo(
                    obj.x + obj.width * (3 / 4),
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.moveTo(
                    obj.x + obj.width * (3 / 4),
                    height - mainFloorHeight - obj.y - obj.height,
                )
                ctx.lineTo(
                    obj.x + obj.width * (1 / 4),
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.stroke()
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
                    obj.x + obj.width,
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2) +
                        5,
                )
                ctx.lineTo(
                    obj.x,
                    height -
                        mainFloorHeight -
                        obj.y -
                        Math.sin(animationTick / 100) * (obj.height / 2) +
                        5,
                )
                ctx.closePath()
                ctx.fill()
                break
            case "prevlayer":
                ctx.fillStyle = "#0f0"
                ctx.strokeStyle = "#0f0"
                ctx.lineWidth = 5
                ctx.lineCap = "round"
                ctx.beginPath()
                ctx.moveTo(
                    obj.x + obj.width * (1 / 4),
                    height - mainFloorHeight - obj.y,
                )
                ctx.lineTo(
                    obj.x + obj.width * (3 / 4),
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.moveTo(
                    obj.x + obj.width * (3 / 4),
                    height - mainFloorHeight - obj.y,
                )
                ctx.lineTo(
                    obj.x + obj.width * (1 / 4),
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2),
                )
                ctx.stroke()
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
                    obj.x + obj.width,
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2) +
                        5,
                )
                ctx.lineTo(
                    obj.x,
                    height -
                        mainFloorHeight -
                        obj.y -
                        obj.height -
                        Math.sin(animationTick / 100) * (obj.height / 2) +
                        5,
                )
                ctx.closePath()
                ctx.fill()
            default:
                return
        }
    })

    ctx.fillStyle = "#fff"
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
    currentSectionEnd -= speed * delta
    if (currentSectionEnd < width + 500) {
        while (true) {
            let choice = Math.floor(Math.random() * sections.length)
            let willWork = true
            if (sections[choice].conditions) {
                sections[choice].conditions.forEach((condition) => {
                    switch (condition.type) {
                        case "layerunder":
                            if (condition.value >= currentSectionEndLayer) {
                                willWork = false
                            }
                            break
                        case "chance":
                            if (condition.value >= Math.random())
                                willWork = false
                            break
                        default:
                            break
                    }
                })
            }
            if (willWork) {
                addSection(choice)
                break
            }
        }
    }
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
                    player.yVel > 0 &&
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
                    player.yVel < 0 &&
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
