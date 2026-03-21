# Vibhor Bansal — Data Engineer Portfolio 🚀

A modern, premium personal portfolio website built for a Data Engineer. Features a dark/light theme, animated particle background, glassmorphism UI, smooth scroll animations, and a contact form that sends email notifications.

Built entirely using **prompt engineering** with **Antigravity (Google DeepMind's AI coding assistant)** and **Claude**.

> **Live Demo:** _Coming soon on Vercel_

---

## 🎯 What It Does

- Showcases professional experience, skills, and projects in a visually stunning single-page layout
- Features **10 content sections** — Hero, About, Skills, Experience, Projects, System Design, Achievements, Upskilling, Blog, and Contact
- **Dark/light mode toggle** with localStorage persistence
- **Animated particle network** background on the hero section
- **Animated counters** that trigger on scroll (200GB+ daily, 100K+ msg/hr, 99.9% uptime, etc.)
- **Contact form** integrated with [Web3Forms](https://web3forms.com) — sends you an email when someone submits the form
- **Resume PDF download** functionality
- Fully **responsive** across mobile, tablet, and desktop

---

## 🖼️ Screenshots

| Dark Theme | Light Theme |
|:---:|:---:|
| Glassmorphism cards, blue/purple gradients | Clean light backgrounds, sharp contrast |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 16 (App Router)** | React framework with server components |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling with `@theme` design tokens |
| **Framer Motion** | Scroll reveal animations, hover effects, transitions |
| **react-intersection-observer** | Trigger animations when sections come into view |
| **react-icons** | Icon library (Feather, Simple Icons, Font Awesome) |
| **Web3Forms** | Contact form email delivery (no backend needed) |
| **Canvas API** | Animated particle network background |

---

## 🧠 How I Built This — The AI-Powered Workflow

This entire portfolio was built through **prompt engineering** using Antigravity. Here's the process:

### Step 1: Writing the Master Prompt

I wrote a comprehensive prompt describing exactly what I wanted — a premium Data Engineer portfolio with specific sections, design aesthetics (dark theme, glassmorphism, particle animations), responsive design, and functional features like a contact form and resume download.

### Step 2: Planning Phase — AI Creates the Architecture

Antigravity first created a **detailed implementation plan** — the tech stack choices (Next.js + Tailwind CSS v4 + Framer Motion), component hierarchy, design system, and verification plan. I reviewed and approved this plan before any code was written.

### Step 3: Building the Design System

The AI set up the entire design foundation:
- Custom CSS variables for dark/light themes
- Tailwind v4 `@theme inline` tokens for colors, fonts
- Glassmorphism utility classes
- Gradient text effects
- Custom scrollbar styling

### Step 4: Building Components — Systematically

The AI built each component with scroll-reveal animations:

- **Navbar** — Sticky with glassmorphism on scroll, active section highlighting, mobile hamburger menu, theme toggle
- **Hero** — Full-screen with canvas particle network, gradient name, CTA buttons, bouncing scroll indicator
- **About** — Professional summary with three highlight cards
- **Skills** — 6 categorized groups (Cloud, Data Tech, Processing, Orchestration, Programming, DevOps) with badge tags
- **Experience** — Vertical timeline with glowing dots for WPP Media, Optum, Bank of America
- **Projects** — 6 project cards with featured highlight, impact statements, and tech stack tags
- **System Design** — 3 architecture flow diagrams (CDC Pipeline, Streaming, Medallion Architecture) with color-coded layers
- **Achievements** — 6 animated counters triggered by scroll intersection
- **Upskilling** — Cards for dbt, Generative AI, Intelligent Data Apps
- **Blog** — 6 auto-generated article preview cards
- **Contact** — Contact info sidebar + validated form with Web3Forms integration
- **Footer** — Social links + back-to-top button

### Step 5: Verification — AI Tests Its Own Work

Antigravity verified everything:
1. Ran `npm run build` — zero errors
2. Opened the app in a browser and tested all sections
3. Tested dark/light mode toggle
4. Tested smooth scrolling navigation
5. Tested contact form validation (empty submissions show errors)
6. Tested responsive design at mobile (375px) width

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css              # Design system (themes, glassmorphism, utilities)
│   ├── layout.tsx               # Root layout (fonts, SEO metadata, ThemeProvider)
│   └── page.tsx                 # Main page composing all sections
├── components/
│   ├── Navbar.tsx               # Sticky nav + theme toggle + mobile menu
│   ├── Hero.tsx                 # Full-screen hero + CTA buttons
│   ├── ParticleBackground.tsx   # Canvas animated particle network
│   ├── About.tsx                # Professional summary + highlight cards
│   ├── Skills.tsx               # 6 categorized skill groups
│   ├── Experience.tsx           # Timeline layout (3 positions)
│   ├── Projects.tsx             # Project cards with featured highlight
│   ├── SystemDesign.tsx         # Architecture flow diagrams
│   ├── Achievements.tsx         # Animated counter metrics
│   ├── Upskilling.tsx           # Learning & growth cards
│   ├── Blog.tsx                 # Article preview cards
│   ├── Contact.tsx              # Contact form + info sidebar
│   ├── Footer.tsx               # Social links + back to top
│   ├── SectionHeading.tsx       # Reusable section title component
│   └── AnimatedCounter.tsx      # Reusable animated number counter
└── context/
    └── ThemeContext.tsx          # Dark/light mode context + localStorage
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/vibhorbansal98/vibhor-data-engineer-portfolio.git
cd vibhor-data-engineer-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your Web3Forms access key

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Your Web3Forms access key for contact form emails. Get one free at [web3forms.com](https://web3forms.com) | Yes |

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

---

## 🌐 Deploying to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import the repo on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new) and sign in with your GitHub account
   - Click **"Import"** next to your `vibhor-data-engineer-portfolio` repository

3. **Add environment variables**
   - Go to **Settings → Environment Variables**
   - Add `NEXT_PUBLIC_WEB3FORMS_KEY` with your Web3Forms access key

4. **Click "Deploy"** — Vercel will build and deploy in under a minute. You'll get a live URL like:
   ```
   https://vibhor-data-engineer-portfolio.vercel.app
   ```

### Option 2: Via Vercel CLI

```bash
# Install the Vercel CLI globally
npm install -g vercel

# Deploy from your project directory
vercel

# For production deployment
vercel --prod
```

### Auto-Deployments

Once connected, every push to `main` triggers an automatic production deployment. Pull requests get their own **preview deployments** with unique URLs.

---

## 📝 Customization

### Replace Your Resume
Drop your actual resume PDF at `public/resume.pdf`.

### Update Social Links
Edit the URLs in `src/components/Contact.tsx` and `src/components/Footer.tsx`.

### Update Content
All content (experience, projects, skills, blog posts) is defined as data arrays at the top of each component file — easy to modify without touching the layout code.

---

## 💡 What I Learned

1. **Prompt engineering is architecture.** Describing design aesthetics, section structure, and interaction patterns in detail gave the AI everything it needed to build production-quality code.

2. **Tailwind CSS v4 is a game-changer.** The new `@theme inline` syntax makes design tokens clean and the CSS output minimal.

3. **Framer Motion + Intersection Observer** is the perfect combo for scroll animations — simple API, great performance.

4. **AI can verify its own work.** Antigravity tested the site in a real browser — checking layouts, theme toggling, form validation, and responsive design — all autonomously.

5. **The human is still the architect.** I made the design decisions, approved the plan, and provided real content. The AI was the builder.

---

## 📝 License

MIT — feel free to use this as a starting point for your own portfolio!

---

*Built with ❤️ using Antigravity + Claude + thoughtful prompt engineering.*
