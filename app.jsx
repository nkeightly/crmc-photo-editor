const { useState, useRef, useEffect } = React;

/* ─── Output dimensions ─── */
const LW = 1280, LH = 862;   // landscape
const PW = 1066, PH = 1600;  // portrait
const PS = 0.37;              // preview scale

/* ─── Contact details (matching reference photos exactly) ─── */
const EMAIL_TXT = "christrebekahmystery@gmail.com";
const FB_TXT    = "christ rebekah mystery church";
const YT_TXT    = "christ rebekah mystery church";

/* ─── Logo SVG ─── */
const LOGO_SVG = `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#7ec8f0"/><stop offset="50%" stop-color="#2e86c1"/><stop offset="100%" stop-color="#1a5276"/></radialGradient>
    <radialGradient id="g2" cx="50%" cy="80%" r="60%"><stop offset="0%" stop-color="#f39c12"/><stop offset="50%" stop-color="#e74c3c"/><stop offset="100%" stop-color="#922b21"/></radialGradient>
    <radialGradient id="g3" cx="50%" cy="90%" r="50%"><stop offset="0%" stop-color="#fef9e7"/><stop offset="40%" stop-color="#f9e74c"/><stop offset="100%" stop-color="#f39c12"/></radialGradient>
    <clipPath id="gc"><circle cx="100" cy="95" r="72"/></clipPath>
  </defs>
  <path d="M68,168 Q58,148 65,135 Q55,145 52,130 Q48,115 60,105 Q55,120 65,118 Q60,108 70,98 Q68,115 78,112 Q72,125 80,132 Q82,118 90,115 Q86,128 92,135 Q94,120 100,118 Q106,120 108,135 Q114,128 110,115 Q118,118 120,132 Q128,125 122,112 Q132,115 135,98 Q140,108 135,118 Q145,120 140,105 Q152,115 148,130 Q145,145 135,135 Q142,148 132,168 Z" fill="url(#g2)"/>
  <path d="M78,168 Q72,152 78,140 Q74,148 72,138 Q70,125 80,118 Q77,130 84,128 Q80,138 86,144 Q88,132 94,130 Q92,140 96,145 Q98,133 100,131 Q102,133 104,145 Q108,140 106,130 Q112,132 114,144 Q120,138 116,128 Q123,130 120,118 Q130,125 128,138 Q126,148 122,140 Q128,152 122,168 Z" fill="url(#g3)"/>
  <circle cx="100" cy="95" r="72" fill="url(#g1)"/>
  <g clip-path="url(#gc)" fill="none" stroke="#1a5276" stroke-width="0.8" opacity="0.5">
    <ellipse cx="100" cy="95" rx="72" ry="20"/><ellipse cx="100" cy="95" rx="72" ry="42"/><ellipse cx="100" cy="95" rx="72" ry="62"/>
    <line x1="100" y1="23" x2="100" y2="167"/><ellipse cx="100" cy="95" rx="30" ry="72"/><ellipse cx="100" cy="95" rx="55" ry="72"/>
  </g>
  <ellipse cx="82" cy="72" rx="18" ry="12" fill="white" opacity="0.18"/>
  <circle cx="100" cy="95" r="72" fill="none" stroke="#1a5276" stroke-width="1.5"/>
  <g transform="translate(38,42) rotate(-20)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(148,38) rotate(15) scale(-1,1)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(28,88) rotate(-10)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(162,82) rotate(5) scale(-1,1)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(55,52) rotate(-30) scale(0.85,0.85)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/></g>
  <g transform="translate(138,50) rotate(25) scale(-0.85,0.85)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/></g>
  <rect x="89" y="42" width="22" height="80" rx="3" fill="#c0392b"/>
  <rect x="70" y="70" width="60" height="22" rx="3" fill="#c0392b"/>
  <rect x="91" y="44" width="5" height="76" rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="72" y="72" width="56" height="5" rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="89" y="42" width="22" height="80" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
  <rect x="70" y="70" width="60" height="22" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
</svg>`;

