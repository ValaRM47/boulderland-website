/* courses.js — دوره‌ها page: renders course cards & testimonials, status filter, count-up, testimonial carousel. */
const toFa = n => String(n).replace(/\d/g, d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const faPrice = n => toFa(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));

/* ============================================================
   COURSES — edit this array to add / change / reorder courses.
   status: 'open'  = در حال ثبت‌نام   · 'live' = در حال برگزاری
           'soon'  = به‌زودی          · 'done' = برگزار شده
   price: number in تومان, or 0 / 'رایگان' for free.
   ============================================================ */
const COURSES = [
  { name:'دوره مقدماتی سنگ‌نوردی', start:'۱ آذر ۱۴۰۵', prereq:'ندارد',         coach:'کسری روحانی', price:3500000, status:'open' },
  { name:'دوره ایمنی و کار با طناب', start:'۲۰ آذر ۱۴۰۵', prereq:'ندارد',         coach:'حسین لک',      price:1800000, status:'open' },
  { name:'دوره بولدرینگ و تکنیک',   start:'۱۰ آبان ۱۴۰۵', prereq:'آشنایی اولیه',  coach:'امیرحسین',    price:3200000, status:'live' },
  { name:'دوره پیشرفته‌ی لید',       start:'۱۵ آذر ۱۴۰۵', prereq:'دوره‌ی مقدماتی', coach:'علی مقنی',     price:4800000, status:'soon' },
  { name:'دوره کودکان و نونهالان',   start:'۲۵ آذر ۱۴۰۵', prereq:'۶ تا ۱۲ سال',   coach:'تیم بلدرلند',  price:2800000, status:'open' },
  { name:'دوره مربیگری درجه ۳',      start:'۵ مهر ۱۴۰۵',   prereq:'دوره‌ی پیشرفته', coach:'مهدی رستمی',   price:6500000, status:'done' },
];

const STATUS = {
  open:{ label:'در حال ثبت‌نام', cls:'open', cta:'ثبت‌نام',        enabled:true,  acc:'var(--sand)' },
  live:{ label:'در حال برگزاری', cls:'live', cta:'در حال برگزاری', enabled:false, acc:'rgba(226,194,161,.55)' },
  soon:{ label:'به‌زودی',        cls:'soon', cta:'به‌زودی',        enabled:false, acc:'rgba(231,173,114,.45)' },
  done:{ label:'برگزار شده',     cls:'done', cta:'برگزار شده',     enabled:false, acc:'rgba(246,237,225,.2)' },
};

const spec = (k,v)=>'<div class="spec"><div class="s-k">'+k+'</div><div class="s-v">'+v+'</div></div>';
function priceHtml(p){
  if(!p || p==='رایگان') return '<span class="p-free">رایگان</span>';
  return '<span class="p-amt">'+faPrice(p)+' <span class="toman">تومان</span></span>';
}

function courseCard(c, i){
  const st = STATUS[c.status] || STATUS.open;
  const card = document.createElement('article');
  card.className = 'course reveal';
  card.dataset.status = c.status;
  card.style.setProperty('--acc', st.acc);
  const btn = st.enabled
    ? '<a class="btn btn-primary" href="#">'+st.cta+'<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></a>'
    : '<button class="btn" disabled>'+st.cta+'</button>';
  card.innerHTML =
    '<div class="c-head">'+
      '<span class="c-index">'+toFa(String(i+1).padStart(2,'0'))+'</span>'+
      '<span class="badge '+st.cls+'"><span class="bdot"></span>'+st.label+'</span>'+
    '</div>'+
    '<h3>'+c.name+'</h3>'+
    '<div class="c-specs">'+
      spec('تاریخ شروع', c.start)+
      spec('پیش‌نیاز', c.prereq)+
      spec('مدرس', c.coach)+
    '</div>'+
    '<div class="course-foot">'+
      '<div class="price"><div class="p-k">شهریه دوره</div>'+priceHtml(c.price)+'</div>'+
      btn+
    '</div>';
  return card;
}

const grid = document.getElementById('courseGrid');
COURSES.forEach((c,i)=> grid.appendChild(courseCard(c,i)) );

// status filter (dropdown)
document.getElementById('statusFilter').addEventListener('change', e=>{
  const v = e.target.value;
  grid.querySelectorAll('.course').forEach(card=>{
    card.classList.toggle('is-hidden', v!=='all' && card.dataset.status!==v);
  });
});

/* ============================================================
   TESTIMONIALS — edit this array. stars: 0–5.
   ============================================================ */
