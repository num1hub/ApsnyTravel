import { Tour, TourRegion, TourType, TourDifficulty, Review } from './types';

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    tourId: '1',
    author: 'Марина К.',
    rating: 5,
    date: '2024-02-10',
    comment:
      'Поездка на Рицу превзошла ожидания! Водитель внимательный, гид делился историями. Обязательно поедем снова летом.',
  },
  {
    id: 'r2',
    tourId: '1',
    author: 'Илья П.',
    rating: 4,
    date: '2024-03-02',
    comment: 'Красивейшие виды, но дорога длинная. Зато остановки у Голубого озера и Юпшарского каньона того стоят.',
  },
  {
    id: 'r3',
    tourId: '2',
    author: 'Светлана Р.',
    rating: 5,
    date: '2024-01-18',
    comment:
      'Гагра шикарна зимой, мало людей и мягкий климат. Понравился рассказ про историю Пицунды и органный концерт.',
  },
  {
    id: 'r4',
    tourId: '3',
    author: 'Дмитрий Л.',
    rating: 5,
    date: '2024-04-22',
    comment: 'Адреналин зашкаливал! Команда следила за безопасностью, а виды с моста просто космос.',
  },
];

export const TOURS: Tour[] = [
  {
    id: '1',
    slug: 'lake-ritsa',
    title: 'Озеро Рица — жемчужина Абхазии',
    short_desc: 'Легендарное высокогорное озеро в окружении вековых лесов. Голубое озеро, водопады и Юпшарский каньон.',
    description_md: `
      ## Чего ожидать
      Это не просто поездка к озеру — это путешествие через самые живописные места Абхазии. Вы увидите бирюзовую воду Голубого озера, «Каменный мешок» Юпшарского каньона и само озеро Рица на высоте 950 метров.

      ## Программа
      * 08:00 — Выезд из Адлера или Сочи.
      * 10:00 — Водопад «Девичьи слёзы».
      * 10:30 — Голубое озеро.
      * 11:30 — Юпшарский каньон.
      * 12:30 — Озеро Рица (2 часа свободного времени).
      * 15:30 — Обратный путь с заездом на рынок (мёд, сыр).
      * 18:00 — Возвращение.

      ## Важно знать
      Для въезда в Абхазию нужен российский паспорт. Детям — свидетельство о рождении.
    `,
    region: TourRegion.ABKHAZIA,
    type: TourType.TOUR,
    difficulty: TourDifficulty.EASY,
    duration_hours: 10,
    price_from: 4500,
    currency: 'RUB',
    cover_image: 'https://picsum.photos/800/600?random=1',
    gallery_images: ['https://picsum.photos/800/600?random=11', 'https://picsum.photos/800/600?random=12', 'https://picsum.photos/800/600?random=13'],
    tags: ['Природа', 'Горы', 'Семейный', 'Озёра'],
    is_active: true,
  },
  {
    "id": "2",
    "slug": "gagra-pitsunda",
    "title": "Гагра и Пицунда — два лица побережья",
    "short_desc": "Контраст эпох: элегантная Гагра и древняя Пицунда с реликтовыми соснами и чистейшим морем.",
    "description_md": `
      ## Чего ожидать
      Маршрут для тех, кто хочет понять историю Абхазии. Гагра принца Ольденбургского и древний храм Пицунды X века.

      ## Программа
      * 08:30 — Выезд.
      * 10:30 — Старая Гагра: Колоннада, ресторан Гагрипш.
      * 13:00 — Пицундский храм и орган.
      * 14:30 — Реликтовая сосновая роща и пляж.
      * 18:00 — Возвращение.
    `,
    "region": TourRegion.ABKHAZIA,
    "type": TourType.TOUR,
    "difficulty": TourDifficulty.EASY,
    "duration_hours": 9,
    "price_from": 4000,
    "currency": "RUB",
    "cover_image": "https://picsum.photos/800/600?random=2",
    "gallery_images": ["https://picsum.photos/800/600?random=21", "https://picsum.photos/800/600?random=22"],
    "tags": ["История", "Море", "Архитектура"],
    "is_active": true
  },
  {
    "id": "3",
    "slug": "sochi-skypark",
    "title": "SkyPark Сочи: адреналин над ущельем",
    "short_desc": "Самый длинный подвесной мост в мире, банджи-джампинг и качели над пропастью для смелых.",
    "description_md": `
      ## Чего ожидать
      Испытание высотой. Прогулка по мосту Скайбридж на высоте 207 метров над рекой Мзымта.

      ## Программа
      * 10:00 — Выезд.
      * 11:00 — Проход по мосту Скайбридж.
      * 12:00 — Свободное время для аттракционов (банджи, качели).
      * 16:00 — Возвращение.
    `,
    "region": TourRegion.SOCHI,
    "type": TourType.TOUR,
    "difficulty": TourDifficulty.MEDIUM,
    "duration_hours": 6,
    "price_from": 3500,
    "currency": "RUB",
    "cover_image": "https://picsum.photos/800/600?random=3",
    "gallery_images": ["https://picsum.photos/800/600?random=31", "https://picsum.photos/800/600?random=32"],
    "tags": ["Экстрим", "Приключение", "Мост"],
    "is_active": true
  },
  {
    "id": "4",
    "slug": "rosa-khutor-panorama",
    "title": "Роза Хутор — на вершину Кавказа",
    "short_desc": "Подъём на высоту 2320 метров. Заснеженные вершины, альпийские луга и лучшие панорамы.",
    "description_md": `
      ## Чего ожидать
      Три очереди канатной дороги поднимут вас от уровня моря к вершинам. Идеально для семей.

      ## Программа
      * 09:00 — Выезд.
      * 10:30 — Подъем на Роза Пик (2320 м).
      * 13:00 — Обед в Олимпийской деревне.
      * 16:00 — Прогулка по набережной Мзымты.
      * 18:00 — Возвращение.
    `,
    "region": TourRegion.KRASNAYA_POLYANA,
    "type": TourType.TOUR,
    "difficulty": TourDifficulty.EASY,
    "duration_hours": 8,
    "price_from": 4500,
    "currency": "RUB",
    "cover_image": "https://picsum.photos/800/600?random=4",
    "gallery_images": ["https://picsum.photos/800/600?random=41"],
    "tags": ["Горы", "Канатная дорога", "Панорамы"],
    "is_active": true
  },
  {
    "id": "5",
    "slug": "olympic-park-evening",
    "title": "Олимпийский парк: шоу фонтанов",
    "short_desc": "Вечерняя магия Сочи: поющие фонтаны, чаша олимпийского огня и футуристические арены.",
    "description_md": `
      ## Чего ожидать
      Грандиозное свето-музыкальное шоу фонтанов. Струи воды высотой до 70 метров танцуют под музыку.

      ## Программа
      * 18:00 — Выезд.
      * 18:30 — Прогулка по объектам Олимпиады-2014.
      * 20:00 — Занимаем места у фонтана.
      * 21:00 — Шоу фонтанов.
      * 22:15 — Возвращение.
    `,
    "region": TourRegion.OLYMPIC_PARK,
    "type": TourType.EXCURSION,
    "difficulty": TourDifficulty.EASY,
    "duration_hours": 4,
    "price_from": 2000,
    "currency": "RUB",
    "cover_image": "https://picsum.photos/800/600?random=5",
    "gallery_images": ["https://picsum.photos/800/600?random=51"],
    "tags": ["Вечерний", "Шоу", "Семейный"],
    "is_active": true
  },
  {
    "id": "6",
    "slug": "33-waterfalls",
    "title": "33 водопада — сокровище Лазаревского",
    "short_desc": "Каскад водопадов в самшитовом лесу. Поездка на внедорожниках и дегустация мёда.",
    "description_md": `
      ## Чего ожидать
      Приключение на грузовиках ГАЗ-66 по руслу реки и прогулка по деревянным мостикам вдоль каскада водопадов.

      ## Программа
      * 09:00 — Выезд.
      * 10:30 — Пересадка на вездеходы.
      * 11:00 — Прогулка к водопадам.
      * 13:30 — Обед и чайные плантации.
      * 17:00 — Возвращение.
    `,
    "region": TourRegion.SOCHI,
    "type": TourType.TOUR,
    "difficulty": TourDifficulty.EASY,
    "duration_hours": 7,
    "price_from": 3500,
    "currency": "RUB",
    "cover_image": "https://picsum.photos/800/600?random=6",
    "gallery_images": ["https://picsum.photos/800/600?random=61"],
    "tags": ["Природа", "Водопады", "Джиппинг"],
    "is_active": true
  }
];

export const REGIONS_LABELS: Record<TourRegion, string> = {
  [TourRegion.ABKHAZIA]: 'Абхазия',
  [TourRegion.SOCHI]: 'Сочи',
  [TourRegion.KRASNAYA_POLYANA]: 'Красная Поляна',
  [TourRegion.OLYMPIC_PARK]: 'Олимпийский парк',
};

export const TYPES_LABELS: Record<TourType, string> = {
  [TourType.TOUR]: 'Тур',
  [TourType.EXCURSION]: 'Экскурсия',
};