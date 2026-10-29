# Francesco Martolini — Portfolio Web & IT

Sito statico (HTML, CSS e un piccolo JavaScript). Nessuna build, nessuna dipendenza.

## Struttura

```
index.html           home: lo schema delle aree
sviluppo-web.html    area Sviluppo web
consulenza-it.html   area Sistemista IT (consulenza informatica)
progetti.html        progetti, con filtri Tutti / Web / IT
documentazione.html  indice dei casi studio IT
doc-dominio-ufficio.html  caso 1 (in compilazione: contiene suggerimenti da sostituire)
chi-sono.html        bio, percorso e competenze
contatti.html        contatti
privacy.html         informativa privacy
assets/css/style.css stile e design token (colori e font in :root)
assets/js/main.js    menu mobile, filtri dei progetti e interazione dello schema
assets/img/          favicon, sprite SVG delle icone, immagine Open Graph
assets/fonts/        Manrope, Inter e Instrument Serif corsivo (self-hosted, subset latino)
_headers             intestazioni di sicurezza e cache per Cloudflare Pages
robots.txt
```

Header e footer sono ripetuti in ogni pagina (sito statico senza build): se cambi una voce del menu, modificala in tutte le pagine `.html`. Le icone stanno in `assets/img/sprite.svg` e vengono caricate da lì: per vederle in locale serve il piccolo server qui sotto, non il doppio clic sul file.

## Schema delle aree (hero)

Lo schema nell'hero è composto da due livelli: un SVG (`.schema-art`) con cerchi e linee, e i nodi, che sono normali link HTML posizionati in percentuale (`--x`, `--y` in `index.html`).

- Clic, tocco e tastiera aprono la pagina dell'area. Senza JavaScript lo schema funziona come un elenco di link.
- Su desktop (mouse o penna) i tre nodi principali si possono trascinare al centro: rilasciati vicino al nodo FM aprono la pagina, altrimenti tornano al loro posto. Su touch il trascinamento è disattivato.
- I nodi principali sono Sviluppo web, Sistemista IT e Progetti; quelli minori Contatti, Chi sono e Documentazione. Il sito fotografico `francescomartolini.art` compare solo come progetto in `progetti.html`.
- Per aggiungere o spostare un nodo, modifica il blocco `.schema` e la riga corrispondente in `.s-lines` (stesse coordinate, su una griglia 560 × 560).
- L'animazione di apertura (linee che si tracciano) è disattivata con `prefers-reduced-motion`.

## Anteprima in locale

```
python3 -m http.server 8000
```
poi apri http://localhost:8000

## Come aggiornare i contenuti

- **Testi:** modifica direttamente la pagina `.html` corrispondente.
- **Colori e font:** variabili in cima a `assets/css/style.css`.
- **Nuovo progetto:** duplica un blocco `<article class="project">` in `progetti.html` e imposta `data-area="web"` o `"it"` per il filtro. Usa `is-pending` finché la scheda è incompleta. Indica sempre se è "Progetto reale" o "Progetto dimostrativo".
- **Icone e illustrazioni:** sono nello sprite SVG in cima a `index.html` (`<symbol id="i-...">`). Le due illustrazioni (browser e rack) sono stilizzate e non rappresentano lavori reali.

## Documentazione tecnica (casi studio IT)

`doc-dominio-ufficio.html` è il modello di un caso: la necessità, tre macro step (ciascuno con obiettivo, passaggi, screenshot e verifica), problemi incontrati e contatto. `documentazione.html` è l'indice dei casi.

Come compilare un caso:
1. Cerca `class="tpl"` nel file: sono i suggerimenti in corsivo da sostituire con il tuo testo. Riscrivi anche la descrizione della necessità (c'è un commento HTML che spiega come).
2. Sostituisci ogni riquadro `.shot-slot` con `<img src="assets/img/NOME.webp" alt="Descrizione" width="1280" height="720" loading="lazy">`.
3. Controlla gli screenshot: niente nomi, licenze, credenziali o indirizzi reali.

Per aggiungere un nuovo caso, duplica `doc-dominio-ufficio.html` e aggiungi una card in `documentazione.html`.

Le due pagine sono pubbliche e collegate da `consulenza-it.html` (pulsante "Documentazione tecnica") e da una scheda in `progetti.html`. Il caso 1 è segnato "In corso" finché non è completo: a quel punto togli il tag dalla pagina e dalla scheda. Se aggiungi una sitemap, inserisci anche queste due pagine.

## Screenshot dei progetti

Le schede progetto non hanno immagini. Per aggiungere uno screenshot reale:

1. salva l'immagine in `assets/img/` (WebP o JPEG ottimizzato);
2. inserisci, come primo elemento dentro `<article class="project">`,
   `<div class="thumb"><img src="assets/img/NOME.webp" alt="Descrizione" width="1280" height="800" loading="lazy"></div>`.

Per aggiungere una foto personale in "Chi sono", inserisci un `<figure>` con un'immagine tua nel punto indicato dal commento HTML.

## Da completare prima del lancio

Cerca `TODO` e `example.com` nel codice (`grep -rn "TODO\|example.com" .`).

- [ ] Scheda progetto 01: verificare il campo "Ruolo" (testo ricavato dal README del repository) e aggiungere uno screenshot reale.
- [ ] Progetti 02 e 03: realizzarli, oppure rimuovere le card.
- [ ] Dominio: aggiungere canonical, `og:url` e `og:image` assoluto in ogni pagina, e `sitemap.xml` con le 6 pagine.
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
