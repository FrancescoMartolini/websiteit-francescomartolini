# Francesco Martolini — Portfolio Web & IT

Sito statico (HTML, CSS e un piccolo JavaScript). Nessuna build, nessuna dipendenza.

## Struttura

```
index.html          pagina unica con tutte le sezioni
privacy.html        informativa privacy
assets/css/style.css  stile e design token (colori e font in :root)
assets/js/main.js   menu mobile e voce attiva nel menu
assets/fonts/       Manrope e Inter (self-hosted, subset latino)
assets/img/         favicon, immagine Open Graph, futuri screenshot
_headers            intestazioni di sicurezza e cache per Cloudflare Pages
robots.txt
```

## Anteprima in locale

```
python3 -m http.server 8000
```
poi apri http://localhost:8000

## Come aggiornare i contenuti

- **Testi:** modifica direttamente `index.html`. Ogni sezione ha un `id` (`sviluppo-web`, `consulenza-it`, `progetti`, `chi-sono`, `contatti`).
- **Colori e font:** variabili in cima a `assets/css/style.css`.
- **Nuovo progetto:** duplica un blocco `<article class="project">` in `#progetti`. Usa `is-pending` finché la scheda è incompleta. Indica sempre se è "Progetto reale" o "Progetto dimostrativo".
- **Icone e illustrazioni:** sono nello sprite SVG in cima a `index.html` (`<symbol id="i-...">`). Le due illustrazioni (browser e rack) sono stilizzate e non rappresentano lavori reali.

## Screenshot dei progetti

In ogni card progetto c'è un riquadro `.thumb` con la scritta "Screenshot in arrivo" o "In preparazione". Per inserire uno screenshot reale:

1. salva l'immagine in `assets/img/` (WebP o JPEG ottimizzato);
2. sostituisci il contenuto di `<div class="thumb">…</div>` con
   `<img src="assets/img/NOME.webp" alt="Descrizione" width="1280" height="800" loading="lazy">`.

Per aggiungere una foto personale in "Chi sono", inserisci un `<figure>` con un'immagine tua nel punto indicato dal commento HTML.

## Da completare prima del lancio

Cerca `TODO` e `example.com` nel codice (`grep -rn "TODO\|example.com" .`).

- [ ] Scheda progetto 01: verificare il campo "Ruolo" (testo ricavato dal README del repository) e aggiungere uno screenshot reale.
- [ ] Progetti 02 e 03: realizzarli, oppure rimuovere le card.
- [ ] Dominio: aggiungere canonical, `og:url`, `og:image` assoluto, `sitemap.xml`.
- [ ] Servizi IT: confermare l'elenco in `#consulenza-it` (ora: supporto tecnico, sistemi e servizi, reti e infrastrutture).
- [ ] Modulo di contatto: facoltativo, da aggiungere solo con un invio realmente funzionante (Cloudflare Worker).
- [ ] Informativa privacy: verificarla (eventuali dati fiscali o P.IVA, se richiesti).
- [ ] Bio: aggiungere esperienza e formazione verificabili (LinkedIn non è leggibile in automatico).

## Pubblicazione su Cloudflare Pages

Collega il repository GitHub a Cloudflare Pages con:
- Framework preset: **None**
- Build command: *(vuoto)*
- Build output directory: `/`

Il dominio si collega da Cloudflare solo dopo la tua decisione.
