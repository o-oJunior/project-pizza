import styles from './dropdown.module.scss'

type Props = {
  items: object[]
  select: (item: object) => {}
}

export default function Dropdown({ items, select }: Props) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownBtn}>Selecione...</button>
      <div className={styles.dropdownContent}>
        {items.map((item: any) => {
          return (
            <div onClick={() => select(item)} className={styles.listDropdown} key={item.id}>
              <span>{item.name}</span>
              {item.priceAdditional >= 0 && (
                <span className={styles.priceAdditional}>
                  +{item.priceAdditional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              )}
              {item.liter && (
                <span>
                  {item.liter < 1.0
                    ? `${item.liter.toFixed(3).toString().replace('0.', '')}mL`
                    : `${item.liter.toString().replace('.', ',')}L`}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
