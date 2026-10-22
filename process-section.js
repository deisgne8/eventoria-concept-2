const steps=[
  {word:'PROJECT DISCOVERY',accent:'PROJECT ',image:'assets/unsplash/headway.jpg',alt:'Audience attending a conference',caption:'Every moment begins before it becomes real.'},
  {word:'CREATIVE CONCEPT',accent:'CREATIVE ',image:'assets/unsplash/evangeline-shaw.jpg',alt:'Panel discussion at a conference',caption:'Give the idea room to become real.'},
  {word:'EXPERIENCE DESIGN',accent:'EXPERIENCE ',image:'assets/unsplash/chuttersnap.jpg',alt:'Floral table styling at a reception',caption:'Make the experience tangible.'},
  {word:'EVENT PRODUCTION',accent:'EVENT ',image:'assets/unsplash/filip-rankovic-grobgaard.jpg',alt:'Guests gathered at an evening event',caption:'Every detail has a role to play.'},
  {word:'LIVE EXECUTION',accent:'LIVE ',image:'assets/unsplash/noiseporn.jpg',alt:'Audience enjoying a live show',caption:'Carry the moment through.'}
];
const showcase=document.querySelector('.process-showcase');
const viewport=showcase.querySelector('.process-showcase__viewport');
const stage=document.querySelector('#process-stage');
const image=document.querySelector('#process-image');
const accent=document.querySelector('#process-active-accent');
const word=document.querySelector('#process-active-word');
const caption=document.querySelector('#process-caption');
const activeImage=document.querySelector('#process-active-image');
const activeTitle=showcase.querySelector('.process-showcase__active');
const rows=[...showcase.querySelectorAll('.process-showcase__word')];
const buttons=[...showcase.querySelectorAll('.process-showcase__step')];
let activeStep=-1;
let requestedStep=-1;
let framePending=false;
let fadingImage=null;
let fadeAnimation=null;
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
// Decode before a step is selected, keeping its image and highlighted row in sync.
const pictures=steps.map(item=>{
  const picture=new Image();
  picture.src=item.image;
  return {picture,ready:picture.decode().then(()=>true,()=>false)};
});
const whiteLabels=rows.map(row=>{
  const label=document.createElement('span');
  label.className='process-row-image-label';
  label.textContent=row.textContent;
  row.append(label);
  return label;
});
function updateClip(){
  const photo=image.getBoundingClientRect();
  rows.forEach((row,i)=>{
    const bounds=row.getBoundingClientRect();
    whiteLabels[i].style.clipPath=`inset(${Math.max(0,photo.top-bounds.top)}px ${Math.max(0,bounds.right-photo.right)}px ${Math.max(0,bounds.bottom-photo.bottom)}px ${Math.max(0,photo.left-bounds.left)}px)`;
  });
  // Match every number to its row, independent of viewport size or font loading.
  const frame=viewport.getBoundingClientRect();
  buttons.forEach((button,i)=>{
    const bounds=rows[i].getBoundingClientRect();
    button.style.top=`${bounds.top-frame.top+bounds.height/2}px`;
  });
}
async function showStep(index){
  if(index===requestedStep)return;
  requestedStep=index;
  if(!await pictures[index].ready||requestedStep!==index)return;
  if(index===activeStep)return;
  const item=steps[index];
  fadeAnimation?.cancel();
  fadingImage?.remove();
  fadingImage=null;
  // The outgoing photo fades over the fully decoded incoming photo.
  if(activeStep>=0&&!reducedMotion.matches){
    fadingImage=image.cloneNode();
    fadingImage.removeAttribute('id');
    fadingImage.className='process-image-outgoing';
    fadingImage.alt='';
    fadingImage.setAttribute('aria-hidden','true');
    stage.append(fadingImage);
  }
  activeStep=index;
  image.src=item.image;
  image.alt=item.alt;
  caption.textContent=item.caption;
  activeTitle.textContent=item.word;
  buttons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
  rows.forEach((row,i)=>row.classList.toggle('is-active',i===index));
  const counter=document.querySelector('#process-current');
  if(counter)counter.textContent=String(index+1);
  if(fadingImage){
    const outgoing=fadingImage;
    fadeAnimation=outgoing.animate([{opacity:1},{opacity:0}],{duration:450,easing:'cubic-bezier(.22,.61,.36,1)'});
    fadeAnimation.finished.then(()=>{outgoing.remove();if(fadingImage===outgoing)fadingImage=null;},()=>outgoing.remove());
  }
  updateClip();
}
buttons.forEach(button=>button.addEventListener('click',()=>{
  showcase.classList.add('is-revealed');
  const index=Number(button.dataset.step);
  if(matchMedia('(min-width:1025px) and (prefers-reduced-motion:no-preference)').matches){
    scrollTo({top:showcase.getBoundingClientRect().top+scrollY+(showcase.offsetHeight-innerHeight)*((index+.3)/steps.length),behavior:'smooth'});
  }else showStep(index);
}));
function updateScroll(){
  framePending=false;
  const bounds=showcase.getBoundingClientRect();
  const progress=Math.min(1,Math.max(0,-bounds.top/Math.max(1,showcase.offsetHeight-innerHeight)));
  if(bounds.top<innerHeight&&bounds.bottom>0)showcase.classList.add('is-revealed');
  if(matchMedia('(min-width:1025px) and (prefers-reduced-motion:no-preference)').matches)showStep(Math.min(steps.length-1,Math.floor(progress*steps.length)));
  updateClip();
}
function scheduleUpdate(){if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',scheduleUpdate,{passive:true});
window.addEventListener('resize',scheduleUpdate);
image.addEventListener('load',scheduleUpdate);
document.fonts.ready.then(scheduleUpdate);
showStep(0);
updateScroll();
