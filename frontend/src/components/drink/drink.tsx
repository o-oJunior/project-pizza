import Card from '../card/card'
import styles from './drink.module.scss'

export default function Drink({ sodas, juices }: any) {
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
                  <div className={styles.cardComponent} key={soda.id}>
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
                  <div className={styles.cardComponent} key={juice.id}>
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
