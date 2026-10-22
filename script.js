'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');mobileNav.classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.classList.toggle('is-open',open);});
mobileNav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 1025px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const expertise={
 story:{number:'01',title:'Give the moment a reason.',text:'We begin with the story, the place and the audience, then shape a creative direction that answers what the occasion needs to say.',items:['Creative strategy & storytelling','Audience and occasion insight','Story architecture and show narrative'],image:'expertise-story-generated.png',alt:'Creative team shaping an event story with visual references'},
 design:{number:'02',title:'Make the idea tangible.',text:'We translate the story into the experience: spatial, scenic and sculptural design with a clear role in the whole.',items:['Experience, spatial & scenic design','Art sculpture design and build','Visual language and guest journey'],image:'expertise-design-generated.png',alt:'Immersive blue event space being designed and built'},
 show:{number:'03',title:'Bring the story to life.',text:'Performance, light, sound and content come together in a carefully directed live experience that moves the audience.',items:['Show narrative & live direction','Performance and content coordination','Lighting, sound and technical integration'],image:'expertise-show-generated.png',alt:'Live performance stage illuminated in vivid blue and violet light'},
 delivery:{number:'04',title:'Carry every detail through.',text:'A connected team keeps creative ambition and practical delivery aligned, from the production plan to the final cue.',items:['Production planning & coordination','Rehearsals and technical preparation','Live operations and on-site delivery'],image:'expertise-delivery-generated.png',alt:'Production crew preparing a refined gala event before guests arrive'}
};
const transitionExpertiseBackground=()=>{};
const tabs=[...document.querySelectorAll('[role="tab"]')],panel=document.querySelector('#service-panel');
const serviceProgress=document.querySelector('.service-progress span');
const alignServiceNumber=()=>{const copy=panel?.querySelector('.service-copy'),number=panel?.querySelector('.service-number');if(!copy||!number)return;number.style.setProperty('top',`${Math.max(8,copy.offsetTop-number.offsetHeight-24)}px`,'important');number.style.setProperty('z-index','10','important');};
window.addEventListener('resize',alignServiceNumber);
requestAnimationFrame(alignServiceNumber);
function activateTab(tab){if(expertiseSection?.classList.contains('expertise-scroll-slider')&&matchMedia('(min-width:1025px)').matches){scrollTo({top:expertiseSection.getBoundingClientRect().top+scrollY+(expertiseSection.offsetHeight-innerHeight)*((tabs.indexOf(tab)+.35)/tabs.length),behavior:'smooth'});}const data=expertise[tab.dataset.service];tabs.forEach(t=>{const active=t===tab;t.classList.toggle('is-active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});panel.setAttribute('aria-labelledby',tab.id);panel.querySelector('.service-number').innerHTML=`<span class="counter-current">${data.number}</span> <span class="counter-total">/ 04</span>`;panel.querySelector('h3').textContent=data.title;panel.querySelector('p').textContent=data.text;panel.querySelector('.service-list').replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));transitionExpertiseBackground(data);const image=panel.querySelector('#service-photo');image.alt=data.alt;const reveal=panel.querySelector('.expertise-reveal-image');if(reveal){reveal.style.transition='none';reveal.src='assets/'+data.image;reveal.style.clipPath='inset(50% 50% 50% 50%)';requestAnimationFrame(()=>{reveal.style.transition='clip-path .7s cubic-bezier(.22,.61,.36,1)';reveal.style.clipPath='inset(0)';});window.setTimeout(()=>{image.src='assets/'+data.image;},700);}else{image.src='assets/'+data.image;}if(serviceProgress)serviceProgress.style.width=`${(tabs.indexOf(tab)+1)/tabs.length*100}%`;}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();activateTab(tabs[next]);tabs[next].focus();});});
// Static homepage: prepare an email without claiming that a server received it.
document.querySelector('#enquiry-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const values=new FormData(form);const body=`Name: ${values.get('name')}\nWork email: ${values.get('email')}\nEnquiry: ${values.get('event')}\n\n${values.get('message')||''}`;window.location.href=`mailto:info@eventoriaevents.com?subject=${encodeURIComponent('Website enquiry — '+values.get('event'))}&body=${encodeURIComponent(body)}`;form.querySelector('.form-status').textContent='Your email draft is ready. Please send it in your email app. If it did not open, email info@eventoriaevents.com directly.';});
const philosophySection=document.querySelector('.philosophy-section');
const philosophyCarousel=philosophySection?.querySelector('.philosophy-track');
if(philosophySection&&philosophyCarousel){const track=philosophySection.querySelector('.philosophy-track');const cards=[...philosophySection.querySelectorAll('.philosophy-image')];const prev=philosophySection.querySelector('.philosophy-arrow--prev');const next=philosophySection.querySelector('.philosophy-arrow--next');let index=0;const visible=()=>window.innerWidth<761?1:3;const update=()=>{const gap=window.innerWidth<761?14:0;const cardWidth=cards[0]?.getBoundingClientRect().width||270;const max=Math.max(0,cards.length-visible());index=Math.min(index,max);track.style.setProperty('transform',`translateX(-${index*(cardWidth+gap)}px)`,'important');if(prev)prev.disabled=index===0;if(next)next.disabled=index>=max;};if(prev)prev.addEventListener('click',()=>{index--;update();});if(next)next.addEventListener('click',()=>{index++;update();});let startX=0;track.addEventListener('pointerdown',event=>{startX=event.clientX;track.setPointerCapture(event.pointerId);});track.addEventListener('pointerup',event=>{const delta=event.clientX-startX;if(Math.abs(delta)>40){index+=delta<0?1:-1;update();}});window.addEventListener('resize',update);update();}
if(false&&philosophySection&&philosophyCarousel&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){/* legacy controller disabled */}
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.intro-grid,.philosophy-section,.service-panel,.project-card,.process-grid,.proof-grid,.client-grid,.quote-grid,.contact-grid').forEach(element=>{element.classList.add('reveal');observer.observe(element);});}

if(philosophySection&&philosophyCarousel&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const cards=[...philosophyCarousel.querySelectorAll('.philosophy-image')];let center=1;let timer;const render=()=>{cards.forEach((card,i)=>{card.classList.remove('carousel-left','carousel-center','carousel-right','carousel-hidden');if(i===center)card.classList.add('carousel-center');else if(i===(center-1+cards.length)%cards.length)card.classList.add('carousel-left');else if(i===(center+1)%cards.length)card.classList.add('carousel-right');else card.classList.add('carousel-hidden');});};const advance=()=>{center=(center+1)%cards.length;render();};const start=()=>{clearInterval(timer);timer=setInterval(advance,3200)};const stop=()=>clearInterval(timer);philosophySection.addEventListener('mouseenter',stop);philosophySection.addEventListener('mouseleave',start);philosophySection.addEventListener('focusin',stop);philosophySection.addEventListener('focusout',start);render();setTimeout(start,100);}

// Expertise carousel: automatic Forge-style content handoff.
const expertiseSection=document.querySelector('.services');
if(false&&expertiseSection&&tabs.length&&panel&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){let expertiseIndex=tabs.findIndex(tab=>tab.classList.contains('is-active'));let expertiseTimer;const cycleExpertise=()=>{expertiseIndex=(expertiseIndex+1)%tabs.length;panel.classList.add('is-changing');window.setTimeout(()=>{activateTab(tabs[expertiseIndex]);expertiseSection.style.setProperty('--expertise-bg',`url(\"assets/${expertise[tabs[expertiseIndex].dataset.service].image}\")`);panel.classList.remove('is-changing')},420)};const startExpertise=()=>{clearInterval(expertiseTimer);expertiseTimer=window.setInterval(cycleExpertise,4800)};const stopExpertise=()=>clearInterval(expertiseTimer);expertiseSection.addEventListener('mouseenter',stopExpertise);expertiseSection.addEventListener('mouseleave',startExpertise);expertiseSection.addEventListener('focusin',stopExpertise);expertiseSection.addEventListener('focusout',startExpertise);startExpertise();}

// Scroll-driven expertise sequence: pinned section with center-out image reveals.
if(expertiseSection&&tabs.length&&panel&&window.matchMedia('(min-width: 1025px)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  expertiseSection.classList.add('expertise-scroll-slider');
  const imageBox=panel.querySelector('.service-image');
  const image=panel.querySelector('#service-photo');
  const reveal=document.createElement('img');
  reveal.className='expertise-reveal-image';
  reveal.alt='';
  imageBox.appendChild(reveal);
  let current=0;
  let lastStep=0;
  let previousSlide=-1;
  const setSlide=(index,progress=1)=>{
    const tab=tabs[index];
    const data=expertise[tab.dataset.service];
    if(serviceProgress)serviceProgress.style.width=`${(index+1)/tabs.length*100}%`;
    tabs.forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});
    panel.querySelector('.service-number').innerHTML=`<span class="counter-current">${data.number}</span> <span class="counter-total">/ 04</span>`;
    panel.querySelector('h3').textContent=data.title;
    panel.querySelector('p').textContent=data.text;
    panel.querySelector('.service-list').replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    const revealSrc='assets/'+data.image;
    const shouldAnimate=previousSlide>=0 && previousSlide!==index;
    if(shouldAnimate){
      reveal.style.transition='none';
      reveal.style.clipPath='inset(50% 50% 50% 50%)';
    }
    if(!reveal.src.endsWith(revealSrc)) reveal.src=revealSrc;
    if(shouldAnimate){
      requestAnimationFrame(()=>{
        reveal.style.transition='clip-path .7s cubic-bezier(.22,.61,.36,1)';
        reveal.style.clipPath='inset(0)';
      });
    }else{
      reveal.style.clipPath=`inset(${50*(1-progress)}% ${50*(1-progress)}% ${50*(1-progress)}% ${50*(1-progress)})`;
    }
    previousSlide=index;
    panel.setAttribute('aria-labelledby',tab.id);
    transitionExpertiseBackground(data);
    image.alt=data.alt;
  };
  const updateScroll=()=>{
    const rect=expertiseSection.getBoundingClientRect();
    const availableTravel=expertiseSection.offsetHeight-window.innerHeight;
    if(availableTravel<=2)return;
    const travel=availableTravel;
    const progress=Math.min(1,Math.max(0,-rect.top/travel));
    const raw=progress*tabs.length;
    const step=Math.min(tabs.length-1,Math.floor(raw));
    const local=step===tabs.length-1?1:raw-step;
    if(step!==lastStep){current=step;setSlide(step,1);}
    lastStep=step;
  };
  setSlide(0,1);
  window.addEventListener('scroll',updateScroll,{passive:true});
  window.addEventListener('resize',updateScroll);
  updateScroll();
  const expertiseVisibility=new IntersectionObserver(entries=>{
    entries.forEach(entry=>expertiseSection.classList.toggle('is-expertise-active',entry.isIntersecting));
  },{threshold:0.1});
  expertiseVisibility.observe(expertiseSection);
}

const experimentSection=document.querySelector('.services-experiment');
if(experimentSection){
  let experimentSlide=0;
  const experimentCopy=experimentSection.querySelector('.service-copy')||experimentSection.querySelector('.service-panel>div:nth-child(2)');
  const experimentImage=experimentSection.querySelector('img');
  const experimentNumber=experimentSection.querySelector('.service-number');
  const showExperimentSlide=index=>{
    const key=index?'design':'story'; const data=expertise[key]; experimentSlide=index;
    if(experimentNumber)experimentNumber.innerHTML=`<span class="counter-current">${data.number}</span> <span class="counter-total">/ 04</span>`;
    if(experimentCopy){experimentCopy.querySelector('h3').textContent=data.title;experimentCopy.querySelector('p').textContent=data.text;experimentCopy.querySelector('.service-list').replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}
    if(experimentImage)experimentImage.src='assets/'+data.image;
  };
  experimentSection.addEventListener('wheel',event=>{if(event.deltaY>0&&experimentSlide===0)showExperimentSlide(1);if(event.deltaY<0&&experimentSlide===1)showExperimentSlide(0);},{passive:true});
}

// Section 4 only: pinned scroll-driven project handoff.
const workSection=document.querySelector('#work');
const workProject=workSection?.querySelector('.project-large');
if(workSection&&workProject&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  workSection.classList.add('work-scroll-stage');
  const workImage=workProject.querySelector('.project-image img');
  const workTitle=workProject.querySelector('.project-meta h3');
  const workIndex=workProject.querySelector('.featured-index');
  const workCopy=workProject.querySelector('.featured-side p');
  const workSlides=[
    {image:'unsplash/pablo-heimplatz.jpg',index:'01 / Selected work',title:'A story brought to life',copy:'Eventoria carries each idea from the first conversation to the final cue, shaping live experiences with clarity, craft and cultural intelligence.'},
    {image:'unsplash/chuttersnap.jpg',index:'02 / Design direction',title:'Make the idea tangible.',copy:'We translate the story into an experience with spatial, scenic and sculptural design that gives every moment a clear role.'},
    {image:'unsplash/evangeline-shaw.jpg',index:'03 / Show direction',title:'Bring the story to life.',copy:'Performance, light, sound and content come together in a carefully directed live experience that moves the audience.'}
  ];
  let active=-1;
  const renderWorkSlide=index=>{
    if(index===active)return;
    active=index;
    workProject.classList.remove('is-work-copy-changing');
    void workProject.offsetWidth;
    workProject.classList.add('is-work-copy-changing');
    window.setTimeout(()=>workProject.classList.remove('is-work-copy-changing'),800);
    const slide=workSlides[index];
    workImage.classList.remove('is-work-revealed');
    workImage.style.transform='translateY(100%)';
    window.setTimeout(()=>{workImage.onload=()=>workImage.classList.add('is-work-revealed');workImage.src='assets/'+slide.image},120);
    if(workIndex)workIndex.textContent=slide.index;
    if(workTitle)workTitle.textContent=slide.title;
    if(workCopy)workCopy.textContent=slide.copy;
  };
  const updateWork=()=>{
    const rect=workSection.getBoundingClientRect();
    const span=Math.max(1,workSection.offsetHeight-window.innerHeight);
    const progress=Math.min(1,Math.max(0,-rect.top/span));
    renderWorkSlide(Math.min(workSlides.length-1,Math.floor(progress*workSlides.length)));
    if(workImage.classList.contains('is-work-revealed')){
      const drift=((progress*workSlides.length)%1)*-120;
      workImage.style.transform=`translateY(${drift}px)`;
    }
  };
  renderWorkSlide(0);
  window.addEventListener('scroll',updateWork,{passive:true});
  window.addEventListener('resize',updateWork);
}

// Montarville-style pinned achievements motion, scoped to Eventoria Work only.
(() => {
  const section=document.querySelector('.work-showcase');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!section||!section.querySelector('.work-showcase-card')||reduce.matches)return;
  const backdrop=section.querySelector('.work-showcase-backdrop img');
  const card=section.querySelector('.work-showcase-card');
  const cardImage=section.querySelector('#work-card-image');
  const label=section.querySelector('#work-label');
  const title=section.querySelector('#work-title');
  const copy=section.querySelector('#work-copy');
  const slides=[
    {image:'unsplash/chuttersnap.jpg',label:'SELECTED WORK',title:'A story brought to life',copy:'Eventoria carries each idea from the first conversation to the final cue, shaping live experiences with clarity, craft and cultural intelligence.'},
    {image:'unsplash/headway.jpg',label:'INSTITUTIONAL',title:'A room becomes a world.',copy:'Immersive projection, culture and live production come together to make the occasion unforgettable.'},
    {image:'unsplash/noiseporn.jpg',label:'DESTINATION EXPERIENCE',title:'Make the moment glow.',copy:'Atmosphere, movement and audience energy are shaped into a shared live experience.'},
    {image:'unsplash/evangeline-shaw.jpg',label:'LIVE DELIVERY',title:'Carry every detail through the final cue.',copy:'A connected team keeps creative ambition and practical delivery aligned through the final cue.'}
  ];
  let active=-1;
  let ticking=false;
  let changeTimer;
  const setSlide=index=>{
    if(index===active)return;
    active=index;
    const slide=slides[index];
    card.classList.toggle('is-image-visible',index>0);
    section.querySelectorAll('[data-work-slide]').forEach((button,i)=>button.classList.toggle('is-active',i===index));
    card.classList.remove('is-changing');
    section.classList.remove('is-changing');
    void card.offsetWidth;
    card.classList.add('is-changing');
    section.classList.add('is-changing');
    window.clearTimeout(changeTimer);
    changeTimer=window.setTimeout(()=>{backdrop.src='assets/'+slide.image;cardImage.src='assets/'+slide.image;label.textContent=slide.label;title.textContent=slide.title;copy.textContent=slide.copy;card.classList.remove('is-changing');section.classList.remove('is-changing');},260);
  };
  const update=()=>{
    const rect=section.getBoundingClientRect();
    const introDistance=window.innerHeight*.65;
    const travel=Math.max(1,section.offsetHeight-window.innerHeight);
    const revealProgress=Math.max(0,Math.min(1,-rect.top/introDistance));
    const pinned=rect.top<=-introDistance&&rect.bottom>=window.innerHeight;
    const sequenceTravel=Math.max(1,travel-introDistance);
    const progress=Math.max(0,Math.min(0.999999,(-rect.top-introDistance)/sequenceTravel));
    const raw=progress*slides.length;
    const index=Math.min(slides.length-1,Math.floor(raw));
    const local=raw-index;
    const travelY=Math.max(520,window.innerHeight*1.18);
    const y=index===0?-local*travelY:(1-local)*travelY;
    const introY=(1-revealProgress)*180;
    section.classList.toggle('is-scroll-pinned',pinned);
    setSlide(index);
    section.style.setProperty('--work-card-y',`${y}px`);
    section.style.setProperty('--work-intro-y',`${introY}px`);
    ticking=false;
  };
  const onScroll=()=>{if(!ticking){window.requestAnimationFrame(update);ticking=true;}};
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',update);
  update();
})();

// Isolated banner CTA hover replay: only the two banner buttons are affected.
(() => {
  document.querySelectorAll('.hero-meta-actions .banner-button').forEach((button) => {
    const label = button.querySelector('.button-label');
    let labelAnimation;
    button.addEventListener('pointerenter', () => {
      button.classList.remove('is-text-hovering');
      void button.offsetWidth;
      button.classList.add('is-text-hovering');
      if (!label || !label.animate) return;
      labelAnimation?.cancel();
      labelAnimation = label.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-100%)', offset: .4 },
        { opacity: 0, transform: 'translateY(100%)', offset: .41 },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 700, easing: 'ease', fill: 'both' });
    });
  });
})();

