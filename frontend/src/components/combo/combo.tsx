import Card from '../card/card'
import styles from './combo.module.scss'

type Combo = {
  combos: object[]
  open: (item: object) => {}
}

export default function Combo({ combos, open }: Combo) {
  return (
    <>
      {combos && (
        <section id="combos" className={styles.comboContainer}>
          <span className={styles.title}>Combos</span>
          <div className={styles.listContainer}>
            {combos.map((combo: any) => {
              return (
                <div className={styles.cardComponent} key={combo.id} onClick={() => open(combo)}>
                  <Card pizza={combo} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
