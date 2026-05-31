// ── SPLASH + MUZYKA ──
const splash = document.getElementById('splash');
const enterBtn = document.getElementById('splash-enter');
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

enterBtn.addEventListener('click', () => {
  splash.classList.add('hide');
  audio.volume = 0.35;
  audio.play().catch(() => {});
  musicBtn.classList.add('visible');
  document.body.style.overflow = '';
});

// blokuj scroll na splash
document.body.style.overflow = 'hidden';

// toggle muzyki
let playing = true;
const iconOn  = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
const iconOff = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
musicBtn.innerHTML = iconOn;
musicBtn.addEventListener('click', () => {
  if (playing) {
    audio.pause();
    musicBtn.innerHTML = iconOff;
  } else {
    audio.play();
    musicBtn.innerHTML = iconOn;
  }
  playing = !playing;
});

const cursor=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='14px';cursor.style.height='14px';ring.style.width='44px';ring.style.height='44px';});
  el.addEventListener('mouseleave',()=>{cursor.style.width='8px';cursor.style.height='8px';ring.style.width='30px';ring.style.height='30px';});
});

const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>50);});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function animateCounter(el,target,duration){
  let start=null;
  const step=ts=>{
    if(!start)start=ts;
    const progress=Math.min((ts-start)/duration,1);
    el.textContent=Math.floor(progress*target);
    if(progress<1)requestAnimationFrame(step);
    else el.textContent=target;
  };
  requestAnimationFrame(step);
}
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const target=parseInt(el.dataset.target||'0');
      animateCounter(el,target,1800);
      counterObs.unobserve(el);
    }
  });
},{threshold:.5});
const cm=document.getElementById('counter-members');
const ca=document.getElementById('counter-actions');
cm.dataset.target='25';
ca.dataset.target='150';
[cm,ca].forEach(el=>counterObs.observe(el));

document.querySelectorAll('.rank-header').forEach(header=>{
  header.addEventListener('click',()=>{
    const acc=header.parentElement;
    const body=acc.querySelector('.rank-body');
    const isOpen=acc.classList.contains('open');
    document.querySelectorAll('.rank-accordion.open').forEach(other=>{
      if(other!==acc){
        other.classList.remove('open');
        other.querySelector('.rank-body').style.maxHeight='0';
      }
    });
    if(isOpen){
      acc.classList.remove('open');
      body.style.maxHeight='0';
    } else {
      acc.classList.add('open');
      body.style.maxHeight=body.scrollHeight+'px';
    }
  });
});
document.querySelectorAll('.about-img img').forEach(img=>{
  img.addEventListener('load',()=>{
    const ph=document.getElementById('about-placeholder');
    if(ph)ph.style.display='none';
  });
});