# Adrijus Lazdauskas – Portfolio

Zweisprachige statische Website für GitHub Pages. Kein Installations- oder Build-Schritt erforderlich.

## Lokal öffnen

Im Ordner dieses README:

```sh
python3 -m http.server 4173 --directory dist
```

Dann `http://localhost:4173` öffnen.

## Inhalt

- Deutsch und Englisch (`?lang=de` / `?lang=en`), mit gespeicherter Sprachauswahl.
- Light-/Darkmode, zuerst entsprechend der Systemeinstellung.
- Eigener Mauszeiger mit heller Kontur und blauem Leuchten; stärkeres Leuchten über Links und aktiven Buttons. Nur bei Maus-/Trackpad-Bedienung, mit nativen Fallbacks.
- Einstieg mit dezenten Textlinks zu Werdegang und CV, ohne hervorgehobenen Button.
- Einseitige CV-PDFs in beiden Sprachen, passend zur Website-Auswahl verlinkt; im Einstieg als dezenter Textlink.
- phisheye-Demo: drei Mails auswählen, animierter Analyseweg, zufälliges Beispielergebnis und Neustart.
- Reihenfolge: Werdegang, Projekte (phisheye, Security on a Chip / Samurai, Bauilify), Praxisarbeiten, Kenntnisse und Kontakt.
- Aufklappbarer konzeptioneller Ablauf zur risikobasierten Schwachstellenpriorisierung in Deutsch und Englisch; ohne KQL-Code oder Unternehmensdaten.
- Touch- und Tastaturbedienung; reduzierte Animationen bei entsprechender Systemeinstellung.

Die Demo ist eine lokale Simulation. Sie verarbeitet keine echten E-Mails und kontaktiert weder phisheye noch VirusTotal. Es gibt keine extern geladenen Schriftarten, Tracker oder Analyse-Dienste.

## GitHub Pages veröffentlichen

Repository: **adrijus-lazdauskas/adrijus-lazdauskas.github.io**.

1. Änderungen an der Website in den Branch `main` übernehmen.
2. In **Settings → Pages → Build and deployment → Source** muss **GitHub Actions** ausgewählt sein.
3. Der Workflow **Deploy portfolio to GitHub Pages** startet bei Änderungen an `main` automatisch. Er kann außerdem unter **Actions → Run workflow** manuell gestartet werden.

Der Workflow veröffentlicht ausschließlich `dist/`. Die Website-Adresse nach erfolgreicher Veröffentlichung lautet `https://adrijus-lazdauskas.github.io/`.

Offizielle Anleitung: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Bearbeiten

- `dist/app.js`: deutsche und englische Texte, Inhalte und Mail-Demo.
- `dist/styles.css`: Gestaltung, Light-/Darkmode und Bildschirmgrößen.
- `dist/assets/`: die beiden CV-PDFs. Beide Sprachversionen bei Änderungen aktualisieren.
- `dist/index.html`: Metadaten und lesbare deutsche HTML-Fassung für Browser ohne JavaScript.
- Nach Textänderungen `node scripts/prerender.cjs` ausführen, damit die deutsche HTML-Fassung aktuell bleibt.

## Inhaltliche Einordnung

- Studium mit voraussichtlichem Abschluss 2027.
- CDSA/CWES als laufende Weiterbildung, nicht als erworbene Zertifikate.
- Sprachkenntnisse: Deutsch und Litauisch fließend, Englisch B1.
- Bei Security on a Chip ist die Mitentwicklung des Samurai-Loggers mit USB-Monitoring unter Linux belegt und beschrieben.
- Bauilify und phisheye werden anhand ihrer Projektfunktionen vorgestellt.
- phisheye klar als Projekt in Entwicklung gekennzeichnet.
- Die Praxisarbeiten enthalten keine internen Unternehmensdaten. Die Originalarbeiten sind nicht Teil der Website.
