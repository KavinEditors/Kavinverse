// smooth scroll

document.getElementById("aboutBtn").onclick = () => {
document.querySelector("#about").scrollIntoView({behavior:"smooth"})
}

document.getElementById("projectBtn").onclick = () => {
document.querySelector("#projects").scrollIntoView({behavior:"smooth"})
}


// typing text

const paragraphs=[

"I am a designer and a programmer who turns ideas into visual experience through creativity and imagination.",

"Every project I work on is driven by a commitment to precision, innovation, and meaningful design which enables the project to be accurate and efficient.",

"My approach focuses on understanding problems deeply, so that every design and code is crafted to transform ideas to impactful projects."

]

let pIndex=0
let charIndex=0

function typeText(){

if(pIndex>=paragraphs.length)return

let element=document.getElementById("p"+(pIndex+1))
let text=paragraphs[pIndex]

if(charIndex<text.length){

element.innerHTML+=text.charAt(charIndex)

charIndex++

setTimeout(typeText,25)

}else{

pIndex++
charIndex=0

setTimeout(typeText,400)

}

}


// scroll trigger

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

document.querySelector(".slide-title").classList.add("show")

typeText()

}

})

},{threshold:0.5})

observer.observe(document.querySelector("#about"))



/* PARTICLES */

const canvas=document.getElementById("particles")
const ctx=canvas.getContext("2d")

canvas.width=800
canvas.height=500

let particles=[]

for(let i=0;i<60;i++){

particles.push({

x:Math.random()*800,
y:Math.random()*500,
r:Math.random()*2

})

}

function draw(){

ctx.clearRect(0,0,800,500)

particles.forEach(p=>{

ctx.fillStyle="white"

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fill()

p.y-=0.2

if(p.y<0)p.y=500

})

requestAnimationFrame(draw)

}

draw()
