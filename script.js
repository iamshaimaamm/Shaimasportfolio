(function(){
  var lis=[].slice.call(document.querySelectorAll('#tabs li'));
  var secs=['home','about','work','contact'].map(function(i){return document.getElementById(i)});
  function spy(){
    var y=110,k=0;
    secs.forEach(function(el,i){if(el.getBoundingClientRect().top<=y)k=i});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)k=3;
    lis.forEach(function(li,i){li.classList.toggle('on',i===k);var a=li.firstElementChild;if(i===k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
  }
  addEventListener('scroll',spy,{passive:true});addEventListener('resize',spy);spy();
  var hero=document.getElementById('home'),art=document.getElementById('art');
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      art.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));
      art.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3));
    });
    hero.addEventListener('pointerleave',function(){art.style.setProperty('--mx',0);art.style.setProperty('--my',0)});
  }
  var c=document.getElementById('copyBtn'),em=document.getElementById('email');
  c.addEventListener('click',function(){
    function done(){c.textContent='Copied';setTimeout(function(){c.textContent='Copy'},1600)}
    function sel(){var r=document.createRange();r.selectNodeContents(em);var s=getSelection();s.removeAllRanges();s.addRange(r)}
    try{navigator.clipboard.writeText(em.textContent).then(done,sel)}catch(e){sel()}
  });
})();
