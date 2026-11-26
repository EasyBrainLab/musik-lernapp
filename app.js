// ═══════════════════════════════════════════════════════════
// MusikLearn - Klausurvorbereitung Musik 12. Klasse
// ═══════════════════════════════════════════════════════════

// ===== GLOBAL STATE =====
let state = {
    currentPage: 'home',
    theme: localStorage.getItem('ml-theme') || 'dark',
    // Guided mode
    guidedMode: null, // 30 or 45
    guidedRunning: false,
    guidedPaused: false,
    guidedBlockIndex: 0,
    guidedPhase: 'learn', // learn, memorize, quiz, feedback
    blockTimer: null,
    totalTimer: null,
    blockSecondsLeft: 0,
    totalSecondsLeft: 0,
    totalSecondsUsed: 0,
    extraTime: 0,
    // Flashcards
    fcIndex: 0,
    fcFilter: 'all',
    fcFlipped: false,
    cardStatus: JSON.parse(localStorage.getItem('ml-cardStatus') || '{}'),
    // Exam
    examAnswers: {},
    examQuestions: [],
    examSource: 'exam', // 'exam', 'guided', 'error', 'quick'
    // Errors
    wrongQuestions: JSON.parse(localStorage.getItem('ml-wrongQuestions') || '[]'),
    // Stats
    sessionsCompleted: parseInt(localStorage.getItem('ml-sessions') || '0'),
    bestScore: parseInt(localStorage.getItem('ml-bestScore') || '0'),
};

