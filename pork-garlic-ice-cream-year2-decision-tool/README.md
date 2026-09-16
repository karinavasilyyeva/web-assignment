# Pork Garlic Ice Cream — Year 2 Decision Tool

A simple planning calculator for deciding whether the Pork Garlic Ice Cream business should proceed with a Year 2 plan. Enter prior-year performance and Year 2 assumptions to calculate forecast revenue, cost of goods, gross profit, net profit, net margin, break-even unit volume, and the change against Year 1. The recommendation is based on profitability and whether projected profit at least matches Year 1.

## Run locally

1. Install [Node.js](https://nodejs.org/) (version 20 or later).
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

Run `npm run build`. Vite writes the deployable site to `dist/`.

## Upload to a new GitHub repository

1. On GitHub, create a new empty repository named `pork-garlic-ice-cream-year2-decision-tool`. Do not add a README, `.gitignore`, or license there.
2. In a terminal opened in this exact folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial Year 2 decision tool"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pork-garlic-ice-cream-year2-decision-tool.git
   git push -u origin main
   ```

3. Replace `YOUR-USERNAME` with your GitHub username. The included `.gitignore` keeps dependencies, build output, and environment files out of the repository.

## Deploy on Vercel

1. Sign in at [Vercel](https://vercel.com/) with GitHub.
2. Click **Add New → Project**, then import `pork-garlic-ice-cream-year2-decision-tool`.
3. Vercel detects Vite automatically. Leave the build command as `npm run build` and output directory as `dist`.
4. Click **Deploy**. Later pushes to `main` automatically publish an updated site.

## Project structure

```text
pork-garlic-ice-cream-year2-decision-tool/
├── public/
│   └── mark.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
