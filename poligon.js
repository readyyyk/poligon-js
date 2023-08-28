class Poligon {
    dots = []
    touchStart
    createdIndex = -1
    constructor(canvas, collapse=true, dotSize=5, lineSize=4, dotColor="#54426B", lineColor="#623CEA", cvsBackground="white") {
        this.cvs = canvas
        this.ctx = canvas.getContext("2d")
        this.collapse = collapse
        this.dotSize = dotSize
        this.lineSize = lineSize
        this.dotColor = dotColor
        this.lineColor = lineColor
        this.cvsBackground = cvsBackground
    }
    addDot(x, y){
        this.dots.push({x: x, y: y})
    }

    findTouched(x, y){
        return this.dots.findIndex(el =>
                x>=el.x-this.dotSize/2 && x<=el.x+this.dotSize/2 &&
                y>=el.y-this.dotSize/2 && y<=el.y+this.dotSize/2)
    }
    mouseDown = (e) => {
        this.touchStart = e
        this.createdIndex = -1
        this.cvs.addEventListener("mousemove", this.mouseMove)
        this.cvs.addEventListener("mouseup", this.mouseUp)

        this.touchedIndex = this.findTouched(this.touchStart.offsetX, this.touchStart.offsetY)
        if(this.touchedIndex === -1) {
            this.addDot(e.offsetX, e.offsetY)
            this.createdIndex = this.touchedIndex = this.dots.length-1
        }
        this.render()
    }
    mouseMove = (e) => {
        this.dots[this.touchedIndex].x = e.offsetX
        this.dots[this.touchedIndex].y = e.offsetY
        this.render()
    }
    mouseUp = (e) => {
        this.cvs.removeEventListener("mouseup", this.mouseUp)
        this.cvs.removeEventListener("mousemove", this.mouseMove)

        const finishDotIndex = this.findTouched(e.offsetX, e.offsetY)

        if (this.touchStart.offsetX === e.offsetX && this.touchStart.offsetY === e.offsetY) {
            if(finishDotIndex !== this.createdIndex && finishDotIndex !== -1)
                this.dots.splice(finishDotIndex, 1)
            this.render()
            return
        }

        if (this.collapse) {
            if (this.touchedIndex !== finishDotIndex) {
                this.dots.splice(this.touchedIndex, 1)
                this.render()
            }
        }
    }

    render(){
        this.ctx.fillStyle = this.cvsBackground
        this.ctx.fillRect(0,0,this.cvs.clientWidth,this.cvs.clientHeight)

        this.dots.forEach((el, i) => {
            this.ctx.beginPath()
            this.ctx.strokeStyle = this.lineColor
            this.ctx.lineWidth = this.lineSize

            i
                ? this.ctx.moveTo(this.dots[i-1].x, this.dots[i-1].y)
                : this.ctx.moveTo(this.dots.at(-1).x, this.dots.at(-1).y)
            this.ctx.lineTo(el.x, el.y)
            this.ctx.stroke()
            this.ctx.closePath()
        })

        this.dots.forEach((el) => {
            this.ctx.beginPath()
            this.ctx.arc(el.x, el.y, this.dotSize, 0, Math.PI*2)
            this.ctx.fillStyle = this.dotColor
            this.ctx.fill()
            this.ctx.closePath()
        })

        this.cvs.addEventListener("mousedown", this.mouseDown)
    }
}
