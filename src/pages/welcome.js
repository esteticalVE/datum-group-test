import React from 'react'
import MainLayout from '../layouts'
import { Link } from 'react-router-dom'
import Paragraph from '../components/paragraph'

export default function WelcomePage() {
  return (
    <>
      <MainLayout>
        <div className='container pt-4'>
          <h1 className='pt-4'>
            Добро пожаловать
            <span className='text-primary'> в парк ДГТУ!</span>
          </h1>
          <main>
            <section className='my-4'>
              <Paragraph>
                Парк был высажен учащейся молодежью Ростова
                в&nbsp;1910&nbsp;году. В&nbsp;предвоенные годы
                и&nbsp;до&nbsp;1947 года парк назывался &laquo;Андреевская
                роща&raquo;. Этот парк в&nbsp;годы перед Великой Отечественной
                войной был любимым местом отдыха ростовчан. Главный вход
                в&nbsp;него был расположен со&nbsp;стороны Ворошиловского
                проспекта, там, где сейчас находится вход в&nbsp;главный корпус
                ДГТУ. Парк переименовывался несколько раз и&nbsp;в&nbsp;2008
                году получил имя, которое он&nbsp;носит и&nbsp;в&nbsp;настоящее
                время&nbsp;&mdash; парк ДГТУ имени Леонида Васильевича
                Красниченко.
              </Paragraph>
              <Paragraph>
                В&nbsp;центре парка установлен памятник преподавателям,
                сотрудникам и&nbsp;студентам РМИ, защитившим Родину в&nbsp;годы
                ВОВ. Напротив памятника стоит храм святой великомученицы
                Татьяны&nbsp;&mdash; покровительницы студентов.
                На&nbsp;территории парка также расположены спортивные площадки,
                футбольное поле, бассейн.
              </Paragraph>
            </section>
          </main>
          <Link to='/map'>
            <button type='button' className='btn btn-primary btn-lg my-4'>
              Исследовать
            </button>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