// Work project sequence: swap the background, number and card as each scroll phase advances.
(() => {
  const section=document.querySelector('.work-showcase');
  if(!section)return;
  const background=section.querySelector('.work-reveal-image img');
  const card=section.querySelector('.work-project-card');
  if(!card||!background)return;
  const cardImage=section.querySelector('#work-project-card-image');
  const label=section.querySelector('.work-project-card-top span');
  const title=section.querySelector('.work-project-card-copy h2');
  const copy=section.querySelector('.work-project-card-copy p');
  const numbers=[...section.querySelectorAll('.work-project-index button')];
  const slides=[
    ['unsplash/al-elmes.jpg','SELECTED WORK','A story brought to life','Eventoria carries each idea from the first conversation to the final cue.'],
    ['eventoria-work-02.png','IMMERSIVE EXPERIENCE','A room becomes a world.','Immersive projection, culture and live production come together to make the occasion unforgettable.'],
    ['eventoria-work-03.png','DESTINATION EXPERIENCE','Make the moment glow.','Atmosphere, movement and audience energy are shaped into a shared live experience.'],
    ['eventoria-work-04.png','LIVE DELIVERY','Carry every detail through the final cue.','A connected team keeps creative ambition and practical delivery aligned through the final cue.']
  ];
  let active=0;
  const setSlide=index=>{
    if(index===active)return;
    active=index;
    const [image,tag,heading,description]=slides[index];
    card.classList.remove('is-slide-changing');
    void card.offsetWidth;
    card.classList.add('is-slide-changing');
    background.src='assets/'+image;
    if(cardImage) cardImage.src='assets/'+image;
    label.textContent=tag;
    title.textContent=heading;
    copy.textContent=description;
    numbers.forEach((number,i)=>number.classList.toggle('is-active',i===index));
    window.setTimeout(()=>card.classList.remove('is-slide-changing'),700);
  };
  const update=()=>{
    const rect=section.getBoundingClientRect();
    const travel=Math.max(1,rect.height-window.innerHeight);
    const progress=Math.min(0.999,Math.max(0,(-rect.top)/travel));
    if(window.matchMedia('(min-width: 1025px) and (prefers-reduced-motion: no-preference)').matches) setSlide(Math.min(slides.length-1,Math.floor(progress*slides.length)));
  };
  window.addEventListener('scroll',update,{passive:true});
  numbers.forEach((number,index)=>number.addEventListener('click',()=>{setSlide(index);if(matchMedia('(min-width:1025px) and (prefers-reduced-motion:no-preference)').matches){const travel=section.offsetHeight-innerHeight;scrollTo({top:section.getBoundingClientRect().top+scrollY+travel*((index+.35)/slides.length),behavior:'smooth'});}}));
  update();
})();

// First Work-section reveal: the full-width image rises from below on entry.
(() => {
  const section=document.querySelector('.work-showcase');
  const image=section?.querySelector('.work-reveal-image');
  if(!section||!image)return;
  let cardReadyTimer;
  const reveal=(visible)=>{
    window.clearTimeout(cardReadyTimer);
    section.classList.toggle('is-revealed',visible);
    section.classList.toggle('is-card-ready',false);
    if(visible) cardReadyTimer=window.setTimeout(()=>section.classList.add('is-card-ready'),900);
  };
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){reveal(false);}
  const observer=new IntersectionObserver(entries=>{const entry=entries[0];reveal(entry.isIntersecting);},{threshold:.16});
  observer.observe(section);
})();

const originalProof=document.querySelector('.proof:not(.proof-experiment)');
if(originalProof){
  const preview=originalProof.querySelector('.proof-hover-image img');
  const previewCopy=originalProof.querySelector('.proof-hover-copy');
  let previewTimer;
  originalProof.querySelectorAll('.proof-points>div').forEach((item,index)=>item.addEventListener('mouseenter',()=>{
    window.clearTimeout(previewTimer);
    const updatePreview=()=>{
      if(preview)preview.src=['assets/unsplash/headway.jpg','assets/unsplash/chuttersnap.jpg','assets/unsplash/evangeline-shaw.jpg'][index];
      if(previewCopy){previewCopy.querySelector('small').textContent=item.querySelector('small')?.textContent||(index===0?'DIRECTION':'');previewCopy.querySelector('h3').textContent=item.dataset.cardHeading||item.querySelector('h3')?.textContent||'';previewCopy.querySelector('span').textContent=item.dataset.cardCopy||item.querySelector('span')?.textContent||'';}
    };
    previewTimer=(index===1||index===2)?window.setTimeout(updatePreview,200):updatePreview();
  }));
}
if(originalProof){originalProof.querySelectorAll('.proof-points>div').forEach(item=>{item.addEventListener('mouseenter',()=>originalProof.classList.add('is-proof-preview-visible'));item.addEventListener('mouseleave',()=>originalProof.classList.remove('is-proof-preview-visible'));});}

