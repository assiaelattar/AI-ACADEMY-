/* =========================================================
   HERO — GPU particle "neural" field (Three.js)
   Morphs: sphere → orbital ring → data wave, driven by scroll.
   ========================================================= */
(function () {
  const canvas = document.getElementById('gl');
  if (!canvas || !window.THREE) { window.FMHero = { start(){}, setMorph(){} }; return; }

  const isMobile = matchMedia('(max-width: 760px)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COUNT = isMobile ? 9000 : 22000;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  // ---------- geometry ----------
  const sphere = new Float32Array(COUNT * 3);
  const ring   = new Float32Array(COUNT * 3);
  const wave   = new Float32Array(COUNT * 3);
  const rand   = new Float32Array(COUNT * 4);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    // fibonacci sphere with shell thickness
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 2.15 + (Math.random() - 0.5) * 0.12 + (Math.random() < 0.08 ? Math.random() * -1.4 : 0);
    sphere.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3);

    // orbital ring / torus with a core
    const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
    let tx, ty, tz;
    if (i % 5 === 0) { // small core
      const cr = 0.7 * Math.cbrt(Math.random());
      const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1);
      tx = cr * Math.sin(b) * Math.cos(a); ty = cr * Math.cos(b); tz = cr * Math.sin(b) * Math.sin(a);
    } else {
      const big = 2.6, tube = 0.18 + Math.random() * 0.35;
      tx = (big + tube * Math.cos(v)) * Math.cos(u);
      tz = (big + tube * Math.cos(v)) * Math.sin(u);
      ty = tube * Math.sin(v) * 0.6;
    }
    ring.set([tx, ty, tz], i * 3);

    // data wave plane (grid)
    const cols = Math.ceil(Math.sqrt(COUNT * 1.8));
    const gx = (i % cols) / cols, gz = Math.floor(i / cols) / (COUNT / cols);
    wave.set([(gx - 0.5) * 14, -1.2, (gz - 0.5) * 8 - 1], i * 3);

    rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
  geo.setAttribute('aRing', new THREE.BufferAttribute(ring, 3));
  geo.setAttribute('aWave', new THREE.BufferAttribute(wave, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));

  const noise = `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }`;

  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uMorph: { value: 0 }, uIntro: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) }, uPixel: { value: renderer.getPixelRatio() },
      uSize: { value: isMobile ? 3.4 : 3.2 }, uEnergy: { value: 0 }
    },
    vertexShader: `
      ${noise}
      uniform float uTime,uMorph,uIntro,uPixel,uSize,uEnergy;
      uniform vec2 uMouse;
      attribute vec3 aRing; attribute vec3 aWave; attribute vec4 aRand;
      varying float vAlpha; varying vec3 vColor;
      void main(){
        float t=uTime;
        vec3 w=aWave;
        w.y+=sin(w.x*.55+t*1.1)*.45+cos(w.z*.8+t*.7)*.3+snoise(vec3(w.xz*.25,t*.15))*.5;
        float m1=smoothstep(0.,1.,clamp(uMorph,0.,1.));
        float m2=smoothstep(0.,1.,clamp(uMorph-1.,0.,1.));
        // stagger per-particle
        float d=aRand.x*.35;
        m1=smoothstep(d,d+.65,m1); m2=smoothstep(d,d+.65,m2);
        vec3 p=mix(mix(position,aRing,m1),w,m2);

        // organic breathing
        float n=snoise(p*.55+vec3(0.,0.,t*.22));
        float breathe=(1.-m2);
        p+=normalize(p+1e-4)*n*.28*breathe*(1.+uEnergy*1.5);
        // swirl
        float ang=t*.05*(1.-m2)+n*.1;
        p.xz=mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*p.xz;

        // intro: particles converge from far
        float intro=smoothstep(aRand.y*.5,aRand.y*.5+.5,uIntro);
        p=mix(p*(4.+aRand.z*6.)+vec3(0.,0.,-6.),p,intro);

        vec4 mv=modelViewMatrix*vec4(p,1.);
        // mouse repulsion in view-space
        vec2 dm=mv.xy-uMouse;
        float f=smoothstep(1.6,0.,length(dm));
        mv.xy+=normalize(dm+1e-4)*f*.7;
        mv.z+=f*.6;

        gl_Position=projectionMatrix*mv;
        float size=uSize*(.6+aRand.w*1.1)*(1.+f*1.6);
        gl_PointSize=size*uPixel*(7./-mv.z);

        vec3 lime=vec3(.83,1.,.23), cyan=vec3(.37,.95,1.), white=vec3(.95,.97,.9), violet=vec3(.61,.48,1.);
        float k=clamp(n*.5+.5,0.,1.);
        vColor=mix(lime,cyan,smoothstep(.55,.95,k));
        vColor=mix(vColor,white,step(.985,aRand.z));
        vColor=mix(vColor,violet,smoothstep(.0,.25,1.-k)*.35);
        vColor=mix(vColor,white,f*.6);
        vAlpha=(.45+.75*smoothstep(-9.5,-4.5,mv.z))*intro*(.7+aRand.w*.5);
      }`,
    fragmentShader: `
      varying float vAlpha; varying vec3 vColor;
      void main(){
        vec2 c=gl_PointCoord-.5; float d=length(c);
        float a=smoothstep(.5,.0,d); a*=a;
        gl_FragColor=vec4(vColor,a*vAlpha);
      }`
  });

  const points = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // ---------- sizing ----------
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // offset to the right on wide screens so text breathes
    group.position.x = w > 900 ? 1.6 : 0;
    group.position.y = w > 900 ? 0.2 : 1.1;
    const s = w < 600 ? 0.72 : 1;
    group.scale.setScalar(s);
  }
  addEventListener('resize', resize);
  resize();

  // ---------- input ----------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / innerHeight) * 2 + 1;
    mouse.active = true;
  });
  addEventListener('pointerleave', () => (mouse.active = false));

  // ---------- state ----------
  let morph = 0, morphTarget = 0, intro = 0, energy = 0, running = false, visible = true;
  const clock = new THREE.Clock();

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
  io.observe(canvas);

  function tick() {
    requestAnimationFrame(tick);
    if (!running || !visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    morph += (morphTarget - morph) * 0.06;
    intro = Math.min(1, t * 0.45);
    energy += ((mouse.active ? Math.hypot(mouse.tx - mouse.x, mouse.ty - mouse.y) * 4 : 0) - energy) * 0.05;

    // project mouse to view space at the group's depth
    const dist = camera.position.z;
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    const halfW = halfH * camera.aspect;
    mat.uniforms.uMouse.value.set(
      mouse.active ? mouse.x * halfW : 99,
      mouse.active ? mouse.y * halfH : 99
    );

    mat.uniforms.uTime.value = reduce ? 0 : t;
    mat.uniforms.uMorph.value = morph;
    mat.uniforms.uIntro.value = intro;
    mat.uniforms.uEnergy.value = Math.min(energy, 1);

    group.rotation.y = t * 0.06 + mouse.x * 0.25;
    group.rotation.x = -mouse.y * 0.15 + Math.min(morph, 1) * 0.35 - Math.max(morph - 1, 0) * 0.35;
    renderer.render(scene, camera);

    window.dispatchEvent(new CustomEvent('fm:tps', { detail: Math.round(1800 + Math.sin(t * 1.7) * 300 + energy * 2600 + Math.random() * 120) }));
  }
  tick();

  window.FMHero = {
    start() { running = true; clock.start(); },
    setMorph(v) { morphTarget = v; }
  };
})();

/* =========================================================
   CONTACT — 2D plexus network
   ========================================================= */
(function () {
  const c = document.getElementById('contactGl');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, nodes = [], visible = false;
  const mouse = { x: -999, y: -999 };
  const dpr = Math.min(devicePixelRatio, 2);

  function init() {
    W = c.clientWidth; H = c.clientHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((W * H) / 14000);
    nodes = Array.from({ length: Math.min(n, 140) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6
    }));
  }
  addEventListener('resize', init);
  init();
  c.parentElement.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  c.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(c);

  const LINK = 140;
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    ctx.clearRect(0, 0, W, H);
    for (const p of nodes) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 180) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(212,255,58,${(1 - d / LINK) * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 220) {
        ctx.strokeStyle = `rgba(94,242,255,${(1 - md / 220) * 0.5})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = md < 220 ? '#d4ff3a' : 'rgba(242,242,236,.55)';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
  })();
})();
