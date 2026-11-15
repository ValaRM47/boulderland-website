/* home.js — homepage only: coaches carousel + visit modal. */
// coaches carousel arrows — custom animator (robust across RTL/LTR scroll models,
// avoids the buggy native smooth-scroll-to-negative-scrollLeft in some engines)
(()=>{
  const grid=document.querySelector('.coach-grid');
  const prev=document.getElementById('coachPrev');
  const next=document.getElementById('coachNext');
  if(!grid||!prev||!next)return;
  const gap=24;
  const step=()=>{const c=grid.querySelector('.coach');return (c?c.offsetWidth:300)+gap;};
  function bounds(){
    const snap=grid.style.scrollSnapType;grid.style.scrollSnapType='none';
    const orig=grid.scrollLeft;
    grid.scrollLeft=-1e6;const min=grid.scrollLeft;
    grid.scrollLeft=1e6;const max=grid.scrollLeft;
    grid.scrollLeft=orig;grid.style.scrollSnapType=snap;
    return {min,max};
  }
  let B=bounds();
  let animating=false;
  const nextDir=B.min<0?-1:1;               // which way "next" moves scrollLeft
  const clamp=v=>Math.max(B.min,Math.min(B.max,v));
  function animateTo(target){
    target=clamp(target);
    const start=grid.scrollLeft,dist=target-start;
    if(Math.abs(dist)<1){update();return;}
    const dur=420,t0=performance.now();
    animating=true;grid.style.scrollSnapType='none';
    (function frame(now){
      const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
      grid.scrollLeft=start+dist*e;
      if(p<1)requestAnimationFrame(frame);
      else{grid.style.scrollSnapType='';setTimeout(()=>{animating=false;update();},60);}
    })(t0);
  }
  next.onclick=()=>animateTo(grid.scrollLeft+nextDir*step());
  prev.onclick=()=>animateTo(grid.scrollLeft-nextDir*step());
  function update(){
    if(animating)return;
    const start=nextDir<0?B.max:B.min,end=nextDir<0?B.min:B.max;
    prev.disabled=Math.abs(grid.scrollLeft-start)<=2;
    next.disabled=Math.abs(grid.scrollLeft-end)<=2;
  }
  grid.addEventListener('scroll',update,{passive:true});
  addEventListener('resize',()=>{B=bounds();update();});
  update();
})();

// visit modal
(()=>{
  const modal=document.getElementById('visitModal');
  if(!modal)return;
  const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  document.querySelectorAll('[data-visit]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open();}));
  document.getElementById('visitClose').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close();});
})();
