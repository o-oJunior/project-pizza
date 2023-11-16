import getPizzaSize from '@/api/pizzaSize'
import styles from './index.module.scss'
import Pizza from '@/components/pizza/pizza'

export async function getStaticProps() {
  const pizzas: object[] = await getPizzaSize()

  return {
    props: {
      pizzas,
    },
  }
}

export default function Home({ pizzas }: any) {
  return (
    <main className={styles.container}>
      <Pizza data={pizzas} />
    </main>
  )
}
