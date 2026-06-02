export default {
  landing: {
    uiLanguage: {
      label: 'Jazyk webu',
    },
    priceAndPlans: 'Plány a ceny',
    recommendedPlan: 'Oblíbený',
    welcomeText: 'Vítejte v Gastro',
    readyTemplates: 'Hotové šablony pro jakýkoli podnik',
    readyTemplatesDescription:
      'Ideální pro kavárny, restaurace, bary nebo pekárny. Snadné nastavení, rychlé spuštění a profesionální online prezentace bez zbytečné ztráty času.',

    signUp: 'Registrace',
    signIn: 'Přihlášení',
    notHaveAccount: 'Nemáte účet?',
    haveAccount: 'Už máte účet?',
    email: 'E-mail',
    enterEmail: 'Zadejte e-mail',
    placeName: 'Název podniku',
    enterPlace: 'Zadejte název',
    password: 'Heslo',
    enterPassword: 'Zadejte heslo',
    confirmPassword: 'Potvrďte heslo',
    menu: 'Menu',
    name: 'Název',
    firstMeal: 'První chod',
    secondMeal: 'Druhý chod',
    addToCard: 'Přidat do košíku',
    checkout: 'Košík',
    buy: 'Koupit',
    sum: 'Celkem: ${sum}',
    numbers_1: 'uživatelé, kteří již vyzkoušeli náš web',
    numbers_2: 'klíčová slova',
    numbers_3: 'geo databáze',
    numbers_4: 'profily domén',
    openTime: 'Otevírací doba',
    bookTable: 'Rezervujte stůl na oběd nebo večeři',
    visitUs: 'Navštivte nás',
    comeAndTaste: 'Přijďte ochutnat naše jídlo',
    changePlan:
      'Opravdu chcete zvolit tento plán? Změny platí okamžitě a pro obnovení předchozího plánu ho budete muset znovu zakoupit.',
    comeToUs:
      'Navštivte nás a ponořte se do příjemné atmosféry, nezapomenutelných chutí a bezchybného servisu.',
    times: [
      { day: 'Všední dny', time: '09.00 - 22.00' },
      {
        day: 'Sobota',
        time: '09.00 - 20.00',
      },
      {
        day: 'Neděle',
        time: '10.00 - 19.00',
      },
    ],
    soups: {
      1: {
        name: 'Červená polévka',
        description:
          'Jemná polévka ze zralých rajčat, ochucená voňavým kořením a kapkou olivového oleje. Bohatá chutí a zářivě barevná, skvěle se hodí k aromatickým krutónům nebo čerstvým bylinkám.',
        ingredients: ['zralá rajčata', 'česnek', 'cibule', 'bazalka'],
        price: '$8.20',
      },
      2: {
        id: 2,
        name: 'Dýňová polévka',
        description:
          'Krémová dýňová polévka se smetanou a muškátovým oříškem. Má jemnou sladkou chuť a zářivě oranžovou barvu.',
        ingredients: ['dýně', 'smetana', 'muškátový oříšek'],
        price: '$7.50',
      },
      3: {
        id: 3,
        name: 'Houbová polévka',
        description:
          'Voňavá polévka z lesních hub obohacená smetanou a kořením. Ideální na chladné večery.',
        ingredients: ['houby', 'cibule', 'smetana'],
        price: '$9.00',
      },
      4: {
        id: 4,
        name: 'Zeleninová polévka',
        description:
          'Lehká polévka z čerstvé zeleniny ochucená bylinkami a olivovým olejem. Vhodná pro zdravou stravu.',
        ingredients: ['mrkev', 'brokolice', 'celer'],
        price: '$6.80',
      },
    },

    infoBlock: {
      1: {
        title: 'Web pro rozvoz a objednávky s sebou',
        description:
          'Spusťte vlastní systém rozvozu a vyzvednutí pro restauraci nebo kavárnu. 90 % klientů si roční předplatné Gastro vrátí během prvního týdne rozvozu.',
      },
      2: {
        title: 'Web pro online objednávky',
        description:
          'Přijímejte objednávky přímo z webu. Snižuje to náklady na zprostředkovatele a zvyšuje zisk podniku.',
      },
      3: {
        title: 'Web pro restaurační menu',
        description:
          'Vytvořte interaktivní menu s fotografiemi a popisy jídel. Výzkumy ukazují, že výrazné obrázky zvyšují objednávky o 30 %.',
      },
    },
  },
  dashboard: {
    sidebar: {
      currentPlan: 'Aktuální plán',
      changePlan: 'Změnit plán',
      collapsePlans: 'Sbalit',
      current: 'Aktuální',
      freePrice: 'Zdarma',
    },
    pro: {
      navs: {},
    },
    standart: {
      qrCode: {
        description: 'QR kód vašeho podniku',
        instruction:
          'Vytiskněte nebo ukažte QR kód zákazníkům, aby si mohli rychle prohlédnout menu',
        menuLink: 'Odkaz na menu',
        howToUse: 'Jak používat',
        step1: 'Vytiskněte QR kód nebo ho zobrazte na obrazovce',
        step2: 'Zákazníci naskenují QR kód telefonem',
        step3: 'Automaticky se dostanou na stránku vašeho menu',
        openMenu: 'Otevřít menu',
        copyError: 'Nepodařilo se zkopírovat odkaz',
        downloadError: 'Nepodařilo se stáhnout QR kód',
        generationError: 'Nepodařilo se vygenerovat QR kód',
        noPlaceName: 'Název podniku není uveden',
      },
      navs: {
        home: 'Domů',
        menu: 'Menu',
        orders: 'Objednávky',
        reservations: 'Rezervace stolů',
        analytics: 'Analytika',
        categories: 'Kategorie',
        settings: 'Nastavení',
        qrCode: 'QR kód',
      },
    },
    free: {
      navs: {
        home: 'Domů',
        menu: 'Menu',
        categories: 'Kategorie',
        qrCode: 'QR kód',
        settings: 'Nastavení',
      },
    },
    home: {
      welcome: 'Vítejte v { placeName }!',
      subtitle: 'Spravujte menu a sledujte statistiky podniku',
      totalDishes: 'Celkem jídel',
      totalCategories: 'Celkem kategorií',
      available: 'dostupné',
      unavailable: 'nedostupné',
      organized: 'Organizováno',
      quickAction: 'Rychlá akce',
      manageMenu: 'Spravovat menu',
      addEditDishes: 'Přidávat a upravovat jídla',
      link: 'Odkaz',
      quickLinks: 'Rychlé odkazy',
      pendingStatusHint: 'Čekající stav',
      links: {
        menu: {
          title: 'Menu',
          description: 'Zobrazit a upravit jídla',
        },
        categories: {
          title: 'Kategorie',
          description: 'Uspořádejte menu',
        },
        settings: {
          title: 'Nastavení',
          description: 'Změnit údaje podniku',
        },
        addDish: {
          title: 'Přidat jídlo',
          description: 'Rychle přidat nové jídlo',
        },
        orders: {
          title: 'Objednávky',
          description: 'Online objednávky z prémiového menu',
        },
        reservations: {
          title: 'Rezervace stolů',
          description: 'Žádosti z rezervačního formuláře v menu',
        },
        analytics: {
          title: 'Analytika',
          description:
            'Prodeje a oblíbenost jídel: grafy a diagramy pro majitele restaurací (Premium)',
        },
      },
      tip: {
        title: 'Tip dne',
        items: [
          'Udržujte menu aktuální a přidávejte fotografie jídel, abyste přilákali více zákazníků. Kvalitní snímky mohou zvýšit objednávky o 30 %!',
          'Umístěte QR kód menu na stoly a u vchodu — hosté prohlíží jídla rychleji a mohou objednat bez čekání na obsluhu.',
          'Přidejte krátké popisy s ingrediencemi — pomáhá hostům vybrat a snižuje dotazy na personál.',
          'Aktualizujte dostupnost včas — označte nedostupná jídla, aby zákazníci neobjednávali to, co nemůžete podat.',
          'Rozdělte menu do přehledných kategorií — logická struktura usnadňuje výběr.',
        ],
      },
    },
    tableHead: {
      name: 'Název',
      image: 'Obrázek',
      price: 'Cena',
      category: 'Kategorie',
      description: 'Popis',
      settings: 'Nastavení',
      deleteMeal: 'Opravdu chcete smazat toto jídlo?',
      table: 'Stůl',
      addMeal: 'Přidat jídlo',
      categories: 'Kategorie',
      addCategory: 'Přidat kategorii',
      deleteCategory: 'Opravdu chcete smazat tuto kategorii?',
      noCategories: 'Zatím žádné kategorie',
    },
    orders: {
      title: 'Objednávky z menu',
      subtitle: 'Online objednávky zadané zákazníky přes prémiové menu',
      loadError: 'Nepodařilo se načíst objednávky. Zkuste to později.',
      emptyTitle: 'Zatím žádné objednávky',
      emptyHint: 'Až zákazníci zadají objednávky přes menu, zobrazí se zde.',
      filterStatus: 'Stav',
      colDate: 'Datum',
      colStatus: 'Stav',
      colCustomer: 'Zákazník',
      colContact: 'Kontakt',
      colAddress: 'Adresa / čas',
      colItems: 'Položky',
      colTotal: 'Celkem',
      status: {
        pending: 'Čeká',
        confirmed: 'Potvrzeno',
        completed: 'Dokončeno',
        cancelled: 'Zrušeno',
        all: 'Vše',
      },
      modalTitle: 'Detail objednávky',
      changeStatus: 'Nový stav',
      modalCancel: 'Zrušit',
      modalSave: 'Uložit',
      modalSaving: 'Ukládání…',
      statusUpdated: 'Stav objednávky byl aktualizován.',
      statusUpdateFailed: 'Nepodařilo se aktualizovat stav objednávky. Zkuste to znovu.',
    },
    reservations: {
      title: 'Žádosti o rezervaci',
      subtitle:
        'Žádosti z veřejného formuláře prémiového menu. Změňte stav — po připojení e-mailu dostane zákazník upozornění.',
      loadError: 'Nepodařilo se načíst rezervace. Zkuste to později.',
      emptyTitle: 'Zatím žádné žádosti o rezervaci',
      emptyHint:
        'Až hosté odešlou formulář z prémiového menu, záznamy se zobrazí v této tabulce.',
      colReceived: 'Přijato',
      colVisit: 'Návštěva',
      colParty: 'Počet osob',
      colGuest: 'Host',
      colContact: 'Kontakt',
      colComment: 'Komentář',
      colStatus: 'Stav',
      status: {
        pending: 'Čeká',
        confirmed: 'Potvrzeno',
        declined: 'Odmítnuto',
        rescheduled: 'Přesunuto',
        all: 'Vše',
      },
      statusToast: 'Stav uložen. Bude odeslána e-mailová aktualizace.',
      statusUpdateFailed: 'Nepodařilo se aktualizovat stav. Zkuste to znovu.',
      rescheduleCurrentSlot: 'Aktuální návštěva',
      rescheduleHint: 'Nastavte nové datum a čas návštěvy po přesunutí.',
      rescheduleNewDate: 'Nové datum',
      rescheduleNewTime: 'Nový čas',
      rescheduleSave: 'Uložit přesun',
      rescheduleCancel: 'Zrušit',
      rescheduleValidation: 'Vyberte datum a čas pro přesun.',
    },
    analytics: {
      title: 'Analytika',
      subtitle: 'Prodeje a oblíbenost jídel',
      intro:
        'Analytika prodejů a oblíbenosti jídel s grafy a diagramy pro majitele restaurací.',
      chart: {
        title: 'Oblíbenost jídel',
        subtitle:
          'Kolik objednávek ve zvoleném období obsahovalo jídlo (zrušené objednávky vyloučeny)',
        empty: 'V tomto období zatím nejsou položky menu, nebo data ještě nedorazila.',
        xAxis: 'Počet objednávek',
        datasetLabel: 'Objednávky',
        tooltipLine: '{count} objednávek obsahujících toto jídlo',
      },
      loadError: 'Nepodařilo se načíst data. Zkuste obnovit stránku.',
      period: {
        aria: 'Období reportu',
        customAria: 'Vlastní rozsah dat',
        customPlaceholder: 'Vlastní období',
        calendarAria: 'Kalendář — vyberte rozsah dat',
        prevMonth: 'Předchozí měsíc',
        nextMonth: 'Další měsíc',
        pickEnd: 'Vyberte koncové datum',
        invalid: 'Vyberte platné období',
        day: 'Den',
        week: 'Týden',
        month: 'Měsíc',
      },
      cards: {
        ordersCaption: 'Online objednávky',
        revenue: 'Celkové tržby',
        avgCheck: 'Průměrný účet',
        avgCheckHint: 'Tržby za zvolené období dělené počtem objednávek',
        completed: 'Dokončené',
        completedHint: 'Objednávky označené jako dokončené ve zvoleném období',
        reservations: 'Nové rezervace',
        reservationsHint:
          'Žádosti vytvořené ve zvoleném období (týden začíná pondělím)',
        pendingNow: 'Čekající nyní',
        pendingHint: 'Všechny aktuálně čekající objednávky (nefiltrováno podle období)',
      },
    },
    menu: {
      subtitle: 'Spravujte jídla podniku',
      noDishes: 'Menu je prázdné',
      addFirstDish: 'Přidejte první jídlo do menu',
      total: 'Celkem jídel',
      noDescription: 'Popis nebyl přidán',
      freePlanItemsLimit: 'Dosáhli jste limitu jídel bezplatného plánu',
    },
    dish: {
      multilingualHint:
        'Ukrajinský název je povinný; popis a další jazyky jsou volitelné. Popisky kategorií sledují jazyk aktivní záložky.',
      sectionGeneral: 'Obecné údaje',
      sectionTranslations: 'Název a popis',
      translationsHint:
        'Přepněte jazykovou záložku a vyplňte text zobrazený ve veřejném menu.',
      ukNameRequired: 'Zadejte název ukrajinsky',
      optionalDescription: 'volitelné',
    },
    categories: {
      subtitle: 'Uspořádejte menu pomocí kategorií',
      category: 'Kategorie',
      noCategoriesDescription:
        'Vytvořte kategorie pro uspořádání menu. Zákazníkům to usnadní najít potřebná jídla.',
      freePlanItemsLimit: 'Dosáhli jste limitu kategorií bezplatného plánu',
      placeInUse: 'Tento název podniku je již používán',
      ukNameRequired: 'Zadejte název ukrajinsky',
      languagesTablist: 'Jazyky menu',
      languagesFilled: '{count} z {total} jazyků vyplněno',
    },
    settings: {
      menuBackgroundColor: 'Barva pozadí menu',
      menuIconColor: 'Barva ikon menu',
      logo: 'Logo podniku',
      currency: 'Měna menu',
      currencies: {
        UAH: 'Ukrajinská hřivna (₴)',
        EUR: 'Euro (€)',
        USD: 'Americký dolar ($)',
      },
      menuWelcomeText: 'Text veřejného menu',
      menuWelcomeTextHint:
        'Zobrazuje se pod názvem podniku ve veřejném menu. Ponechte prázdné pro výchozí uvítací text.',
      dataSuccessUpdated: 'Vaše údaje byly úspěšně aktualizovány',
      menuDishLayout: {
        label: 'Styl zobrazení jídel',
        hint: 'Jak hosté vidí jídla ve veřejném menu (platí po uložení a aktualizaci backendu).',
        list: {
          title: 'Seznam',
          description:
            'Kompaktní řádky: foto vlevo, název a cena — vhodné pro dlouhá menu.',
        },
        grid: {
          title: 'Mřížka karet',
          description:
            'Více jídel v řadě; důraz na fotografie a rychlý přehled kategorií.',
        },
        magazine: {
          title: 'Magazín',
          description:
            'Velké obrázky na celou šířku pro více redakční, časopisový layout.',
        },
      },
    },
    editText: 'Aktualizovat údaje',
    addText: 'Přidat jídlo',
    addCategoryText: 'Přidat kategorii',
    editCategoryText: 'Aktualizovat kategorii',
    availability: 'Dostupnost jídla',
    available: 'Dostupné',
    unavailable: 'Nedostupné',
    pending: {
      description: 'Počkejte na potvrzení platby.',
    },
  },
  footer: {
    description:
      'V Gastro nás vášnivě baví vytvářet nezapomenutelné chvíle prostřednictvím naší kulinářské řemeslné práce.',
    copyright: 'Copyright © 2026 Gastro. Všechna práva vyhrazena.',
  },
  plans: {
    free: {
      name: 'Zdarma',
      details: [
        'Přístup k základním funkcím',
        'Omezený počet uložení',
        'Pouze e-mailová podpora',
      ],
    },
    standart: {
      name: 'Standard',
      details: ['Pokročilé funkce', 'Neomezená uložení', 'Prioritní podpora'],
    },
    premium: {
      name: 'Premium',
      details: [
        'Všechny funkce bez limitů',
        'Analytika prodejů a oblíbenosti jídel s grafy a diagramy',
        'Integrace s dalšími službami',
        'Podpora 24/7',
      ],
    },
  },
  subscribe: {
    month: 'Měsíc',
  },
  header: {
    menuOpen: 'Otevřít menu',
    menuClose: 'Zavřít menu',
    sidebarNav: 'Navigace',
  },
  button: {
    add: 'Přidat',
    clickMe: 'Klikni',
    edit: 'Aktualizovat',
    signUp: 'Registrace',
    signIn: 'Přihlásit se',
    buyNow: 'Koupit nyní',
    reserveNow: 'Rezervovat nyní',
    choose: 'Vybrat',
    dashboard: 'Dashboard',
    logOut: 'Odhlásit se',
    yes: 'Ano',
    no: 'Ne',
    download: 'Stáhnout',
    copy: 'Kopírovat',
  },
  errors: {
    email: {
      email: 'Zadejte platnou e-mailovou adresu',
      emailTaken: 'Tento e-mail je již používán',
      required: 'Toto pole je povinné',
      invalidCredentials: 'E-mail nebyl nalezen',
    },
    password: {
      required: 'Toto pole je povinné',
      minLength: 'Heslo musí mít alespoň 6 znaků',
      passWrong: 'Nesprávné heslo',
      passMissMatch: 'Hesla se neshodují',
    },
    confirmPassword: {
      required: 'Toto pole je povinné',
      sameAs: 'Hesla se musí shodovat',
    },
    placeName: {
      required: 'Toto pole je povinné',
      placeTaken: 'Tento název podniku je již používán',
    },
    name: {
      required: 'Toto pole je povinné',
    },
    firstName: {
      required: 'Zadejte křestní jméno',
    },
    lastName: {
      required: 'Zadejte příjmení',
    },
    phone: {
      required: 'Zadejte telefonní číslo',
      minLength: 'Číslo je příliš krátké (min. 10 znaků)',
    },
    address: {
      required: 'Zadejte doručovací adresu',
    },
    reserve: {
      partySize: 'Zadejte počet osob od 1 do 50',
    },
  },
  toasts: {
    signIn: 'Úspěšně jste se přihlásili',
    error: 'Něco se pokazilo, zkuste to později',
    checkoutOrderSuccess: 'Objednávka byla úspěšně odeslána',
    checkoutOrderError: 'Objednávku se nepodařilo odeslat. Zkuste to znovu.',
    reserveRequestSent:
      'Žádost odeslána. Podnik vás kontaktuje po potvrzení (e-mail na uvedenou adresu — po připojení serveru).',
    reserveRequestError: 'Žádost se nepodařilo odeslat. Zkuste to znovu.',
  },
  apiTableReservation: {
    tableReservationNotAvailable:
      'Rezervace nejsou pro toto menu k dispozici (vyžadován prémiový plán).',
    tableReservationInvalidSlot: 'Vyberte jiný čas nebo datum — tento termín není volný.',
    tableReservationRateLimit: 'Příliš mnoho pokusů. Zkuste to později.',
    invalidCredentials: 'Menu nebylo nalezeno nebo není k dispozici.',
  },
  apiCategory: {
    categoryTranslationsPremiumOnly:
      'Vícejazyčné kategorie jsou dostupné pouze v prémiovém plánu.',
  },
  apiShowcaseOrder: {
    showcaseOrderingNotAvailable: 'Objednávání není pro toto menu k dispozici.',
    showcaseOrderTotalMismatch:
      'Celková částka objednávky neodpovídá košíku. Obnovte stránku a zkuste to znovu.',
    showcaseOrderDishInvalid:
      'Některé položky v košíku již nejsou dostupné. Obnovte menu a košík.',
    showcaseOrderRateLimit: 'Příliš mnoho pokusů o objednávku. Zkuste to později.',
    invalidCredentials: 'Menu nebylo nalezeno nebo není k dispozici.',
  },
  inputs: {
    email: 'E-mail',
    firstName: 'Jméno',
    lastName: 'Příjmení',
    phone: 'Telefon',
    deliveryTime: 'např. dnes 18:00–19:00',
    deliveryAddress: 'Ulice, budova, byt',
    checkoutComment: 'Speciální požadavky, vchod, kód dveří…',
    placeName: 'Název organizace',
    password: 'Heslo',
    confirmPassword: 'Potvrďte heslo',
    name: 'Název',
    description: 'Popis',
    price: 'Cena',
    uploadText:
      'Nahrajte obrázky přes výběr souborů nebo je přetáhněte do určené oblasti',
    chooseImage: 'Vybrat obrázek',
    imageTooLarge: 'Obrázek je příliš velký, vyberte obrázek pod 10 MB',
    notAnImage: 'Nejedná se o obrázek, nahrajte soubor obrázku',
    reserveDate: 'Vyberte datum',
    reserveTime: 'Čas',
    partySize: 'Počet osob',
    reserveComment: 'Speciální požadavky, děti, příležitost…',
  },
  navs: {
    home: 'Domů',
    info: 'O nás',
    plans: 'Plány a ceny',
    map: 'Kontakt',
    menu: 'Menu',
    orders: 'Moje objednávky',
    reserve: 'Rezervovat stůl',
  },
  showcase: {
    menu: 'Menu',
    menuLanguage: {
      label: 'Jazyk menu',
    },
    welcomeDescription:
      'Vyberte si jídla z našeho menu a vychutnejte si každou chuť, kterou jsme připravili',
    wishlist: {
      title: 'Uložená jídla',
      empty:
        'Zatím žádná uložená jídla. Klepněte na srdce u jídla v menu a přidejte ho sem.',
      close: 'Zavřít seznam přání',
      open: 'Seznam přání',
    },
    premium: {
      badge: 'Prémiové menu',
      description:
        'Pečlivě sestavené menu s vyladěnou prezentací a snadnou navigací — vyberte kategorii nebo projeďte stránku.',
      addToCart: 'Přidat do košíku',
      removeFromCart: 'Odebrat z košíku',
      cart: 'Košík',
      cartEmpty: 'Košík je prázdný. Vyberte jídla z menu.',
      cartTotal: 'Celkem',
      cartUnit: 'ks',
      cartQuantity: 'Množství',
      cartDecrease: 'Snížit množství',
      cartIncrease: 'Zvýšit množství',
      cartClose: 'Zavřít košík',
      goToCheckout: 'Odeslat objednávku',
      checkoutTitle: 'Pokladna',
      checkoutPlaceholder: 'Objednávkový formulář a potvrzení se zde brzy zobrazí.',
      checkoutOrderSummary: 'Vaše objednávka',
      checkoutEmptyCart: 'Košík je prázdný. Vraťte se do menu a přidejte položky.',
      checkoutFirstName: 'Jméno',
      checkoutLastName: 'Příjmení',
      checkoutPhone: 'Telefon',
      checkoutEmail: 'E-mail',
      checkoutEmailHint: 'volitelné, pro potvrzení',
      checkoutAddress: 'Doručovací adresa',
      checkoutDeliveryTime: 'Preferovaný čas doručení',
      checkoutDeliveryTimeHint: 'volitelné',
      checkoutComment: 'Poznámky k objednávce',
      checkoutCommentPlaceholder: 'Speciální požadavky, vchod, kód dveří…',
      checkoutSubmit: 'Potvrdit objednávku',
      checkoutSubmitting: 'Odesílání…',
      checkoutFormSection: 'Kontakt a doručení',
      backToMenu: 'Zpět do menu',
      reserveTitle: 'Rezervovat stůl',
      reserveSubtitle:
        'Vyplňte formulář — podnik obdrží žádost v dashboardu a může potvrdit vaši návštěvu.',
      reserveFormSection: 'Údaje rezervace',
      reserveDate: 'Datum návštěvy',
      reserveTime: 'Čas',
      reservePartySize: 'Počet osob',
      reserveEmail: 'E-mail pro potvrzení a aktualizace stavu',
      reserveComment: 'Komentář (volitelné)',
      reserveLegalHint:
        'Odesláním souhlasíte se zpracováním kontaktních údajů pro komunikaci o této rezervaci.',
      reserveSubmit: 'Odeslat žádost',
      reserveSubmitting: 'Odesílání…',
      orderHistoryTitle: 'Historie objednávek',
      orderHistoryHint:
        'Vaše dokončené objednávky z tohoto menu na tomto zařízení jsou uloženy zde.',
      orderHistoryEmpty:
        'Zatím žádné objednávky. Zadejte první objednávku — po úspěšném odeslání se zobrazí zde.',
      orderHistoryPlacedAt: 'Zadáno',
      orderHistoryId: 'ID objednávky',
      orderHistoryFromCart:
        'Zadáno z košíku (uloženo lokálně na tomto zařízení)',
    },
    noMenuAvailable: 'Menu zatím není k dispozici',
    menuComingSoon: 'Naše jídla budou brzy k dispozici',
    categoryTabsLabel: 'Kategorie menu',
    noDishesInCategory: 'V této kategorii zatím nejsou žádná jídla',
    error: {
      title: 'Chyba načítání',
      description: 'Nepodařilo se načíst data. Zkuste to později.',
    },
    noPlan: {
      title: 'Není vybrán plán',
      description: 'Vyberte plán pro zobrazení menu.',
    },
    pending: {
      title: 'Čeká se na platbu',
      description: 'Počkejte na potvrzení platby.',
    },
    notAuthorized: {
      title: 'Vyžadováno přihlášení',
      description: 'Pro zobrazení menu se přihlaste.',
    },
  },
}
