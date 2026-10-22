(() => {
  const frame=document.querySelector('.about-editorial-image');
  if(!frame)return;
  const sources=['assets/about-dubai-01.png','assets/about-dubai-02.png','assets/about-dubai-03.png','assets/about-dubai-04.png'];
  sources.forEach(src=>{const photo=new Image();photo.src=src;});
  frame.querySelector('img').src=sources[0];
  let index=0;
  let timer;
  const rotate=()=>{
    index=(index+1)%sources.length;
    frame.querySelector('img').src=sources[index];
  };
  const start=(delay)=>{
    window.clearInterval(timer);
    timer=window.setInterval(rotate,delay);
  };
  frame.addEventListener('mouseenter',()=>start(900));
  frame.addEventListener('mouseleave',()=>start(200));
  start(200);
})();
