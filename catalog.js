const bouquets = [
  {
    "id": 1,
    "title": "Розы и белые хризантемы",
    "description": "Пастельно-розовые розы, белая хризантема и эвкалипт в светлой упаковке.",
    "source": "https://avatars.mds.yandex.net/get-altay/19646909/2a0000019e1cf08c1020fd0f62bb617b98fb/XXL",
    "photo": "assets/bouquet-1.jpg",
    "palette": "pastel"
  },
  {
    "id": 3,
    "title": "Красные розы и белые хризантемы",
    "description": "Красные розы и небольшие белые соцветия в молочной бумаге с красной лентой.",
    "source": "https://avatars.mds.yandex.net/get-altay/19392709/2a0000019e1cf1439791b09d9a350f35a61f/XXL",
    "photo": "assets/bouquet-3.jpg",
    "palette": "bright"
  },
  {
    "id": 2,
    "title": "Кустовые розы с эвкалиптом",
    "description": "Светло-жёлтые и персиковые бутоны среди округлых листьев эвкалипта.",
    "source": "https://avatars.mds.yandex.net/get-altay/18108291/2a0000019ba199d8ff115cd83099fc0ad4df/XXL",
    "photo": "assets/bouquet-2.jpg",
    "palette": "light"
  },
  {
    "id": 4,
    "title": "Розовые герберы",
    "description": "Герберы и белые хризантемы в сиреневой упаковке.",
    "source": "https://avatars.mds.yandex.net/get-altay/902116/2a0000018658a4c5099c8ea2c7a23afa4455/XXL",
    "photo": "assets/bouquet-4.jpg",
    "palette": "pastel"
  },
  {
    "id": 6,
    "title": "Яркий букет с розами",
    "description": "Коралловые, красные и светло-зелёные цветы с длинными лентами.",
    "source": "https://avatars.mds.yandex.net/get-altay/19613367/2a0000019ba24158fe83aae2355ac647e4eb/XXL",
    "photo": "assets/bouquet-6.jpg",
    "palette": "bright"
  },
  {
    "id": 5,
    "title": "Розы в розовых оттенках",
    "description": "Округлый букет с розовыми розами в белой бумаге.",
    "source": "https://avatars.mds.yandex.net/get-altay/18806283/2a0000019e1cf0daf2b62c9dd588f694f139/XXL",
    "photo": "assets/bouquet-5.jpg",
    "palette": "pastel"
  },
  {
    "id": 7,
    "title": "Композиция в коробке",
    "description": "Белые и малиновые цветы в круглой светлой коробке.",
    "source": "https://avatars.mds.yandex.net/get-altay/1532977/2a00000185e8e0cd0d713aeec20886d38685/XXL",
    "photo": "assets/bouquet-7.jpg",
    "palette": "bright"
  },
  {
    "id": 8,
    "title": "Букет невесты",
    "description": "Белый букет с зеленью и светлой лентой.",
    "source": "https://avatars.mds.yandex.net/get-altay/214458/2a00000185ee124f56fcab7495b6994c0e60/XXL",
    "photo": "assets/bouquet-8.jpg",
    "palette": "light"
  }
];
const priceList = [
  {
    "title": "Букет с орхидеей",
    "price": "2700",
    "currency": "₽"
  },
  {
    "title": "Букет альстромерий",
    "description": "В букете 19шт \nКоличество может изменяться по Вашим пожеланиям.",
    "price": "4800",
    "currency": "₽"
  },
  {
    "title": "Букет хризантем сборный",
    "price": "7300",
    "currency": "₽"
  },
  {
    "title": "Нежный букет с розой Фрутетта",
    "description": "Нежный, сборный букет.",
    "price": "4100",
    "currency": "₽"
  },
  {
    "title": "Букет роз 15",
    "description": "Розы нежные 50см 15шт",
    "price": "4350",
    "currency": "₽"
  },
  {
    "title": "Красный букет + 11шт шары гелиевые",
    "description": "Яркий красный букет и шары",
    "price": "8700",
    "currency": "₽"
  },
  {
    "title": "Букет нежный с герберой",
    "description": "7 роз, 2 альстрамерии, 5 гербер, зелень,\n3 хризантемы, 4 эустомы, 5 диантус.",
    "price": "7600",
    "currency": "₽"
  },
  {
    "title": "Мини букеты",
    "price": "1200",
    "currency": "₽"
  },
  {
    "title": "Букет розы с альстромерией",
    "description": "15 роз \n12 альстромерий\nЗелень",
    "price": "8100",
    "currency": "₽"
  },
  {
    "title": "Букет яркий",
    "price": "4950",
    "currency": "₽"
  },
  {
    "title": "Букет красно-белый",
    "description": "Розы 27шт \nЭвкалипт \nУпаковка",
    "price": "8800",
    "currency": "₽"
  },
  {
    "title": "Хризантемы микс",
    "description": "Хризантема 7шт с оформлением",
    "price": "2360",
    "currency": "₽"
  },
  {
    "title": "Букет гипсофила и ромашки",
    "description": "15гипсофила \n20 танацетум \nОформление",
    "price": "8500",
    "currency": "₽"
  },
  {
    "title": "Букет нежный с эвкалиптом",
    "description": "Хризантема 8шт\nРоза 7 шт\nДиантус 9шт \nЭвкалипт + оформление",
    "price": "5770",
    "currency": "₽"
  },
  {
    "title": "Розы 51шт",
    "description": "51 Роза, эвкалипт, декор \nПо наличию уточняйте у флориста.",
    "price": "16650",
    "currency": "₽"
  },
  {
    "title": "Розы с нобилисом",
    "price": "2300",
    "currency": "₽"
  },
  {
    "title": "Композиция с красной розой",
    "description": "Яркая композиция из роз сортов Нина и Эксплорер, самые стойкие розы!",
    "price": "5500",
    "currency": "₽"
  },
  {
    "title": "Сумка в ассортименте",
    "description": "Сумочку можно наполнить абсолютно любыми цветами на ваш выбор",
    "price": "4800",
    "currency": "₽"
  },
  {
    "title": "Композиция в сумочке",
    "price": "3800",
    "currency": "₽"
  },
  {
    "title": "Нежный сборный букет",
    "price": "4700",
    "currency": "₽"
  },
  {
    "title": "Ромашка хризантема",
    "price": "5000",
    "currency": "₽"
  },
  {
    "title": "Белый сборный",
    "price": "3700",
    "currency": "₽"
  },
  {
    "title": "Коралловый букет",
    "price": "4800",
    "currency": "₽"
  },
  {
    "title": "Альстромерия с сухоцветами",
    "description": "Альстрамерия, эвкалипт, лимониум, лагурус",
    "price": "3200",
    "currency": "₽"
  },
  {
    "title": "Коробка роз сердцем",
    "description": "Цвет роз можно заменить",
    "price": "17000",
    "currency": "₽"
  }
];
