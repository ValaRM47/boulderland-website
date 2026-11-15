/* videos.js — comp-dashboard «videos» page script. */
// nav scroll state
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* ============================================================
   Route videos — two routes (مسیر ۱ / مسیر ۲) per category + gender,
   vertical 9:16 mp4. Replace TEST_VIDEO / each "src" with the real
   clip when ready; leave src empty ('') to show a "coming soon" card.
   To add نوجوانان later, uncomment the block below and add the two
   categories back to CAT_ORDER.
   ============================================================ */
const V_AF2     = 'https://www.boulderland.ir/wp-content/uploads/2026/10/AF2.mp4';      // نونهالان A دختران مسیر ۲
const V_AM1_BM2 = 'https://www.boulderland.ir/wp-content/uploads/2026/10/AM1-BM2.mp4';  // A پسران مسیر ۱ + B پسران مسیر ۲
const V_AM2     = 'https://www.boulderland.ir/wp-content/uploads/2026/10/AM2.mp4';      // نونهالان A پسران مسیر ۲
const V_BF1_AF1 = 'https://www.boulderland.ir/wp-content/uploads/2026/10/BF1-AF1.mp4';  // B دختران مسیر ۱ + A دختران مسیر ۱
const V_BF1     = 'https://www.boulderland.ir/wp-content/uploads/2026/10/BF1.mp4';      // نونهالان B دختران مسیر ۱
const V_BM1     = 'https://www.boulderland.ir/wp-content/uploads/2026/10/BM1.mp4';      // نونهالان B پسران مسیر ۱
const ROUTE_VIDEOS = {
  'نونهالان A':{
    'پسران': [ {title:'مسیر ۱', src:V_AM1_BM2}, {title:'مسیر ۲', src:V_AM2} ],
    'دختران': [ {title:'مسیر ۱', src:V_BF1_AF1}, {title:'مسیر ۲', src:V_AF2} ],
  },
  'نونهالان B':{
    'پسران': [ {title:'مسیر ۱', src:V_BM1},      {title:'مسیر ۲', src:V_AM1_BM2} ],
    'دختران': [ {title:'مسیر ۱', src:V_BF1},      {title:'مسیر ۲', src:V_BF1_AF1} ],
  },
  // 'نوجوانان C':{ 'پسران':[ {title:'مسیر ۱',src:''},{title:'مسیر ۲',src:''} ], 'دختران':[ {title:'مسیر ۱',src:''},{title:'مسیر ۲',src:''} ] },
  // 'نوجوانان D':{ 'پسران':[ {title:'مسیر ۱',src:''},{title:'مسیر ۲',src:''} ], 'دختران':[ {title:'مسیر ۱',src:''},{title:'مسیر ۲',src:''} ] },
};
const CAT_ORDER = ['نونهالان A','نونهالان B'];

/* ============================================================
   Wizard: رده سنی  →  video view (gender toggle + 2 videos)
   ============================================================ */
const state = { cat:null, gender:'پسران' };
let step = 0;   // 0 = pick category (نونهالان A / B) · 1 = video
const view = document.getElementById('view');
const crumbsEl = document.getElementById('crumbs');

const chevron = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>';
const playIco = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const toFa = n => String(n).replace(/\d/g, d=>'۰۱۲۳۴۵۶۷۸۹'[d]);

function choiceCard(label, onClick){
  const b = document.createElement('button');
  b.className='choice';
  b.innerHTML = '<span>'+label+'</span><span class="ar">'+chevron+'</span>';
  b.addEventListener('click', onClick);
  return b;
}

function render(){
  renderCrumbs();
  if(step===0){
    const box=document.createElement('div'); box.className='step';
    box.innerHTML='<div class="step-q">رده‌ی سنی را انتخاب کن</div>';
    const grid=document.createElement('div'); grid.className='choices';
    CAT_ORDER.forEach(c=>{
      grid.appendChild(choiceCard(c, ()=>{ state.cat=c; step=1; render(); }));
    });
    box.appendChild(grid);
    view.innerHTML=''; view.appendChild(box);
  } else {
    renderVideos();
  }
}

function renderCrumbs(){
  crumbsEl.innerHTML='';
  if(step>=1 && state.cat){
    const c=document.createElement('button');
    c.className='crumb';
    c.innerHTML = state.cat + ' <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    c.addEventListener('click',()=>{ step=0; state.cat=null; render(); });
    crumbsEl.appendChild(c);
  }
}

function renderVideos(){
  const vids = ROUTE_VIDEOS[state.cat][state.gender];
  const box=document.createElement('div'); box.className='result';

  const head=document.createElement('div'); head.className='result-head';
  head.innerHTML =
    '<div class="result-cat">'+
      '<span class="tag tag-cat">'+state.cat+'</span>'+
      '<span class="tag tag-g">ویدیو مسیرها</span>'+
    '</div>'+
    '<div class="seg" role="tablist">'+
      '<button data-g="پسران" class="'+(state.gender==='پسران'?'on':'')+'">پسران</button>'+
      '<button data-g="دختران" class="'+(state.gender==='دختران'?'on':'')+'">دختران</button>'+
    '</div>';
  head.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{state.gender=b.dataset.g;render();}));
  box.appendChild(head);

  const grid=document.createElement('div'); grid.className='vgrid';
  vids.forEach((v,i)=>{
    const card=document.createElement('div'); card.className='vcard';
    if(v.src){
      card.innerHTML =
        '<div class="vwrap">'+
          '<video controls playsinline preload="none"><source src="'+v.src+'" type="video/mp4"></video>'+
          '<button class="vplay" type="button" aria-label="پخش ویدیو">'+playIco+'</button>'+
        '</div>'+
        '<div class="vtitle"><span class="n">۰'+toFa(i+1)+'</span> '+v.title+'</div>';
    } else {
      card.innerHTML =
        '<div class="vwrap"><div class="vph">'+
          '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m10 9 5 3-5 3z"/></svg>'+
          '<span>ویدیو به‌زودی اضافه می‌شود</span>'+
        '</div></div>'+
        '<div class="vtitle"><span class="n">۰'+toFa(i+1)+'</span> '+v.title+'</div>';
    }
    grid.appendChild(card);
  });
  box.appendChild(grid);

  const foot=document.createElement('div'); foot.className='result-foot';
  foot.innerHTML='<button class="btn-back"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3"/><path d="M3 4v4h4"/></svg> انتخاب رده‌ی دیگر</button>';
  foot.querySelector('button').addEventListener('click',()=>{ step=0; state.cat=null; render(); });
  box.appendChild(foot);

  view.innerHTML=''; view.appendChild(box);

  // wire play buttons: click to play, hide while playing
  box.querySelectorAll('.vwrap').forEach(w=>{
    const v=w.querySelector('video'), btn=w.querySelector('.vplay');
    if(!v||!btn)return;
    btn.addEventListener('click',()=>{ v.play().catch(()=>{}); });
    v.addEventListener('play',()=>w.classList.add('playing'));
    v.addEventListener('pause',()=>w.classList.remove('playing'));
    v.addEventListener('ended',()=>w.classList.remove('playing'));
  });
}

render();
