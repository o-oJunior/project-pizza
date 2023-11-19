import Card from '../card/card'
import styles from './pizza.module.scss'

export default function Pizza({ pizzas }: any) {
  return (
    <>
      {pizzas && (
        <section id="pizzas" className={styles.pizzaContainer}>
          <span className={styles.title}>Pizzas</span>
          <div className={styles.listContainer}>
            {pizzas.map((pizza: any) => {
              return (
                <div className={styles.cardComponent} key={pizza.id}>
                  <Card pizza={pizza} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