/* ─── Inline icon SVGs matching the uploaded images ─── */
const EMAIL_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="20" width="90" height="60" rx="8" fill="none" stroke="white" stroke-width="5"/>
  <polyline points="5,20 50,58 95,20" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/>
  <line x1="5" y1="80" x2="35" y2="50" stroke="white" stroke-width="4"/>
  <line x1="95" y1="80" x2="65" y2="50" stroke="white" stroke-width="4"/>
</svg>`;

const FB_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fbg" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#5b8fde"/>
      <stop offset="60%" stop-color="#1a5fcc"/>
      <stop offset="100%" stop-color="#0d3fa0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="47" fill="url(#fbg)" stroke="#3a6abf" stroke-width="2"/>
  <ellipse cx="40" cy="30" rx="12" ry="6" fill="rgba(255,255,255,0.15)"/>
  <text x="50" y="68" font-family="Arial Black, sans-serif" font-size="58" font-weight="900" fill="white" text-anchor="middle">f</text>
</svg>`;

const YT_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ytg" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ff4444"/>
      <stop offset="55%" stop-color="#cc0000"/>
      <stop offset="100%" stop-color="#880000"/>
    </radialGradient>
  </defs>
  <rect x="4" y="12" width="92" height="76" rx="18" fill="url(#ytg)" stroke="#aa0000" stroke-width="1.5"/>
  <rect x="8" y="16" width="88" height="72" rx="16" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <ellipse cx="42" cy="32" rx="18" ry="7" fill="rgba(255,255,255,0.18)"/>
  <rect x="20" y="30" width="55" height="40" rx="10" fill="white" opacity="0.95"/>
  <polygon points="43,38 43,62 65,50" fill="#cc0000"/>