const TESTIMONIALS = [
  { stars:5, text:'قبل از دوره فکر می‌کردم سنگ‌نوردی فقط زور بازوست. مربی نشانم داد همه‌چیز درباره‌ی تکنیک و تعادل است. حالا با اعتماد‌به‌نفس لید می‌زنم.', name:'سارا احمدی',   course:'دوره مقدماتی سنگ‌نوردی' },
  { stars:5, text:'فضای تمرین حرفه‌ای، برنامه‌ی منظم و مربی‌ای که واقعاً پیگیر پیشرفتت است. ارزشش را چند برابر داشت.',                               name:'رضا موسوی',    course:'دوره پیشرفته‌ی لید' },
  { stars:4, text:'دوره‌ی بولدرینگ کاملاً سبک حرکتم را عوض کرد. حرکت‌هایی که فکر می‌کردم غیرممکن‌اند حالا برایم عادی شده‌اند.',                   name:'نیلوفر کریمی', course:'دوره بولدرینگ و تکنیک' },
  { stars:5, text:'دخترم عاشق جلسات شده و هر هفته بی‌صبرانه منتظر دوره است. محیط امن و مربیان صبور، دقیقاً همان چیزی که می‌خواستم.',               name:'محمد رادمنش',  course:'دوره کودکان و نونهالان' },
  { stars:5, text:'بخش ایمنی و کار با طناب را هر سنگ‌نوردی باید بگذراند. بعد از این دوره دیگر هیچ‌وقت سر دیواره استرس ندارم.',                     name:'الهام حسینی',  course:'دوره ایمنی و کار با طناب' },
];

function stars(n){
  let s='<div class="stars" aria-label="'+toFa(n)+' از ۵ ستاره">';
  for(let i=1;i<=5;i++){
    s+='<svg class="'+(i<=n?'on':'off')+'" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="1.6"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  }
  return s+'</div>';
}
function tstCard(t){
  const el=document.createElement('article');
  el.className='tst reveal';
  el.innerHTML =
    '<span class="quote-ic"><svg viewBox="0 0 24 24"><path d="M7 7h5v5a5 5 0 0 1-5 5V7zm9 0h5v5a5 5 0 0 1-5 5V7z" transform="scale(1,-1) translate(0,-24)"/></svg></span>'+
    stars(t.stars)+
    '<p class="body">'+t.text+'</p>'+
    '<div class="who">'+
      '<span class="avatar">'+t.name.trim().charAt(0)+'</span>'+
      '<div><div class="name">'+t.name+'</div><div class="course-of">'+t.course+'</div></div>'+
    '</div>';
  return el;
}
const tstGrid=document.getElementById('tstGrid');
TESTIMONIALS.forEach(t=> tstGrid.appendChild(tstCard(t)) );

// reveal on scroll + count-up for stats
const io=new IntersectionObserver((es)=>{
  es.forEach(e=>{
    if(!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll?.('.count').forEach(countUp);
    io.unobserve(e.target);
  })
},{threshold:0.14,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.style.transitionDelay=(i%3*0.06)+'s'; io.observe(el); });

function countUp(el){
  if(el.dataset.done) return; el.dataset.done='1';
  const target=+el.dataset.target, dur=1400, t0=performance.now();
  (function frame(now){
    const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,3);
    el.textContent=toFa(Math.round(target*e));
    if(p<1) requestAnimationFrame(frame);
  })(t0);
}

// testimonials carousel arrows (robust across RTL/LTR scroll models)
(()=>{
  const g=document.getElementById('tstGrid');
  const prev=document.getElementById('tstPrev'), next=document.getElementById('tstNext');
  if(!g||!prev||!next) return;
  const gap=24;
  const step=()=>{const c=g.querySelector('.tst');return (c?c.offsetWidth:320)+gap;};
  function bounds(){
    const snap=g.style.scrollSnapType; g.style.scrollSnapType='none';
    const o=g.scrollLeft; g.scrollLeft=-1e6; const min=g.scrollLeft;
    g.scrollLeft=1e6; const max=g.scrollLeft; g.scrollLeft=o; g.style.scrollSnapType=snap;
    return {min,max};
  }
  let B=bounds(), animating=false;
  const dir=B.min<0?-1:1;
  const clamp=v=>Math.max(B.min,Math.min(B.max,v));
  function animateTo(tgt){
    tgt=clamp(tgt); const s=g.scrollLeft, d=tgt-s;
    if(Math.abs(d)<1){update();return;}
    const dur=420, t0=performance.now(); animating=true; g.style.scrollSnapType='none';
    (function f(now){ const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,3);
      g.scrollLeft=s+d*e;
      if(p<1) requestAnimationFrame(f);
      else{ g.style.scrollSnapType=''; setTimeout(()=>{animating=false;update();},60);} })(t0);
  }
  next.onclick=()=>animateTo(g.scrollLeft+dir*step());
  prev.onclick=()=>animateTo(g.scrollLeft-dir*step());
  function update(){
    if(animating) return;
    const start=dir<0?B.max:B.min, end=dir<0?B.min:B.max;
    prev.disabled=Math.abs(g.scrollLeft-start)<=2;
    next.disabled=Math.abs(g.scrollLeft-end)<=2;
  }
  g.addEventListener('scroll',update,{passive:true});
  addEventListener('resize',()=>{B=bounds();update();});
  update();
})();
