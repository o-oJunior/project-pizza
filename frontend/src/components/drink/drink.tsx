import Card from '../card/card'
import styles from './drink.module.scss'

type Drink = {
  sodas: object[]
  juices: object[]
  open: (item: object) => {}
}

export default function Drink({ sodas, juices, open }: Drink) {
  return (
    <>
      <section id="bebidas" className={styles.drinkContainer}>
        <span className={styles.title}>Bebidas</span>
        {sodas && (
          <div className={styles.groupContainer}>
            <span className={styles.subtitle}>Refrigerantes</span>
            <div className={styles.listContainer}>
              {sodas.map((soda: any) => {
                return (
                  <div className={styles.cardComponent} key={soda.id} onClick={() => open(soda)}>
                    <Card drink={soda} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {juices && (
          <div className={styles.groupContainer}>
            <span className={styles.subtitle}>Sucos</span>
            <div className={styles.listContainer}>
              {juices.map((juice: any) => {
                return (
                  <div className={styles.cardComponent} key={juice.id} onClick={() => open(juice)}>
                    <Card drink={juice} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
