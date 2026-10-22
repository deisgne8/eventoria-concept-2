// Keep project layers inside one sticky viewport so they leave with the section.
(() => {
  const services=document.querySelector('#services');
  const heading=services?.querySelector('.services-heading-clone');
  const container=services?.querySelector('.layout-container');
  if(heading&&container)container.prepend(heading);
  const tabs=services?.querySelector('.service-tabs');
  const copy=services?.querySelector('.service-panel>div:nth-child(2)');
  if(tabs&&copy)copy.prepend(tabs);
  const work=document.querySelector('.work-showcase');
  if(!work)return;
  const viewport=document.createElement('div');
  viewport.className='work-scroll-viewport';
  viewport.append(...work.childNodes);
  work.append(viewport);
})();
