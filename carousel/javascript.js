const imgs=document.getElementById('imgs')

const img=document.querySelectorAll('#imgs img');
let idx=0;

function run(){
    console.log(idx)
    idx++;
    if(idx>img.length-1){
        idx=0;
    }
    imgs.style.transform=`translateX(${-idx*330}px)`;

    
}

setInterval(run,2000);