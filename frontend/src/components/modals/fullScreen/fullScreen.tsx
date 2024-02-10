import { ISelected } from '@/interfaces/selected'
import Dropdown from '../../dropdown/dropdown'
import styles from './fullScreen.module.scss'
import { IItem } from '@/interfaces/item'
import { IData } from '@/interfaces/data'

type TPropsFullScreen = {
  openModalFull: (event: boolean) => void
  openModalListProducts: (event: boolean) => void
  select: (item: IItem, type: 'border' | 'bud' | 'soda') => void
  remove: (index: number) => void
  onChangeQuantity: (quantity: number) => void
  item: IItem
  data: IData
  selectedItem: ISelected
  total: number
  quantity: number
  type: string
}

const ModalFullScreen = ({
  openModalFull,
  openModalListProducts,
  select,
  remove,
  onChangeQuantity,
  item,
  data,
  selectedItem,
  total,
  quantity,
  type,
}: TPropsFullScreen) => {
  const filterSodas = data.sodas.filter((soda) => Object(soda.liter) >= 1)

  return (
    <div className={styles.modalContainer}>
      <div className={styles.btnClose} onClick={() => openModalFull(false)}>
        <i className="bi bi-x-circle-fill"></i>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.formContent}>
          <div className={styles.groupContainer}>
            {type != 'drink' && (
              <div className={styles.groupContent}>
                {(Object(item.slice) >= 9 || type === 'combo') && (
                  <span className={styles.text}>Escolha até 3 sabores</span>
                )}
                {Object(item.slice) == 6 && <span className={styles.text}>Escolha até 2 sabores</span>}
                {Object(item.slice) <= 4 && <span className={styles.text}>Escolha 1 sabor</span>}
                <button className={styles.btnFlavors} onClick={() => openModalListProducts(true)}>
                  {Object(item.slice) <= 4 ? 'Escolher sabor' : 'Escolher sabores'}
                </button>
              </div>
            )}
            {Object(item.slice) >= 4 ||
              (type === 'combo' && (
                <div className={styles.groupContent}>
                  <span className={styles.text}>Borda</span>
                  <Dropdown select={(item: IItem): void => select(item, 'border')} items={data.borders} />
                </div>
              ))}
            {type === 'combo' && (
              <div className={styles.groupContent}>
                <span className={styles.text}>Broto</span>
                <Dropdown select={(item: IItem): void => select(item, 'bud')} items={data.buds} />
              </div>
            )}
            {type === 'combo' && (
              <div className={styles.groupContent}>
                <span className={styles.text}>Refrigerante</span>
                <Dropdown select={(item: IItem): void => select(item, 'soda')} items={filterSodas} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.infoProduct}>
          <span className={styles.title}>Seu pedido:</span>
          <img className={styles.imageProduct} src={item.image} alt="Imagem produto" />
          <span>{item.name}</span>
          <span className={styles.description}>{item.description}</span>
          {Object(selectedItem.flavors).length > 0 && (
            <div className={styles.contentFlavor}>
              <span>{Object(selectedItem.flavors).length > 1 ? 'Sabores:' : 'Sabor:'}</span>
              <ul className={styles.listContainerFlavor}>
                {Object(selectedItem.flavors).map((flavor: IItem, index: number) => {
                  return (
                    <li onClick={() => remove(index)} className={styles.listContentFlavor} key={index}>
                      <div className={styles.infoGroup}>
                        <img src={flavor.image} />
                        <div className={styles.infoFlavor}>
                          <span className={styles.flavorName}>{flavor.name}</span>
                          <span className={styles.ingredientsFlavor}>{flavor.ingredients}</span>
                        </div>
                      </div>
                      <i className="bi bi-x-lg"></i>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          <div className={styles.complements}>
            {selectedItem.border.name && <span>Borda: {selectedItem.border.name}</span>}
            {selectedItem.bud.name && <span>Broto: {selectedItem.bud.name}</span>}
            {selectedItem.soda.liter && (
              <div className={styles.groupSoda}>
                <span>Refrigerante: {selectedItem.soda.name}</span>
                <span>
                  {selectedItem.soda.liter < 1.0
                    ? `${selectedItem.soda.liter.toFixed(3).toString().replace('0.', '')}mL`
                    : `${selectedItem.soda.liter.toString().replace('.', ',')}L`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.purchase}>
        <div className={styles.quantity}>
          <button className={styles.btnQuantity} onClick={() => onChangeQuantity(quantity - 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button className={styles.btnQuantity} onClick={() => onChangeQuantity(quantity + 1)}>
            +
          </button>
        </div>
        <button className={styles.btnPurchase}>
          Adicionar ao carrinho: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </button>
      </div>
    </div>
  )
}

export default ModalFullScreen
