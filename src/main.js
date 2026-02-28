import "./style.css"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = 1600
const height = 900
function draw() {
    ctx.save()
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    ctx.restore()
    requestAnimationFrame(draw)
}
draw()
