export default {
  landing: {
    uiLanguage: {
      label: 'Idioma del sitio',
    },
    priceAndPlans: 'Planes y precios',
    recommendedPlan: 'Popular',
    welcomeText: 'Bienvenido a Gastro',
    readyTemplates: 'Plantillas listas para cualquier local',
    readyTemplatesDescription:
      'Perfectas para cafeterías, restaurantes, bares o panaderías. Fáciles de configurar, rápidas de lanzar y te ayudan a lucir profesional en línea sin perder tiempo.',

    signUp: 'Registrarse',
    signIn: 'Iniciar sesión',
    notHaveAccount: '¿No tienes cuenta?',
    haveAccount: '¿Ya tienes cuenta?',
    email: 'Correo electrónico',
    enterEmail: 'Introduce el correo',
    placeName: 'Nombre del local',
    enterPlace: 'Introduce el nombre',
    password: 'Contraseña',
    enterPassword: 'Introduce la contraseña',
    confirmPassword: 'Confirmar contraseña',
    menu: 'Menú',
    name: 'Nombre',
    firstMeal: 'Primer plato',
    secondMeal: 'Segundo plato',
    addToCard: 'Añadir al carrito',
    checkout: 'Carrito',
    buy: 'Comprar',
    sum: 'Total: ${sum}',
    numbers_1: 'usuarios que ya han probado nuestro sitio',
    numbers_2: 'palabras clave',
    numbers_3: 'bases de datos geo',
    numbers_4: 'perfiles de dominio',
    openTime: 'Horario de apertura',
    bookTable: 'Reserva una mesa para comer o cenar',
    visitUs: 'Visítanos',
    comeAndTaste: 'Ven y prueba nuestra comida',
    changePlan:
      '¿Seguro que quieres elegir este plan? Los cambios se aplican de inmediato y para recuperar tu plan anterior tendrás que comprarlo de nuevo.',
    comeToUs:
      'Visítanos y sumérgete en un ambiente encantador, sabores inolvidables y un servicio impecable.',
    times: [
      { day: 'Entre semana', time: '09.00 - 22.00' },
      {
        day: 'Sábado',
        time: '09.00 - 20.00',
      },
      {
        day: 'Domingo',
        time: '10.00 - 19.00',
      },
    ],
    soups: {
      1: {
        name: 'Sopa roja',
        description:
          'Una delicada sopa de tomates maduros, sazonada con especias aromáticas y un chorrito de aceite de oliva. Rica en sabor y de color vivo, combina perfectamente con picatostes aromáticos o hierbas frescas.',
        ingredients: ['tomates maduros', 'ajo', 'cebolla', 'albahaca'],
        price: '$8.20',
      },
      2: {
        id: 2,
        name: 'Sopa de calabaza',
        description:
          'Cremosa sopa de calabaza con nata y nuez moscada. Tiene un suave sabor dulce y un color naranja intenso.',
        ingredients: ['calabaza', 'nata', 'nuez moscada'],
        price: '$7.50',
      },
      3: {
        id: 3,
        name: 'Sopa de setas',
        description:
          'Una fragante sopa de setas silvestres, enriquecida con nata y especias. Perfecta para las tardes frescas.',
        ingredients: ['setas', 'cebolla', 'nata'],
        price: '$9.00',
      },
      4: {
        id: 4,
        name: 'Sopa de verduras',
        description:
          'Una sopa ligera de verduras frescas, sazonada con hierbas y aceite de oliva. Ideal para una alimentación saludable.',
        ingredients: ['zanahoria', 'brócoli', 'apio'],
        price: '$6.80',
      },
    },

    infoBlock: {
      1: {
        title: 'Sitio web para pedidos a domicilio y para llevar',
        description:
          'Lanza tu propio sistema de entrega y recogida para tu restaurante o cafetería. El 90 % de los clientes recuperan la suscripción anual a Gastro en la primera semana de reparto.',
      },
      2: {
        title: 'Sitio web para pedidos en línea',
        description:
          'Acepta pedidos directamente desde tu sitio web. Esto reduce costes de intermediarios y aumenta los beneficios del local.',
      },
      3: {
        title: 'Sitio web para menús de restaurante',
        description:
          'Crea un menú interactivo con fotos y descripciones de platos. Los estudios muestran que las imágenes llamativas aumentan los pedidos un 30 %.',
      },
    },
  },
  dashboard: {
    sidebar: {
      currentPlan: 'Plan actual',
      changePlan: 'Cambiar plan',
      collapsePlans: 'Contraer',
      current: 'Actual',
      freePrice: 'Gratis',
    },
    pro: {
      navs: {},
    },
    standart: {
      qrCode: {
        description: 'Código QR de tu local',
        instruction:
          'Imprime o muestra el código QR a los clientes para que puedan ver tu menú rápidamente',
        menuLink: 'Enlace al menú',
        howToUse: 'Cómo usar',
        step1: 'Imprime el código QR o muéstralo en una pantalla',
        step2: 'Los clientes escanean el código QR con el móvil',
        step3: 'Se abrirá automáticamente la página de tu menú',
        openMenu: 'Abrir menú',
        copyError: 'No se pudo copiar el enlace',
        downloadError: 'No se pudo descargar el código QR',
        generationError: 'No se pudo generar el código QR',
        noPlaceName: 'No se ha indicado el nombre del local',
      },
      navs: {
        home: 'Inicio',
        menu: 'Menú',
        orders: 'Pedidos',
        reservations: 'Reservas de mesa',
        analytics: 'Analítica',
        categories: 'Categorías',
        settings: 'Ajustes',
        qrCode: 'Código QR',
      },
    },
    free: {
      navs: {
        home: 'Inicio',
        menu: 'Menú',
        categories: 'Categorías',
        qrCode: 'Código QR',
        settings: 'Ajustes',
      },
    },
    home: {
      welcome: '¡Bienvenido a { placeName }!',
      subtitle: 'Gestiona tu menú y sigue las estadísticas de tu local',
      totalDishes: 'Total de platos',
      totalCategories: 'Total de categorías',
      available: 'disponible',
      unavailable: 'no disponible',
      organized: 'Organizado',
      quickAction: 'Acción rápida',
      manageMenu: 'Gestionar menú',
      addEditDishes: 'Añadir y editar platos',
      link: 'Enlace',
      quickLinks: 'Enlaces rápidos',
      pendingStatusHint: 'Estado pendiente',
      links: {
        menu: {
          title: 'Menú',
          description: 'Ver y editar platos',
        },
        categories: {
          title: 'Categorías',
          description: 'Organiza tu menú',
        },
        settings: {
          title: 'Ajustes',
          description: 'Cambiar datos del local',
        },
        addDish: {
          title: 'Añadir plato',
          description: 'Añade un plato nuevo rápidamente',
        },
        orders: {
          title: 'Pedidos',
          description: 'Pedidos en línea desde tu menú premium',
        },
        reservations: {
          title: 'Reservas de mesa',
          description: 'Solicitudes del formulario de reserva en el menú',
        },
        analytics: {
          title: 'Analítica',
          description:
            'Ventas y popularidad de platos: gráficos y diagramas para propietarios de restaurantes (Premium)',
        },
      },
      tip: {
        title: 'Consejo del día',
        items: [
          'Mantén el menú actualizado y añade fotos de los platos para atraer más clientes. ¡Las imágenes de calidad pueden aumentar los pedidos un 30 %!',
          'Coloca el código QR del menú en las mesas y cerca de la entrada: los clientes ven los platos más rápido y pueden pedir sin esperar al camarero.',
          'Añade descripciones breves con ingredientes: ayuda a elegir y reduce preguntas al personal.',
          'Actualiza la disponibilidad con prontitud: marca los platos no disponibles para que no pidan lo que no puedes servir.',
          'Agrupa el menú en categorías claras: una estructura lógica facilita la elección.',
        ],
      },
    },
    tableHead: {
      name: 'Nombre',
      image: 'Imagen',
      price: 'Precio',
      category: 'Categoría',
      description: 'Descripción',
      settings: 'Ajustes',
      deleteMeal: '¿Seguro que quieres eliminar este plato?',
      table: 'Mesa',
      addMeal: 'Añadir plato',
      categories: 'Categorías',
      addCategory: 'Añadir categoría',
      deleteCategory: '¿Seguro que quieres eliminar esta categoría?',
      noCategories: 'Aún no hay categorías',
    },
    orders: {
      title: 'Pedidos del menú',
      subtitle: 'Pedidos en línea realizados por clientes a través del menú premium',
      loadError: 'No se pudieron cargar los pedidos. Inténtalo más tarde.',
      emptyTitle: 'Aún no hay pedidos',
      emptyHint: 'Cuando los clientes hagan pedidos a través de tu menú, aparecerán aquí.',
      filterStatus: 'Estado',
      colDate: 'Fecha',
      colStatus: 'Estado',
      colCustomer: 'Cliente',
      colContact: 'Contacto',
      colAddress: 'Dirección / hora',
      colItems: 'Artículos',
      colTotal: 'Total',
      status: {
        pending: 'Pendiente',
        confirmed: 'Confirmado',
        completed: 'Completado',
        cancelled: 'Cancelado',
        all: 'Todos',
      },
      modalTitle: 'Detalles del pedido',
      changeStatus: 'Nuevo estado',
      modalCancel: 'Cancelar',
      modalSave: 'Guardar',
      modalSaving: 'Guardando…',
      statusUpdated: 'Estado del pedido actualizado.',
      statusUpdateFailed: 'No se pudo actualizar el estado del pedido. Inténtalo de nuevo.',
    },
    reservations: {
      title: 'Solicitudes de reserva',
      subtitle:
        'Solicitudes del formulario público del menú premium. Cambia el estado: cuando el correo esté conectado, el cliente recibirá una notificación.',
      loadError: 'No se pudieron cargar las reservas. Inténtalo más tarde.',
      emptyTitle: 'Aún no hay solicitudes de reserva',
      emptyHint:
        'Cuando los clientes envíen el formulario desde el menú premium, las entradas aparecerán en esta tabla.',
      colReceived: 'Recibido',
      colVisit: 'Visita',
      colParty: 'Comensales',
      colGuest: 'Cliente',
      colContact: 'Contacto',
      colComment: 'Comentario',
      colStatus: 'Estado',
      status: {
        pending: 'Pendiente',
        confirmed: 'Confirmada',
        declined: 'Rechazada',
        rescheduled: 'Reprogramada',
        all: 'Todas',
      },
      statusToast: 'Estado guardado. Se enviará una actualización por correo.',
      statusUpdateFailed: 'No se pudo actualizar el estado. Inténtalo de nuevo.',
      rescheduleCurrentSlot: 'Visita actual',
      rescheduleHint: 'Indica la nueva fecha y hora de la visita tras reprogramar.',
      rescheduleNewDate: 'Nueva fecha',
      rescheduleNewTime: 'Nueva hora',
      rescheduleSave: 'Guardar reprogramación',
      rescheduleCancel: 'Cancelar',
      rescheduleValidation: 'Elige una fecha y hora para la reprogramación.',
    },
    analytics: {
      title: 'Analítica',
      subtitle: 'Ventas y popularidad de platos',
      intro:
        'Analítica de ventas y popularidad de platos con gráficos y diagramas para propietarios de restaurantes.',
      chart: {
        title: 'Popularidad de platos',
        subtitle:
          'Cuántos pedidos del periodo seleccionado incluyeron el plato (pedidos cancelados excluidos)',
        empty: 'Aún no hay líneas de menú en este periodo o no han llegado los datos.',
        xAxis: 'Número de pedidos',
        datasetLabel: 'Pedidos',
        tooltipLine: '{count} pedidos que incluyen este plato',
      },
      loadError: 'No se pudieron cargar los datos. Prueba a actualizar la página.',
      period: {
        aria: 'Periodo del informe',
        customAria: 'Rango de fechas personalizado',
        customPlaceholder: 'Periodo personalizado',
        calendarAria: 'Calendario — seleccionar rango de fechas',
        prevMonth: 'Mes anterior',
        nextMonth: 'Mes siguiente',
        pickEnd: 'Elige la fecha de fin',
        invalid: 'Selecciona un periodo válido',
        day: 'Día',
        week: 'Semana',
        month: 'Mes',
      },
      cards: {
        ordersCaption: 'Pedidos en línea',
        revenue: 'Total de ventas',
        avgCheck: 'Ticket medio',
        avgCheckHint: 'Ingresos del periodo seleccionado divididos por número de pedidos',
        completed: 'Completados',
        completedHint: 'Pedidos marcados como completados en el periodo seleccionado',
        reservations: 'Nuevas reservas',
        reservationsHint:
          'Solicitudes creadas en el periodo seleccionado (la semana empieza el lunes)',
        pendingNow: 'Pendientes ahora',
        pendingHint: 'Todos los pedidos pendientes actualmente (sin filtrar por periodo)',
      },
    },
    menu: {
      subtitle: 'Gestiona los platos de tu local',
      noDishes: 'El menú está vacío',
      addFirstDish: 'Añade el primer plato a tu menú',
      total: 'Total de platos',
      noDescription: 'Sin descripción',
      freePlanItemsLimit: 'Has alcanzado el límite de platos del plan gratuito',
    },
    dish: {
      multilingualHint:
        'El nombre en ucraniano es obligatorio; la descripción y otros idiomas son opcionales. Las etiquetas de categoría siguen el idioma de la pestaña activa.',
      sectionGeneral: 'Datos generales',
      sectionTranslations: 'Nombre y descripción',
      translationsHint:
        'Cambia la pestaña de idioma y rellena el texto que se muestra en el menú público.',
      ukNameRequired: 'Introduce el nombre en ucraniano',
      optionalDescription: 'opcional',
    },
    categories: {
      subtitle: 'Organiza tu menú con categorías',
      category: 'Categoría',
      noCategoriesDescription:
        'Crea categorías para organizar tu menú. Así los clientes encuentran los platos que buscan más fácilmente.',
      freePlanItemsLimit: 'Has alcanzado el límite de categorías del plan gratuito',
      placeInUse: 'Este nombre de local ya está en uso',
      ukNameRequired: 'Introduce el nombre en ucraniano',
      languagesTablist: 'Idiomas del menú',
      languagesFilled: '{count} de {total} idiomas completados',
    },
    settings: {
      menuBackgroundColor: 'Color de fondo del menú',
      menuIconColor: 'Color de iconos del menú',
      logo: 'Logotipo del local',
      currency: 'Moneda del menú',
      currencies: {
        UAH: 'Grivna ucraniana (₴)',
        EUR: 'Euro (€)',
        USD: 'Dólar estadounidense ($)',
      },
      menuWelcomeText: 'Texto del menú público',
      menuWelcomeTextHint:
        'Se muestra bajo el nombre de tu local en el menú público. Déjalo vacío para usar el texto de bienvenida predeterminado.',
      dataSuccessUpdated: 'Tus datos se actualizaron correctamente',
      menuDishLayout: {
        label: 'Estilo de visualización de platos',
        hint: 'Cómo ven los clientes los platos en el menú público (se aplica al guardar y actualizar el backend).',
        list: {
          title: 'Lista',
          description:
            'Filas compactas: foto a la izquierda, nombre y precio — cómodo para menús largos.',
        },
        grid: {
          title: 'Cuadrícula de tarjetas',
          description:
            'Varios platos por fila; énfasis en fotos y vista rápida de categorías.',
        },
        magazine: {
          title: 'Revista',
          description:
            'Imágenes grandes a ancho completo para un diseño más editorial, tipo revista.',
        },
      },
    },
    editText: 'Actualizar datos',
    addText: 'Añadir plato',
    addCategoryText: 'Añadir categoría',
    editCategoryText: 'Actualizar categoría',
    availability: 'Disponibilidad del plato',
    available: 'Disponible',
    unavailable: 'No disponible',
    pending: {
      description: 'Espera hasta que se confirme el pago.',
    },
  },
  footer: {
    description:
      'En Gastro nos apasiona crear momentos inolvidables a través de nuestra cocina.',
    copyright: 'Copyright © 2026 Gastro. Todos los derechos reservados.',
  },
  plans: {
    free: {
      name: 'Gratis',
      details: [
        'Acceso a funciones básicas',
        'Número limitado de guardados',
        'Solo soporte por correo',
      ],
    },
    standart: {
      name: 'Estándar',
      details: ['Funciones avanzadas', 'Guardados ilimitados', 'Soporte prioritario'],
    },
    premium: {
      name: 'Premium',
      details: [
        'Todas las funciones sin límites',
        'Analítica de ventas y popularidad de platos con gráficos y diagramas',
        'Integración con otros servicios',
        'Soporte 24/7',
      ],
    },
  },
  subscribe: {
    month: 'Mes',
  },
  header: {
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    sidebarNav: 'Navegación',
  },
  button: {
    add: 'Añadir',
    clickMe: 'Haz clic',
    edit: 'Actualizar',
    signUp: 'Registrarse',
    signIn: 'Iniciar sesión',
    buyNow: 'Comprar ahora',
    reserveNow: 'Reservar ahora',
    choose: 'Elegir',
    dashboard: 'Panel',
    logOut: 'Cerrar sesión',
    yes: 'Sí',
    no: 'No',
    download: 'Descargar',
    copy: 'Copiar',
  },
  errors: {
    email: {
      email: 'Introduce una dirección de correo válida',
      emailTaken: 'Este correo ya está en uso',
      required: 'Este campo es obligatorio',
      invalidCredentials: 'Correo no encontrado',
    },
    password: {
      required: 'Este campo es obligatorio',
      minLength: 'La contraseña debe tener al menos 6 caracteres',
      passWrong: 'Contraseña incorrecta',
      passMissMatch: 'Las contraseñas no coinciden',
    },
    confirmPassword: {
      required: 'Este campo es obligatorio',
      sameAs: 'Las contraseñas deben coincidir',
    },
    placeName: {
      required: 'Este campo es obligatorio',
      placeTaken: 'Este nombre de local ya está en uso',
    },
    name: {
      required: 'Este campo es obligatorio',
    },
    firstName: {
      required: 'Introduce tu nombre',
    },
    lastName: {
      required: 'Introduce tus apellidos',
    },
    phone: {
      required: 'Introduce tu número de teléfono',
      minLength: 'Número demasiado corto (mín. 10 caracteres)',
    },
    address: {
      required: 'Introduce la dirección de entrega',
    },
    reserve: {
      partySize: 'Introduce el número de comensales del 1 al 50',
    },
  },
  toasts: {
    signIn: 'Has iniciado sesión correctamente',
    error: 'Algo salió mal, inténtalo más tarde',
    checkoutOrderSuccess: 'Pedido realizado correctamente',
    checkoutOrderError: 'No se pudo realizar el pedido. Inténtalo de nuevo.',
    reserveRequestSent:
      'Solicitud enviada. El local te contactará tras la confirmación (correo en la dirección indicada — cuando el servidor esté conectado).',
    reserveRequestError: 'No se pudo enviar la solicitud. Inténtalo de nuevo.',
  },
  apiTableReservation: {
    tableReservationNotAvailable:
      'Las reservas no están disponibles para este menú (se requiere plan premium).',
    tableReservationInvalidSlot: 'Elige otra hora o fecha — esta franja no está disponible.',
    tableReservationRateLimit: 'Demasiados intentos. Inténtalo más tarde.',
    invalidCredentials: 'Menú no encontrado o no disponible.',
  },
  apiCategory: {
    categoryTranslationsPremiumOnly:
      'Las categorías multilingües solo están disponibles en el plan premium.',
  },
  apiShowcaseOrder: {
    showcaseOrderingNotAvailable: 'Los pedidos no están disponibles para este menú.',
    showcaseOrderTotalMismatch:
      'El total del pedido no coincide con tu carrito. Actualiza la página e inténtalo de nuevo.',
    showcaseOrderDishInvalid:
      'Algunos artículos de tu carrito ya no están disponibles. Actualiza el menú y el carrito.',
    showcaseOrderRateLimit: 'Demasiados intentos de pedido. Inténtalo más tarde.',
    invalidCredentials: 'Menú no encontrado o no disponible.',
  },
  inputs: {
    email: 'Correo electrónico',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    phone: 'Teléfono',
    deliveryTime: 'p. ej. hoy 18:00–19:00',
    deliveryAddress: 'Calle, edificio, piso',
    checkoutComment: 'Peticiones especiales, portal, código de puerta…',
    placeName: 'Nombre de la organización',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    name: 'Nombre',
    description: 'Descripción',
    price: 'Precio',
    uploadText:
      'Sube imágenes con el selector de archivos o arrástralas al área designada',
    chooseImage: 'Elegir imagen',
    imageTooLarge: 'La imagen es demasiado grande, elige una de menos de 10 MB',
    notAnImage: 'No es una imagen, sube un archivo de imagen',
    reserveDate: 'Elige una fecha',
    reserveTime: 'Hora',
    partySize: 'Número de comensales',
    reserveComment: 'Peticiones especiales, niños, ocasión…',
  },
  navs: {
    home: 'Inicio',
    info: 'Sobre nosotros',
    plans: 'Planes y precios',
    map: 'Contacto',
    menu: 'Menú',
    orders: 'Mis pedidos',
    reserve: 'Reservar mesa',
  },
  showcase: {
    menu: 'Menú',
    menuLanguage: {
      label: 'Idioma del menú',
    },
    welcomeDescription:
      'Elige platos de nuestro menú y disfruta de cada sabor que hemos preparado',
    wishlist: {
      title: 'Platos guardados',
      empty:
        'Aún no hay platos guardados. Toca el corazón en un plato del menú para añadirlo aquí.',
      close: 'Cerrar lista de deseos',
      open: 'Lista de deseos',
    },
    premium: {
      badge: 'Menú premium',
      description:
        'Un menú seleccionado con presentación cuidada y navegación sencilla — elige una categoría o desplázate por la página.',
      addToCart: 'Añadir al carrito',
      removeFromCart: 'Quitar del carrito',
      cart: 'Carrito',
      cartEmpty: 'Tu carrito está vacío. Elige platos del menú.',
      cartTotal: 'Total',
      cartUnit: 'ud.',
      cartQuantity: 'Cantidad',
      cartDecrease: 'Reducir cantidad',
      cartIncrease: 'Aumentar cantidad',
      cartClose: 'Cerrar carrito',
      goToCheckout: 'Realizar pedido',
      checkoutTitle: 'Finalizar compra',
      checkoutPlaceholder: 'El formulario de pedido y la confirmación aparecerán aquí pronto.',
      checkoutOrderSummary: 'Tu pedido',
      checkoutEmptyCart: 'Tu carrito está vacío. Vuelve al menú y añade artículos.',
      checkoutFirstName: 'Nombre',
      checkoutLastName: 'Apellidos',
      checkoutPhone: 'Teléfono',
      checkoutEmail: 'Correo electrónico',
      checkoutEmailHint: 'opcional, para confirmación',
      checkoutAddress: 'Dirección de entrega',
      checkoutDeliveryTime: 'Hora de entrega preferida',
      checkoutDeliveryTimeHint: 'opcional',
      checkoutComment: 'Notas del pedido',
      checkoutCommentPlaceholder: 'Peticiones especiales, portal, código de puerta…',
      checkoutSubmit: 'Confirmar pedido',
      checkoutSubmitting: 'Enviando…',
      checkoutFormSection: 'Contacto y entrega',
      backToMenu: 'Volver al menú',
      reserveTitle: 'Reservar mesa',
      reserveSubtitle:
        'Rellena el formulario — el local recibe la solicitud en el panel y puede confirmar tu visita.',
      reserveFormSection: 'Datos de la reserva',
      reserveDate: 'Fecha de visita',
      reserveTime: 'Hora',
      reservePartySize: 'Número de comensales',
      reserveEmail: 'Correo para confirmación y actualizaciones de estado',
      reserveComment: 'Comentario (opcional)',
      reserveLegalHint:
        'Al enviar, aceptas el tratamiento de datos de contacto para comunicarte sobre esta reserva.',
      reserveSubmit: 'Enviar solicitud',
      reserveSubmitting: 'Enviando…',
      orderHistoryTitle: 'Historial de pedidos',
      orderHistoryHint:
        'Tus pedidos completados de este menú en este dispositivo se guardan aquí.',
      orderHistoryEmpty:
        'Aún no hay pedidos. Haz tu primer pedido — aparecerá aquí tras enviarlo correctamente.',
      orderHistoryPlacedAt: 'Realizado',
      orderHistoryId: 'ID del pedido',
      orderHistoryFromCart:
        'Realizado desde el carrito (guardado localmente en este dispositivo)',
    },
    noMenuAvailable: 'El menú aún no está disponible',
    menuComingSoon: 'Nuestros platos estarán disponibles pronto',
    categoryTabsLabel: 'Categorías del menú',
    noDishesInCategory: 'Aún no hay platos en esta categoría',
    error: {
      title: 'Error de carga',
      description: 'No se pudieron cargar los datos. Inténtalo más tarde.',
    },
    noPlan: {
      title: 'Ningún plan seleccionado',
      description: 'Elige un plan para mostrar el menú.',
    },
    pending: {
      title: 'Esperando pago',
      description: 'Espera hasta que se confirme el pago.',
    },
    notAuthorized: {
      title: 'Inicio de sesión requerido',
      description: 'Inicia sesión para ver el menú.',
    },
  },
}
