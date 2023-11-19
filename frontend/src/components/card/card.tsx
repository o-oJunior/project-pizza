import styles from './card.module.scss'

type Props = {
  pizza?: Pizza
  combo?: Combo
  drink?: Drink
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

type Drink = {
  name: string
  image: string
  price: number
  liter: number
}

const Card = ({ pizza, combo, drink }: Props) => {
  if (combo) {
    return (
      <article className={styles.cardContainer}>
        <img src={combo.image} alt="imagem" />
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
        <img src={pizza.image} alt="imagem" />
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

  if (drink) {
    return (
      <article className={styles.cardContainer}>
        <img src={drink.image} alt="imagem" />
        <div className={styles.textGroup}>
          <span className={styles.name}>{drink.name}</span>
          <span className={styles.liter}>
            {drink.liter < 1.0
              ? `${drink.liter.toFixed(3).toString().replace('0.', '')}mL`
              : `${drink.liter.toString().replace('.', ',')}L`}
          </span>
          <span className={styles.price}>
            {drink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </article>
    )
  }
}

export default Card
