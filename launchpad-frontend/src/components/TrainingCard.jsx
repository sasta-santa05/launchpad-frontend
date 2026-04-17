/* TrainingCard.jsx */
import React from 'react';
import './TrainingCard.css';

function StarRating({ rating }) {
  const r = rating || 0;
  return (
    <div className="tcard__stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(r) ? '#FCD34D' : 'var(--text-muted)', fontSize:'0.9rem' }}>★</span>
      ))}
      <span style={{ fontWeight:700, color:'#FCD34D', marginLeft:4, fontSize:'0.85rem' }}>{r.toFixed(1)}</span>
    </div>
  );
}

// Inline SVG illustrations per category — no external requests needed
const CATEGORY_ILLUSTRATIONS = {
  'Engineering': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#0f0f1a"/>
      {/* Code editor window */}
      <rect x="20" y="20" width="240" height="160" rx="8" fill="#1a1a2e" stroke="#C4B5FD" strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="36" cy="36" r="5" fill="#FCA5A5" opacity="0.8"/>
      <circle cx="52" cy="36" r="5" fill="#FCD34D" opacity="0.8"/>
      <circle cx="68" cy="36" r="5" fill="#86EFAC" opacity="0.8"/>
      {/* Code lines */}
      <rect x="32" y="55" width="60" height="6" rx="3" fill="#C4B5FD" opacity="0.9"/>
      <rect x="100" y="55" width="40" height="6" rx="3" fill="#67E8F9" opacity="0.7"/>
      <rect x="148" y="55" width="80" height="6" rx="3" fill="#86EFAC" opacity="0.6"/>
      <rect x="44" y="70" width="80" height="6" rx="3" fill="#FCD34D" opacity="0.7"/>
      <rect x="132" y="70" width="50" height="6" rx="3" fill="#C4B5FD" opacity="0.5"/>
      <rect x="44" y="85" width="100" height="6" rx="3" fill="#67E8F9" opacity="0.6"/>
      <rect x="152" y="85" width="60" height="6" rx="3" fill="#FCA5A5" opacity="0.5"/>
      <rect x="32" y="100" width="70" height="6" rx="3" fill="#86EFAC" opacity="0.8"/>
      <rect x="110" y="100" width="90" height="6" rx="3" fill="#C4B5FD" opacity="0.4"/>
      <rect x="44" y="115" width="55" height="6" rx="3" fill="#FCD34D" opacity="0.6"/>
      <rect x="107" y="115" width="40" height="6" rx="3" fill="#67E8F9" opacity="0.7"/>
      <rect x="44" y="130" width="120" height="6" rx="3" fill="#C4B5FD" opacity="0.5"/>
      <rect x="32" y="145" width="80" height="6" rx="3" fill="#86EFAC" opacity="0.6"/>
      <rect x="120" y="145" width="60" height="6" rx="3" fill="#FCA5A5" opacity="0.4"/>
      {/* Terminal on right */}
      <rect x="275" y="30" width="110" height="140" rx="8" fill="#0a0a15" stroke="#C4B5FD" strokeWidth="1" strokeOpacity="0.2"/>
      <rect x="285" y="48" width="60" height="4" rx="2" fill="#86EFAC" opacity="0.8"/>
      <rect x="285" y="60" width="80" height="4" rx="2" fill="#C4B5FD" opacity="0.5"/>
      <rect x="285" y="72" width="50" height="4" rx="2" fill="#FCD34D" opacity="0.6"/>
      <rect x="285" y="84" width="70" height="4" rx="2" fill="#67E8F9" opacity="0.5"/>
      <rect x="285" y="96" width="45" height="4" rx="2" fill="#86EFAC" opacity="0.7"/>
      <rect x="285" y="108" width="85" height="4" rx="2" fill="#C4B5FD" opacity="0.4"/>
      <rect x="285" y="120" width="55" height="4" rx="2" fill="#FCA5A5" opacity="0.6"/>
      <rect x="285" y="132" width="75" height="4" rx="2" fill="#FCD34D" opacity="0.5"/>
      <rect x="285" y="148" width="10" height="4" rx="2" fill="#86EFAC" opacity="0.9"/>
      {/* Glow */}
      <ellipse cx="130" cy="100" rx="80" ry="40" fill="#C4B5FD" opacity="0.04"/>
    </svg>
  ),

  'Data Science': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#0a1a0f"/>
      {/* Chart bars */}
      <rect x="30"  y="130" width="30" height="50" rx="4" fill="#86EFAC" opacity="0.8"/>
      <rect x="70"  y="100" width="30" height="80" rx="4" fill="#86EFAC" opacity="0.7"/>
      <rect x="110" y="80"  width="30" height="100" rx="4" fill="#86EFAC" opacity="0.9"/>
      <rect x="150" y="110" width="30" height="70"  rx="4" fill="#86EFAC" opacity="0.6"/>
      <rect x="190" y="60"  width="30" height="120" rx="4" fill="#86EFAC" opacity="1"/>
      <rect x="230" y="90"  width="30" height="90"  rx="4" fill="#86EFAC" opacity="0.7"/>
      <rect x="270" y="70"  width="30" height="110" rx="4" fill="#86EFAC" opacity="0.85"/>
      {/* Line chart */}
      <polyline points="30,140 75,110 120,85 165,115 210,65 255,95 300,75 345,55"
        fill="none" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Dots on line */}
      {[[30,140],[75,110],[120,85],[165,115],[210,65],[255,95],[300,75],[345,55]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#67E8F9" opacity="0.9"/>
      ))}
      {/* Pie chart */}
      <circle cx="358" cy="50" r="28" fill="none" stroke="#FCD34D" strokeWidth="8" strokeDasharray="60 114" strokeDashoffset="0" opacity="0.8"/>
      <circle cx="358" cy="50" r="28" fill="none" stroke="#FCA5A5" strokeWidth="8" strokeDasharray="35 139" strokeDashoffset="-60" opacity="0.7"/>
      <circle cx="358" cy="50" r="28" fill="none" stroke="#C4B5FD" strokeWidth="8" strokeDasharray="19 155" strokeDashoffset="-95" opacity="0.6"/>
      {/* Grid lines */}
      <line x1="20" y1="60" x2="380" y2="60" stroke="#86EFAC" strokeWidth="0.5" opacity="0.15"/>
      <line x1="20" y1="100" x2="380" y2="100" stroke="#86EFAC" strokeWidth="0.5" opacity="0.15"/>
      <line x1="20" y1="140" x2="380" y2="140" stroke="#86EFAC" strokeWidth="0.5" opacity="0.15"/>
      <ellipse cx="200" cy="130" rx="120" ry="30" fill="#86EFAC" opacity="0.04"/>
    </svg>
  ),

  'Design': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#1a0a0a"/>
      {/* Figma-like frames */}
      <rect x="20" y="25" width="100" height="70" rx="6" fill="none" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.6"/>
      <rect x="30" y="35" width="80" height="12" rx="3" fill="#FCA5A5" opacity="0.3"/>
      <rect x="30" y="55" width="55" height="8" rx="2" fill="#FCA5A5" opacity="0.2"/>
      <rect x="30" y="70" width="70" height="8" rx="2" fill="#FCA5A5" opacity="0.2"/>
      <rect x="30" y="84" width="40" height="8" rx="14" fill="#FCA5A5" opacity="0.5"/>
      {/* Card 2 */}
      <rect x="135" y="25" width="100" height="70" rx="6" fill="none" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="185" cy="50" r="18" fill="#C4B5FD" opacity="0.15"/>
      <circle cx="185" cy="50" r="18" fill="none" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.5"/>
      <rect x="145" y="76" width="80" height="6" rx="2" fill="#C4B5FD" opacity="0.3"/>
      <rect x="155" y="88" width="60" height="6" rx="2" fill="#C4B5FD" opacity="0.2"/>
      {/* Card 3 */}
      <rect x="250" y="25" width="130" height="70" rx="6" fill="none" stroke="#FCD34D" strokeWidth="1.5" opacity="0.6"/>
      <rect x="260" y="35" width="40" height="40" rx="4" fill="#FCD34D" opacity="0.12"/>
      <rect x="310" y="38" width="60" height="8" rx="2" fill="#FCD34D" opacity="0.4"/>
      <rect x="310" y="52" width="45" height="6" rx="2" fill="#FCD34D" opacity="0.25"/>
      <rect x="310" y="64" width="55" height="6" rx="2" fill="#FCD34D" opacity="0.2"/>
      {/* Bottom prototype connections */}
      <rect x="20" y="115" width="80" height="60" rx="6" fill="none" stroke="#FCA5A5" strokeWidth="1" opacity="0.4"/>
      <rect x="120" y="115" width="80" height="60" rx="6" fill="none" stroke="#C4B5FD" strokeWidth="1" opacity="0.4"/>
      <rect x="220" y="115" width="80" height="60" rx="6" fill="none" stroke="#86EFAC" strokeWidth="1" opacity="0.4"/>
      <rect x="320" y="115" width="60" height="60" rx="6" fill="none" stroke="#FCD34D" strokeWidth="1" opacity="0.4"/>
      {/* Arrows between frames */}
      <line x1="102" y1="145" x2="118" y2="145" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.5"/>
      <polygon points="116,141 122,145 116,149" fill="#FCA5A5" opacity="0.5"/>
      <line x1="202" y1="145" x2="218" y2="145" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.5"/>
      <polygon points="216,141 222,145 216,149" fill="#C4B5FD" opacity="0.5"/>
      <line x1="302" y1="145" x2="318" y2="145" stroke="#86EFAC" strokeWidth="1.5" opacity="0.5"/>
      <polygon points="316,141 322,145 316,149" fill="#86EFAC" opacity="0.5"/>
      <ellipse cx="200" cy="100" rx="100" ry="50" fill="#FCA5A5" opacity="0.03"/>
    </svg>
  ),

  'DevOps': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#0a1515"/>
      {/* CI/CD Pipeline */}
      {/* Nodes */}
      {[
        {x:40,  label:'Code',    c:'#67E8F9'},
        {x:110, label:'Build',   c:'#C4B5FD'},
        {x:180, label:'Test',    c:'#FCD34D'},
        {x:250, label:'Deploy',  c:'#86EFAC'},
        {x:320, label:'Monitor', c:'#FCA5A5'},
      ].map((n,i) => (
        <g key={i}>
          <circle cx={n.x + 20} cy="60" r="22" fill={n.c} fillOpacity="0.12" stroke={n.c} strokeWidth="1.5" strokeOpacity="0.6"/>
          <text x={n.x + 20} y="65" textAnchor="middle" fill={n.c} fontSize="8" fontWeight="bold" opacity="0.9">{n.label}</text>
          {i < 4 && <line x1={n.x + 43} y1="60" x2={n.x + 67} y2="60" stroke={n.c} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4,2"/>}
        </g>
      ))}
      {/* Docker containers */}
      <rect x="20"  y="110" width="55" height="35" rx="4" fill="#67E8F9" fillOpacity="0.1" stroke="#67E8F9" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="85"  y="110" width="55" height="35" rx="4" fill="#67E8F9" fillOpacity="0.1" stroke="#67E8F9" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="150" y="110" width="55" height="35" rx="4" fill="#C4B5FD" fillOpacity="0.1" stroke="#C4B5FD" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="215" y="110" width="55" height="35" rx="4" fill="#86EFAC" fillOpacity="0.1" stroke="#86EFAC" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="280" y="110" width="55" height="35" rx="4" fill="#FCA5A5" fillOpacity="0.1" stroke="#FCA5A5" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="345" y="110" width="40" height="35" rx="4" fill="#FCD34D" fillOpacity="0.1" stroke="#FCD34D" strokeWidth="1" strokeOpacity="0.5"/>
      {/* Labels */}
      {[['🐳','#67E8F9',47],['🐳','#67E8F9',112],['☸️','#C4B5FD',177],['☁️','#86EFAC',242],['📊','#FCA5A5',307],['🔒','#FCD34D',365]].map(([icon,c,x],i) => (
        <text key={i} x={x} y="132" textAnchor="middle" fontSize="14">{icon}</text>
      ))}
      {/* Bottom status bar */}
      <rect x="20" y="160" width="360" height="20" rx="4" fill="#0f1f1f"/>
      <rect x="24" y="164" width="100" height="12" rx="3" fill="#86EFAC" opacity="0.7"/>
      <rect x="130" y="164" width="60" height="12" rx="3" fill="#FCD34D" opacity="0.5"/>
      <rect x="196" y="164" width="80" height="12" rx="3" fill="#67E8F9" opacity="0.4"/>
      <ellipse cx="200" cy="100" rx="120" ry="30" fill="#67E8F9" opacity="0.03"/>
    </svg>
  ),

  'Marketing': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#1a1500"/>
      {/* Funnel */}
      <polygon points="60,30 200,30 180,70 80,70" fill="#FCD34D" opacity="0.2" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.6"/>
      <polygon points="80,75 180,75 165,110 95,110" fill="#FCD34D" opacity="0.3" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.6"/>
      <polygon points="95,115 165,115 152,145 108,145" fill="#FCD34D" opacity="0.4" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.6"/>
      <polygon points="108,150 152,150 140,170 120,170" fill="#FCD34D" opacity="0.7" stroke="#FCD34D" strokeWidth="2" strokeOpacity="0.8"/>
      {/* Labels */}
      <text x="130" y="53"  textAnchor="middle" fill="#FCD34D" fontSize="9" opacity="0.8">Awareness</text>
      <text x="130" y="96"  textAnchor="middle" fill="#FCD34D" fontSize="9" opacity="0.8">Interest</text>
      <text x="130" y="134" textAnchor="middle" fill="#FCD34D" fontSize="9" opacity="0.8">Decision</text>
      <text x="130" y="163" textAnchor="middle" fill="#FCD34D" fontSize="9" opacity="0.9">Convert</text>
      {/* Stats cards on right */}
      <rect x="240" y="20" width="140" height="40" rx="6" fill="#1a1500" stroke="#FCD34D" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="252" y="36" fill="#FCD34D" fontSize="9" opacity="0.6">Click-through Rate</text>
      <text x="252" y="52" fill="#FCD34D" fontSize="16" fontWeight="bold" opacity="0.9">4.8%</text>
      <rect x="240" y="70" width="140" height="40" rx="6" fill="#1a1500" stroke="#86EFAC" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="252" y="86" fill="#86EFAC" fontSize="9" opacity="0.6">Conversion Rate</text>
      <text x="252" y="102" fill="#86EFAC" fontSize="16" fontWeight="bold" opacity="0.9">12.3%</text>
      <rect x="240" y="120" width="140" height="40" rx="6" fill="#1a1500" stroke="#C4B5FD" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="252" y="136" fill="#C4B5FD" fontSize="9" opacity="0.6">ROI</text>
      <text x="252" y="152" fill="#C4B5FD" fontSize="16" fontWeight="bold" opacity="0.9">340%</text>
      <rect x="240" y="170" width="140" height="20" rx="4" fill="#1a1500" stroke="#FCA5A5" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="252" y="184" fill="#FCA5A5" fontSize="9" opacity="0.7">Impressions: 2.4M this month</text>
      <ellipse cx="130" cy="100" rx="80" ry="50" fill="#FCD34D" opacity="0.03"/>
    </svg>
  ),

  'Finance': (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="200" fill="#0a150a"/>
      {/* Candlestick chart */}
      {[
        {x:30,  o:140, c:110, h:100, l:150, up:true},
        {x:60,  o:110, c:130, h:100, l:140, up:false},
        {x:90,  o:130, c:100, h:90,  l:140, up:true},
        {x:120, o:100, c:120, h:88,  l:130, up:false},
        {x:150, o:120, c:85,  h:75,  l:130, up:true},
        {x:180, o:85,  c:105, h:75,  l:115, up:false},
        {x:210, o:105, c:75,  h:65,  l:115, up:true},
        {x:240, o:75,  c:95,  h:65,  l:105, up:false},
        {x:270, o:95,  c:60,  h:50,  l:105, up:true},
        {x:300, o:60,  c:80,  h:50,  l:90,  up:false},
        {x:330, o:80,  c:50,  h:40,  l:90,  up:true},
        {x:360, o:50,  c:70,  h:40,  l:80,  up:false},
      ].map((c,i) => (
        <g key={i}>
          <line x1={c.x+8} y1={c.h} x2={c.x+8} y2={c.l} stroke={c.up ? '#86EFAC':'#FCA5A5'} strokeWidth="1.5" opacity="0.7"/>
          <rect x={c.x} y={Math.min(c.o,c.c)} width="16" height={Math.abs(c.o-c.c)||2} rx="1"
            fill={c.up ? '#86EFAC':'#FCA5A5'} opacity={c.up?0.8:0.7}/>
        </g>
      ))}
      {/* Moving average line */}
      <polyline points="30,130 60,120 90,108 120,100 150,90 180,88 210,78 240,72 270,62 300,58 330,52 360,48"
        fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" opacity="0.6" strokeDasharray="4,2"/>
      {/* Volume bars at bottom */}
      {[30,60,90,120,150,180,210,240,270,300,330,360].map((x,i) => (
        <rect key={i} x={x} y={185-[15,22,18,25,20,28,30,18,35,24,28,22][i]} width="16"
          height={[15,22,18,25,20,28,30,18,35,24,28,22][i]} fill="#86EFAC" opacity="0.2"/>
      ))}
      <ellipse cx="200" cy="100" rx="120" ry="40" fill="#86EFAC" opacity="0.03"/>
    </svg>
  ),
};

