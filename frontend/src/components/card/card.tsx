import styles from './card.module.scss'

type Props = {
  pizza?: Pizza
  combo?: Combo
}

type Pizza = {
  image: string
  size: string
  price: number
  slice: number
}

type Combo = {
  name: string
  image: string
  price: number
  description: string
}

const Card = ({ pizza, combo }: Props) => {
  if (combo) {
    return (
      <article className={styles.cardContainer}>
        <img src={combo.image} alt="imagem pizza" />
        <div className={styles.textGroup}>
          <span className={styles.name}>{combo.name}</span>
          <span className={styles.description}>{combo.description}</span>
          <span className={styles.price}>
            A partir de: {combo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </article>
    )
  }

  if (pizza) {
    return (
      <article className={styles.cardContainer}>
        <img src={pizza.image} alt="imagem pizza" />
        <div className={styles.textGroup}>
          <div className={styles.textInfo}>
            <span className={styles.size}>{pizza.size}</span>
            <span className={styles.slice}>({pizza.slice} Fatias)</span>
          </div>
          <span className={styles.price}>
            A partir de: {pizza.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </article>
    )
  }
}

export default Card
