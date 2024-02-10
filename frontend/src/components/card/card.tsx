import { IItem } from '@/interfaces/item'
import styles from './card.module.scss'

type Props = {
  item: IItem
}

const Card = ({ item }: Props) => {
  return (
    <article className={styles.cardContainer}>
      <img src={item.image} alt="imagem" />
      <div className={styles.textGroup}>
        {item.slice && item.name ? (
          <div className={styles.textInfo}>
            <span className={styles.size}>{item.name}</span>
            {item.slice && <span className={styles.slice}>({item.slice} Fatias)</span>}
          </div>
        ) : (
          <span className={styles.name}>{item.name}</span>
        )}
        {item.liter && (
          <span className={styles.liter}>
            {item.liter < 1.0
              ? `${item.liter.toFixed(3).toString().replace('0.', '')}mL`
              : `${item.liter.toString().replace('.', ',')}L`}
          </span>
        )}
        {item.description && <span className={styles.description}>{item.description}</span>}
        <span className={styles.price}>
          {item.description && 'A partir de: '}
          {Object(item!.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </article>
  )
}

export default Card
