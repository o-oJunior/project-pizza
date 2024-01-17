import { ISelected } from '@/interfaces/selected'
import Dropdown from '../../dropdown/dropdown'
import styles from './modalFullScreen.module.scss'

type PropsFullScreen = {
  openModalFull: (event: boolean) => {}
  openModalPartial: (event: boolean) => {}
  select: (item: object, type: 'border' | 'bud' | 'soda') => {}
  remove: (index: number) => {}
  onChangeQuantity: (quantity: number) => {}
  item: any
  type: string
  borders: object[]
  buds: object[]
  sodas: object[]
  selectedItem: ISelected
  total: number
  quantity: number
}

export default function ModalFullScreen({
  openModalFull,
  openModalPartial,
  select,
  remove,
  onChangeQuantity,
  item,
  type,
  borders,
  buds,
  sodas,
  selectedItem,
  total,
  quantity,
}: PropsFullScreen) {
  return (
    <div className={styles.containerModal}>
      <div className={styles.btnClose} onClick={() => openModalFull(false)}>
        <i className="bi bi-x-circle-fill"></i>
      </div>
      <div className={styles.contentModal}>
        <div className={styles.contentForm}>
          <div className={styles.groupContainer}>
            <div className={styles.groupContent}>
              <span className={styles.text}>Escolha até 3 sabores</span>
              <button className={styles.btnFlavors} onClick={() => openModalPartial(true)}>
                Escolher sabores
              </button>
            </div>
            <div className={styles.groupContent}>
              <span className={styles.text}>Borda</span>
              <Dropdown select={(item: object): any => select(item, 'border')} items={borders} />
            </div>
            <div className={styles.groupContent}>
              <span className={styles.text}>Broto</span>
              <Dropdown select={(item: object): any => select(item, 'bud')} items={buds} />
            </div>
            <div className={styles.groupContent}>
              <span className={styles.text}>Refrigerante</span>
              <Dropdown select={(item: object): any => select(item, 'soda')} items={sodas} />
            </div>
          </div>
        </div>
        <div className={styles.infoProduct}>
          <span className={styles.title}>Seu pedido:</span>
          <img className={styles.imageProduct} src={item.image} alt="Imagem produto" />
          <span>{item.name}</span>
          <span className={styles.description}>{item.description}</span>
          {selectedItem.flavors.length > 0 && (
            <div className={styles.contentFlavor}>
              <span>{selectedItem.flavors.length > 1 ? 'Sabores:' : 'Sabor:'}</span>
              <ul className={styles.listContainerFlavor}>
                {selectedItem.flavors.map((flavor: any, index: number) => {
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
