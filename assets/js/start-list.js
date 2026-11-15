/* start-list.js — comp-dashboard «start-list» page script. */
// nav scroll state
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* ============================================================
   FINALS start lists (مرحله نهایی) — نوجوانان C و D.
   Single climbing order per gender, with a توضیحات column.
   Each category carries its own قرنطینه / شروع timing.
   ============================================================ */
const CATS = ['نوجوانان C','نوجوانان D'];
const FINALS = {
  'نوجوانان C':{
    time:{ open:'۱۷:۰۰', close:'۱۷:۳۰', start:'۱۹:۰۰' },
    'پسران':[
      {number:348, name:'علی باقری زاده'},
      {number:346, name:'رهام عباس قربانی'},
      {number:341, name:'اهورا چاه تل'},
      {number:358, name:'پرهام پورزمانی'},
      {number:350, name:'ایلیا صراطی'},
      {number:353, name:'رادمان تاجیک'},
      {number:345, name:'كیان امیری راد'},
      {number:344, name:'ایلیا داورمعین'},
    ],
    'دختران':[
      {number:319, name:'روشا رادپوی'},
      {number:312, name:'ضحی زرندی'},
      {number:329, name:'الینا سامی'},
      {number:330, name:'یسنا مهرابی'},
      {number:322, name:'مهروماه محمودی'},
      {number:323, name:'النا شیری'},
      {number:333, name:'حلما میرتقی'},
      {number:337, name:'شیدا صالحی'},
    ],
  },
  'نوجوانان D':{
    time:{ open:'۱۷:۰۰', close:'۱۷:۳۰', start:'۱۸:۰۰' },
    'پسران':[
      {number:292, name:'مهیار عبادی فرد'},
      {number:296, name:'رایان بشیری'},
      {number:287, name:'باراد شهاب'},
      {number:289, name:'محمدطاها وادیپور'},
      {number:299, name:'امیررایان صدرعاملی'},
      {number:285, name:'حسین کریمی آتانی'},
      {number:300, name:'محمدحسن میرتقی'},
      {number:282, name:'راستین خانپور'},
    ],
    'دختران':[
      {number:252, name:'نورا مرعشیان'},
      {number:261, name:'لی لی زرگر هارطونیان'},
      {number:275, name:'السا اعتمادی فر'},
      {number:266, name:'باران حفاری'},
      {number:270, name:'حسنا گودرزی'},
      {number:260, name:'زهراسادات حسینی'},
      {number:265, name:'تانیا نجفی پور'},
      {number:263, name:'نیلا اکبری'},
    ],
  },
};

const toFa = n => String(n).replace(/\d/g, d=>'۰۱۲۳۴۵۶۷۸۹'[d]);

const state = { cat:null, gender:'پسران' };
let step = 0;   // 0 pick category · 1 finals table (gender toggle)
const view = document.getElementById('view');
const crumbsEl = document.getElementById('crumbs');

const chevron = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>';

function choiceCard(label, onClick){
  const b = document.createElement('button');
  b.className='choice';
  b.innerHTML = '<span>'+label+'</span><span class="ar">'+chevron+'</span>';
  b.addEventListener('click', onClick);
  return b;
}

function buildFinalsTable(rows){
  const sec=document.createElement('div');
  sec.className='route';
  let html='<div class="route-head"><span class="rl">استارت لیست فینال</span></div>';
  html+='<table class="sl-table sl-finals"><thead><tr>'+
    '<th class="c-idx">ردیف</th><th class="c-name">نام و نام خانوادگی</th><th class="c-num">شماره</th><th class="c-note">توضیحات</th>'+
    '</tr></thead><tbody>';
  rows.forEach((r,i)=>{
    html+='<tr><td class="c-idx">'+toFa(i+1)+'</td><td class="c-name">'+r.name+'</td><td class="c-num">'+toFa(r.number)+'</td><td class="c-note"></td></tr>';
  });
  html+='</tbody></table>';
  sec.innerHTML=html;
  return sec;
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

function render(){
  renderCrumbs();
  if(step===0){
    const box=document.createElement('div');
    box.className='step';
    box.innerHTML='<div class="step-q">رده‌ی سنی را انتخاب کن</div>';
    const grid=document.createElement('div');
    grid.className='choices';
    CATS.forEach(c=> grid.appendChild(choiceCard(c, ()=>{ state.cat=c; step=1; render(); })) );
    box.appendChild(grid);
    view.innerHTML=''; view.appendChild(box);
    return;
  }
  renderTable();
}

function renderTable(){
  const cat = state.cat;
  const data = FINALS[cat];
  const rows = (data && data[state.gender]) || [];
  const box=document.createElement('div');
  box.className='result';

  const head=document.createElement('div');
  head.className='result-head';
  head.innerHTML =
    '<div class="result-cat">'+
      '<span class="tag tag-cat">'+cat+'</span>'+
      '<span class="tag tag-g">مرحله نهایی</span>'+
    '</div>'+
    '<div class="seg" role="tablist">'+
      '<button data-g="پسران" class="'+(state.gender==='پسران'?'on':'')+'">پسران</button>'+
      '<button data-g="دختران" class="'+(state.gender==='دختران'?'on':'')+'">دختران</button>'+
    '</div>';
  head.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{state.gender=b.dataset.g;render();}));
  box.appendChild(head);

  const count=document.createElement('div');
  count.className='result-count';
  count.innerHTML='<span class="dot"></span> '+toFa(rows.length)+' فینالیست · '+state.gender;
  box.appendChild(count);

  const t=data.time;
  const meta=document.createElement('div');
  meta.className='sl-meta';
  meta.innerHTML='<span>باز شدن قرنطینه <b>'+t.open+'</b></span>'+
    '<span>بسته شدن قرنطینه <b>'+t.close+'</b></span>'+
    '<span>شروع مسابقه <b>'+t.start+'</b></span>';
  box.appendChild(meta);

  box.appendChild(buildFinalsTable(rows));

  const foot=document.createElement('div');
  foot.className='result-foot';
  foot.innerHTML='<button class="btn-back"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3"/><path d="M3 4v4h4"/></svg> انتخاب رده‌ی دیگر</button>';
  foot.querySelector('button').addEventListener('click',()=>{ step=0; state.cat=null; render(); });
  box.appendChild(foot);

  view.innerHTML=''; view.appendChild(box);
}

render();
