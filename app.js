const cvs = document.querySelector("canvas")
const p = new Poligon(cvs)

p.addDot(20, 20)
p.addDot(40, 70)

p.addDot(80, 30)
// p.addDot(10, 40)

p.render()
