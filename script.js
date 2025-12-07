// UniLink popup toggle
const helpIcon = document.getElementById('help-icon');
const unilinkPopup = document.getElementById('unilink-popup');
if (helpIcon) helpIcon.addEventListener('click', () => {
  unilinkPopup.style.display = unilinkPopup.style.display === 'block' ? 'none' : 'block';
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});
document.querySelectorAll('.project, .hero-text, .project-image, .tech-arsenal').forEach(el => observer.observe(el));

/* Typing animation for "Welcome to my profile" */
(function typing() {
  const target = document.getElementById('welcome-typing');
  if (!target) return;
  const text = "Welcome to my profile";
  let i = 0;
  const speed = 70;
  function typeChar() {
    if (i <= text.length) {
      target.textContent = text.slice(0, i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      target.classList.add('typed');
    }
  }
  setTimeout(typeChar, 500);
})();

/* Skill tree pulse animation */
(function(){
  const svg = document.getElementById('skill-net');
  const pulse = document.getElementById('pulse');
  if (!svg || !pulse) return;
  function svgPointToScreen(pt) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scaleX = rect.width / vb.width;
    const scaleY = rect.height / vb.height;
    return { x: rect.left + (pt.x - vb.x) * scaleX, y: rect.top + (pt.y - vb.y) * scaleY };
  }
  function endpointOfPath(id, t=1) {
    const path = svg.querySelector(`#${id}`);
    if (!path || !path.getTotalLength) return null;
    const len = path.getTotalLength();
    return path.getPointAtLength(len * t);
  }
  function placeIcons() {
    const items = document.querySelectorAll('.tech-item');
    const vb = svg.viewBox.baseVal;
    items.forEach(it => {
      const pathId = it.dataset.path;
      const pt = endpointOfPath(pathId, 1);
      if (!pt) return;
      const screen = svgPointToScreen(pt);
      const offsetX = (pt.x < vb.width * 0.5) ? -84 : 40;
      it.style.left = (screen.x + offsetX) + 'px';
      it.style.top = (screen.y - 24) + 'px';
    });
  }
  function buildPulseRoute() {
    const base = svg.querySelector('#base');
    const points = [];
    const baseLen = base.getTotalLength();
    const baseSamples = 140;
    for (let i=0;i<=baseSamples;i++){
      const p = base.getPointAtLength(baseLen * (i/baseSamples));
      points.push({x:p.x,y:p.y});
    }
    const extras = ['pA','pB','pC','pD','pE'];
    extras.forEach(id => {
      const path = svg.querySelector(`#${id}`);
      if (!path) return;
      const len = path.getTotalLength();
      const samp = 18;
      for (let i=0;i<=samp;i++){
        const t = i/samp;
        const p = path.getPointAtLength(len * t);
        points.push({x:p.x,y:p.y});
      }
      for (let i=samp;i>=0;i--){
        const t = i/samp;
        const p = path.getPointAtLength(len * t);
        points.push({x:p.x,y:p.y});
      }
    });
    return points;
  }
  function animatePulse() {
    const pts = buildPulseRoute();
    if (!pts.length) return;
    let i = 0;
    const total = pts.length;
    function frame(){
      const p = pts[i % total];
      pulse.setAttribute('cx', p.x);
      pulse.setAttribute('cy', p.y);
      const r = 6 + 1.8 * Math.sin(i/9);
      pulse.setAttribute('r', r);
      i = (i + 1) % total;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function init() { placeIcons(); animatePulse(); }
  window.addEventListener('load', init);
  window.addEventListener('resize', placeIcons);
  window.addEventListener('scroll', placeIcons);
})();

/* GitHub Stats */
(function(){
  const username = 'KavinEditors';
  const totalEl = document.getElementById('total-projects');
  const followersEl = document.getElementById('followers');
  const commitEl = document.getElementById('commit-count');
  const GITHUB_TOKEN = '';
  async function fetchJSON(url){
    const headers = {};
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('GitHub API error ' + res.status);
    return res.json();
  }
  function animateCounter(el, to){
    if (!el) return;
    const steps = Math.ceil(900 / 16);
    let cur = 0; let i=0;
    const inc = (to - cur)/steps;
    const t = setInterval(()=>{
      cur += inc; i++;
      el.innerText = Math.floor(cur).toLocaleString();
      if (i>=steps){ clearInterval(t); el.innerText = to.toLocaleString(); }
    }, 16);
  }
  async function loadStats(){
    try {
      const user = await fetchJSON(`https://api.github.com/users/${username}`);
      const repos = await fetchJSON(`https://api.github.com/users/${username}/repos?per_page=100`);
      animateCounter(totalEl, repos.length || 0);
      animateCounter(followersEl, user.followers || 0);
      let commitSum = 0;
      for (let r of repos){
        try {
          const contribs = await fetchJSON(`https://api.github.com/repos/${username}/${r.name}/contributors?per_page=100`);
          const me = (contribs || []).find(c => c.login && c.login.toLowerCase() === username.toLowerCase());
          if (me) commitSum += (me.contributions || 0);
        } catch (e) {}
      }
      commitEl.innerText = commitSum ? commitSum.toLocaleString() : '—';
    } catch (e) {
      console.warn('GitHub stats failed', e);
      if (totalEl) totalEl.innerText = '—';
      if (followersEl) followersEl.innerText = '—';
      if (commitEl) commitEl.innerText = '—';
    }
  }
  window.addEventListener('load', loadStats);
})();
