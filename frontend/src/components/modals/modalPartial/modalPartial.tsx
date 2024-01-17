import styles from './modalPartial.module.scss'

type PropsPartialScreen = {
  open: (event: boolean) => {}
  searchFlavor: (text: string) => {}
  select: (item: object, type: 'flavors') => {}
  remove: (index: number) => {}
  items: object[]
  selectedFlavors: object[]
}

export default function ModalPartialScreen({
  items,
  open,
  searchFlavor,
  selectedFlavors,
  select,
  remove,
}: PropsPartialScreen) {
  return (
    <div className={styles.modalPartial}>
      <div className={styles.modalPartialContent}>
        <div className={styles.btnCloseModalPartial} onClick={() => open(false)}>
          <i className="bi bi-x-circle-fill"></i>
        </div>
        <div className={styles.search}>
          <span className={styles.title}>Escolha até 3 sabores:</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Pesquisar sabor"
            onChange={(event) => searchFlavor(event.target.value)}
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
        <div className={styles.listSelectedFlavors}>
          <span className={styles.textFlavors}>Sabores selecionados:</span>
          {selectedFlavors.length > 0 ? (
            <ul>
              {selectedFlavors.map((flavor: any, index: number) => {
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
