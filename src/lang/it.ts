export default {
  landing: {
    uiLanguage: {
      label: 'Lingua del sito',
    },
    priceAndPlans: 'Piani e prezzi',
    recommendedPlan: 'Popolare',
    welcomeText: 'Benvenuto su Gastro',
    readyTemplates: 'Modelli pronti per ogni locale',
    readyTemplatesDescription:
      'Perfetti per bar, ristoranti, pub o pasticcerie. Facili da configurare, rapidi da lanciare e ti aiutano a presentarti in modo professionale online senza perdere tempo.',

    signUp: 'Registrati',
    signIn: 'Accedi',
    notHaveAccount: 'Non hai un account?',
    haveAccount: 'Hai già un account?',
    email: 'Email',
    enterEmail: 'Inserisci email',
    placeName: 'Nome del locale',
    enterPlace: 'Inserisci il nome',
    password: 'Password',
    enterPassword: 'Inserisci la password',
    confirmPassword: 'Conferma password',
    menu: 'Menu',
    name: 'Nome',
    firstMeal: 'Primo piatto',
    secondMeal: 'Secondo piatto',
    addToCard: 'Aggiungi al carrello',
    checkout: 'Carrello',
    buy: 'Acquista',
    sum: 'Totale: ${sum}',
    numbers_1: 'utenti che hanno già provato il nostro sito',
    numbers_2: 'parole chiave',
    numbers_3: 'database geo',
    numbers_4: 'profili di dominio',
    openTime: 'Orari di apertura',
    bookTable: 'Prenota un tavolo per pranzo o cena',
    visitUs: 'Vieni a trovarci',
    comeAndTaste: 'Vieni a assaggiare il nostro cibo',
    changePlan:
      'Sei sicuro di voler scegliere questo piano? Le modifiche hanno effetto immediato e per ripristinare il piano precedente dovrai acquistarlo di nuovo.',
    comeToUs:
      'Vieni da noi e immergiti in un’atmosfera incantevole, sapori indimenticabili e un servizio impeccabile.',
    times: [
      { day: 'Feriali', time: '09.00 - 22.00' },
      {
        day: 'Sabato',
        time: '09.00 - 20.00',
      },
      {
        day: 'Domenica',
        time: '10.00 - 19.00',
      },
    ],
    soups: {
      1: {
        name: 'Zuppa rossa',
        description:
          'Una delicata zuppa di pomodori maturi, condita con spezie profumate e un filo d’olio d’oliva. Ricca di sapore e dal colore vivace, si abbina perfettamente a crostini aromatici o erbe fresche.',
        ingredients: ['pomodori maturi', 'aglio', 'cipolla', 'basilico'],
        price: '$8.20',
      },
      2: {
        id: 2,
        name: 'Zuppa di zucca',
        description:
          'Cremosa zuppa di zucca con panna e noce moscata. Ha un delicato sapore dolce e un colore arancione intenso.',
        ingredients: ['zucca', 'panna', 'noce moscata'],
        price: '$7.50',
      },
      3: {
        id: 3,
        name: 'Zuppa di funghi',
        description:
          'Una profumata zuppa di funghi di bosco, arricchita con panna e spezie. Perfetta per le serate fresche.',
        ingredients: ['funghi', 'cipolla', 'panna'],
        price: '$9.00',
      },
      4: {
        id: 4,
        name: 'Zuppa di verdure',
        description:
          'Una zuppa leggera di verdure fresche, condita con erbe e olio d’oliva. Ideale per un’alimentazione sana.',
        ingredients: ['carota', 'broccoli', 'sedano'],
        price: '$6.80',
      },
    },

    infoBlock: {
      1: {
        title: 'Sito per consegne e ordini da asporto',
        description:
          'Avvia il tuo sistema di consegna e ritiro per ristorante o bar. Il 90% dei clienti recupera l’abbonamento annuale Gastro nella prima settimana di consegne.',
      },
      2: {
        title: 'Sito per ordini online',
        description:
          'Accetta ordini direttamente dal tuo sito. Riduce i costi degli intermediari e aumenta il profitto del locale.',
      },
      3: {
        title: 'Sito per menu da ristorante',
        description:
          'Crea un menu interattivo con foto e descrizioni dei piatti. Le ricerche mostrano che immagini vivaci aumentano gli ordini del 30%.',
      },
    },
  },
  dashboard: {
    sidebar: {
      currentPlan: 'Piano attuale',
      changePlan: 'Cambia piano',
      collapsePlans: 'Comprimi',
      current: 'Attuale',
      freePrice: 'Gratuito',
    },
    pro: {
      navs: {},
    },
    standart: {
      qrCode: {
        description: 'Codice QR del tuo locale',
        instruction:
          'Stampa o mostra il codice QR ai clienti così possono visualizzare rapidamente il menu',
        menuLink: 'Link al menu',
        howToUse: 'Come usare',
        step1: 'Stampa il codice QR o mostralo su uno schermo',
        step2: 'I clienti scansionano il codice QR con il telefono',
        step3: 'Vengono portati automaticamente alla pagina del menu',
        openMenu: 'Apri menu',
        copyError: 'Impossibile copiare il link',
        downloadError: 'Impossibile scaricare il codice QR',
        generationError: 'Impossibile generare il codice QR',
        noPlaceName: 'Il nome del locale non è specificato',
      },
      navs: {
        home: 'Home',
        menu: 'Menu',
        orders: 'Ordini',
        reservations: 'Prenotazioni tavoli',
        analytics: 'Analisi',
        categories: 'Categorie',
        settings: 'Impostazioni',
        qrCode: 'Codice QR',
      },
    },
    free: {
      navs: {
        home: 'Home',
        menu: 'Menu',
        categories: 'Categorie',
        qrCode: 'Codice QR',
        settings: 'Impostazioni',
      },
    },
    home: {
      welcome: 'Benvenuto in { placeName }!',
      subtitle: 'Gestisci il menu e monitora le statistiche del locale',
      totalDishes: 'Totale piatti',
      totalCategories: 'Totale categorie',
      available: 'disponibile',
      unavailable: 'non disponibile',
      organized: 'Organizzato',
      quickAction: 'Azione rapida',
      manageMenu: 'Gestisci menu',
      addEditDishes: 'Aggiungi e modifica piatti',
      link: 'Link',
      quickLinks: 'Collegamenti rapidi',
      pendingStatusHint: 'Stato in attesa',
      links: {
        menu: {
          title: 'Menu',
          description: 'Visualizza e modifica i piatti',
        },
        categories: {
          title: 'Categorie',
          description: 'Organizza il menu',
        },
        settings: {
          title: 'Impostazioni',
          description: 'Modifica i dati del locale',
        },
        addDish: {
          title: 'Aggiungi piatto',
          description: 'Aggiungi rapidamente un nuovo piatto',
        },
        orders: {
          title: 'Ordini',
          description: 'Ordini online dal menu premium',
        },
        reservations: {
          title: 'Prenotazioni tavoli',
          description: 'Richieste dal modulo di prenotazione nel menu',
        },
        analytics: {
          title: 'Analisi',
          description:
            'Vendite e popolarità dei piatti: grafici e diagrammi per i titolari di ristoranti (Premium)',
        },
      },
      tip: {
        title: 'Consiglio del giorno',
        items: [
          'Tieni il menu aggiornato e aggiungi foto dei piatti per attirare più clienti. Immagini di qualità possono aumentare gli ordini del 30%!',
          'Metti il codice QR del menu sui tavoli e vicino all’ingresso: i clienti consultano i piatti più velocemente e possono ordinare senza aspettare il cameriere.',
          'Aggiungi brevi descrizioni con ingredienti: aiuta a scegliere e riduce le domande al personale.',
          'Aggiorna tempestivamente la disponibilità: segna i piatti non disponibili così non ordinano ciò che non puoi servire.',
          'Raggruppa il menu in categorie chiare: una struttura logica facilita la scelta.',
        ],
      },
    },
    tableHead: {
      name: 'Nome',
      image: 'Immagine',
      price: 'Prezzo',
      category: 'Categoria',
      description: 'Descrizione',
      settings: 'Impostazioni',
      deleteMeal: 'Sei sicuro di voler eliminare questo piatto?',
      table: 'Tavolo',
      addMeal: 'Aggiungi piatto',
      categories: 'Categorie',
      addCategory: 'Aggiungi categoria',
      deleteCategory: 'Sei sicuro di voler eliminare questa categoria?',
      noCategories: 'Nessuna categoria ancora',
    },
    orders: {
      title: 'Ordini dal menu',
      subtitle: 'Ordini online effettuati dai clienti tramite il menu premium',
      loadError: 'Impossibile caricare gli ordini. Riprova più tardi.',
      emptyTitle: 'Nessun ordine ancora',
      emptyHint: 'Quando i clienti effettueranno ordini tramite il menu, appariranno qui.',
      filterStatus: 'Stato',
      colDate: 'Data',
      colStatus: 'Stato',
      colCustomer: 'Cliente',
      colContact: 'Contatto',
      colAddress: 'Indirizzo / orario',
      colItems: 'Articoli',
      colTotal: 'Totale',
      status: {
        pending: 'In attesa',
        confirmed: 'Confermato',
        completed: 'Completato',
        cancelled: 'Annullato',
        all: 'Tutti',
      },
      modalTitle: 'Dettagli ordine',
      changeStatus: 'Nuovo stato',
      modalCancel: 'Annulla',
      modalSave: 'Salva',
      modalSaving: 'Salvataggio…',
      statusUpdated: 'Stato ordine aggiornato.',
      statusUpdateFailed: 'Impossibile aggiornare lo stato dell’ordine. Riprova.',
    },
    reservations: {
      title: 'Richieste di prenotazione',
      subtitle:
        'Richieste dal modulo pubblico del menu premium. Cambia lo stato: quando l’email sarà collegata, il cliente riceverà una notifica.',
      loadError: 'Impossibile caricare le prenotazioni. Riprova più tardi.',
      emptyTitle: 'Nessuna richiesta di prenotazione ancora',
      emptyHint:
        'Quando gli ospiti inviano il modulo dal menu premium, le voci appariranno in questa tabella.',
      colReceived: 'Ricevuto',
      colVisit: 'Visita',
      colParty: 'Persone',
      colGuest: 'Ospite',
      colContact: 'Contatto',
      colComment: 'Commento',
      colStatus: 'Stato',
      status: {
        pending: 'In attesa',
        confirmed: 'Confermata',
        declined: 'Rifiutata',
        rescheduled: 'Riprogrammata',
        all: 'Tutte',
      },
      statusToast: 'Stato salvato. Verrà inviato un aggiornamento via email.',
      statusUpdateFailed: 'Impossibile aggiornare lo stato. Riprova.',
      rescheduleCurrentSlot: 'Visita attuale',
      rescheduleHint: 'Imposta la nuova data e ora della visita dopo la riprogrammazione.',
      rescheduleNewDate: 'Nuova data',
      rescheduleNewTime: 'Nuovo orario',
      rescheduleSave: 'Salva riprogrammazione',
      rescheduleCancel: 'Annulla',
      rescheduleValidation: 'Scegli data e ora per la riprogrammazione.',
    },
    analytics: {
      title: 'Analisi',
      subtitle: 'Vendite e popolarità dei piatti',
      intro:
        'Analisi di vendite e popolarità dei piatti con grafici e diagrammi per i titolari di ristoranti.',
      chart: {
        title: 'Popolarità dei piatti',
        subtitle:
          'Quanti ordini nel periodo selezionato includevano il piatto (ordini annullati esclusi)',
        empty: 'Nessuna voce di menu in questo periodo o i dati non sono ancora arrivati.',
        xAxis: 'Numero di ordini',
        datasetLabel: 'Ordini',
        tooltipLine: '{count} ordini che includono questo piatto',
      },
      loadError: 'Impossibile caricare i dati. Prova ad aggiornare la pagina.',
      period: {
        aria: 'Periodo del report',
        customAria: 'Intervallo di date personalizzato',
        customPlaceholder: 'Periodo personalizzato',
        calendarAria: 'Calendario — seleziona intervallo di date',
        prevMonth: 'Mese precedente',
        nextMonth: 'Mese successivo',
        pickEnd: 'Scegli la data di fine',
        invalid: 'Seleziona un periodo valido',
        day: 'Giorno',
        week: 'Settimana',
        month: 'Mese',
      },
      cards: {
        ordersCaption: 'Ordini online',
        revenue: 'Totale vendite',
        avgCheck: 'Scontrino medio',
        avgCheckHint: 'Ricavi del periodo selezionato divisi per numero di ordini',
        completed: 'Completati',
        completedHint: 'Ordini segnati come completati nel periodo selezionato',
        reservations: 'Nuove prenotazioni',
        reservationsHint:
          'Richieste create nel periodo selezionato (la settimana inizia il lunedì)',
        pendingNow: 'In attesa ora',
        pendingHint: 'Tutti gli ordini attualmente in attesa (non filtrati per periodo)',
      },
    },
    menu: {
      subtitle: 'Gestisci i piatti del locale',
      noDishes: 'Il menu è vuoto',
      addFirstDish: 'Aggiungi il primo piatto al menu',
      total: 'Totale piatti',
      noDescription: 'Nessuna descrizione aggiunta',
      freePlanItemsLimit: 'Hai raggiunto il limite di piatti del piano gratuito',
    },
    dish: {
      multilingualHint:
        'Il nome in ucraino è obbligatorio; descrizione e altre lingue sono facoltative. Le etichette delle categorie seguono la lingua della scheda attiva.',
      sectionGeneral: 'Dettagli generali',
      sectionTranslations: 'Nome e descrizione',
      translationsHint:
        'Cambia la scheda lingua e compila il testo mostrato nel menu pubblico.',
      ukNameRequired: 'Inserisci il nome in ucraino',
      optionalDescription: 'facoltativo',
    },
    categories: {
      subtitle: 'Organizza il menu con le categorie',
      category: 'Categoria',
      noCategoriesDescription:
        'Crea categorie per organizzare il menu. Aiuta i clienti a trovare più facilmente i piatti che cercano.',
      freePlanItemsLimit: 'Hai raggiunto il limite di categorie del piano gratuito',
      placeInUse: 'Questo nome del locale è già in uso',
      ukNameRequired: 'Inserisci il nome in ucraino',
      languagesTablist: 'Lingue del menu',
      languagesFilled: '{count} di {total} lingue compilate',
    },
    settings: {
      menuBackgroundColor: 'Colore di sfondo del menu',
      menuIconColor: 'Colore delle icone del menu',
      logo: 'Logo del locale',
      currency: 'Valuta del menu',
      currencies: {
        UAH: 'Grivna ucraina (₴)',
        EUR: 'Euro (€)',
        USD: 'Dollaro statunitense ($)',
      },
      menuWelcomeText: 'Testo del menu pubblico',
      menuWelcomeTextHint:
        'Mostrato sotto il nome del locale nel menu pubblico. Lascia vuoto per usare il testo di benvenuto predefinito.',
      dataSuccessUpdated: 'I tuoi dati sono stati aggiornati con successo',
      menuDishLayout: {
        label: 'Stile di visualizzazione dei piatti',
        hint: 'Come i piatti appaiono agli ospiti nel menu pubblico (si applica dopo il salvataggio e l’aggiornamento del backend).',
        list: {
          title: 'Lista',
          description:
            'Righe compatte: foto a sinistra, nome e prezzo — comodo per menu lunghi.',
        },
        grid: {
          title: 'Griglia di schede',
          description:
            'Più piatti per riga; enfasi su foto e panoramica rapida delle categorie.',
        },
        magazine: {
          title: 'Rivista',
          description:
            'Immagini grandi a tutta larghezza per un layout più editoriale, tipo rivista.',
        },
      },
    },
    editText: 'Aggiorna dati',
    addText: 'Aggiungi piatto',
    addCategoryText: 'Aggiungi categoria',
    editCategoryText: 'Aggiorna categoria',
    availability: 'Disponibilità del piatto',
    available: 'Disponibile',
    unavailable: 'Non disponibile',
    pending: {
      description: 'Attendi la conferma del pagamento.',
    },
  },
  footer: {
    description:
      'In Gastro siamo appassionati nel creare momenti indimenticabili attraverso la nostra arte culinaria.',
    copyright: 'Copyright © 2026 Gastro. Tutti i diritti riservati.',
  },
  plans: {
    free: {
      name: 'Gratuito',
      details: [
        'Accesso alle funzioni di base',
        'Numero limitato di salvataggi',
        'Solo supporto via email',
      ],
    },
    standart: {
      name: 'Standard',
      details: ['Funzioni avanzate', 'Salvataggi illimitati', 'Supporto prioritario'],
    },
    premium: {
      name: 'Premium',
      details: [
        'Tutte le funzioni senza limiti',
        'Analisi di vendite e popolarità dei piatti con grafici e diagrammi',
        'Integrazione con altri servizi',
        'Supporto 24/7',
      ],
    },
  },
  subscribe: {
    month: 'Mese',
  },
  header: {
    menuOpen: 'Apri menu',
    menuClose: 'Chiudi menu',
    sidebarNav: 'Navigazione',
  },
  button: {
    add: 'Aggiungi',
    clickMe: 'Cliccami',
    edit: 'Aggiorna',
    signUp: 'Registrati',
    signIn: 'Accedi',
    buyNow: 'Acquista ora',
    reserveNow: 'Prenota ora',
    choose: 'Scegli',
    dashboard: 'Dashboard',
    logOut: 'Esci',
    yes: 'Sì',
    no: 'No',
    download: 'Scarica',
    copy: 'Copia',
  },
  errors: {
    email: {
      email: 'Inserisci un indirizzo email valido',
      emailTaken: 'Questa email è già in uso',
      required: 'Questo campo è obbligatorio',
      invalidCredentials: 'Email non trovata',
    },
    password: {
      required: 'Questo campo è obbligatorio',
      minLength: 'La password deve avere almeno 6 caratteri',
      passWrong: 'Password errata',
      passMissMatch: 'Le password non coincidono',
    },
    confirmPassword: {
      required: 'Questo campo è obbligatorio',
      sameAs: 'Le password devono coincidere',
    },
    placeName: {
      required: 'Questo campo è obbligatorio',
      placeTaken: 'Questo nome del locale è già in uso',
    },
    name: {
      required: 'Questo campo è obbligatorio',
    },
    firstName: {
      required: 'Inserisci il tuo nome',
    },
    lastName: {
      required: 'Inserisci il tuo cognome',
    },
    phone: {
      required: 'Inserisci il tuo numero di telefono',
      minLength: 'Numero troppo corto (min. 10 caratteri)',
    },
    address: {
      required: 'Inserisci l’indirizzo di consegna',
    },
    reserve: {
      partySize: 'Inserisci il numero di persone da 1 a 50',
    },
  },
  toasts: {
    signIn: 'Accesso effettuato con successo',
    error: 'Qualcosa è andato storto, riprova più tardi',
    checkoutOrderSuccess: 'Ordine effettuato con successo',
    checkoutOrderError: 'Impossibile effettuare l’ordine. Riprova.',
    reserveRequestSent:
      'Richiesta inviata. Il locale ti contatterà dopo la conferma (email all’indirizzo indicato — quando il server sarà collegato).',
    reserveRequestError: 'Impossibile inviare la richiesta. Riprova.',
  },
  apiTableReservation: {
    tableReservationNotAvailable:
      'Le prenotazioni non sono disponibili per questo menu (è richiesto il piano premium).',
    tableReservationInvalidSlot: 'Scegli un altro orario o data — questa fascia non è disponibile.',
    tableReservationRateLimit: 'Troppi tentativi. Riprova più tardi.',
    invalidCredentials: 'Menu non trovato o non disponibile.',
  },
  apiCategory: {
    categoryTranslationsPremiumOnly:
      'Le categorie multilingue sono disponibili solo con il piano premium.',
  },
  apiShowcaseOrder: {
    showcaseOrderingNotAvailable: 'Gli ordini non sono disponibili per questo menu.',
    showcaseOrderTotalMismatch:
      'Il totale dell’ordine non corrisponde al carrello. Aggiorna la pagina e riprova.',
    showcaseOrderDishInvalid:
      'Alcuni articoli nel carrello non sono più disponibili. Aggiorna menu e carrello.',
    showcaseOrderRateLimit: 'Troppi tentativi di ordine. Riprova più tardi.',
    invalidCredentials: 'Menu non trovato o non disponibile.',
  },
  inputs: {
    email: 'Email',
    firstName: 'Nome',
    lastName: 'Cognome',
    phone: 'Telefono',
    deliveryTime: 'es. oggi 18:00–19:00',
    deliveryAddress: 'Via, edificio, interno',
    checkoutComment: 'Richieste speciali, ingresso, codice porta…',
    placeName: 'Nome dell’organizzazione',
    password: 'Password',
    confirmPassword: 'Conferma password',
    name: 'Nome',
    description: 'Descrizione',
    price: 'Prezzo',
    uploadText:
      'Carica immagini tramite il selettore file o trascinale nell’area designata',
    chooseImage: 'Scegli immagine',
    imageTooLarge: 'Immagine troppo grande, scegline una sotto i 10 MB',
    notAnImage: 'Non è un’immagine, carica un file immagine',
    reserveDate: 'Scegli una data',
    reserveTime: 'Orario',
    partySize: 'Numero di persone',
    reserveComment: 'Richieste speciali, bambini, occasione…',
  },
  navs: {
    home: 'Home',
    info: 'Chi siamo',
    plans: 'Piani e prezzi',
    map: 'Contatti',
    menu: 'Menu',
    orders: 'I miei ordini',
    reserve: 'Prenota un tavolo',
  },
  showcase: {
    menu: 'Menu',
    menuLanguage: {
      label: 'Lingua del menu',
    },
    welcomeDescription:
      'Scegli i piatti dal nostro menu e goditi ogni sapore che abbiamo preparato',
    wishlist: {
      title: 'Piatti salvati',
      empty:
        'Nessun piatto salvato ancora. Tocca il cuore su un piatto nel menu per aggiungerlo qui.',
      close: 'Chiudi lista desideri',
      open: 'Lista desideri',
    },
    premium: {
      badge: 'Menu premium',
      description:
        'Un menu curato con presentazione curata e navigazione semplice — scegli una categoria o scorri la pagina.',
      addToCart: 'Aggiungi al carrello',
      removeFromCart: 'Rimuovi dal carrello',
      cart: 'Carrello',
      cartEmpty: 'Il carrello è vuoto. Scegli piatti dal menu.',
      cartTotal: 'Totale',
      cartUnit: 'cad.',
      cartQuantity: 'Quantità',
      cartDecrease: 'Diminuisci quantità',
      cartIncrease: 'Aumenta quantità',
      cartClose: 'Chiudi carrello',
      goToCheckout: 'Effettua ordine',
      checkoutTitle: 'Checkout',
      checkoutPlaceholder: 'Il modulo ordine e la conferma appariranno qui a breve.',
      checkoutOrderSummary: 'Il tuo ordine',
      checkoutEmptyCart: 'Il carrello è vuoto. Torna al menu e aggiungi articoli.',
      checkoutFirstName: 'Nome',
      checkoutLastName: 'Cognome',
      checkoutPhone: 'Telefono',
      checkoutEmail: 'Email',
      checkoutEmailHint: 'facoltativa, per conferma',
      checkoutAddress: 'Indirizzo di consegna',
      checkoutDeliveryTime: 'Orario di consegna preferito',
      checkoutDeliveryTimeHint: 'facoltativo',
      checkoutComment: 'Note sull’ordine',
      checkoutCommentPlaceholder: 'Richieste speciali, ingresso, codice porta…',
      checkoutSubmit: 'Conferma ordine',
      checkoutSubmitting: 'Invio…',
      checkoutFormSection: 'Contatto e consegna',
      backToMenu: 'Torna al menu',
      reserveTitle: 'Prenota un tavolo',
      reserveSubtitle:
        'Compila il modulo — il locale riceve la richiesta nella dashboard e può confermare la visita.',
      reserveFormSection: 'Dettagli prenotazione',
      reserveDate: 'Data della visita',
      reserveTime: 'Orario',
      reservePartySize: 'Numero di persone',
      reserveEmail: 'Email per conferma e aggiornamenti di stato',
      reserveComment: 'Commento (facoltativo)',
      reserveLegalHint:
        'Inviando, accetti il trattamento dei dati di contatto per comunicazioni su questa prenotazione.',
      reserveSubmit: 'Invia richiesta',
      reserveSubmitting: 'Invio…',
      orderHistoryTitle: 'Cronologia ordini',
      orderHistoryHint:
        'I tuoi ordini completati da questo menu su questo dispositivo sono salvati qui.',
      orderHistoryEmpty:
        'Nessun ordine ancora. Effettua il primo ordine — apparirà qui dopo l’invio riuscito.',
      orderHistoryPlacedAt: 'Effettuato',
      orderHistoryId: 'ID ordine',
      orderHistoryFromCart:
        'Effettuato dal carrello (salvato localmente su questo dispositivo)',
    },
    noMenuAvailable: 'Il menu non è ancora disponibile',
    menuComingSoon: 'I nostri piatti saranno disponibili a breve',
    categoryTabsLabel: 'Categorie del menu',
    noDishesInCategory: 'Nessun piatto in questa categoria ancora',
    error: {
      title: 'Errore di caricamento',
      description: 'Impossibile caricare i dati. Riprova più tardi.',
    },
    noPlan: {
      title: 'Nessun piano selezionato',
      description: 'Scegli un piano per visualizzare il menu.',
    },
    pending: {
      title: 'In attesa di pagamento',
      description: 'Attendi la conferma del pagamento.',
    },
    notAuthorized: {
      title: 'Accesso richiesto',
      description: 'Accedi per visualizzare il menu.',
    },
  },
}