</svg>`;

/* ─── Helper: load SVG string → HTMLImageElement ─── */
function useSvgImg(svgStr) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url  = URL.createObjectURL(blob);
    const i    = new Image();
    i.onload   = () => { setImg(i); URL.revokeObjectURL(url); };
    i.src      = url;
  }, [svgStr]);
  return img;
}

/* ─── Image enhancement ─── */
function sharpen(canvas, s) {
  const ctx = canvas.getContext("2d"), w = canvas.width, h = canvas.height;
  const src = ctx.getImageData(0,0,w,h), dst = ctx.createImageData(w,h);
  const d = src.data, o = dst.data;
  const k = [0,-s,0,-s,1+4*s,-s,0,-s,0];
  for (let y=1;y<h-1;y++) for (let x=1;x<w-1;x++) {
    const i=(y*w+x)*4;
    for (let c=0;c<3;c++) {
      o[i+c]=Math.min(255,Math.max(0,
        k[0]*d[((y-1)*w+x-1)*4+c]+k[1]*d[((y-1)*w+x)*4+c]+k[2]*d[((y-1)*w+x+1)*4+c]+
        k[3]*d[(y*w+x-1)*4+c]    +k[4]*d[(y*w+x)*4+c]    +k[5]*d[(y*w+x+1)*4+c]+
        k[6]*d[((y+1)*w+x-1)*4+c]+k[7]*d[((y+1)*w+x)*4+c]+k[8]*d[((y+1)*w+x+1)*4+c]));
    }
    o[i+3]=d[i+3];
  }
  ctx.putImageData(dst,0,0);
}
function clarity(canvas, s) {
  const ctx=canvas.getContext("2d"),w=canvas.width,h=canvas.height;
  const src=ctx.getImageData(0,0,w,h),d=src.data;
  for(let i=0;i<d.length;i+=4){
    const b=(0.299*d[i]+0.587*d[i+1]+0.114*d[i+2]-128)*s*0.4;
    d[i]=Math.min(255,Math.max(0,d[i]+b));d[i+1]=Math.min(255,Math.max(0,d[i+1]+b));d[i+2]=Math.min(255,Math.max(0,d[i+2]+b));
  }
  ctx.putImageData(src,0,0);
}

/* ─── Core draw function ─── */
function drawFrame(canvas, photo, logo, emailImg, fbImg, ytImg, opts, crop) {
  const {brightness,contrast,showLogo,showFooter,caption,enhanceMode,sharpenStr,clarityStr} = opts;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Photo with crop/zoom
  const {ox, oy, zoom} = crop;
  const sw = photo.naturalWidth/zoom, sh = photo.naturalHeight/zoom;
  const sx = Math.max(0, Math.min(photo.naturalWidth-sw,  ox * photo.naturalWidth/zoom));
  const sy = Math.max(0, Math.min(photo.naturalHeight-sh, oy * photo.naturalHeight/zoom));
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, W, H);
  ctx.filter = "none";

  if (enhanceMode==="sharpen"&&sharpenStr>0) sharpen(canvas, sharpenStr*0.8);
  if (enhanceMode==="clarity"&&clarityStr>0) clarity(canvas, clarityStr);
  if (enhanceMode==="both") {
    if (sharpenStr>0) sharpen(canvas, sharpenStr*0.5);
    if (clarityStr>0) clarity(canvas, clarityStr*0.7);
  }

  /* ── FOOTER — exact pattern from reference images ── */
  if (showFooter) {
    const fh = Math.round(H * 0.105);   // footer height
    const iy = H - fh;                   // footer top y

    // dark semi-transparent bar
    ctx.fillStyle = "rgba(0,0,0,0.88)";
    ctx.fillRect(0, iy, W, fh);

    // thin top separator line
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(0, iy, W, 1);

    const iconH  = Math.round(fh * 0.58);
    const iconY  = iy + (fh - iconH) / 2;
    const fontSize = Math.max(11, Math.round(fh * 0.29));
    const seg    = W / 3;

    const items = [
      { img: emailImg, label: EMAIL_TXT },
      { img: fbImg,    label: FB_TXT    },
      { img: ytImg,    label: YT_TXT    },
    ];

    items.forEach(({ img, label }, i) => {
      const segStart = seg * i;
      const iconX    = segStart + seg * 0.07;
      const textX    = iconX + iconH + Math.round(W * 0.008);
      const textY    = iy + fh / 2 + fontSize * 0.38;

      // draw icon
      if (img) ctx.drawImage(img, iconX, iconY, iconH, iconH);

      // draw label
      ctx.font      = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, textX, textY);

      // vertical divider between sections
      if (i < 2) {
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fillRect(seg*(i+1)-1, iy+fh*0.15, 1, fh*0.7);
      }
    });
  }

  /* ── LOGO — top left ── */
  if (showLogo && logo) {
    const lh = Math.round(H * 0.105);
    const lw = Math.round(lh * (200/220));
    ctx.drawImage(logo, 14, 14, lw, lh);
  }

  /* ── CAPTION ── */
  if (caption.trim()) {
    const fs = Math.round(W * 0.021);
    ctx.font = `${fs}px sans-serif`;
    const tw  = ctx.measureText(caption).width;
    const py  = showFooter ? H * 0.865 : H * 0.93;
    const pad = fs * 0.6;
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.beginPath();
    ctx.roundRect((W-tw)/2 - pad, py-fs-pad*0.5, tw+pad*2, fs+pad*1.2, 5);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(caption, W/2, py);
    ctx.textAlign = "left";
  }
}

/* ─── Crop canvas with drag-to-pan ─── */
function CropCanvas({ photo, crop, setCrop, orientation }) {
  const ref  = useRef();
  const drag = useRef(false);
  const ds   = useRef({});
  const cw = Math.round((orientation==="landscape"?LW:PW)*PS);
  const ch = Math.round((orientation==="landscape"?LH:PH)*PS);

  useEffect(() => {
    if (!ref.current || !photo) return;
    const c = ref.current; c.width=cw; c.height=ch;
    const ctx = c.getContext("2d");
    const {ox,oy,zoom} = crop;
    const sw=photo.naturalWidth/zoom, sh=photo.naturalHeight/zoom;
    const sx=Math.max(0,Math.min(photo.naturalWidth-sw, ox*photo.naturalWidth/zoom));
    const sy=Math.max(0,Math.min(photo.naturalHeight-sh,oy*photo.naturalHeight/zoom));
    ctx.drawImage(photo,sx,sy,sw,sh,0,0,cw,ch);
    // rule-of-thirds grid
    ctx.strokeStyle="rgba(255,255,255,0.3)"; ctx.lineWidth=0.6; ctx.setLineDash([4,4]);
    for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(cw*i/3,0);ctx.lineTo(cw*i/3,ch);ctx.stroke();}
    for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(0,ch*i/3);ctx.lineTo(cw,ch*i/3);ctx.stroke();}
    ctx.setLineDash([]);
  }, [photo,crop,cw,ch]);

  const start = (x,y) => { drag.current=true; const r=ref.current.getBoundingClientRect(); ds.current={x:x-r.left,y:y-r.top,ox:crop.ox,oy:crop.oy}; };
  const move  = (x,y) => {
    if (!drag.current) return;
    const r=ref.current.getBoundingClientRect();
    const dx=(x-r.left-ds.current.x)/cw, dy=(y-r.top-ds.current.y)/ch;
    setCrop(c=>({...c, ox:Math.max(0,Math.min(c.zoom-1, ds.current.ox - dx*(c.zoom-1))), oy:Math.max(0,Math.min(c.zoom-1, ds.current.oy - dy*(c.zoom-1)))}));
  };
  const end   = () => { drag.current=false; };

  return (
    <canvas ref={ref} style={{width:cw,height:ch,display:"block",borderRadius:7,cursor:"grab",border:"0.5px solid rgba(255,255,255,0.15)",touchAction:"none"}}
      onMouseDown={e=>start(e.clientX,e.clientY)} onMouseMove={e=>move(e.clientX,e.clientY)} onMouseUp={end} onMouseLeave={end}
      onTouchStart={e=>start(e.touches[0].clientX,e.touches[0].clientY)}
      onTouchMove={e=>{e.preventDefault();move(e.touches[0].clientX,e.touches[0].clientY);}}
      onTouchEnd={end}/>
  );
}

/* ─── Preview canvas (with template overlay) ─── */
function Preview({ photo, logo, emailImg, fbImg, ytImg, orientation, opts, crop }) {
  const ref = useRef();
  const cw  = Math.round((orientation==="landscape"?LW:PW)*PS);
  const ch  = Math.round((orientation==="landscape"?LH:PH)*PS);
  useEffect(() => {
    if (!ref.current) return;
    const c=ref.current; c.width=cw; c.height=ch;
    if (!photo) {
      const ctx=c.getContext("2d"); ctx.fillStyle="#111"; ctx.fillRect(0,0,cw,ch);
      if(logo&&opts.showLogo) ctx.drawImage(logo,8,8,Math.round(ch*0.105*(200/220)),Math.round(ch*0.105));
      ctx.fillStyle="#555"; ctx.font="13px sans-serif"; ctx.textAlign="center";
      ctx.fillText("Upload a photo to preview",cw/2,ch/2); ctx.textAlign="left";
      return;
    }
    drawFrame(c,photo,logo,emailImg,fbImg,ytImg,opts,crop);
  },[photo,logo,emailImg,fbImg,ytImg,cw,ch,opts,crop]);
  return <canvas ref={ref} style={{width:cw,height:ch,display:"block",borderRadius:8,border:"0.5px solid rgba(0,0,0,0.2)"}}/>;
}

/* ─── Enhancement options ─── */
const EMODES = [
  {id:"sharpen", t:"Sharpening",          s:"Edge crispness — faces & fine detail"},
  {id:"clarity", t:"Clarity",             s:"Studio depth — local contrast boost"},
  {id:"both",    t:"Sharpening + Clarity",s:"Max crispness, natural result"},
];

const STEPS = ["Upload", "Crop & Edit", "Preview & Export"];

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
function App() {
  const [step,  setStep]  = useState(0);
  const [ori,   setOri]   = useState("landscape");
  const [photo, setPhoto] = useState(null);
  const [crop,  setCrop]  = useState({ox:0, oy:0, zoom:1});
  const [bri,   setBri]   = useState(100);
  const [con,   setCon]   = useState(105);
  const [sLogo, setSLogo] = useState(true);
  const [sFoot, setSFoot] = useState(true);
  const [cap,   setCap]   = useState("");
  const [emode, setEmode] = useState("sharpen");
  const [sStr,  setSStr]  = useState(0.5);
  const [cStr,  setCStr]  = useState(0.5);
  const [expo,  setExpo]  = useState(null);
  const [drag,  setDrag]  = useState(false);
  const fRef = useRef();

  const logo     = useSvgImg(LOGO_SVG);
  const emailImg = useSvgImg(EMAIL_SVG);
  const fbImg    = useSvgImg(FB_SVG);
  const ytImg    = useSvgImg(YT_SVG);

  const opts = {brightness:bri,contrast:con,showLogo:sLogo,showFooter:sFoot,caption:cap,enhanceMode:emode,sharpenStr:sStr,clarityStr:cStr};

  const loadPhoto = file => {
    if (!file||!file.type.startsWith("image/")) return;
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{ setPhoto(img); setCrop({ox:0,oy:0,zoom:1}); setStep(1); };
    img.src=url;
  };

  const doExport = (fmt, orient) => {
    if (!photo) return;
    const key=`${fmt}-${orient}`; setExpo(key);
    const c=document.createElement("canvas");
    c.width  = orient==="landscape"?LW:PW;
    c.height = orient==="landscape"?LH:PH;
    drawFrame(c,photo,logo,emailImg,fbImg,ytImg,opts,crop);
    c.toBlob(blob=>{
      const a=document.createElement("a");
      a.href=URL.createObjectURL(blob);
      a.download=`crmc-${orient}.${fmt}`;
      a.click(); setExpo(null);
    }, fmt==="jpg"?"image/jpeg":"image/png", fmt==="jpg"?0.95:1);
  };

  const canGo = i => i<=(photo?2:0);

  return (
    <div className="wrap">

      {/* Header */}
      <div className="app-hdr">
        {logo && <img src={logo.src} alt="CRMC logo"/>}
        <div>
          <p className="sub">Christ Rebekah Mystery Church</p>
          <h2>Photo template editor</h2>
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        {STEPS.map((s,i)=>(
          <button key={s} className={`tab${step===i?" on":""}`}
            onClick={()=>canGo(i)&&setStep(i)}
            style={{color:step===i?"var(--tx)":"var(--tx2)",cursor:canGo(i)?"pointer":"default"}}>
            {i<step&&<span style={{color:"#2a9d5c"}}>✓</span>}{s}
          </button>
        ))}
      </div>

      {/* ═══ STEP 0 — Upload ═══ */}
      {step===0&&(
        <div>
          <div className={`upload-zone${drag?" over":""}`}
            onDragOver={e=>{e.preventDefault();setDrag(true);}}
            onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);loadPhoto(e.dataTransfer.files[0]);}}
            onClick={()=>fRef.current.click()}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--tx2)"}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p style={{fontWeight:500,fontSize:15}}>Drop your photo here</p>
            <p className="smc">or click to browse — JPG, PNG, WEBP</p>
            <input ref={fRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>loadPhoto(e.target.files[0])}/>
          </div>

          <p className="head" style={{marginBottom:8}}>Orientation</p>
          <div className="row" style={{gap:10,marginBottom:"1.75rem"}}>
            {["landscape","portrait"].map(o=>(
              <button key={o} className={`ori-btn${ori===o?" on":""}`} onClick={()=>setOri(o)}>
                {o==="landscape"?`Landscape (${LW}×${LH})`:`Portrait (${PW}×${PH})`}
              </button>
            ))}
          </div>

          {/* Footer icon preview */}
          <p className="head" style={{marginBottom:10}}>Footer preview</p>
          <div style={{background:"#111",borderRadius:10,padding:"10px 16px",display:"flex",alignItems:"center",gap:0,marginBottom:"1.75rem"}}>
            {[[emailImg,EMAIL_TXT],[fbImg,FB_TXT],[ytImg,YT_TXT]].map(([ic,lbl],i)=>(
              <div key={i} style={{flex:1,display:"flex",alignItems:"center",gap:10,padding:"4px 0",borderRight:i<2?"1px solid rgba(255,255,255,0.12)":"none",paddingRight:i<2?12:0,paddingLeft:i>0?12:0}}>
                {ic&&<img src={ic.src} style={{width:30,height:30,objectFit:"contain",flexShrink:0}}/>}
                <span style={{fontSize:10,color:"#fff",lineHeight:1.3}}>{lbl}</span>
              </div>
            ))}
          </div>

          <p className="smc" style={{marginBottom:10}}>Template preview (no photo)</p>
          <div style={{display:"flex",justifyContent:"center",padding:"1rem",background:"var(--bg2)",borderRadius:12}}>
            <Preview photo={null} logo={logo} emailImg={emailImg} fbImg={fbImg} ytImg={ytImg} orientation={ori} opts={opts} crop={crop}/>
          </div>
        </div>
      )}

      {/* ═══ STEP 1 — Crop & Edit ═══ */}
      {step===1&&(
        <div className="edit-wrap">

          {/* Controls column */}
          <div className="edit-ctrl">

            <p className="head">Orientation</p>
            <div className="row" style={{gap:8,marginBottom:"1rem"}}>
              {["landscape","portrait"].map(o=>(
                <button key={o} className={`ori-btn${ori===o?" on":""}`} style={{fontSize:12,padding:"5px 12px"}} onClick={()=>setOri(o)}>
                  {o==="landscape"?"Landscape":"Portrait"}
                </button>
              ))}
            </div>

            <p className="head">Crop & zoom</p>
            <p className="note" style={{marginBottom:7}}>Drag the preview to pan. Zoom to fill frame.</p>
            <div className="rowb" style={{marginBottom:4}}>
              <span className="smc">Zoom</span>
              <span className="smb">{crop.zoom.toFixed(2)}×</span>
            </div>
            <input type="range" min="1" max="3" step="0.01" value={crop.zoom}
              onChange={e=>setCrop(c=>({...c,zoom:+e.target.value}))} style={{marginBottom:"1rem"}}/>
            <button className="sm" style={{padding:"5px 12px",marginBottom:"1.1rem"}}
              onClick={()=>setCrop({ox:0,oy:0,zoom:1})}>Reset crop</button>

            <hr className="div"/>
            <p className="head">Adjustments</p>
            {[["Brightness",bri,setBri,50,150],["Contrast",con,setCon,50,150]].map(([l,v,s,mn,mx])=>(
              <div key={l} style={{marginBottom:"0.9rem"}}>
                <div className="rowb" style={{marginBottom:4}}>
                  <span className="smc">{l}</span><span className="smb">{v}%</span>
                </div>
                <input type="range" min={mn} max={mx} step="1" value={v} onChange={e=>s(+e.target.value)}/>
              </div>
            ))}

            <hr className="div"/>
            <p className="head">Quality enhancement</p>
            {EMODES.map(m=>(
              <div key={m.id} className={`ecard${emode===m.id?" on":""}`} onClick={()=>setEmode(m.id)}>
                <p className="t" style={{fontWeight:emode===m.id?500:400}}>{m.t}</p>
                <p className="s">{m.s}</p>
              </div>
            ))}
            {(emode==="sharpen"||emode==="both")&&(
              <div style={{marginTop:8}}>
                <div className="rowb" style={{marginBottom:4}}><span className="smc">Sharpen</span><span className="smb">{Math.round(sStr*100)}%</span></div>
                <input type="range" min="0" max="1" step="0.05" value={sStr} onChange={e=>setSStr(+e.target.value)}/>
              </div>
            )}
            {(emode==="clarity"||emode==="both")&&(
              <div style={{marginTop:8}}>
                <div className="rowb" style={{marginBottom:4}}><span className="smc">Clarity</span><span className="smb">{Math.round(cStr*100)}%</span></div>
                <input type="range" min="0" max="1" step="0.05" value={cStr} onChange={e=>setCStr(+e.target.value)}/>
              </div>
            )}

            <hr className="div"/>
            <p className="head">Overlays</p>
            <label className="chk"><input type="checkbox" checked={sLogo} onChange={e=>setSLogo(e.target.checked)}/> Show logo (top left)</label>
            <label className="chk"><input type="checkbox" checked={sFoot} onChange={e=>setSFoot(e.target.checked)}/> Show footer bar</label>
            <input type="text" value={cap} onChange={e=>setCap(e.target.value)} placeholder="Caption (optional)" style={{marginTop:8}}/>

            <div className="row" style={{marginTop:"1.35rem"}}>
              <button className="sm" style={{padding:"7px 12px"}} onClick={()=>{setBri(100);setCon(105);setSStr(0.5);setCStr(0.5);setCrop({ox:0,oy:0,zoom:1});}}>Reset all</button>
              <button className="sm" style={{padding:"7px 16px",fontWeight:500}} onClick={()=>setStep(2)}>Preview →</button>
            </div>
          </div>

          {/* Canvas column */}
          <div className="edit-canvas">
            <div style={{background:"#0d0d0d",borderRadius:10,padding:10}}>
              <CropCanvas photo={photo} crop={crop} setCrop={setCrop} orientation={ori}/>
            </div>
            <p className="note" style={{textAlign:"center"}}>Drag to pan · Zoom slider to fill frame</p>
            <p className="note" style={{textAlign:"center",marginTop:2}}>Output: {ori==="landscape"?`${LW}×${LH}`:`${PW}×${PH}`} px</p>
          </div>
        </div>
      )}

      {/* ═══ STEP 2 — Preview & Export ═══ */}
      {step===2&&(
        <div>
          <p className="smc" style={{marginBottom:"1.25rem"}}>Final previews with template applied — exports at full resolution</p>
          <div className="prev-wrap">
            {["landscape","portrait"].map(o=>(
              <div key={o} style={{textAlign:"center"}}>
                <p className="smc" style={{marginBottom:8,textTransform:"capitalize"}}>{o} — {o==="landscape"?`${LW}×${LH}`:`${PW}×${PH}`}</p>
                <Preview photo={photo} logo={logo} emailImg={emailImg} fbImg={fbImg} ytImg={ytImg} orientation={o} opts={opts} crop={crop}/>
              </div>
            ))}
          </div>

          <div className="summary">
            <p className="head">Applied settings</p>
            <div className="row" style={{flexWrap:"wrap",gap:"1rem"}}>
              {[["Brightness",`${bri}%`],["Contrast",`${con}%`],["Zoom",`${crop.zoom.toFixed(2)}×`],
                ["Enhancement",EMODES.find(m=>m.id===emode)?.t],
                ...(emode==="sharpen"||emode==="both"?[["Sharpen",`${Math.round(sStr*100)}%`]]:[]),
                ...(emode==="clarity"||emode==="both"?[["Clarity",`${Math.round(cStr*100)}%`]]:[]),
              ].map(([k,v])=>(
                <span key={k} className="smc">{k}: <strong style={{color:"var(--tx)",fontWeight:500}}>{v}</strong></span>
              ))}
            </div>
          </div>

          <p className="head" style={{marginBottom:10}}>Download — full resolution</p>
          <div className="dl-grid">
            {[
              {fmt:"jpg",o:"landscape",lbl:`JPG Landscape (${LW}×${LH})`},
              {fmt:"png",o:"landscape",lbl:`PNG Landscape (${LW}×${LH})`},
              {fmt:"jpg",o:"portrait", lbl:`JPG Portrait (${PW}×${PH})`},
              {fmt:"png",o:"portrait", lbl:`PNG Portrait (${PW}×${PH})`},
            ].map(({fmt,o,lbl})=>(
              <button key={lbl} className="dl-btn" onClick={()=>doExport(fmt,o)} disabled={!!expo}>
                {expo===`${fmt}-${o}`?"Exporting…":lbl}
              </button>
            ))}
          </div>
          <button className="sm" style={{padding:"8px 16px"}} onClick={()=>setStep(1)}>← Back to edit</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