// ===== TOPIC DATA =====
const topics = {
    romantik: {
        title: 'Epoche der Romantik',
        content: `
<div class="info-card">
    <h2>Zeitliche Einordnung</h2>
    <p>Die musikalische Romantik umfasst etwa den Zeitraum von <strong>1820 bis 1910</strong>.</p>
    <p>Sie folgt auf die Wiener Klassik (Haydn, Mozart, Beethoven) und wird von der Moderne abgeloest.</p>
    <ul>
        <li><strong>Fruehromantik:</strong> ca. 1820-1850 (Schubert, Mendelssohn, Schumann, Chopin)</li>
        <li><strong>Hochromantik:</strong> ca. 1850-1890 (Wagner, Brahms, Bruckner, Tschaikowski)</li>
        <li><strong>Spaetromantik:</strong> ca. 1890-1910 (Mahler, Richard Strauss, Elgar)</li>
    </ul>
</div>
<div class="info-card">
    <h2>Historischer Hintergrund</h2>
    <ul>
        <li>Industrialisierung und technischer Fortschritt</li>
        <li>Politische Umbrueche: Franzoesische Revolution, Restauration, Revolution 1848</li>
        <li>Aufkommen des Buergertums als Traeger der Musikkultur</li>
        <li>Oeffentliche Konzerte statt hoefischer Musik</li>
        <li>Reaktion gegen die Vernunft der Aufklaerung</li>
    </ul>
</div>
<div class="info-card">
    <h2>Merkmale der Romantik</h2>
    <div class="highlight-box">Zentrale Themen: <strong>Gefuehl, Natur, Sehnsucht, Fantasie, das Unendliche, Nacht und Traum</strong></div>
    <ul>
        <li><strong>Subjektivitaet:</strong> Persoenliche Gefuehle und Empfindungen stehen im Mittelpunkt</li>
        <li><strong>Sehnsucht:</strong> Streben nach dem Unerreichbaren, der Ferne, dem Idealen</li>
        <li><strong>Natur:</strong> Natur als Spiegel der Seele und Ausdruck innerer Gefuehle</li>
        <li><strong>Fantasie:</strong> Maerchen, Sagen, das Uebernatuerliche</li>
        <li><strong>Verbindung der Kuenste:</strong> Musik, Literatur und Malerei beeinflussen sich gegenseitig</li>
    </ul>
</div>
<div class="info-card">
    <h2>Typische musikalische Merkmale</h2>
    <ul>
        <li><strong>Ausdrucksstarke Melodien:</strong> Grosse Intervalle, gesangliche Linien, weitgespannte Boegen</li>
        <li><strong>Erweiterte Harmonik:</strong> Chromatik, ueberraschende Modulationen, verminderte Akkorde</li>
        <li><strong>Extreme Dynamik:</strong> Von ppp bis fff, starke Kontraste</li>
        <li><strong>Freie Formen:</strong> Sinfonische Dichtung, Charakterstueck, Kunstlied</li>
        <li><strong>Groessere Orchester:</strong> Mehr Instrumente, neue Klangfarben</li>
        <li><strong>Virtuositaet:</strong> Technisch anspruchsvolle Solostimmen</li>
        <li><strong>Rubato:</strong> Freier Umgang mit dem Tempo zur Steigerung des Ausdrucks</li>
        <li><strong>Programmatik:</strong> Musik erzaehlt Geschichten oder beschreibt Bilder</li>
    </ul>
</div>
<div class="info-card">
    <h2>Wichtige Komponisten</h2>
    <ul>
        <li><strong>Franz Schubert</strong> (1797-1828) - Kunstlied, Sinfonien</li>
        <li><strong>Robert Schumann</strong> (1810-1856) - Klaviermusik, Lieder</li>
        <li><strong>Frederic Chopin</strong> (1810-1849) - Klaviermusik</li>
        <li><strong>Johannes Brahms</strong> (1833-1897) - Sinfonien, Kammermusik</li>
        <li><strong>Pjotr Tschaikowski</strong> (1840-1893) - Ballette, Sinfonien</li>
        <li><strong>Richard Wagner</strong> (1813-1883) - Musikdrama, Gesamtkunstwerk</li>
        <li><strong>Edvard Grieg</strong> (1843-1907) - Peer Gynt, Klavierkonzert</li>
        <li><strong>Edward Elgar</strong> (1857-1934) - Orchesterwerke</li>
    </ul>
</div>`
    },

    schubert: {
        title: 'Franz Schubert & Die Winterreise',
        content: `
<div class="info-card">
    <h2>Franz Schubert (1797-1828)</h2>
    <ul>
        <li>Geboren am 31. Januar 1797 in Wien</li>
        <li>Gestorben am 19. November 1828 in Wien (mit nur <strong>31 Jahren</strong>)</li>
        <li>Steht an der Schwelle zwischen <strong>Wiener Klassik und Romantik</strong></li>
        <li>Gilt als der bedeutendste Vertreter des <strong>Kunstliedes</strong></li>
        <li>Komponierte ueber <strong>600 Lieder</strong>, 9 Sinfonien, Kammermusik, Klavierwerke</li>
        <li>Lebte in bescheidenen Verhaeltnissen, nie eine feste Anstellung</li>
        <li>Wurde erst nach seinem Tod als grosser Komponist anerkannt</li>
    </ul>
</div>
<div class="info-card">
    <h2>Bedeutung fuer das Kunstlied</h2>
    <div class="highlight-box">Schubert machte das Kunstlied zu einer eigenstaendigen, gleichwertigen musikalischen Gattung.</div>
    <ul>
        <li>Klavier ist nicht nur Begleitung, sondern <strong>gleichwertiger Partner</strong> der Singstimme</li>
        <li>Das Klavier malt Stimmungen, Naturbilder und Gefuehle (z.B. Wellenrauschen, Wind)</li>
        <li>Enge Verbindung von <strong>Musik und Text</strong>: Jedes Wort wird musikalisch gedeutet</li>
        <li>Verwendung verschiedener Liedformen je nach Textinhalt</li>
    </ul>
</div>
<div class="info-card">
    <h2>Typische Merkmale seiner Musik</h2>
    <ul>
        <li><strong>Melodisch:</strong> Einpraegsame, sangliche Melodien</li>
        <li><strong>Harmonisch:</strong> Haeufiger Wechsel zwischen Dur und Moll (Mediantik)</li>
        <li><strong>Textausdeutung:</strong> Musik spiegelt den Inhalt des Textes wider</li>
        <li><strong>Klavierbegleitung:</strong> Eigenstaendige, bildhafte Klavierparts</li>
        <li><strong>Stimmungswechsel:</strong> Schnelle Wechsel zwischen Hoffnung und Verzweiflung</li>
    </ul>
</div>
<div class="info-card">
    <h2>Wichtige Werke</h2>
    <ul>
        <li><strong>Erlkoenig</strong> (1815) - Durchkomponiertes Lied, dramatisch</li>
        <li><strong>Die Forelle</strong> - Variiertes Strophenlied</li>
        <li><strong>Ave Maria</strong> - Feierlich, gebaetsartig</li>
        <li><strong>Die schoene Muellerin</strong> (1823) - Liederzyklus, 20 Lieder</li>
        <li><strong>Die Winterreise</strong> (1827) - Liederzyklus, 24 Lieder</li>
        <li><strong>Unvollendete Sinfonie</strong> (Nr. 8)</li>
    </ul>
</div>
<div class="info-card">
    <h2>Die Winterreise (1827)</h2>
    <div class="highlight-box">Liederzyklus aus <strong>24 Liedern</strong> nach Gedichten von <strong>Wilhelm Mueller</strong>.</div>
    <h3>Inhalt</h3>
    <ul>
        <li>Ein junger Mann wird von seiner Geliebten verlassen</li>
        <li>Er wandert im Winter einsam durch eine kalte, verschneite Landschaft</li>
        <li>Die Reise wird zum Sinnbild fuer <strong>Einsamkeit, Schmerz und Hoffnungslosigkeit</strong></li>
        <li>Endet mit dem Lied "Der Leiermann" - ohne Aufloesung, offen</li>
    </ul>
    <h3>Stimmung</h3>
    <ul>
        <li>Durchgehend <strong>duester, melancholisch, verzweifelt</strong></li>
        <li>Motive: Kaelte, Einsamkeit, Vergaenglichkeit, Tod</li>
        <li>Wenige Momente der Hoffnung (z.B. "Fruehlingstraum"), die sofort zerstoert werden</li>
    </ul>
    <h3>Musikalische Gestaltung</h3>
    <ul>
        <li><strong>Moll-Tonarten</strong> dominieren den gesamten Zyklus</li>
        <li>Klavier malt Naturbilder: Wind, Eis, Kraehen, fliessende Traenen</li>
        <li>Sparsame, oft <strong>reduzierte Begleitung</strong> - Ausdruck innerer Leere</li>
        <li>Wechsel von Dur und Moll spiegelt Hoffnung und Enttaeuschung wider</li>
        <li>Verschiedene Liedformen: Strophenlieder und durchkomponierte Lieder</li>
    </ul>
</div>`
    },

    kunstlied: {
        title: 'Das Kunstlied & Liedformen',
        content: `
<div class="info-card">
    <h2>Definition des Kunstliedes</h2>
    <p>Ein <strong>Kunstlied</strong> ist ein Lied fuer Singstimme und Klavierbegleitung, das von einem bekannten Komponisten auf einen literarischen Text vertont wurde.</p>
    <div class="highlight-box">Das Kunstlied verbindet <strong>Dichtung und Musik</strong> auf hoechstem kuenstlerischem Niveau. Es entstand im fruehen 19. Jahrhundert und ist eine zentrale Gattung der Romantik.</div>
</div>
<div class="info-card">
    <h2>Volkslied vs. Kunstlied</h2>
    <table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem;font-weight:600;">Merkmal</td>
            <td style="padding:0.5rem;font-weight:600;">Volkslied</td>
            <td style="padding:0.5rem;font-weight:600;">Kunstlied</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem;">Komponist</td>
            <td style="padding:0.5rem;">Unbekannt / muendlich ueberliefert</td>
            <td style="padding:0.5rem;">Bekannter Komponist</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem;">Text</td>
            <td style="padding:0.5rem;">Einfach, volkstumlich</td>
            <td style="padding:0.5rem;">Literarische Lyrik (z.B. Goethe, Mueller)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem;">Melodie</td>
            <td style="padding:0.5rem;">Einfach, leicht mitzusingen</td>
            <td style="padding:0.5rem;">Anspruchsvoll, kunstvoll</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.5rem;">Begleitung</td>
            <td style="padding:0.5rem;">Einfach oder ohne</td>
            <td style="padding:0.5rem;">Komplexe Klavierbegleitung</td>
        </tr>
        <tr>
            <td style="padding:0.5rem;">Funktion</td>
            <td style="padding:0.5rem;">Gemeinschaftliches Singen</td>
            <td style="padding:0.5rem;">Kuenstlerischer Vortrag (Konzert)</td>
        </tr>
    </table>
</div>
<div class="info-card">
    <h2>1. Einfaches Strophenlied</h2>
    <p>Alle Strophen werden mit <strong>derselben Melodie</strong> gesungen. Die Musik aendert sich nicht.</p>
    <div class="form-diagram">
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block a">A</div>
    </div>
    <p class="note">Strophe 1 = Strophe 2 = Strophe 3 = Strophe 4 (gleiche Melodie)</p>
    <h3>Erkennungsmerkmale</h3>
    <ul>
        <li>Gleiche Melodie wiederholt sich in jeder Strophe</li>
        <li>Einfache, einpraesame Struktur</li>
        <li>Passt gut, wenn alle Strophen aehnliche Stimmung haben</li>
    </ul>
    <p><strong>Beispiel:</strong> Viele Volkslieder, Schubert: "Das Wandern" (Die schoene Muellerin)</p>
</div>
<div class="info-card">
    <h2>2. Variiertes Strophenlied</h2>
    <p>Die Grundmelodie bleibt erkennbar, wird aber in einzelnen Strophen <strong>leicht veraendert</strong> (z.B. Rhythmus, Begleitung, Dynamik).</p>
    <div class="form-diagram">
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block a2">A'</div>
        <div class="form-arrow">|</div>
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block a2">A''</div>
    </div>
    <p class="note">Grundmelodie bleibt, aber Variationen in Begleitung, Rhythmus oder Dynamik</p>
    <h3>Erkennungsmerkmale</h3>
    <ul>
        <li>Melodie ist noch erkennbar, aber nicht mehr identisch</li>
        <li>Variationen reagieren auf den veraenderten Textinhalt</li>
        <li>Kompromiss zwischen Einheit und Textanpassung</li>
    </ul>
    <p><strong>Beispiel:</strong> Schubert: "Die Forelle"</p>
</div>
<div class="info-card">
    <h2>3. Durchkomponiertes Lied</h2>
    <p>Jede Strophe erhaelt <strong>neue, eigene Musik</strong>. Die Melodie folgt dem Textinhalt und veraendert sich staendig.</p>
    <div class="form-diagram">
        <div class="form-block a">A</div>
        <div class="form-arrow">|</div>
        <div class="form-block b">B</div>
        <div class="form-arrow">|</div>
        <div class="form-block c">C</div>
        <div class="form-arrow">|</div>
        <div class="form-block d">D</div>
    </div>
    <p class="note">Jede Strophe hat eine andere Melodie - staendig neue Musik</p>
    <h3>Erkennungsmerkmale</h3>
    <ul>
        <li>Keine Wiederholung der Melodie</li>
        <li>Musik reagiert auf jede Textaenderung individuell</li>
        <li>Hoechste dramatische Wirkung</li>
        <li>Typisch fuer dramatische oder erzaehlerische Texte</li>
    </ul>
    <p><strong>Beispiel:</strong> Schubert: "Erlkoenig"</p>
</div>
<div class="info-card">
    <h2>Bedeutung der Klavierbegleitung</h2>
    <ul>
        <li>Das Klavier ist <strong>gleichwertiger Partner</strong>, nicht nur Begleitung</li>
        <li>Es kann Naturbilder malen (z.B. Wasserplätschern, Pferdehufe, Wind)</li>
        <li>Es drueckt Stimmungen aus, die im Text nicht direkt stehen</li>
        <li>Es kann der Singstimme widersprechen oder sie ergaenzen</li>
        <li>Vor- und Nachspiele rahmen das Lied ein und schaffen Atmosphaere</li>
    </ul>
</div>
<div class="info-card">
    <h2>Verhaeltnis Musik und Text</h2>
    <ul>
        <li><strong>Textausdeutung:</strong> Musik verstaerkt die Bedeutung des Textes</li>
        <li><strong>Wortmalerei:</strong> Musikalische Nachahmung von im Text beschriebenen Klaengen</li>
        <li>Hohe Toene bei "Himmel", "Freude" - tiefe Toene bei "Grab", "Trauer"</li>
        <li>Schnelles Tempo bei Aufregung, langsames bei Trauer</li>
        <li>Dur bei positiven, Moll bei negativen Textinhalten</li>
    </ul>
</div>`
    },

    analyse: {
        title: 'Musikalische Analyse',
        content: `
<div class="info-card">
    <h2>Analyseparameter</h2>
    <p>Bei der musikalischen Analyse untersuchst du ein Musikstueck systematisch. Hier sind die wichtigsten Parameter:</p>
</div>
<div class="info-card">
    <h2>Tempo</h2>
    <ul>
        <li><strong>Largo/Adagio:</strong> Sehr langsam - feierlich, traurig, getragen</li>
        <li><strong>Andante:</strong> Gehend, maessig - ruhig, erzaehlerisch</li>
        <li><strong>Allegro:</strong> Schnell - freudig, aufgeregt, dramatisch</li>
        <li><strong>Presto:</strong> Sehr schnell - stuermisch, hektisch</li>
        <li><strong>Ritardando:</strong> Langsamer werdend</li>
        <li><strong>Accelerando:</strong> Schneller werdend</li>
    </ul>
    <div class="highlight-box"><strong>Formulierung:</strong> "Das Stueck beginnt in einem langsamen Tempo (Adagio), was eine feierliche und getragene Stimmung erzeugt."</div>
</div>
<div class="info-card">
    <h2>Dynamik</h2>
    <ul>
        <li><strong>pp (pianissimo):</strong> Sehr leise - intim, zart, geheimnissvoll</li>
        <li><strong>p (piano):</strong> Leise - ruhig, sanft</li>
        <li><strong>mf (mezzoforte):</strong> Mittelstark</li>
        <li><strong>f (forte):</strong> Laut - kraeftig, bestimmt</li>
        <li><strong>ff (fortissimo):</strong> Sehr laut - dramatisch, ueberwältigend</li>
        <li><strong>Crescendo:</strong> Lauter werdend - Steigerung, Spannung</li>
        <li><strong>Decrescendo:</strong> Leiser werdend - Beruhigung, Rueckzug</li>
    </ul>
    <div class="highlight-box"><strong>Formulierung:</strong> "Durch das Crescendo von piano zu fortissimo wird eine dramatische Steigerung erzeugt, die die zunehmende Verzweiflung des lyrischen Ichs verdeutlicht."</div>
</div>
<div class="info-card">
    <h2>Melodie & Tonhoehe</h2>
    <ul>
        <li><strong>Aufsteigende Melodie:</strong> Hoffnung, Freude, Streben</li>
        <li><strong>Absteigende Melodie:</strong> Trauer, Resignation, Muedigkeit</li>
        <li><strong>Grosse Spruenge:</strong> Dramatik, Aufregung, Ueberraschung</li>
        <li><strong>Schrittweise Bewegung:</strong> Ruhe, Erzaehlung, Gleichmaessigkeit</li>
        <li><strong>Hohe Tonlage:</strong> Leichtigkeit, Helligkeit, Freude, Angst</li>
        <li><strong>Tiefe Tonlage:</strong> Schwere, Dunkelheit, Trauer, Bedrohung</li>
    </ul>
    <div class="highlight-box"><strong>Formulierung:</strong> "Die Melodie bewegt sich in einer hohen Tonlage und steigt mit grossen Intervallspruengen auf, was die Sehnsucht und das Streben nach dem Unerreichbaren musikalisch darstellt."</div>
</div>
<div class="info-card">
    <h2>Dur und Moll</h2>
    <ul>
        <li><strong>Dur:</strong> Hell, freudig, positiv, hoffnungsvoll, triumphierend</li>
        <li><strong>Moll:</strong> Dunkel, traurig, melancholisch, dramatisch, bedrohlich</li>
        <li><strong>Dur-Moll-Wechsel:</strong> Kontrast zwischen Hoffnung und Verzweiflung</li>
    </ul>
    <div class="highlight-box"><strong>Formulierung:</strong> "Der ploetzliche Wechsel von Dur nach Moll verdeutlicht den Stimmungsumbruch: Die anfaengliche Hoffnung weicht der Ernuechterung."</div>
</div>
<div class="info-card">
    <h2>Rhythmus & Taktart</h2>
    <ul>
        <li><strong>Gleichmaessiger Rhythmus:</strong> Ruhe, Ordnung, Marsch</li>
        <li><strong>Unruhiger Rhythmus:</strong> Aufregung, Angst, Dramatik</li>
        <li><strong>Punktierter Rhythmus:</strong> Feierlich, marschmaessig</li>
        <li><strong>Synkopen:</strong> Spannung, Unruhe</li>
        <li><strong>3/4-Takt:</strong> Walzer, Tanz, Schwingen</li>
        <li><strong>4/4-Takt:</strong> Marsch, Stabilitaet</li>
        <li><strong>6/8-Takt:</strong> Wiegend, fliessend</li>
    </ul>
</div>
<div class="info-card">
    <h2>Instrumentierung</h2>
    <ul>
        <li><strong>Streicher:</strong> Warm, emotional, gesanglich</li>
        <li><strong>Holzblaeser:</strong> Pastoraler, natuerlicher Klang</li>
        <li><strong>Blechblaeser:</strong> Feierlich, maechtig, heroisch, bedrohlich</li>
        <li><strong>Pauken/Schlagwerk:</strong> Dramatisch, rhythmisch, spannungssteigernd</li>
        <li><strong>Klavier:</strong> Vielseitig - zart bis kraftvoll</li>
        <li><strong>Solovioline:</strong> Innig, emotional, klagend</li>
    </ul>
</div>
<div class="info-card">
    <h2>Vertonung: Syllabisch vs. Melismatisch</h2>
    <ul>
        <li><strong>Syllabisch:</strong> Jede Silbe = ein Ton. Wirkt klar, textverstaendlich, erzaehlerisch</li>
        <li><strong>Melismatisch:</strong> Eine Silbe wird auf mehrere Toene gesungen. Wirkt ausdrucksstark, verzierend, emotional</li>
    </ul>
    <div class="highlight-box"><strong>Formulierung:</strong> "Die syllabische Vertonung betont die Textverstaendlichkeit und laesst die Worte klar hervortreten. Im Gegensatz dazu hebt die melismatische Vertonung bei dem Wort 'Sehnsucht' die emotionale Bedeutung hervor."</div>
</div>
<div class="info-card">
    <h2>Weitere Formulierungshilfen</h2>
    <ul>
        <li>"Die Musik erzeugt eine ... Stimmung durch ..."</li>
        <li>"Der Komponist verwendet ..., um ... auszudruecken."</li>
        <li>"Auffaellig ist ..., was auf ... hindeutet."</li>
        <li>"Im Kontrast dazu steht ..., wodurch ... betont wird."</li>
        <li>"Die Begleitung unterstuetzt die Stimmung, indem ..."</li>
        <li>"Der Text wird durch ... musikalisch gedeutet."</li>
        <li>"Durch die Verwendung von ... wird die Wirkung von ... verstaerkt."</li>
    </ul>
</div>
<div class="info-card">
    <h2>Beispiel: Stimmung durch Musik</h2>
    <h3>Traurige Stimmung</h3>
    <p>Moll-Tonart + langsames Tempo + leise Dynamik + absteigende Melodie + tiefe Tonlage</p>
    <h3>Froehliche Stimmung</h3>
    <p>Dur-Tonart + schnelles Tempo + mittlere bis laute Dynamik + aufsteigende Melodie + helle Tonlage</p>
    <h3>Dramatische Stimmung</h3>
    <p>Moll-Tonart + schnelles Tempo + forte bis fortissimo + grosse Spruenge + Tremolo + Pauken</p>
    <h3>Feierliche Stimmung</h3>
    <p>Dur-Tonart + langsames bis maessiges Tempo + forte + Blechblaeser + punktierter Rhythmus</p>
</div>`
    },

    hoerbeispiele: {
        title: 'Hoerbeispiele',
        content: '' // Generated dynamically
    }
};

