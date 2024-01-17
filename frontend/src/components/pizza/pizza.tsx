import Card from '../card/card'
import styles from './pizza.module.scss'

type Pizza = {
  pizzas: object[]
  open: (item: object) => {}
}

export default function Pizza({ pizzas, open }: Pizza) {
  return (
    <>
      {pizzas && (
        <section id="pizzas" className={styles.pizzaContainer}>
          <span className={styles.title}>Pizzas</span>
          <div className={styles.listContainer}>
            {pizzas.map((pizza: any) => {
              return (
                <div className={styles.cardComponent} key={pizza.id} onClick={() => open(pizza)}>
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
