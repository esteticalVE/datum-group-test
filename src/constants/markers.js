import { church, library, park, soccer, pool } from '../assets'

export const markers = [
  {
    name: 'Church',
    coordinates: [39.7111, 47.23931],
    title: 'Храм Татианы при ДГТУ',
    note: 'Чистый светлый храм',
    icon: church,
  },
  {
    name: 'Library',
    coordinates: [39.71218, 47.23854],
    title: 'Библиотека при ДГТУ',
    note: 'Научно-техническая библиотека',
    icon: library,
  },
  {
    name: 'Park',
    coordinates: [39.7119, 47.24093],
    title: 'Студенческий парк',
    note:
      'Отличный парк для занятий спортом, неспешных прогулок с семьёй и друзьями',
    icon: park,
  },
  {
    name: 'Soccer',
    coordinates: [39.71018, 47.23881],
    title: 'Футбольное поле',
    note: 'Мини-футбольное поле с искусственным газоном.',
    icon: soccer,
  },
  {
    name: 'Pool',
    coordinates: [39.71091, 47.23881],
    title: 'Общественный плавательный бассейн',
    note: 'Хороший и уютный бассейн, длина дорожки 25 метров.',
    icon: pool,
  },
]
