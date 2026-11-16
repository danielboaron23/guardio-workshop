# Guardio Workshop

A practice repo for the **Claude Code for Designers** workshop.

It contains one product, Guardio (consumer security), on two platforms:

| | What it is | Where you see it |
|---|---|---|
| **Desktop** | A web app (React + Tailwind) | The browser / the Preview pane in the Claude app |
| **Mobile** | A native app (React Native + Expo) | The iOS Simulator |
| **Design system** | Storybook, built from the same code | The browser / the Preview pane |

Both apps are built from **one set of design tokens**, so one change can show up on both.

> This is a workshop demo built from Guardio's designs. It is not Guardio's production code.

---

## 1. Before the workshop: install these

You need a **Mac**. The iOS Simulator only runs on macOS.

| # | What | How | Check it worked |
|---|---|---|---|
| 1 | **Xcode** (includes the iOS Simulator) | Install from the Mac App Store. It is about 15 GB or more and can take over an hour, so **do it the day before**. Open Xcode once and accept the licence. | See step 2 |
| 2 | **An iOS Simulator runtime** | In Xcode: *Settings → Components → iOS* → Get. Then open the Simulator once: *Xcode → Open Developer Tool → Simulator*. | An iPhone appears on screen |
| 3 | **Claude desktop app** | https://claude.com/download and sign in. We work in the **Code** tab. | The app opens |
| 4 | **Node.js 22.18 or newer** | https://nodejs.org (the LTS installer) | `node -v` |
| 5 | **pnpm** | `npm install -g pnpm` | `pnpm -v` |
| 6 | **Git + a GitHub account** | Git comes with Xcode. Create an account at https://github.com if you do not have one. | `git --version` |

Nothing to install for **Expo Go**: the first time you run the mobile app, it is installed into the simulator for you.

**No Mac, or Xcode did not install?** You can still run the desktop app and Storybook. For mobile, install **Expo Go** on your own iPhone or Android phone and scan the QR code that `pnpm mobile` prints (phone and computer on the same Wi-Fi).

---

## 2. Get the project

```bash
git clone https://github.com/danielboaron23/guardio-workshop.git
```

```bash
cd guardio-workshop
```

```bash
pnpm install
```

---

## 3. Run it

### In the Claude desktop app (how we work in the workshop)

1. Open the **Code** tab and choose the `guardio-workshop` folder.
2. Ask Claude: **"Run the web app, the mobile app and Storybook."**
   The three are already set up in `.claude/launch.json`.
3. The web app and Storybook open in the Preview pane. The mobile app opens in the iOS Simulator pane.

### From a terminal

```bash
pnpm web
```
Desktop app → http://localhost:5180

```bash
pnpm mobile
```
Mobile app → press `i` to open it in the iOS Simulator

```bash
pnpm storybook
```
Design system → http://localhost:6016

---

## 4. Find your way around

```
guardio-workshop/
├── apps/
│   ├── web/        Desktop app (React + Tailwind) and Storybook
│   └── mobile/     Mobile app (React Native + Expo)
├── packages/
│   ├── tokens/     Colours, typography, spacing, radius — the single source for both apps
│   ├── data/       Mock data and the four user states, shared by both apps
│   └── assets/     Icons, logos and illustrations exported from Figma
└── docs/figma-ref/ Reference screenshots of the designs
```

**What is built**

| Screen | Desktop | Mobile |
|---|---|---|
| Home | ✅ | ✅ four user states |
| Settings / Profile | ✅ | ✅ |
| Settings / Subscription | ✅ | 🔨 workshop exercise |
| Settings / Protection | ✅ | 🔨 workshop exercise |

**How to reach Settings:** on desktop, click the round **MS** button at the top right of Home. On mobile, tap the **Account** tab.

---

## 5. Things to try

**Change the user state on both apps at once.** Open `packages/data/src/current-state.ts` and change `'onboarding'` to `'activated'`, `'nothingInstalled'` or `'atRisk'`. Both apps reload.

**Change a design token.** Edit a colour in `packages/tokens/src/index.ts`, then run:

```bash
pnpm tokens
```

The web app, the mobile app and Storybook all pick it up.

---

## 6. Working with branches and pull requests

- One branch per task, for example `mobile/subscription-screen` or `web/at-risk-banner`.
- A pull request only contains the files you changed. Change files in `apps/mobile` only and the desktop app is untouched.
- Files in `packages/` are shared. A change there affects **both** apps.
- Use your own name in the branch (`dana/mobile-subscription`) so 15 people do not collide.

---

## 7. If something does not work

| Problem | Fix |
|---|---|
| "Port … is in use" | Another project is using the port. Stop it, or ask Claude to "free the port". |
| The simulator shows "Project is incompatible with this version of Expo Go" | An old Expo Go is installed. Long-press its icon in the simulator → Remove App, then run `pnpm mobile` again. |
| The mobile app cannot find a new image or icon | Stop `pnpm mobile` and start it again. |
| `pnpm install` fails | Check `node -v` is 22.18 or newer, then run `pnpm install` again. |
| No simulator opens | Open Xcode → *Open Developer Tool → Simulator* once, then run `pnpm mobile` and press `i`. |
