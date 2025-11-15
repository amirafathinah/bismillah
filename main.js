// Simple interactions: playable mock, progress, horizontal scroll by mouse drag
(() => {
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const progressWrap = document.getElementById('progressWrap');
let playing = false;
let progressVal = 0;
let timer = null;


playBtn.addEventListener('click', () => {
playing = !playing;
playBtn.textContent = playing ? '⏸' : '▶️';
if (playing) startProgress(); else stopProgress();
});


function startProgress(){
stopProgress();
timer = setInterval(()=>{
progressVal = Math.min(100, progressVal + 0.7);
progress.value = progressVal;
if(progressVal >= 100){
stopProgress();
playing = false; playBtn.textContent = '▶️'; progressVal = 0; progress.value = 0;
}
}, 300);
}
function stopProgress(){ if(timer){ clearInterval(timer); timer=null }}


// click a card to 'play' — simulate change of metadata
document.querySelectorAll('.card').forEach(card=>{
card.addEventListener('click', ()=>{
document.querySelectorAll('.card').forEach(c=>c.style.opacity=1);
card.style.opacity = 0.95;
const title = card.querySelector('h3')?.textContent || card.querySelector('h4')?.textContent || 'Unknown';
document.querySelector('.player .title').textContent = title;
});
});


// horizontal drag scroll for card rows
document.querySelectorAll('.card-row').forEach(row=>{
let isDown=false, startX, scrollLeft;
row.addEventListener('mousedown',(e)=>{isDown=true;row.classList.add('dragging');startX=e.pageX-row.offsetLeft;scrollLeft=row.scrollLeft});
row.addEventListener('mouseleave',()=>{isDown=false;row.classList.remove('dragging')});
row.addEventListener('mouseup',()=>{isDown=false;row.classList.remove('dragging')});
row.addEventListener('mousemove',(e)=>{if(!isDown) return; e.preventDefault(); const x=e.pageX-row.offsetLeft; const walk=(x-startX)*1.2; row.scrollLeft = scrollLeft - walk;});
});


// small accessibility: keyboard play
document.addEventListener('keydown', (e) => {
if(e.code === 'Space'){ e.preventDefault(); playBtn.click(); }
});
})();