// Core Idea follow-on reveal: text enters first, then surrounding project images.
const coreIdea = document.querySelector('#core-idea');
if (coreIdea && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const coreIdeaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.setTimeout(() => coreIdea.classList.add('is-quote-active'), 420);
        coreIdeaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .35 });
  coreIdeaObserver.observe(coreIdea);
} else if (coreIdea) {
  coreIdea.classList.add('is-quote-active');
}

// Core Idea scroll scene is isolated to this section only.
(() => {
  const scene = document.querySelector('#core-idea');
  if (!scene || window.matchMedia('(max-width: 1024px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...scene.querySelectorAll('.quote-gallery figure')];
  let ticking = false;
  const updateCoreScene = () => {
    const rect = scene.getBoundingClientRect();
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    scene.style.setProperty('--core-progress', progress.toFixed(3));
    cards.forEach((card, index) => {
      const start = 0;
      const local = Math.max(0, Math.min(1, (progress - start) / 0.42));
      const angle = [-8, 6, 5, -7, 7, -5, -4, 4, 5, -5, -3, 3, 5, -5][index] || 0;
      const x = [-35, -25, 25, 35, -35, 35, -20, 20, -30, 30, -20, 20, -20, 20][index] || 0;
      const centerX = (scene.clientWidth / 2) - (card.offsetLeft + card.offsetWidth / 2);
      const centerY = (window.innerHeight * .58) - (card.offsetTop + card.offsetHeight / 2);
      const y = centerY * (1 - local);
      const initialScale = [.62, 1.12, .72, 1.18, .78, .94, 1.22, .68, .86, 1.08][index] || .82;
      const sizeBoost = [1, 1.12, 1, 1, 1, 1, 1.16, 1, 1, 1.08][index] || 1;
      const scale = initialScale + (.18 * local * sizeBoost);
      const exitStart = .56;
      const exitProgress = Math.max(0, Math.min(1, (progress - exitStart) / (1 - exitStart)));
      const exit = exitProgress * exitProgress * (3 - (2 * exitProgress));
      const fade = local * local * (3 - (2 * local));
      card.style.opacity = String(Math.min(1, fade * 1.25) * (1 - exit));
      card.style.clipPath = `inset(${50 * (1 - local)}% ${50 * (1 - local)}% ${50 * (1 - local)}% ${50 * (1 - local)}% round 0)`;
      card.style.filter = `blur(${Math.max(0, (1 - local) * 4)}px)`;
      const exitX = (x < 0 ? -1 : 1) * exit * 260;
      const exitY = [ -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, 1 ][index] || -1;
      card.style.transform = `translate(${centerX * (1 - local) + exitX}px, ${y + (exitY * exit * 220)}px) rotate(${angle * (1 - local)}deg) scale(${scale + (exit * .7)})`;
    });
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { window.requestAnimationFrame(updateCoreScene); ticking = true; } };
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', updateCoreScene);
  updateCoreScene();
})();


// Footer wordmark reveal, isolated to the footer.
(() => {
  const socialTitle = document.querySelector('#social-title');
  if (socialTitle && !socialTitle.querySelector('span')) {
    socialTitle.innerHTML = 'Moments from the <span>work.</span>';
  }
  document.querySelectorAll('.service-tabs .tab').forEach((tab) => {
    tab.textContent = tab.textContent.replace(/^\s*\d+\s*\/\s*/, '');
  });

  const footer = document.querySelector('.site-footer');
  const contact = document.querySelector('.contact');
  const wordmark = document.querySelector('.footer-reference-word');
  if (!footer || !wordmark || !('IntersectionObserver' in window)) return;

  wordmark.addEventListener('pointerenter', () => {
    wordmark.classList.add('is-pointer-active');
  });
  wordmark.addEventListener('pointermove', (event) => {
    const rect = wordmark.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    wordmark.style.setProperty('--pointer-x', `${pointerX}px`);
    wordmark.style.setProperty('--pointer-y', `${pointerY}px`);
    wordmark.querySelectorAll('span').forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const letterX = letterRect.left - rect.left + letterRect.width / 2;
      const letterY = letterRect.top - rect.top + letterRect.height / 2;
      const distance = Math.hypot(pointerX - letterX, pointerY - letterY);
      const intensity = Math.max(0, 1 - distance / 260);
      letter.style.color = `rgba(169, 212, 229, ${0.1 + intensity * 0.9})`;
      letter.style.textShadow = intensity > 0 ? `0 0 ${Math.round(intensity * 18)}px rgba(62,146,172,${intensity * 0.65})` : 'none';
    });
  });
  wordmark.addEventListener('pointerleave', () => {
    wordmark.classList.remove('is-pointer-active');
    wordmark.querySelectorAll('span').forEach((letter) => {
      letter.style.color = '';
      letter.style.textShadow = '';
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    footer.classList.add('is-footer-visible');
    return;
  }
  const visibleTargets = new Set();
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) visibleTargets.add(entry.target);
    else visibleTargets.delete(entry.target);
    footer.classList.toggle('is-footer-visible', visibleTargets.size > 0);
  }, { threshold: 0.08 });
  if (contact) observer.observe(contact);
  observer.observe(footer);
})();
document.querySelector('.hero h1 em')?.childNodes[0] && (document.querySelector('.hero h1 em').childNodes[0].textContent = document.querySelector('.hero h1 em').childNodes[0].textContent.replace(/\.$/,''));
const aboutHeading = document.querySelector('#about-editorial-title strong:last-child');
if (aboutHeading?.lastChild?.nodeType === Node.TEXT_NODE) aboutHeading.lastChild.textContent = aboutHeading.lastChild.textContent.replace(/\.$/,'');