// Default illustration for any category not in the map
const DEFAULT_ILLUSTRATION = (color = '#C4B5FD') => (
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="400" height="200" fill="#0f0f1a"/>
    <circle cx="200" cy="100" r="60" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" strokeOpacity="0.4"/>
    <circle cx="200" cy="100" r="35" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
    <text x="200" y="110" textAnchor="middle" fontSize="36">🎓</text>
    <ellipse cx="200" cy="100" rx="120" ry="50" fill={color} opacity="0.03"/>
  </svg>
);

const COLOR_MAP = {
  lavender: '#C4B5FD', mint: '#86EFAC', peach: '#FCA5A5',
  cyan: '#67E8F9', amber: '#FCD34D',
};

export default function TrainingCard({ training, onOpenModal }) {
  const {
    title       = 'Untitled Course',
    category    = 'General',
    tagColor    = 'lavender',
    level       = 'Beginner',
    description = '',
    duration    = '',
    price       = 0,
    enrolled    = 0,
    rating      = 0,
    reviews     = 0,
    lessons,
    chapters,
    provider,
    featured,
  } = training || {};

  const color       = tagColor || 'lavender';
  const accentColor = COLOR_MAP[color] || '#C4B5FD';
  const illustration = CATEGORY_ILLUSTRATIONS[category] || DEFAULT_ILLUSTRATION(accentColor);

  return (
    <div className="tcard" onClick={() => onOpenModal && onOpenModal(training)}
      style={{ cursor: 'pointer' }}>

      {/* ── THUMBNAIL ── */}
      <div className="tcard__thumb">
        {/* SVG illustration — always renders, no network request */}
        <div className="tcard__thumb-svg">{illustration}</div>

        {/* Gradient overlay */}
        <div className="tcard__thumb-overlay-img" />

        {/* Top badges */}
        <div className="tcard__thumb-top">
          <span className={`tcard__cat-badge tcard__cat-badge--${color}`}>{category}</span>
          {featured && <span className="tcard__popular-badge">⚡ Popular</span>}
        </div>

        {/* Bottom row */}
        <div className="tcard__thumb-bottom">
          <span className="tcard__level-badge">{level}</span>
          <span className="tcard__play-btn">▶ Preview</span>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="tcard__body">
        <h4 className="tcard__title">{title}</h4>
        {(provider || category) && <p className="tcard__provider">{provider || category}</p>}
        {description && (
          <p className="tcard__desc">
            {description.length > 85 ? description.slice(0, 85) + '…' : description}
          </p>
        )}
        <div className="tcard__meta-row">
          {duration    && <span className="tcard__meta-item"><span className="tcard__meta-icon">⏱</span>{duration}</span>}
          {lessons > 0 && <span className="tcard__meta-item"><span className="tcard__meta-icon">📚</span>{lessons} lessons</span>}
          {chapters > 0 && <span className="tcard__meta-item"><span className="tcard__meta-icon">📂</span>{chapters} chapters</span>}
        </div>
        <div className="tcard__rating-row">
          <StarRating rating={rating} />
          <span className="tcard__reviews">({(reviews || 0).toLocaleString()})</span>
        </div>
        <div className="tcard__footer">
          <div className="tcard__price-wrap">
            {price === 0
              ? <span className="tcard__free">🆓 Free</span>
              : <span className="tcard__price">₹{price.toLocaleString()}</span>
            }
            <span className="tcard__enrolled-count">
              👥 {enrolled >= 1000 ? `${(enrolled/1000).toFixed(1)}k` : enrolled} enrolled
            </span>
          </div>
          <span className="tcard__cta">View →</span>
        </div>
      </div>
    </div>
  );
}
