import Card from '../card/card'
import styles from './pizza.module.scss'

export default function Pizza({ data }: any) {
  return (
    <>
      {data && (
        <div className={styles.pizzaContainer}>
          <span className={styles.title}>Pizzas</span>
          <div className={styles.listContainer}>
            {data.map((pizza: any) => {
              return (
                <div className={styles.cardComponent} key={pizza.id}>
                  <Card size={pizza.size} image={pizza.image} price={pizza.price} slice={pizza.slice} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