// ===== HOERBEISPIELE DATA =====
const audioExamples = [
    {
        id: 'grieg-solveig',
        title: 'Solveigs Lied',
        composer: 'Edvard Grieg',
        stimmung: 'Zaertlich, sehnsuechtig, melancholisch, hoffnungsvoll',
        instrumente: 'Sopranstimme, Streicher, sanfte Orchesterbegleitung',
        tempo: 'Langsam, ruhig (Andante)',
        merkmale: 'Wiegender 4/4-Takt, einfache sangliche Melodie, norwegischer Volksmusikcharakter, Wechsel Moll-Dur (Trauer zu Hoffnung)',
        eselsbruecke: 'SOLVEIG = SOnnige Liebe VErbindet Innige Gefuehle. Eine Frau wartet geduldig - wie ein Wiegenlied.',
        unterscheidung: 'Einziges Stueck mit Gesang (Sopran). Ruhig und schlicht, skandinavischer Klang.',
        ytSearch: 'Grieg Solveigs Lied'
    },
    {
        id: 'tschaikowski-nussknacker',
        title: 'Nussknacker-Marsch',
        composer: 'Pjotr Iljitsch Tschaikowski',
        stimmung: 'Festlich, freudig, spielerisch, maerchenhaft',
        instrumente: 'Volles Orchester, Trompeten, Pauken, Streicher, Holzblaeser',
        tempo: 'Maessig schnell, marschmaessig (Tempo di Marcia)',
        merkmale: 'Klarer Marsch-Rhythmus im 4/4-Takt, praegende Trompetenfanfaren, festlicher Charakter, wiedererkennbares Hauptthema',
        eselsbruecke: 'NUSSKNACKER = Soldaten marschieren zur Weihnachtsfeier. Marschrhythmus + Trompeten = Nussknacker!',
        unterscheidung: 'Einziger Marsch. Sofort erkennbar am "links-rechts"-Rhythmus und den Trompetenfanfaren.',
        ytSearch: 'Tschaikowski Nussknacker Marsch'
    },
    {
        id: 'bizet-farandole',
        title: 'Farandole',
        composer: 'Georges Bizet',
        stimmung: 'Wild, leidenschaftlich, suedlaendisch, mitreissend, triumphal',
        instrumente: 'Volles Orchester, markante Pauken und Becken, kraftvolle Blaeser, Streicher',
        tempo: 'Schnell und zunehmend schneller (Allegro vivace)',
        merkmale: 'Suedlaendischer Tanzcharakter, zwei kontrastierende Themen (Marsch + Tanz) werden kombiniert, staendige Steigerung, dramatisches Finale',
        eselsbruecke: 'FARANDOLE = Feuriger Suedfranzose tanzt immer schneller! Zwei Melodien rasen aufeinander zu.',
        unterscheidung: 'Am schnellsten und wildesten. Staendige Steigerung bis zum explosiven Schluss. Suedlaendischer Klang.',
        ytSearch: 'Bizet Farandole Arlesienne'
    },
    {
        id: 'schubert-avemaria',
        title: 'Ave Maria',
        composer: 'Franz Schubert',
        stimmung: 'Andaechtig, feierlich, friedlich, erhaben',
        instrumente: 'Singstimme (Sopran) und Klavier, oft auch orchestriert',
        tempo: 'Langsam, getragen (Lento)',
        merkmale: 'Sanft fliessende Klavierbegleitung (Arpeggien), weit geschwungene Melodie, gleichmaessiger Fluss, keine dramatischen Kontraste, gebaetsartiger Charakter',
        eselsbruecke: 'AVE MARIA = Friedliches Gebet in der Kirche. Sanftes Klavier plätschert wie ein ruhiger Bach.',
        unterscheidung: 'Ruhigstes Stueck. Erkennbar an den gleichmaessigen Klavier-Arpeggien (gebrochene Akkorde) von Anfang an.',
        ytSearch: 'Schubert Ave Maria'
    },
    {
        id: 'brahms-sinfonie3',
        title: '3. Sinfonie (3. Satz)',
        composer: 'Johannes Brahms',
        stimmung: 'Elegisch, sehnsuechtig, warm, melancholisch-schoen',
        instrumente: 'Orchester: besonders Celli und Streicher im Vordergrund, Holzblaeser',
        tempo: 'Maessig bewegt, fliessend (Poco Allegretto)',
        merkmale: 'Wunderschoene, weitgespannte Cello-Melodie, 3/8-Takt (wiegend), warmer Streicherklang, lyrisch und innig, keine extreme Dynamik',
        eselsbruecke: 'BRAHMS 3 = Herbstliche Sehnsucht. Die Celli singen ein sehnsuechtiges Lied wie ein Spaziergang im Herbst.',
        unterscheidung: 'Am "sehnsuechtigsten". Erkennbar an der wunderschoenen Cellomelodie. Ruhig aber nicht so langsam wie Ave Maria.',
        ytSearch: 'Brahms Sinfonie 3 dritter Satz Poco Allegretto'
    },
    {
        id: 'elgar-pomp',
        title: 'Pomp and Circumstance (Trio)',
        composer: 'Edward Elgar',
        stimmung: 'Feierlich, erhaben, patriotisch, majestaetisch, triumphal',
        instrumente: 'Volles Orchester mit dominanten Blechblaesern, Pauken, grossen Streichern',
        tempo: 'Breit und feierlich (Largamente)',
        merkmale: 'Hymnenartige, breit geschwungene Melodie, prachtvoller Orchesterklang, punktierter Rhythmus, majestaetisches Dur, bekannt als "Land of Hope and Glory"',
        eselsbruecke: 'ELGAR = Koenigin-Hymne. Stelle dir eine Kroenung oder Abschlussfeier vor. Feierlichstes Stueck!',
        unterscheidung: 'Am feierlichsten und majestaetischsten. Groesster Orchesterklang. Die Melodie klingt wie eine Nationalhymne.',
        ytSearch: 'Elgar Pomp and Circumstance March No 1 Trio'
    }
];

