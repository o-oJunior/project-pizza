import Card from '../card/card'
import styles from './combo.module.scss'

export default function Combo({ combos }: any) {
  return (
    <>
      {combos && (
        <section id="combos" className={styles.comboContainer}>
          <span className={styles.title}>Combos</span>
          <div className={styles.listContainer}>
            {combos.map((combo: any) => {
              return (
                <div className={styles.cardComponent} key={combo.id}>
                  <Card combo={combo} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
