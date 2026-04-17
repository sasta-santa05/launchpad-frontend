# ◈ Launchpad — Frontend (Public Flow)

> A visually premium Training, Placement & Internship platform built with React.
> Dark & Pastel aesthetic — "Pinterest meets Internshala."

---

## 🗂️ Project Structure

```
launchpad/
├── public/
│   └── index.html
├── src/
│   ├── App.js                    ← Router + layout shell
│   ├── index.js                  ← React entry point
│   ├── globals.css               ← Design system (CSS variables, reset, shared utils)
│   │
│   ├── data/
│   │   └── mockData.js           ← Mock REST API responses (replace with Spring Boot calls)
│   │
│   ├── components/
│   │   ├── Navbar.jsx / .css     ← Sticky top nav with scroll blur
│   │   ├── InternshipCard.jsx/.css  ← Reusable internship card (used on Home + List)
│   │   └── TrainingCard.jsx/.css    ← Reusable training/course card
│   │
│   └── pages/
│       ├── Home.jsx / .css            ← / (Hero, Categories, Featured sections)
│       ├── InternshipList.jsx / .css  ← /internships (Masonry + sidebar filters)
│       ├── InternshipDetails.jsx/.css ← /internships/:id (Split layout + sticky panel)
│       ├── TrainingList.jsx / .css    ← /trainings (Card grid + filters)
│       ├── Login.jsx / .css           ← /login (Split screen, student/employer toggle)
│       └── Register.jsx / .css        ← /register (Dual-intent form + success state)
└── package.json
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server (localhost:3000)
npm start

# 3. Build for production
npm run build
```

---

## 🎨 Design System (`globals.css`)

All design tokens are CSS custom properties on `:root`:

| Variable | Value | Use |
|---|---|---|
| `--bg-base` | `#0D1017` | Main page background |
| `--bg-card` | `#131720` | Card backgrounds |
| `--lavender` | `#C4B5FD` | Primary accent / CTAs |
| `--mint` | `#86EFAC` | Success states / Remote badges |
| `--peach` | `#FCA5A5` | Design / warning accents |
| `--cyan` | `#67E8F9` | Engineering / tech accents |
| `--font-display` | Syne | Headings, labels, buttons |
| `--font-body` | DM Sans | Body text, paragraphs |

---

## 🔌 Backend Integration (Spring Boot)

All dynamic data is mocked in `src/data/mockData.js`. To connect to your Spring Boot + MongoDB backend, replace mock imports with `fetch` calls:

```js
// BEFORE (mock)
import { internships } from '../data/mockData';

// AFTER (Spring Boot REST API)
const [internships, setInternships] = useState([]);
useEffect(() => {
  fetch('http://localhost:8080/api/internships')
    .then(r => r.json())
    .then(setInternships);
}, []);
```

### Expected API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/internships` | List all internships |
| `GET` | `/api/internships/:id` | Single internship details |
| `GET` | `/api/trainings` | List all training programs |
| `GET` | `/api/trainings/:id` | Single training details |
| `POST` | `/api/auth/login` | Authenticate user |
| `POST` | `/api/auth/register` | Register student or employer |

---

## 📄 Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Hero + category browse + featured grids |
| `/internships` | `InternshipList` | Sidebar filters + Pinterest masonry grid |
| `/internships/:id` | `InternshipDetails` | 70/30 split layout, sticky apply panel, match score teaser |
| `/trainings` | `TrainingList` | Category tabs + card grid + filters |
| `/login` | `Login` | Split screen, student/employer toggle, Google OAuth placeholder |
| `/register` | `Register` | Intent selector, dynamic form fields, success state |

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "react-scripts": "5.0.1"
}
```

No Tailwind, no Material-UI. Pure CSS with CSS Custom Properties.

---

## 🔒 Auth Flow (Public)

Pages are public — all protected pages show a **"Login to Apply"** CTA that redirects to `/login`.
The **Match Score** feature on InternshipDetails is blurred and locked, prompting login.

After login/register is implemented, protected routes can be added in `App.js` using a standard `PrivateRoute` wrapper pattern.
