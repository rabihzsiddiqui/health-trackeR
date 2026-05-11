# nuRa

A gentle symptom tracker for when your body is trying to tell you something.

## The story

This started with a stomach ache.

The dull pain lasted for hours, and at some point it occurred to me I had no idea when the pain had started, what I had eaten that could've caused it, or whether I'd already taken anything for it. By the time I thought to write it down, the details were already fuzzy. Was it food poisoning from the chicken? Potential cross-contamination with sesame, which I am deathly allergic to? Something I caught? I didn't know, because I had nothing written down.

The problem isn't a lack of tracking apps. It's that when you actually feel awful, opening Notes, finding the right page, typing a paragraph, and remembering to include the time is way too much. You need something that takes three taps and gets out of your way.

nuRa is that.

## What it does

Tap a tile. Pick mild, bad, or terrible. Optionally jot a note. Done.

- A home screen of symptom tiles you actually use, in your own vocabulary
- A timeline of everything you've logged, grouped by day, with real timestamps
- Day and month views, because patterns matter and so do single bad afternoons
- Your data lives on your device. No account, no cloud, no third parties

## What it isn't

It isn't a doctor. It doesn't diagnose, it doesn't recommend medication doses, and it doesn't decide whether you should be worried about something. Its job is to remember things accurately so that you, or a real doctor, can look at the timeline and notice patterns. The diagnosis happens with a human.

## How it's built

A local-first progressive web app you can add to your home screen.

- **Next.js 16 + React 19** for the framework
- **Tailwind CSS 4** for the design system
- **Dexie.js** as the IndexedDB wrapper for local storage
- **TypeScript** throughout
- No backend, no analytics, no third-party network calls

## Installing it on your phone

On your phone, open the URL in Safari (iOS) or Chrome (Android) and choose **Add to Home Screen**. It will live as an icon next to your other apps.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## A note on the medication side

The data model supports logging medications and a user-set "next dose OK at" time, but the app never calculates safe intervals or recommends doses. Dose timing depends on the specific medication, your weight, your health conditions, and a dozen other things this app can't see. Follow the label. Talk to a pharmacist or doctor. tendeR is just here to remember when you took it.

## Roadmap

What's done:

- [x] Quick-log flow with severity and notes
- [x] Custom symptom palette with warm, distinct colors
- [x] Timeline with day grouping and reverse-chronological order
- [x] Month calendar view for spotting patterns
- [x] Local IndexedDB persistence
- [x] Accessibility-conscious design (shape + luminance for severity, no red/green reliance)

What's next:

- [ ] PWA install (manifest, service worker, icons)
- [ ] Settings panel: dark mode, severity visuals, text size, warmth
- [ ] Medication entry UI with manual next-dose reminders
- [ ] Custom symptom management (add, rename, reorder, archive)
- [ ] CSV / PDF export for doctor visits
- [ ] Maybe someday: voice input, watch complications, weekly summaries

## Disclaimer

nuRa is not medical software. It does not provide medical advice and is not a substitute for talking to a qualified healthcare professional. If a symptom is worrying you, please see a doctor.

## License

MIT I guess? This is a personal project.
