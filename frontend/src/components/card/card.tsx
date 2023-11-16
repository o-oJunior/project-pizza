import styles from './card.module.scss'

type Props = {
  image: string
  size: string
  price: number
  slice: number
}

const Card = ({ image, size, price, slice }: Props) => {
  return (
    <article className={styles.cardContainer}>
      <img src={image} alt="imagem pizza" />
      <div className={styles.textGroup}>
        <span className={styles.size}>
          {size}
          <span className={styles.slice}>({slice} Fatias)</span>
        </span>
        <span className={styles.price}>
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </article>
  )
}

export default Card