// ===== QUESTION POOL =====
const questionPool = [
    // ---- ROMANTIK ----
    { topic:'romantik', type:'mc', q:'In welchem Zeitraum liegt die musikalische Romantik?', options:['1600-1750','1750-1820','1820-1910','1910-1960'], correct:2, explanation:'Die musikalische Romantik umfasst ca. 1820 bis 1910.' },
    { topic:'romantik', type:'mc', q:'Welche Epoche geht der Romantik voraus?', options:['Barock','Renaissance','Wiener Klassik','Moderne'], correct:2, explanation:'Die Wiener Klassik (Haydn, Mozart, Beethoven) geht der Romantik voraus.' },
    { topic:'romantik', type:'tf', q:'In der Romantik stehen persoenliche Gefuehle und Empfindungen im Mittelpunkt.', correct:true, explanation:'Subjektivitaet und Emotionalitaet sind zentrale Merkmale der Romantik.' },
    { topic:'romantik', type:'tf', q:'Die Romantik war eine Fortsetzung der rationalen Aufklaerung.', correct:false, explanation:'Die Romantik war eine Reaktion GEGEN die Vernunft der Aufklaerung und betonte stattdessen Gefuehle.' },
    { topic:'romantik', type:'mc', q:'Welches ist KEIN typisches Thema der Romantik?', options:['Sehnsucht','Natur','Wissenschaftlicher Fortschritt','Fantasie'], correct:2, explanation:'Wissenschaftlicher Fortschritt gehoert zur Aufklaerung. Die Romantik betont Gefuehle, Natur und Fantasie.' },
    { topic:'romantik', type:'mc', q:'Was bedeutet "Programmatik" in der romantischen Musik?', options:['Musik nach einem festen Programm (Stundenplan)','Musik erzaehlt Geschichten oder beschreibt Bilder','Musik wird am Computer programmiert','Musik folgt strengen Regeln'], correct:1, explanation:'Programmatik bedeutet, dass Musik aussermussikalische Inhalte (Geschichten, Bilder, Stimmungen) darstellt.' },
    { topic:'romantik', type:'tf', q:'In der Romantik wurden die Orchester groesser und klangvoller.', correct:true, explanation:'Groessere Orchester, mehr Instrumente und neue Klangfarben sind typisch romantisch.' },
    { topic:'romantik', type:'gap', q:'Die Romantik ist eine Reaktion gegen die ___ der Aufklaerung.', answer:'Vernunft', hint:'V_______', explanation:'Die Romantik wendete sich gegen die reine Vernunft und betonte Gefuehle und Fantasie.' },
    { topic:'romantik', type:'gap', q:'Typische Merkmale der romantischen Musik sind extreme ___ von ppp bis fff.', answer:'Dynamik', hint:'D______', explanation:'Extreme Dynamik mit starken Kontrasten ist ein zentrales Merkmal.' },
    { topic:'romantik', type:'mc', q:'Welcher Komponist gehoert zur Fruehromantik?', options:['Gustav Mahler','Richard Strauss','Franz Schubert','Edward Elgar'], correct:2, explanation:'Schubert (1797-1828) gehoert zur Fruehromantik (ca. 1820-1850).' },
    { topic:'romantik', type:'match', q:'Ordne die Komponisten den Epochen zu:', pairs:[['Schubert','Fruehromantik'],['Brahms','Hochromantik'],['Mahler','Spaetromantik']], options:['Fruehromantik','Hochromantik','Spaetromantik'] },
    { topic:'romantik', type:'tf', q:'Rubato bedeutet einen freien Umgang mit dem Tempo.', correct:true, explanation:'Rubato (ital. "geraubt") bedeutet, dass das Tempo frei gestaltet wird, um den Ausdruck zu steigern.' },

    // ---- SCHUBERT ----
    { topic:'schubert', type:'mc', q:'Wann wurde Franz Schubert geboren?', options:['1770','1797','1810','1828'], correct:1, explanation:'Schubert wurde am 31. Januar 1797 in Wien geboren.' },
    { topic:'schubert', type:'mc', q:'Wie alt wurde Franz Schubert?', options:['25 Jahre','31 Jahre','35 Jahre','40 Jahre'], correct:1, explanation:'Schubert starb 1828 im Alter von nur 31 Jahren.' },
    { topic:'schubert', type:'tf', q:'Schubert komponierte ueber 600 Lieder.', correct:true, explanation:'Schubert schrieb mehr als 600 Lieder und gilt als bedeutendster Liedkomponist.' },
    { topic:'schubert', type:'mc', q:'Wie viele Lieder umfasst die Winterreise?', options:['12','18','24','30'], correct:2, explanation:'Die Winterreise besteht aus 24 Liedern nach Gedichten von Wilhelm Mueller.' },
    { topic:'schubert', type:'gap', q:'Die Winterreise basiert auf Gedichten von Wilhelm ___.', answer:'Mueller', hint:'M______', explanation:'Die Texte stammen von dem Dichter Wilhelm Mueller.' },
    { topic:'schubert', type:'mc', q:'Was ist das Besondere an Schuberts Klavierbegleitung?', options:['Sie ist immer leise','Sie ist gleichwertiger Partner der Singstimme','Sie fehlt oft','Sie ist immer gleich'], correct:1, explanation:'Bei Schubert ist das Klavier gleichwertiger Partner, nicht nur Begleitung.' },
    { topic:'schubert', type:'tf', q:'Schubert wurde zu Lebzeiten als grosser Komponist gefeiert.', correct:false, explanation:'Schubert wurde erst nach seinem Tod als grosser Komponist anerkannt.' },
    { topic:'schubert', type:'mc', q:'Welches Lied von Schubert ist durchkomponiert?', options:['Das Wandern','Die Forelle','Erlkoenig','Heidenroeslein'], correct:2, explanation:'Der Erlkoenig ist durchkomponiert - jede Strophe hat neue Musik fuer die verschiedenen Rollen.' },
    { topic:'schubert', type:'mc', q:'Was ist die Grundstimmung der Winterreise?', options:['Freudig und festlich','Duester und melancholisch','Heiter und unbeschwert','Heroisch und triumphal'], correct:1, explanation:'Die Winterreise ist durchgehend duester, melancholisch und verzweifelt.' },
    { topic:'schubert', type:'tf', q:'Die Winterreise endet mit einer froehlichen Aufloesung.', correct:false, explanation:'Das letzte Lied "Der Leiermann" endet offen und ohne Aufloesung.' },
    { topic:'schubert', type:'gap', q:'Schubert steht an der Schwelle zwischen Wiener Klassik und ___.', answer:'Romantik', hint:'R_______', explanation:'Schubert verbindet Elemente der Wiener Klassik mit der aufkommenden Romantik.' },
    { topic:'schubert', type:'mc', q:'Welches Motiv praegt die Winterreise NICHT?', options:['Einsamkeit','Kaelte','Sommerfreude','Tod'], correct:2, explanation:'Sommerfreude passt nicht - die Winterreise handelt von Kaelte, Einsamkeit und Hoffnungslosigkeit.' },
    { topic:'schubert', type:'free', q:'Erklaere, warum Schubert fuer die Entwicklung des Kunstliedes so wichtig war.', keywords:['Klavier','gleichwertiger Partner','Textausdeutung','600 Lieder','Gattung','eigenstaendig'], explanation:'Schubert machte das Kunstlied zu einer eigenstaendigen Gattung. Das Klavier wurde zum gleichwertigen Partner der Singstimme und deutet den Text musikalisch aus. Mit ueber 600 Liedern setzte er Massstaebe.' },

    // ---- KUNSTLIED ----
    { topic:'kunstlied', type:'mc', q:'Was ist ein Kunstlied?', options:['Ein Lied fuer Chor und Orchester','Ein Lied fuer Singstimme und Klavier auf literarischen Text','Ein improvisiertes Lied','Ein Volkslied mit Gitarre'], correct:1, explanation:'Ein Kunstlied ist fuer Singstimme und Klavier auf einen literarischen Text vertont.' },
    { topic:'kunstlied', type:'mc', q:'In welcher Liedform hat jede Strophe die gleiche Melodie?', options:['Durchkomponiertes Lied','Variiertes Strophenlied','Einfaches Strophenlied','Rondo'], correct:2, explanation:'Beim einfachen Strophenlied wird jede Strophe mit derselben Melodie gesungen.' },
    { topic:'kunstlied', type:'mc', q:'Welche Liedform hat fuer jede Strophe neue Musik?', options:['Einfaches Strophenlied','Variiertes Strophenlied','Durchkomponiertes Lied','Kanon'], correct:2, explanation:'Beim durchkomponierten Lied erhaelt jede Strophe neue, eigene Musik.' },
    { topic:'kunstlied', type:'mc', q:'Welches Beispiel ist ein variiertes Strophenlied?', options:['Erlkoenig','Die Forelle','Nationalhymne','Ave Maria'], correct:1, explanation:'Schuberts "Die Forelle" ist ein variiertes Strophenlied - die Grundmelodie bleibt erkennbar, wird aber variiert.' },
    { topic:'kunstlied', type:'tf', q:'Beim Kunstlied ist das Klavier nur einfache Begleitung.', correct:false, explanation:'Das Klavier ist gleichwertiger Partner der Singstimme und hat eine eigenstaendige, wichtige Rolle.' },
    { topic:'kunstlied', type:'match', q:'Ordne die Liedformen den Beschreibungen zu:', pairs:[['Einfaches Strophenlied','Gleiche Melodie in jeder Strophe'],['Variiertes Strophenlied','Melodie erkennbar aber veraendert'],['Durchkomponiertes Lied','Jede Strophe neue Musik']], options:['Gleiche Melodie in jeder Strophe','Melodie erkennbar aber veraendert','Jede Strophe neue Musik'] },
    { topic:'kunstlied', type:'gap', q:'Beim variierten Strophenlied bleibt die ___ erkennbar, wird aber veraendert.', answer:'Melodie', hint:'M______', explanation:'Die Grundmelodie bleibt beim variierten Strophenlied erkennbar, wird aber angepasst.' },
    { topic:'kunstlied', type:'tf', q:'Wortmalerei bedeutet die musikalische Nachahmung von im Text beschriebenen Klaengen.', correct:true, explanation:'Wortmalerei ist die Umsetzung von Textinhalten in musikalische Klangbilder (z.B. Wellenrauschen im Klavier).' },
    { topic:'kunstlied', type:'mc', q:'Worin unterscheidet sich das Volkslied vom Kunstlied?', options:['Das Volkslied hat einen bekannten Komponisten','Das Kunstlied ist fuer Gemeinschaftsgesang','Das Volkslied ist muendlich ueberliefert und hat einfache Melodien','Das Kunstlied hat keine Begleitung'], correct:2, explanation:'Volkslieder sind muendlich ueberliefert, haben unbekannte Komponisten und einfache Melodien.' },
    { topic:'kunstlied', type:'free', q:'Erklaere den Unterschied zwischen einfachem Strophenlied und durchkomponiertem Lied.', keywords:['gleiche Melodie','wiederholt','neue Musik','jede Strophe','Textinhalt','dramatisch'], explanation:'Beim einfachen Strophenlied wird die gleiche Melodie in jeder Strophe wiederholt (A-A-A). Beim durchkomponierten Lied erhaelt jede Strophe neue Musik (A-B-C-D), die individuell auf den Textinhalt reagiert. Das durchkomponierte Lied eignet sich besser fuer dramatische Texte.' },

    // ---- ANALYSE ----
    { topic:'analyse', type:'mc', q:'Was bedeutet "Crescendo"?', options:['Leiser werdend','Schneller werdend','Lauter werdend','Langsamer werdend'], correct:2, explanation:'Crescendo bedeutet lauter werdend (Dynamik-Steigerung).' },
    { topic:'analyse', type:'mc', q:'Was bedeutet syllabische Vertonung?', options:['Mehrere Toene pro Silbe','Ein Ton pro Silbe','Ohne Text','Nur Instrumente'], correct:1, explanation:'Syllabisch = jede Silbe wird auf genau einem Ton gesungen. Das macht den Text klar verstaendlich.' },
    { topic:'analyse', type:'mc', q:'Welche Stimmung erzeugt typischerweise eine Moll-Tonart?', options:['Freudig und hell','Traurig und dunkel','Feierlich und erhaben','Tanzerisch und leicht'], correct:1, explanation:'Moll klingt dunkel, traurig, melancholisch oder dramatisch.' },
    { topic:'analyse', type:'tf', q:'Eine aufsteigende Melodie drueckt oft Hoffnung und Streben aus.', correct:true, explanation:'Aufwaertsbewegungen in der Melodie symbolisieren Hoffnung, Freude oder Streben.' },
    { topic:'analyse', type:'mc', q:'Was bedeutet "Adagio"?', options:['Schnell','Sehr schnell','Maessig','Sehr langsam'], correct:3, explanation:'Adagio = sehr langsam. Es erzeugt eine feierliche oder traurige Stimmung.' },
    { topic:'analyse', type:'gap', q:'Bei ___ Vertonung wird eine Silbe auf mehrere Toene gesungen.', answer:'melismatischer', hint:'m____________', explanation:'Melismatische Vertonung = eine Silbe wird auf mehrere Toene gedehnt (Gegenteil von syllabisch).' },
    { topic:'analyse', type:'mc', q:'Welche Instrumente klingen typischerweise feierlich und majestaetisch?', options:['Floeten und Oboen','Celli und Bratschen','Trompeten und Posaunen (Blechblaeser)','Klarinetten und Fagotte'], correct:2, explanation:'Blechblaeser (Trompeten, Posaunen, Hoerner) klingen feierlich, maechtig und heroisch.' },
    { topic:'analyse', type:'tf', q:'Ritardando bedeutet, dass das Tempo schneller wird.', correct:false, explanation:'Ritardando = langsamer werdend. Accelerando = schneller werdend.' },
    { topic:'analyse', type:'match', q:'Ordne die Dynamikbezeichnungen zu:', pairs:[['pp','Sehr leise'],['f','Laut'],['ff','Sehr laut'],['mf','Mittelstark']], options:['Sehr leise','Laut','Sehr laut','Mittelstark'] },
    { topic:'analyse', type:'free', q:'Beschreibe, wie eine traurige Stimmung in der Musik erzeugt werden kann. Nenne mindestens 4 musikalische Mittel.', keywords:['Moll','langsam','leise','piano','absteigende Melodie','tiefe Tonlage','Tempo','Dynamik'], explanation:'Traurige Stimmung entsteht durch: Moll-Tonart, langsames Tempo (Adagio/Largo), leise Dynamik (piano/pianissimo), absteigende Melodie, tiefe Tonlage, sparsame Instrumentation und legato (gebundene) Spielweise.' },
    { topic:'analyse', type:'mc', q:'Was drueckt ein ploetzlicher Wechsel von Dur nach Moll aus?', options:['Nichts Besonderes','Einen Stimmungsumbruch von positiv zu negativ','Das Stueck ist zu Ende','Der Rhythmus aendert sich'], correct:1, explanation:'Ein Dur-Moll-Wechsel verdeutlicht einen Stimmungsumbruch: Hoffnung weicht der Ernuechterung.' },

    // ---- HOERBEISPIELE ----
    { topic:'hoerbeispiele', type:'mc', q:'Welches Stueck erkennt man am Marsch-Rhythmus und Trompetenfanfaren?', options:['Ave Maria','Nussknacker-Marsch','Solveigs Lied','Brahms 3. Sinfonie'], correct:1, explanation:'Der Nussknacker-Marsch ist am klaren Marsch-Rhythmus und den Trompetenfanfaren erkennbar.' },
    { topic:'hoerbeispiele', type:'mc', q:'Welches Stueck hat eine wunderschoene Cellomelodie?', options:['Farandole','Pomp and Circumstance','Brahms 3. Sinfonie','Nussknacker-Marsch'], correct:2, explanation:'Der 3. Satz von Brahms\' 3. Sinfonie ist fuer seine sehnsuechtige Cellomelodie bekannt.' },
    { topic:'hoerbeispiele', type:'mc', q:'Welches Stueck wird immer schneller und hat suedlaendischen Charakter?', options:['Ave Maria','Solveigs Lied','Farandole','Pomp and Circumstance'], correct:2, explanation:'Bizets Farandole hat suedlaendischen Tanzcharakter und wird staendig schneller bis zum explosiven Schluss.' },
    { topic:'hoerbeispiele', type:'match', q:'Ordne die Stuecke den Komponisten zu:', pairs:[['Solveigs Lied','Edvard Grieg'],['Nussknacker-Marsch','Tschaikowski'],['Farandole','Georges Bizet'],['Ave Maria','Franz Schubert']], options:['Edvard Grieg','Tschaikowski','Georges Bizet','Franz Schubert'] },
    { topic:'hoerbeispiele', type:'mc', q:'Welches Stueck erkennt man an gleichmaessigen Klavier-Arpeggien?', options:['Farandole','Nussknacker-Marsch','Ave Maria','Pomp and Circumstance'], correct:2, explanation:'Schuberts Ave Maria beginnt mit sanft fliessenden Klavier-Arpeggien (gebrochene Akkorde).' },
    { topic:'hoerbeispiele', type:'mc', q:'Welches Stueck klingt wie eine Nationalhymne?', options:['Solveigs Lied','Ave Maria','Brahms 3. Sinfonie','Pomp and Circumstance'], correct:3, explanation:'Elgars Pomp and Circumstance (Trio) klingt hymnisch und majestaetisch wie eine Nationalhymne ("Land of Hope and Glory").' },
    { topic:'hoerbeispiele', type:'tf', q:'Solveigs Lied ist das einzige Hoerbeispiel mit Gesang.', correct:true, explanation:'Solveigs Lied ist das einzige der sechs Hoerbeispiele, das eine Singstimme (Sopran) hat.' },
    { topic:'hoerbeispiele', type:'match', q:'Ordne die Stuecke den Stimmungen zu:', pairs:[['Nussknacker-Marsch','Festlich, maerchenhaft'],['Farandole','Wild, leidenschaftlich'],['Ave Maria','Andaechtig, friedlich'],['Pomp and Circumstance','Feierlich, majestaetisch']], options:['Festlich, maerchenhaft','Wild, leidenschaftlich','Andaechtig, friedlich','Feierlich, majestaetisch'] },
    { topic:'hoerbeispiele', type:'mc', q:'Welcher Komponist schrieb die Farandole?', options:['Brahms','Tschaikowski','Grieg','Bizet'], correct:3, explanation:'Georges Bizet komponierte die Farandole als Teil seiner L\'Arlesienne-Suite.' },
    { topic:'hoerbeispiele', type:'tf', q:'Die Brahms 3. Sinfonie ist das schnellste und wildeste der Hoerbeispiele.', correct:false, explanation:'Die Brahms-Sinfonie ist lyrisch und sehnsuechtig. Das schnellste Stueck ist Bizets Farandole.' },
    { topic:'hoerbeispiele', type:'mc', q:'Welches Instrument praegt den 3. Satz von Brahms\' 3. Sinfonie?', options:['Trompete','Floete','Cello','Pauke'], correct:2, explanation:'Die wunderschoene Hauptmelodie wird von den Celli gespielt.' },
    { topic:'hoerbeispiele', type:'free', q:'Erklaere, woran du Schuberts Ave Maria von den anderen Hoerbeispielen unterscheiden kannst.', keywords:['Klavier','Arpeggien','gebrochene Akkorde','ruhig','langsam','Singstimme','gleichmaessig','andaechtig','friedlich'], explanation:'Ave Maria erkennt man an den gleichmaessigen Klavier-Arpeggien (gebrochene Akkorde) von Anfang an, dem sehr ruhigen, getragenen Tempo, der andaechtigen Stimmung und der sanften Singstimme ohne dramatische Kontraste.' },
];

