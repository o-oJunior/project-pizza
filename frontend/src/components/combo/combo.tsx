import Card from '../card/card'
import styles from './combo.module.scss'

export default function Combo({ combo }: any) {
  console.log(combo)
  return (
    <>
      {combo && (
        <div className={styles.comboContainer}>
          <span className={styles.title}>Combos</span>
          <div className={styles.listContainer}>
            {combo.map((combo: any) => {
              return (
                <div className={styles.cardComponent} key={combo.id}>
                  <Card combo={combo} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
