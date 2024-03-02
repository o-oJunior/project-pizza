import { IItem } from '@/interfaces/item'
import Card from '../card/card'
import styles from './itemList.module.scss'

type Props = {
  items: IItem[] | PropsDrink
  type: 'Pizzas' | 'Bebidas' | 'Combos'
  open: (item: IItem) => void
}

type PropsDrink = {
  sodas?: IItem[]
  juices?: IItem[]
}

const ItemList = ({ items, open, type }: Props) => {
  return (
    <>
      {items && (
        <section id={type.toLowerCase()} className={styles.itemContainer}>
          <span className={styles.title}>{type}</span>
          {Array.isArray(items) ? (
            <div className={styles.listContainer}>
              {items.map((item: IItem) => {
                return (
                  <div className={styles.cardComponent} key={item.id} onClick={() => open(item)}>
                    <Card item={item} />
                  </div>
                )
              })}
            </div>
          ) : (
            <>
              {items.sodas !== undefined && (
                <div className={styles.groupContainer}>
                  <span className={styles.subtitle}>Refrigerantes</span>
                  <div className={styles.listContainer}>
                    {items.sodas?.map((soda: any) => {
                      return (
                        <div className={styles.cardComponent} key={soda.id} onClick={() => open(soda)}>
                          <Card item={soda} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {items.juices !== undefined && (
                <div className={styles.groupContainer}>
                  <span className={styles.subtitle}>Sucos</span>
                  <div className={styles.listContainer}>
                    {items.juices.map((juice: any) => {
                      return (
                        <div className={styles.cardComponent} key={juice.id} onClick={() => open(juice)}>
                          <Card item={juice} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </>
  )
}

export default ItemList