// ===== FLASHCARD DATA =====
const flashcards = [
    { q:'Zeitraum der musikalischen Romantik?', a:'Ca. 1820-1910' },
    { q:'Welche Epoche geht der Romantik voraus?', a:'Die Wiener Klassik (Haydn, Mozart, Beethoven)' },
    { q:'4 zentrale Themen der Romantik?', a:'Gefuehl, Natur, Sehnsucht, Fantasie' },
    { q:'Was bedeutet Programmatik?', a:'Musik erzaehlt Geschichten oder beschreibt Bilder' },
    { q:'Was bedeutet Rubato?', a:'Freier Umgang mit dem Tempo zur Steigerung des Ausdrucks' },
    { q:'Lebensdaten Franz Schubert?', a:'1797-1828 (31 Jahre alt)' },
    { q:'Wie viele Lieder schrieb Schubert?', a:'Ueber 600 Lieder' },
    { q:'Was ist das Besondere an Schuberts Klavierbegleitung?', a:'Das Klavier ist gleichwertiger Partner der Singstimme, nicht nur Begleitung' },
    { q:'Was ist die Winterreise?', a:'Liederzyklus aus 24 Liedern nach Gedichten von Wilhelm Mueller (1827)' },
    { q:'Grundstimmung der Winterreise?', a:'Duester, melancholisch, verzweifelt - Themen: Einsamkeit, Kaelte, Tod' },
    { q:'Definition Kunstlied?', a:'Lied fuer Singstimme und Klavier auf einen literarischen Text, von bekanntem Komponisten' },
    { q:'Einfaches Strophenlied?', a:'Alle Strophen haben die gleiche Melodie (A-A-A-A)' },
    { q:'Variiertes Strophenlied?', a:'Grundmelodie erkennbar, aber in einzelnen Strophen leicht veraendert (A-A\'-A-A\'\')' },
    { q:'Durchkomponiertes Lied?', a:'Jede Strophe erhaelt neue, eigene Musik (A-B-C-D)' },
    { q:'Beispiel einfaches Strophenlied?', a:'Schubert: "Das Wandern" (Die schoene Muellerin)' },
    { q:'Beispiel variiertes Strophenlied?', a:'Schubert: "Die Forelle"' },
    { q:'Beispiel durchkomponiertes Lied?', a:'Schubert: "Erlkoenig"' },
    { q:'Unterschied Volkslied - Kunstlied?', a:'Volkslied: unbekannter Komponist, einfach, Gemeinschaftsgesang. Kunstlied: bekannter Komponist, anspruchsvoll, Konzertvortrag.' },
    { q:'Was bedeutet syllabische Vertonung?', a:'Jede Silbe = ein Ton. Wirkt klar und textverstaendlich.' },
    { q:'Was bedeutet melismatische Vertonung?', a:'Eine Silbe auf mehrere Toene gesungen. Wirkt ausdrucksstark und emotional.' },
    { q:'Was bedeutet Crescendo?', a:'Lauter werdend' },
    { q:'Was bedeutet Decrescendo?', a:'Leiser werdend' },
    { q:'Was bedeutet Adagio?', a:'Sehr langsam' },
    { q:'Was bedeutet Allegro?', a:'Schnell' },
    { q:'Dur-Tonart: Stimmung?', a:'Hell, freudig, positiv, hoffnungsvoll' },
    { q:'Moll-Tonart: Stimmung?', a:'Dunkel, traurig, melancholisch, dramatisch' },
    { q:'Solveigs Lied - Komponist & Erkennungsmerkmal?', a:'Edvard Grieg. Einziges Stueck mit Gesang (Sopran), ruhig, skandinavisch.' },
    { q:'Nussknacker-Marsch - Erkennungsmerkmal?', a:'Tschaikowski. Klarer Marsch-Rhythmus, Trompetenfanfaren.' },
    { q:'Farandole - Erkennungsmerkmal?', a:'Georges Bizet. Am schnellsten, suedlaendisch, staendige Steigerung.' },
    { q:'Ave Maria - Erkennungsmerkmal?', a:'Franz Schubert. Gleichmaessige Klavier-Arpeggien, sehr ruhig, gebaetsartig.' },
    { q:'Brahms 3. Sinfonie - Erkennungsmerkmal?', a:'Johannes Brahms. Sehnsuechtige Cellomelodie, wiegend, warm.' },
    { q:'Pomp and Circumstance - Erkennungsmerkmal?', a:'Edward Elgar. Am feierlichsten, hymnenartig, Blechblaeser, klingt wie Nationalhymne.' },
    { q:'Wie erzeugt man traurige Stimmung in Musik?', a:'Moll + langsames Tempo + leise Dynamik + absteigende Melodie + tiefe Tonlage' },
    { q:'Wie erzeugt man froehliche Stimmung?', a:'Dur + schnelles Tempo + mittlere/laute Dynamik + aufsteigende Melodie + helle Tonlage' },
    { q:'Welche Rolle hat die Klavierbegleitung im Kunstlied?', a:'Gleichwertiger Partner: malt Stimmungen, Naturbilder und Gefuehle, nicht nur Begleitung.' },
    { q:'Was ist Wortmalerei?', a:'Musikalische Nachahmung von im Text beschriebenen Klaengen (z.B. Wellenrauschen im Klavier)' },
];

// ===== GUIDED MODE BLOCKS =====
const guidedBlocks = {
    30: [
        { topic:'romantik', label:'Romantik', learnMin:2.5, quizMin:1.5 },
        { topic:'schubert', label:'Schubert & Winterreise', learnMin:2.5, quizMin:1.5 },
        { topic:'kunstlied', label:'Kunstlied & Liedformen', learnMin:3, quizMin:2 },
        { topic:'analyse', label:'Musikalische Analyse', learnMin:2.5, quizMin:1.5 },
        { topic:'hoerbeispiele', label:'Hoerbeispiele', learnMin:3, quizMin:2 },
        { topic:'final', label:'Abschlusstest', learnMin:0, quizMin:8 },
    ],
    45: [
        { topic:'romantik', label:'Romantik', learnMin:3, quizMin:2 },
        { topic:'schubert', label:'Schubert & Winterreise', learnMin:3, quizMin:2 },
        { topic:'kunstlied', label:'Kunstlied & Liedformen', learnMin:4, quizMin:3 },
        { topic:'analyse', label:'Musikalische Analyse', learnMin:3.5, quizMin:2.5 },
        { topic:'hoerbeispiele', label:'Hoerbeispiele', learnMin:6, quizMin:4 },
        { topic:'final', label:'Abschlusstest', learnMin:0, quizMin:12 },
    ]
};

// ═══════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderLernzettel();
    renderHoerbeispiele();
    updateStats();
    document.querySelector('.logo').addEventListener('click', () => {
        if (state.guidedRunning) { if(confirm('Lernmodus beenden?')) endGuided(); }
        else showPage('home');
    });
});

// ===== THEME =====
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ml-theme', state.theme);
    applyTheme();
}

// ===== PAGE NAVIGATION =====
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    state.currentPage = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTab(prefix, name, btn) {
    const parent = btn.closest('.page') || btn.closest('.tab-content')?.parentElement || document.body;
    parent.querySelectorAll(`[id^="${prefix}-"]`).forEach(c => c.classList.remove('active'));
    document.getElementById(`${prefix}-${name}`).classList.add('active');
    btn.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
}

