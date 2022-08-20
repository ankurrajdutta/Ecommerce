const open=document.getElementById('open');
const close=document.getElementById('close');
const container=document.getElementById('container')

open.addEventListener('click',()=>{
    console.log(container.classList)
    container.classList.add('active')
})
close.addEventListener('click',()=>{
    container.classList.remove('active')
})