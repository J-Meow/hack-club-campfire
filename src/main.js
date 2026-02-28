import "./style.css"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = 1600
const height = 900
let objects = [{ type: "spike", x: 1000, y: 0, width: 50, height: 50 }]
let speed = 0.6
function draw() {
    ctx.save()
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, height - 300, width, 300)
    objects.forEach((obj) => {
        switch (obj.type) {
            case "spike":
                ctx.fillStyle = "red"
                ctx.beginPath()
                ctx.moveTo(obj.x, height - 300 - obj.y)
                ctx.lineTo(obj.x + obj.width, height - 300 - obj.y)
                ctx.lineTo(
                    obj.x + obj.width / 2,
                    height - 300 - obj.y - obj.height,
                )
                ctx.closePath()
                ctx.fill()
                break
            default:
                return
        }
    })

    ctx.restore()
    requestAnimationFrame(draw)
}
let lastUpdate = Date.now()
function update() {
    const delta = -lastUpdate + (lastUpdate = Date.now())
    objects.forEach((obj) => {
        obj.x -= speed * delta
    })
    objects = objects.filter((obj) => obj.x > -obj.width - 100)
    setTimeout(update, 1000 / 60)
}
draw()
update()