// ===== STATS =====
function updateStats() {
    const bar = document.getElementById('statsBar');
    const text = document.getElementById('statsText');
    if (state.sessionsCompleted > 0 || state.bestScore > 0) {
        bar.style.display = 'block';
        let parts = [];
        if (state.sessionsCompleted > 0) parts.push(`${state.sessionsCompleted} Lerneinheit${state.sessionsCompleted>1?'en':''} abgeschlossen`);
        if (state.bestScore > 0) parts.push(`Bestes Ergebnis: ${state.bestScore}%`);
        if (state.wrongQuestions.length > 0) parts.push(`${state.wrongQuestions.length} Fehler zum Wiederholen`);
        text.textContent = parts.join(' | ');
    }
}

// ═══════════════════════════════════════════════════════════
// LERNZETTEL RENDERING
// ═══════════════════════════════════════════════════════════
function renderLernzettel() {
    Object.keys(topics).forEach(key => {
        if (key === 'hoerbeispiele') return;
        document.getElementById(`lz-${key}`).innerHTML = topics[key].content;
    });
    renderHoerbeispieleLernzettel();
}

function renderHoerbeispieleLernzettel() {
    let html = '';
    audioExamples.forEach(ex => {
        html += `
<div class="audio-card">
    <h3>${ex.title}</h3>
    <div class="composer">${ex.composer}</div>
    <div class="tags">
        <span class="tag">${ex.tempo}</span>
        <span class="tag">${ex.instrumente.split(',')[0]}</span>
    </div>
    <p><strong>Stimmung:</strong> ${ex.stimmung}</p>
    <p><strong>Merkmale:</strong> ${ex.merkmale}</p>
    <p><strong>Unterscheidung:</strong> ${ex.unterscheidung}</p>
    <div class="mnemonic">Eselsbruecke: ${ex.eselsbruecke}</div>
    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.ytSearch)}" target="_blank" rel="noopener" class="play-btn">&#9654; Auf YouTube anhoeren</a>
</div>`;
    });
    document.getElementById('lz-hoerbeispiele').innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// HOERTRAINER
// ═══════════════════════════════════════════════════════════
function renderHoerbeispiele() {
    // Lernkarten
    let kartenHtml = '';
    audioExamples.forEach(ex => {
        kartenHtml += `
<div class="audio-card">
    <h3>${ex.title}</h3>
    <div class="composer">${ex.composer}</div>
    <div class="tags">
        <span class="tag">${ex.tempo}</span>
        <span class="tag">${ex.instrumente.split(',')[0]}</span>
    </div>
    <p><strong>Stimmung:</strong> ${ex.stimmung}</p>
    <p><strong>Merkmale:</strong> ${ex.merkmale}</p>
    <p><strong>Unterscheidung:</strong> ${ex.unterscheidung}</p>
    <div class="mnemonic">Eselsbruecke: ${ex.eselsbruecke}</div>
    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.ytSearch)}" target="_blank" rel="noopener" class="play-btn">&#9654; Auf YouTube anhoeren</a>
</div>`;
    });
    document.getElementById('ht-karten').innerHTML = kartenHtml;

    // Hoertest
    renderListeningTest();
}

function renderListeningTest() {
    const shuffled = [...audioExamples].sort(() => Math.random() - 0.5);
    let html = '<h2>Hoertest</h2><p style="color:var(--text2);margin-bottom:1rem;">Hoere dir jedes Stueck an und waehle den richtigen Titel und Komponisten.</p>';

    shuffled.forEach((ex, i) => {
        const otherOptions = audioExamples.filter(o => o.id !== ex.id).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [...otherOptions, ex].sort(() => Math.random() - 0.5);

        html += `
<div class="listen-card" id="listen-${i}">
    <div class="listen-num">Stueck ${i + 1}</div>
    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.ytSearch)}" target="_blank" rel="noopener" class="play-btn" style="margin-bottom:1rem;">&#9654; Stueck anhoeren (YouTube)</a>
    <div class="q-options" style="margin-top:1rem;">
        ${options.map((o, j) => `
        <label class="q-option" onclick="selectListenOption(${i},${j})">
            <input type="radio" name="listen${i}" value="${o.id}">
            <span>${o.composer} - ${o.title}</span>
        </label>`).join('')}
    </div>
    <div class="q-feedback" id="listen-fb-${i}"></div>
</div>`;
    });

    html += `<button class="action-btn full" onclick="checkListeningTest()">Hoertest auswerten</button>
             <div id="listen-result" style="margin-top:1rem;"></div>`;

    document.getElementById('ht-test').innerHTML = html;
    // Store correct answers
    document.getElementById('ht-test')._answers = shuffled.map(ex => ex.id);
}

function selectListenOption(qi, oi) {
    const card = document.getElementById(`listen-${qi}`);
    card.querySelectorAll('.q-option').forEach(o => o.classList.remove('selected'));
    card.querySelectorAll('.q-option')[oi].classList.add('selected');
}

function checkListeningTest() {
    const answers = document.getElementById('ht-test')._answers;
    let correct = 0;

    answers.forEach((correctId, i) => {
        const selected = document.querySelector(`input[name="listen${i}"]:checked`);
        const fb = document.getElementById(`listen-fb-${i}`);
        const card = document.getElementById(`listen-${i}`);
        const ex = audioExamples.find(a => a.id === correctId);

        card.querySelectorAll('.q-option').forEach(o => {
            o.classList.remove('correct', 'wrong');
            if (o.querySelector('input').value === correctId) o.classList.add('correct');
        });

        if (selected) {
            if (selected.value === correctId) {
                correct++;
                fb.textContent = 'Richtig!';
                fb.className = 'q-feedback show correct';
            } else {
                selected.closest('.q-option').classList.add('wrong');
                fb.textContent = `Falsch. Richtig: ${ex.composer} - ${ex.title}`;
                fb.className = 'q-feedback show wrong';
            }
        } else {
            fb.textContent = `Nicht beantwortet. Richtig: ${ex.composer} - ${ex.title}`;
            fb.className = 'q-feedback show wrong';
        }
    });

    const pct = Math.round((correct / answers.length) * 100);
    document.getElementById('listen-result').innerHTML = `
<div class="highlight-box" style="text-align:center;">
    <strong>${correct} von ${answers.length} richtig (${pct}%)</strong>
</div>`;
}

// ═══════════════════════════════════════════════════════════
// FLASHCARDS
// ═══════════════════════════════════════════════════════════
function getFilteredCards() {
    if (state.fcFilter === 'all') return flashcards;
    return flashcards.filter((_, i) => (state.cardStatus[i] || 'unknown') === state.fcFilter);
}

function renderCard() {
    const cards = getFilteredCards();
    if (cards.length === 0) {
        document.getElementById('fcFront').textContent = 'Keine Karteikarten in dieser Kategorie.';
        document.getElementById('fcBack').textContent = '';
        document.getElementById('fcProgress').textContent = '0 / 0';
        return;
    }
    if (state.fcIndex >= cards.length) state.fcIndex = 0;
    if (state.fcIndex < 0) state.fcIndex = cards.length - 1;

    const card = cards[state.fcIndex];
    document.getElementById('fcFront').textContent = card.q;
    document.getElementById('fcBack').textContent = card.a;
    document.getElementById('fcProgress').textContent = `${state.fcIndex + 1} / ${cards.length}`;
    document.getElementById('flashcard').classList.remove('flipped');
    state.fcFlipped = false;
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
    state.fcFlipped = !state.fcFlipped;
}

function nextCard() { state.fcIndex++; renderCard(); }
function prevCard() { state.fcIndex--; renderCard(); }

function markCard(status) {
    const cards = getFilteredCards();
    if (cards.length === 0) return;
    const globalIndex = flashcards.indexOf(cards[state.fcIndex]);
    state.cardStatus[globalIndex] = status;
    localStorage.setItem('ml-cardStatus', JSON.stringify(state.cardStatus));
    nextCard();
}

function filterCards(filter, btn) {
    state.fcFilter = filter;
    state.fcIndex = 0;
    btn.closest('.fc-filter').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderCard();
}

// Initialize cards when page shown
const origShowPage = showPage;
showPage = function(id) {
    origShowPage(id);
    if (id === 'karteikarten') renderCard();
};

// ═══════════════════════════════════════════════════════════
// GUIDED LEARNING MODE
// ═══════════════════════════════════════════════════════════
function startGuided(minutes) {
    state.guidedMode = minutes;
    state.guidedRunning = true;
    state.guidedPaused = false;
    state.guidedBlockIndex = 0;
    state.guidedPhase = 'learn';
    state.examAnswers = {};
    state.examSource = 'guided';
    state.extraTime = 0;

    const blocks = guidedBlocks[minutes];
    state.totalSecondsLeft = blocks.reduce((sum, b) => sum + (b.learnMin + b.quizMin) * 60, 0);
    state.totalSecondsUsed = 0;

    document.getElementById('timerBar').style.display = 'block';
    document.getElementById('guidedControls').style.display = 'flex';

    showPage('guided');
    startBlock();
}

function startBlock() {
    const blocks = guidedBlocks[state.guidedMode];
    const block = blocks[state.guidedBlockIndex];

    updateProgressBar();
    updateBlockLabel();

    if (block.topic === 'final') {
        state.guidedPhase = 'quiz';
        startFinalTest(block.quizMin * 60);
        return;
    }

    state.guidedPhase = 'learn';
    state.blockSecondsLeft = block.learnMin * 60;

    // Show learning content
    let content = `
<div class="learn-phase">
    <h2>${block.label}</h2>
    <p>Lies den Lernzettel aufmerksam durch und praege dir die Informationen ein.</p>
</div>
<div class="phase-indicator">
    ${blocks.map((b, i) => `<div class="phase-dot ${i < state.guidedBlockIndex ? 'done' : ''} ${i === state.guidedBlockIndex ? 'active' : ''}"></div>`).join('')}
</div>
<div class="memorize-notice" id="memorizeNotice" style="display:none;">Die Informationen werden gleich ausgeblendet. Praege dir alles ein!</div>
${topics[block.topic]?.content || ''}
<div style="text-align:center;margin-top:1rem;">
    <button class="action-btn" onclick="startBlockQuiz()">Ich bin bereit fuer die Fragen &rarr;</button>
</div>`;

    document.getElementById('guidedContent').innerHTML = content;
    window.scrollTo({ top: 0 });
    startBlockTimer();

    // Show memorize notice at 60% of time
    setTimeout(() => {
        const notice = document.getElementById('memorizeNotice');
        if (notice && state.guidedPhase === 'learn') notice.style.display = 'block';
    }, block.learnMin * 60 * 0.6 * 1000);
}

function startBlockQuiz() {
    const blocks = guidedBlocks[state.guidedMode];
    const block = blocks[state.guidedBlockIndex];

    clearInterval(state.blockTimer);
    state.guidedPhase = 'quiz';
    state.blockSecondsLeft = block.quizMin * 60;

    // Get questions for this topic
    const topicQuestions = questionPool.filter(q => q.topic === block.topic).sort(() => Math.random() - 0.5).slice(0, 4);

    let html = `
<div class="learn-phase">
    <h2>Kontrollfragen: ${block.label}</h2>
    <p>Beantworte die Fragen aus dem Gedaechtnis.</p>
</div>`;

    topicQuestions.forEach((q, i) => {
        html += renderQuestion(q, `guided-${state.guidedBlockIndex}-${i}`);
    });

    html += `<button class="action-btn full" onclick="finishBlockQuiz()">Antworten ueberpruefen</button>`;

    document.getElementById('guidedContent').innerHTML = html;
    window.scrollTo({ top: 0 });
    startBlockTimer();
}

function finishBlockQuiz() {
    clearInterval(state.blockTimer);
    const blocks = guidedBlocks[state.guidedMode];
    const block = blocks[state.guidedBlockIndex];
    const topicQuestions = questionPool.filter(q => q.topic === block.topic);

    // Check answers and show feedback
    const container = document.getElementById('guidedContent');
    container.querySelectorAll('.question-card').forEach(card => {
        const qId = card.dataset.qid;
        checkQuestionCard(card, qId);
    });

    // Add "Next" button
    const nextBtn = document.createElement('div');
    nextBtn.style.textAlign = 'center';
    nextBtn.style.marginTop = '1rem';

    if (state.guidedBlockIndex < blocks.length - 1) {
        nextBtn.innerHTML = `<button class="action-btn" onclick="nextBlock()">Weiter zum naechsten Thema &rarr;</button>
        <button class="action-btn secondary" onclick="repeatBlock()" style="margin-left:0.5rem;">Block wiederholen</button>`;
    }
    container.appendChild(nextBtn);
}

function nextBlock() {
    state.guidedBlockIndex++;
    const blocks = guidedBlocks[state.guidedMode];
    if (state.guidedBlockIndex >= blocks.length) {
        endGuided();
        return;
    }
    startBlock();
}

function startFinalTest(seconds) {
    state.blockSecondsLeft = seconds;

    // Pick questions from all topics
    const allQ = [...questionPool].sort(() => Math.random() - 0.5);
    const selected = [];
    const topicCounts = {};

    for (const q of allQ) {
        const count = topicCounts[q.topic] || 0;
        if (count < 4) {
            selected.push(q);
            topicCounts[q.topic] = count + 1;
        }
        if (selected.length >= 18) break;
    }

    state.examQuestions = selected;

    let html = `<div class="learn-phase"><h2>Abschlusstest</h2><p>Gemischte Fragen zu allen Themen.</p></div>`;
    selected.forEach((q, i) => {
        html += renderQuestion(q, `final-${i}`);
    });
    html += `<button class="action-btn full" onclick="submitFinalTest()">Test abgeben</button>`;

    document.getElementById('guidedContent').innerHTML = html;
    window.scrollTo({ top: 0 });
    startBlockTimer();
}

function submitFinalTest() {
    clearInterval(state.blockTimer);
    clearInterval(state.totalTimer);

    const results = gradeExam('final');
    state.guidedRunning = false;
    document.getElementById('timerBar').style.display = 'none';
    document.getElementById('guidedControls').style.display = 'none';

    state.sessionsCompleted++;
    localStorage.setItem('ml-sessions', state.sessionsCompleted);
    if (results.percentage > state.bestScore) {
        state.bestScore = results.percentage;
        localStorage.setItem('ml-bestScore', state.bestScore);
    }

    showResults(results);
}

// ===== TIMER =====
function startBlockTimer() {
    clearInterval(state.blockTimer);
    updateTimerDisplay();

    state.blockTimer = setInterval(() => {
        if (state.guidedPaused) return;
        state.blockSecondsLeft--;
        state.totalSecondsLeft--;
        state.totalSecondsUsed++;

        updateTimerDisplay();
        updateProgressBar();

        if (state.blockSecondsLeft <= 0) {
            clearInterval(state.blockTimer);
            // Auto-proceed
            if (state.guidedPhase === 'learn') {
                startBlockQuiz();
            } else if (state.guidedPhase === 'quiz') {
                if (state.guidedBlockIndex === guidedBlocks[state.guidedMode].length - 1) {
                    submitFinalTest();
                } else {
                    finishBlockQuiz();
                }
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const min = Math.floor(Math.max(0, state.blockSecondsLeft) / 60);
    const sec = Math.max(0, state.blockSecondsLeft) % 60;
    document.getElementById('timerText').textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

    // Color warning
    const timerText = document.getElementById('timerText');
    if (state.blockSecondsLeft <= 30) timerText.style.color = 'var(--red)';
    else if (state.blockSecondsLeft <= 60) timerText.style.color = 'var(--yellow)';
    else timerText.style.color = 'var(--text)';
}

function updateBlockLabel() {
    const blocks = guidedBlocks[state.guidedMode];
    const block = blocks[state.guidedBlockIndex];
    document.getElementById('blockLabel').textContent = `${block.label} (${state.guidedBlockIndex + 1}/${blocks.length})`;

    const totalMin = Math.ceil(state.totalSecondsLeft / 60);
    const extra = state.extraTime > 0 ? ` (+${Math.ceil(state.extraTime/60)} Min)` : '';
    document.getElementById('timerIcon').textContent = totalMin + ' Min' + extra;
}

function updateProgressBar() {
    const blocks = guidedBlocks[state.guidedMode];
    const totalBlocks = blocks.length;
    const pct = ((state.guidedBlockIndex) / totalBlocks) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
}

function pauseResume() {
    state.guidedPaused = !state.guidedPaused;
    document.getElementById('pauseIcon').textContent = state.guidedPaused ? '>' : '||';
    document.getElementById('pauseLabel').textContent = state.guidedPaused ? 'Weiter' : 'Pause';
}

function repeatBlock() {
    const blocks = guidedBlocks[state.guidedMode];
    const block = blocks[state.guidedBlockIndex];
    const extraSeconds = (block.learnMin + block.quizMin) * 60;
    state.totalSecondsLeft += extraSeconds;
    state.extraTime += extraSeconds;
    updateBlockLabel();
    startBlock();
}

function skipBlock() { nextBlock(); }

function endGuided() {
    clearInterval(state.blockTimer);
    state.guidedRunning = false;
    document.getElementById('timerBar').style.display = 'none';
    document.getElementById('guidedControls').style.display = 'none';
    showPage('home');
    updateStats();
}

function confirmExit() {
    if (confirm('Willst du wirklich abbrechen?')) {
        showPage('home');
    }
}

// ═══════════════════════════════════════════════════════════
// QUESTION RENDERING
// ═══════════════════════════════════════════════════════════
function renderQuestion(q, qId) {
    const topicLabels = { romantik:'Romantik', schubert:'Schubert', kunstlied:'Kunstlied', analyse:'Analyse', hoerbeispiele:'Hoerbeispiele' };
    let html = `<div class="question-card" data-qid="${qId}" data-topic="${q.topic}" data-type="${q.type}">`;
    html += `<div class="q-label">${topicLabels[q.topic] || q.topic}</div>`;
    html += `<div class="q-text">${q.q}</div>`;

    if (q.type === 'mc') {
        html += `<div class="q-options">`;
        q.options.forEach((opt, i) => {
            html += `<label class="q-option" onclick="selectOption('${qId}',${i})">
                <input type="radio" name="${qId}" value="${i}">
                <span>${opt}</span>
            </label>`;
        });
        html += `</div>`;
        // Store correct answer
        html += `<input type="hidden" class="q-correct" value="${q.correct}">`;
    } else if (q.type === 'tf') {
        html += `<div class="tf-options">
            <button class="tf-btn" onclick="selectTF('${qId}',true)">Richtig</button>
            <button class="tf-btn" onclick="selectTF('${qId}',false)">Falsch</button>
        </div>`;
        html += `<input type="hidden" class="q-correct" value="${q.correct}">`;
    } else if (q.type === 'gap') {
        html += `<div style="margin-top:0.5rem;">
            <input type="text" class="q-input gap-answer" placeholder="${q.hint || 'Antwort eingeben...'}" data-answer="${q.answer}">
        </div>`;
    } else if (q.type === 'free') {
        html += `<textarea class="q-input free-answer" placeholder="Schreibe deine Antwort..." data-keywords='${JSON.stringify(q.keywords)}'></textarea>`;
    } else if (q.type === 'match') {
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        html += `<div class="match-container">`;
        q.pairs.forEach(([left, right], i) => {
            html += `<div class="match-left">${left}</div>
                     <div class="match-arrow">&rarr;</div>
                     <select class="match-select" data-correct="${right}" data-index="${i}">
                         <option value="">-- Waehlen --</option>
                         ${shuffledOptions.map(o => `<option value="${o}">${o}</option>`).join('')}
                     </select>`;
        });
        html += `</div>`;
    }

    html += `<div class="q-feedback" id="fb-${qId}"></div>`;
    html += `<input type="hidden" class="q-explanation" value="${(q.explanation || '').replace(/"/g, '&quot;')}">`;
    html += `</div>`;
    return html;
}

function selectOption(qId, idx) {
    const card = document.querySelector(`[data-qid="${qId}"]`);
    card.querySelectorAll('.q-option').forEach(o => o.classList.remove('selected'));
    card.querySelectorAll('.q-option')[idx].classList.add('selected');
}

function selectTF(qId, val) {
    const card = document.querySelector(`[data-qid="${qId}"]`);
    card.querySelectorAll('.tf-btn').forEach(b => { b.classList.remove('selected'); b.dataset.val = ''; });
    const btns = card.querySelectorAll('.tf-btn');
    if (val) { btns[0].classList.add('selected'); btns[0].dataset.val = 'true'; }
    else { btns[1].classList.add('selected'); btns[1].dataset.val = 'false'; }
    card.dataset.tfAnswer = val;
}

function checkQuestionCard(card, qId) {
    const type = card.dataset.type;
    const fb = document.getElementById(`fb-${qId}`);
    const explanation = card.querySelector('.q-explanation')?.value || '';
    let isCorrect = false;

    if (type === 'mc') {
        const correctIdx = parseInt(card.querySelector('.q-correct').value);
        const selected = card.querySelector(`input[name="${qId}"]:checked`);
        const selectedIdx = selected ? parseInt(selected.value) : -1;

        card.querySelectorAll('.q-option').forEach((o, i) => {
            o.classList.remove('selected');
            if (i === correctIdx) o.classList.add('correct');
            else if (i === selectedIdx && i !== correctIdx) o.classList.add('wrong');
        });

        isCorrect = selectedIdx === correctIdx;
    } else if (type === 'tf') {
        const correctVal = card.querySelector('.q-correct').value === 'true';
        const answer = card.dataset.tfAnswer;
        const userVal = answer === 'true';
        const btns = card.querySelectorAll('.tf-btn');

        btns.forEach(b => b.classList.remove('selected'));
        if (correctVal) btns[0].classList.add('correct'); else btns[1].classList.add('correct');
        if (answer !== undefined && userVal !== correctVal) {
            if (userVal) btns[0].classList.add('wrong'); else btns[1].classList.add('wrong');
        }

        isCorrect = answer !== undefined && userVal === correctVal;
    } else if (type === 'gap') {
        const input = card.querySelector('.gap-answer');
        const correct = input.dataset.answer.toLowerCase().trim();
        const user = input.value.toLowerCase().trim();
        isCorrect = user === correct || user.replace(/[äöü]/g, m => ({ä:'ae',ö:'oe',ü:'ue'}[m])) === correct.replace(/[äöü]/g, m => ({ä:'ae',ö:'oe',ü:'ue'}[m]));
        input.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
            fb.innerHTML = `Richtige Antwort: <strong>${input.dataset.answer}</strong>`;
        }
    } else if (type === 'free') {
        const textarea = card.querySelector('.free-answer');
        const keywords = JSON.parse(textarea.dataset.keywords);
        const userText = textarea.value.toLowerCase();
        const found = keywords.filter(k => userText.includes(k.toLowerCase()));
        const ratio = found.length / keywords.length;
        isCorrect = ratio >= 0.5;
        textarea.classList.add(ratio >= 0.5 ? 'correct' : 'wrong');
        fb.innerHTML = `${found.length}/${keywords.length} Schluesselbegriffe gefunden. ${ratio < 0.5 ? 'Fehlende Begriffe: ' + keywords.filter(k => !found.includes(k.toLowerCase()) && !userText.includes(k.toLowerCase())).join(', ') : 'Gut!'}`;
    } else if (type === 'match') {
        const selects = card.querySelectorAll('.match-select');
        let matchCorrect = 0;
        selects.forEach(sel => {
            const correct = sel.dataset.correct;
            if (sel.value === correct) {
                matchCorrect++;
                sel.style.borderColor = 'var(--green)';
                sel.style.background = 'var(--green-bg)';
            } else {
                sel.style.borderColor = 'var(--red)';
                sel.style.background = 'var(--red-bg)';
            }
        });
        isCorrect = matchCorrect === selects.length;
        if (!isCorrect) fb.innerHTML = `${matchCorrect}/${selects.length} richtig zugeordnet.`;
    }

    if (isCorrect) {
        fb.className = 'q-feedback show correct';
        if (!fb.innerHTML) fb.textContent = 'Richtig!';
    } else {
        fb.className = 'q-feedback show wrong';
        if (!fb.innerHTML && explanation) fb.textContent = explanation;
        else if (!fb.innerHTML) fb.textContent = 'Leider falsch.';
    }

    // Track wrong answers
    if (!isCorrect) {
        const topic = card.dataset.topic;
        const qText = card.querySelector('.q-text').textContent;
        if (!state.wrongQuestions.find(w => w.q === qText)) {
            state.wrongQuestions.push({ q: qText, topic, explanation });
            localStorage.setItem('ml-wrongQuestions', JSON.stringify(state.wrongQuestions));
        }
    }

    card.dataset.result = isCorrect ? 'correct' : 'wrong';
    return isCorrect;
}

// ═══════════════════════════════════════════════════════════
// EXAM / PROBEKLAUSUR
// ═══════════════════════════════════════════════════════════
function startExam() {
    state.examSource = 'exam';
    state.examAnswers = {};

    // Pick diverse questions
    const allQ = [...questionPool].sort(() => Math.random() - 0.5);
    const selected = [];
    const topicCounts = {};

    for (const q of allQ) {
        const count = topicCounts[q.topic] || 0;
        if (count < 5) {
            selected.push(q);
            topicCounts[q.topic] = count + 1;
        }
        if (selected.length >= 20) break;
    }

    state.examQuestions = selected;

    let html = '<h1>Probeklausur</h1><p style="color:var(--text2);margin-bottom:1.5rem;">Gemischte Fragen aus allen Themenbereichen. Beantworte alle Fragen und gib den Test ab.</p>';

    selected.forEach((q, i) => {
        html += renderQuestion(q, `exam-${i}`);
    });

    html += `<button class="action-btn full" onclick="submitExam()">Klausur abgeben</button>`;

    document.getElementById('examContent').innerHTML = html;
    document.getElementById('examTitle').textContent = 'Probeklausur';
    showPage('exam');
}

function submitExam() {
    const results = gradeExam('exam');

    state.sessionsCompleted++;
    localStorage.setItem('ml-sessions', state.sessionsCompleted);
    if (results.percentage > state.bestScore) {
        state.bestScore = results.percentage;
        localStorage.setItem('ml-bestScore', state.bestScore);
    }

    showResults(results);
}

function gradeExam(prefix) {
    const cards = document.querySelectorAll(`[data-qid^="${prefix}-"]`);
    let total = 0, correct = 0;
    const topicResults = {};
    const wrongAnswers = [];

    cards.forEach(card => {
        const qId = card.dataset.qid;
        const topic = card.dataset.topic;
        total++;

        if (!topicResults[topic]) topicResults[topic] = { total: 0, correct: 0 };
        topicResults[topic].total++;

        const isCorrect = checkQuestionCard(card, qId);
        if (isCorrect) {
            correct++;
            topicResults[topic].correct++;
        } else {
            wrongAnswers.push({
                q: card.querySelector('.q-text').textContent,
                topic,
                explanation: card.querySelector('.q-explanation')?.value || ''
            });
        }
    });

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, percentage, topicResults, wrongAnswers };
}

// ═══════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════
function showResults(results) {
    const topicLabels = { romantik:'Romantik', schubert:'Schubert', kunstlied:'Kunstlied', analyse:'Analyse', hoerbeispiele:'Hoerbeispiele' };
    const barColor = results.percentage >= 80 ? 'var(--green)' : results.percentage >= 60 ? 'var(--yellow)' : 'var(--red)';

    let html = `
<div class="result-header">
    <div class="result-score">${results.percentage}%</div>
    <div class="result-label">${results.correct} von ${results.total} Fragen richtig</div>
    <div class="result-bar-outer"><div class="result-bar-inner" style="width:${results.percentage}%;background:${barColor};"></div></div>
</div>`;

    // Topic breakdown
    html += `<div class="result-section"><h3>Ergebnisse nach Thema</h3><div class="result-topics">`;
    for (const [topic, data] of Object.entries(results.topicResults)) {
        const pct = Math.round((data.correct / data.total) * 100);
        const cls = pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad';
        html += `<div class="result-topic">
            <span class="topic-name">${topicLabels[topic] || topic}</span>
            <span class="topic-score ${cls}">${data.correct}/${data.total} (${pct}%)</span>
        </div>`;
    }
    html += `</div></div>`;

    // Strengths & Weaknesses
    const sortedTopics = Object.entries(results.topicResults).map(([t, d]) => ({ topic: t, pct: d.total > 0 ? d.correct/d.total : 0 })).sort((a, b) => b.pct - a.pct);

    html += `<div class="result-section"><h3>Staerken</h3>`;
    const strengths = sortedTopics.filter(t => t.pct >= 0.7);
    if (strengths.length > 0) {
        strengths.forEach(t => { html += `<div class="highlight-box" style="border-left-color:var(--green);">${topicLabels[t.topic] || t.topic} (${Math.round(t.pct*100)}%)</div>`; });
    } else {
        html += `<p style="color:var(--text2);">Noch keine deutlichen Staerken erkennbar. Wiederhole die Themen!</p>`;
    }
    html += `</div>`;

    html += `<div class="result-section"><h3>Schwaechen - hier solltest du nochmal lernen</h3>`;
    const weaknesses = sortedTopics.filter(t => t.pct < 0.7);
    if (weaknesses.length > 0) {
        weaknesses.forEach(t => { html += `<div class="highlight-box" style="border-left-color:var(--red);">${topicLabels[t.topic] || t.topic} (${Math.round(t.pct*100)}%)</div>`; });
    } else {
        html += `<p style="color:var(--green);">Keine Schwaechen - super Ergebnis!</p>`;
    }
    html += `</div>`;

    // Wrong answers detail
    if (results.wrongAnswers.length > 0) {
        html += `<div class="result-section"><h3>Falsch beantwortete Fragen</h3>`;
        results.wrongAnswers.forEach(wa => {
            html += `<div class="wrong-answer">
                <div class="wa-q">${wa.q}</div>
                <div class="wa-explain">${wa.explanation}</div>
            </div>`;
        });
        html += `</div>`;
    }

    // Recommendation
    html += `<div class="result-section"><h3>Empfehlung</h3>`;
    if (results.percentage >= 90) {
        html += `<div class="highlight-box" style="border-left-color:var(--green);">Ausgezeichnet! Du bist sehr gut vorbereitet. Wiederhole zur Sicherheit die Hoerbeispiele.</div>`;
    } else if (results.percentage >= 70) {
        html += `<div class="highlight-box" style="border-left-color:var(--yellow);">Gutes Ergebnis! Wiederhole die Themen mit weniger als 70% und trainiere die Fehler.</div>`;
    } else {
        html += `<div class="highlight-box" style="border-left-color:var(--red);">Du solltest die Themen nochmal durcharbeiten. Starte eine neue Lerneinheit und konzentriere dich auf deine Schwaechen.</div>`;
    }
    html += `</div>`;

    // Action buttons
    html += `<div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem;">
        <button class="action-btn" onclick="showPage('home')">Zurueck zur Startseite</button>
        <button class="action-btn secondary" onclick="startErrorTraining()">Fehler trainieren (${results.wrongAnswers.length})</button>
        <button class="action-btn secondary" onclick="startExam()">Neue Probeklausur</button>
    </div>`;

    document.getElementById('resultsContent').innerHTML = html;
    showPage('results');
    updateStats();
}

// ═══════════════════════════════════════════════════════════
// ERROR TRAINING
// ═══════════════════════════════════════════════════════════
function startErrorTraining() {
    if (state.wrongQuestions.length === 0) {
        alert('Keine Fehler zum Wiederholen vorhanden. Starte zuerst eine Probeklausur!');
        return;
    }

    state.examSource = 'error';

    // Find matching questions from pool
    const errorQs = state.wrongQuestions.map(wq => {
        return questionPool.find(q => q.q === wq.q) || null;
    }).filter(q => q !== null).sort(() => Math.random() - 0.5);

    if (errorQs.length === 0) {
        alert('Keine passenden Fragen gefunden.');
        return;
    }

    state.examQuestions = errorQs;

    let html = '<h1>Fehlertraining</h1><p style="color:var(--text2);margin-bottom:1.5rem;">Hier werden nur deine falsch beantworteten Fragen wiederholt.</p>';
    errorQs.forEach((q, i) => {
        html += renderQuestion(q, `error-${i}`);
    });
    html += `<button class="action-btn full" onclick="submitErrorTraining()">Auswerten</button>`;

    document.getElementById('examContent').innerHTML = html;
    document.getElementById('examTitle').textContent = 'Fehlertraining';
    showPage('exam');
}

function submitErrorTraining() {
    const results = gradeExam('error');

    // Remove correctly answered questions from error list
    const cards = document.querySelectorAll(`[data-qid^="error-"]`);
    cards.forEach(card => {
        if (card.dataset.result === 'correct') {
            const qText = card.querySelector('.q-text').textContent;
            state.wrongQuestions = state.wrongQuestions.filter(w => w.q !== qText);
        }
    });
    localStorage.setItem('ml-wrongQuestions', JSON.stringify(state.wrongQuestions));

    showResults(results);
}

// ═══════════════════════════════════════════════════════════
// QUICK REVIEW (5 MIN)
// ═══════════════════════════════════════════════════════════
function startQuickReview() {
    state.examSource = 'quick';

    // Pick 10 random questions
    const qs = [...questionPool].sort(() => Math.random() - 0.5).slice(0, 10);
    state.examQuestions = qs;

    let html = '<h1>5-Minuten-Wiederholung</h1><p style="color:var(--text2);margin-bottom:1.5rem;">10 zufaellige Fragen quer durch alle Themen.</p>';
    qs.forEach((q, i) => {
        html += renderQuestion(q, `quick-${i}`);
    });
    html += `<button class="action-btn full" onclick="submitQuickReview()">Auswerten</button>`;

    document.getElementById('examContent').innerHTML = html;
    document.getElementById('examTitle').textContent = '5-Minuten-Wiederholung';
    showPage('exam');
}

function submitQuickReview() {
    const results = gradeExam('quick');
    showResults(results);
}
