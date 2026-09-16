# Adrijus Lazdauskas – Portfolio

Zweisprachige statische Website für GitHub Pages. Kein Installations- oder Build-Schritt erforderlich.

## Lokal öffnen

Im Ordner dieses README:

```sh
python3 -m http.server 4173 --directory dist
```

Dann `http://localhost:4173` öffnen.

## Inhalt

- Englisch als Standard; Deutsch und Englisch (`?lang=de` / `?lang=en`) mit gespeicherter Sprachauswahl.
- Light-/Darkmode, zuerst entsprechend der Systemeinstellung.
- Eigener Mauszeiger mit heller Kontur und blauem Leuchten; stärkeres Leuchten über Links und aktiven Buttons. Nur bei Maus-/Trackpad-Bedienung, mit nativen Fallbacks.
- LinkedIn, GitHub, Hack The Box und E-Mail direkt im Einstieg; dezente Textlinks zu Werdegang und CV.
- Einseitige CV-PDFs in beiden Sprachen, passend zur Website-Auswahl verlinkt; im Einstieg als dezenter Textlink.
- Kompakte Bauilify-Karte (180 px Kartenhöhe): einen Glasfaser-Bauabschnitt per Ziehen, Tippen oder Tastatur auf einer Straße platzieren. Überschneidungen mit einer bestehenden Baustelle werden nach Straße, Hausnummernbereich und Zeitraum geprüft. Ein anderer Abschnitt oder Termin löst den Konflikt.
- Reihenfolge: Werdegang, Projekte (Bauilify mit Kartendemo, phisheye, Security on a Chip / Samurai), Praxisarbeiten, Kenntnisse und Kontakt.
- Touch- und Tastaturbedienung; reduzierte Animationen bei entsprechender Systemeinstellung.

Die Demo verwendet eine fiktive Straßenkarte mit einer bestehenden Wasserleitungs-Baustelle und einer frei platzierbaren Glasfaser-Baustelle. Die gezeichneten Abschnitte rasten auf Hausnummernbereiche ein. Sie läuft lokal im Browser und benötigt keine Verbindung zu Bauilify. Es gibt keine extern geladenen Schriftarten, Tracker oder Analyse-Dienste.

## GitHub Pages veröffentlichen

Repository: **adrijus-lazdauskas/adrijus-lazdauskas.github.io**.

1. Änderungen an der Website in den Branch `main` übernehmen.
2. In **Settings → Pages → Build and deployment → Source** muss **GitHub Actions** ausgewählt sein.
3. Der Workflow **Deploy portfolio to GitHub Pages** startet bei Änderungen an `main` automatisch. Er kann außerdem unter **Actions → Run workflow** manuell gestartet werden.

Der Workflow veröffentlicht ausschließlich `dist/`. Die Website-Adresse nach erfolgreicher Veröffentlichung lautet `https://adrijus-lazdauskas.github.io/`.

Offizielle Anleitung: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Bearbeiten

- `dist/app.js`: deutsche und englische Texte, Inhalte, Sprach- und Farbschemawechsel.
- `dist/planner.js`: Bauilify-Kartendemo mit Zeicheninteraktion, Zeitraumwahl, Konfliktprüfung und Übersetzungen.
- `dist/styles.css`: Gestaltung, Light-/Darkmode und Bildschirmgrößen.
- `dist/assets/`: die beiden CV-PDFs. Beide Sprachversionen bei Änderungen aktualisieren.
- `dist/index.html`: Metadaten und lesbare englische HTML-Fassung für Browser ohne JavaScript.
- Nach Textänderungen `node scripts/prerender.cjs` ausführen, damit die englische HTML-Fassung aktuell bleibt.

## Inhaltliche Einordnung

- Studium mit voraussichtlichem Abschluss 2027.
- CDSA/CWES als eigenständige Zertifizierungsvorbereitung in der Freizeit, mit laufendem Status.
- Sprachkenntnisse: Deutsch und Litauisch fließend, Englisch auf Business-Niveau.
- Bei Security on a Chip ist die Mitentwicklung des Samurai-Loggers mit USB-Monitoring unter Linux belegt und beschrieben.
- Bauilify und phisheye werden anhand ihrer Projektfunktionen vorgestellt.
- phisheye klar als Projekt in Entwicklung gekennzeichnet.
- Die Praxisarbeiten enthalten keine internen Unternehmensdaten. Die Originalarbeiten sind nicht Teil der Website.
