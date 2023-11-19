import { getPizzaSize } from '@/api/pizzaSize'
import styles from './index.module.scss'
import Pizza from '@/components/pizza/pizza'
import { getCombo } from '@/api/combo'
import Combo from '@/components/combo/combo'
import { getJuices, getSodas } from '@/api/drink'
import Drink from '@/components/drink/drink'

export async function getStaticProps() {
  const pizzas: object[] = await getPizzaSize()
  const combos: object[] = await getCombo()
  const sodas: object[] = await getSodas()
  const juices: object[] = await getJuices()

  return {
    props: {
      pizzas,
      combos,
      sodas,
      juices,
    },
  }
}

export default function Home({ pizzas, combos, sodas, juices }: any) {
  return (
    <main className={styles.container}>
      <Combo combos={combos} />
      <Pizza pizzas={pizzas} />
      <Drink sodas={sodas} juices={juices} />
    </main>
  )
}
