import { getPizzaSize } from '@/api/pizzaSize'
import styles from './index.module.scss'
import Pizza from '@/components/pizza/pizza'
import { getCombo } from '@/api/combo'
import Combo from '@/components/combo/combo'

export async function getStaticProps() {
  const pizzas: object[] = await getPizzaSize()
  const combo: object[] = await getCombo()

  return {
    props: {
      pizzas,
      combo,
    },
  }
}

export default function Home({ pizzas, combo }: any) {
  return (
    <main className={styles.container}>
      <Combo combo={combo} />
      <Pizza pizzas={pizzas} />
    </main>
  )
}
