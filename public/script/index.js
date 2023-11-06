const hamburger = document.querySelector('.menu')
const sideBar = document.querySelector('.nav')
const wrapper = document.querySelector('.wrapper');


hamburger.addEventListener('click',()=>{
   sideBar.classList.toggle('show')
})

function showForm() {
   wrapper.classList.add('active');
 }

document.querySelector('.container').addEventListener('click',()=>{
   sideBar.classList.remove('show')
   wrapper.classList.remove('active');
})

let todoInputs = document.querySelectorAll('.checkbox')
let todoFroms = document.querySelectorAll(".todoForm")

todoInputs.forEach((input, i) => {
   input.addEventListener('change', () => {
     todoFroms[i].submit()
   })
 })