import "./style.css"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = 1600
const height = 900
let objects = [{ type: "spike", x: 1000, y: 0, width: 50, height: 50 }]
let player = { x: 50, y: 0, width: 50, height: 50, yVel: 0 }
let speed = 0.8
let gravity = 0.01
let camera = { x: 0, y: 0 }
let mainFloorHeight = 400
function draw() {
    ctx.save()
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    ctx.translate(camera.x, camera.y)
    ctx.fillStyle = "black"
    ctx.fillRect(0, height - mainFloorHeight, width, mainFloorHeight)
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

    ctx.restore()
    requestAnimationFrame(draw)
}
let lastUpdate = Date.now()
let keys = []
function update() {
    const delta = -lastUpdate + (lastUpdate = Date.now())
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
            default:
                break
        }
    })
    if (
        keys.includes("ArrowUp") ||
        keys.includes("KeyW") ||
        keys.includes("Space")
    ) {
        if (player.y == 0) {
            player.yVel = 2
        }
    }
    player.y += player.yVel * delta
    player.yVel -= gravity * delta
    if (player.y <= 0) {
        player.yVel = 0
        player.y = 0
    }
    camera.y += (player.y - camera.y) / 20
    setTimeout(update, 1000 / 60)
}
draw()
update()
addEventListener("keydown", (ev) => {
    if (keys.includes(ev.code)) return
    keys.push(ev.code)
})
addEventListener("keyup", (ev) => {
    if (!keys.includes(ev.code)) return
    keys.splice(keys.indexOf(ev.code), 1)
})
addEventListener("blur", (ev) => {
    keys = []
})
