import { IItem } from '@/interfaces/item'
import styles from './listProducts.module.scss'
import { ChangeEvent } from 'react'

type TPropsListProducts = {
  open: (event: boolean) => void
  search: (text: string) => void
  select: (item: IItem, type: 'flavors') => void
  remove: (index: number) => void
  items: object[]
  selected: TSelected
  textOfSelectionOfFlavor: string
}

type TSelected = {
  flavors: IItem[]
}

const ModalListProducts = ({
  items,
  open,
  search,
  selected,
  select,
  remove,
  textOfSelectionOfFlavor,
}: TPropsListProducts) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.btnCloseModal} onClick={() => open(false)}>
          <i className="bi bi-x-circle-fill"></i>
        </div>
        <div className={styles.search}>
          <span className={styles.title}>{textOfSelectionOfFlavor}:</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Pesquisar sabor"
            onChange={(event: ChangeEvent<HTMLInputElement>) => search(event.target.value)}
          />
        </div>
        <ul className={styles.listContainer}>
          {items.map((item: any) => {
            return (
              <li onClick={() => select(item, 'flavors')} className={styles.listContent} key={item.id}>
                <img src={item.image} />
                <div className={styles.info}>
                  <span>{item.name}</span>
                  <span className={styles.ingredients}>{item.ingredients}</span>
                  <span className={styles.price}>
                    + {item.priceAdditional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className={styles.listSelected}>
          <span className={styles.text}>Sabores selecionados:</span>
          {selected.flavors.length > 0 ? (
            <ul>
              {selected.flavors.map((flavor: any, index: number) => {
                return (
                  <li onClick={() => remove(index)} key={index}>
                    <span>{flavor.name}</span>
                    <i className="bi bi-x-lg"></i>
                  </li>
                )
              })}
            </ul>
          ) : (
            <span className={styles.textNone}>Nenhum sabor selecionado!</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalListProducts
