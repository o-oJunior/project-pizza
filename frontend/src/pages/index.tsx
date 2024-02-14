import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'

// API's
import { getCombo } from '@/api/combo'
import { getPizzaSize } from '@/api/pizzaSize'
import { getJuices, getSodas } from '@/api/drink'
import { getFlavor } from '@/api/flavor'
import { getBorder } from '@/api/border'
import { getBud } from '@/api/bud'

//Components
import ItemList from '@/components/itemList/itemList'
import ModalListProducts from '@/components/modals/listProducts/listProducts'
import ModalFullScreen from '@/components/modals/fullScreen/fullScreen'
import ModalAccountAccess from '@/components/modals/accountAccess/accountAccess'

//Interfaces
import { ISelected } from '@/interfaces/selected'
import { IItem } from '@/interfaces/item'

//Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { manageAccountAcess, openModal, useAccountAccess } from '@/redux/accountAccess/slice'

type TApiData = {
  pizzas: IItem[]
  combos: IItem[]
  sodas: IItem[]
  juices: IItem[]
  flavors: IItem[]
  borders: IItem[]
  buds: IItem[]
}

export async function getStaticProps() {
  const pizzas: object[] = await getPizzaSize()
  const combos: object[] = await getCombo()
  const sodas: object[] = await getSodas()
  const juices: object[] = await getJuices()
  const flavors: object[] = await getFlavor()
  const borders: object[] = await getBorder()
  const buds: object[] = await getBud()

  return {
    props: {
      pizzas,
      combos,
      sodas,
      juices,
      flavors,
      borders,
      buds,
    },
  }
}

const selectedItemInitialValue: ISelected = {
  bud: { id: 0, name: '', priceAdditional: 0 },
  border: { id: 0, name: '', priceAdditional: 0 },
  flavors: [],
  soda: { id: 0, name: '', price: 0 },
}

const orderInitialValue: IOrder = {
  code: 0,
  subTotal: 0,
  total: 0,
  dateOrder: new Date(),
  timeOrder: new Date(),
  quantity: 1,
  idClient: 0,
  idAddress: 0,
  idPizzaSize: 0,
  idFlavor: 0,
  idBorder: 0,
  idBud: 0,
  idDrink: 0,
  idCombo: 0,
}

export default function Home({ pizzas, combos, sodas, juices, flavors, borders, buds }: TApiData) {
  const [modalFullScreen, setModalFullScreen] = useState<boolean>(false)
  const [modalListProducts, setModalListProducts] = useState<boolean>(false)
  const [itemSelect, setItemSelect] = useState<IItem>({ id: 0, name: '' })
  const [flavorItems, setFlavorItems] = useState<object[]>(flavors)
  const [selectedItem, setSelectedItem] = useState<ISelected>(selectedItemInitialValue)
  const [order, setOrder] = useState<IOrder>(orderInitialValue)
  const [typeSelect, setTypeSelect] = useState<string>('')
  const accountAccess = useAppSelector(useAccountAccess)
  const dispatch = useAppDispatch()

  const open = (item: IItem, type: string): void => {
    setItemSelect({ ...item })
    setTypeSelect(type)
    setOrder({ ...order, subTotal: Object(item.price), total: Object(item.price) })
    setModalFullScreen(true)

    if (item.slice === 2) {
      const filterFlavor = flavors.filter((flavor: any) => flavor.type === 'Doce')
      setFlavorItems(filterFlavor)
    } else if (item.slice === 4) {
      const filterFlavor = flavors.filter((flavor: any) => flavor.type === 'Salgada')
      setFlavorItems(filterFlavor)
    } else {
      setFlavorItems(flavors)
    }
  }

  const closeModalFullScreen = (event: boolean): void => {
    setModalFullScreen(event)
    setSelectedItem(selectedItemInitialValue)
    setOrder(orderInitialValue)
  }

  const searchFlavor = (event: string): void => {
    const search = flavors.filter((item: IItem) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    )
    setFlavorItems(search)
  }

  const removeFlavor = (index: number): void => {
    const flavorSelected: IItem = selectedItem.flavors[index]
    const filterFlavor: IItem[] = selectedItem.flavors.filter((flavor) => flavor.id == flavorSelected.id)
    if (filterFlavor.length == 1) {
      const valueSubTotal = order.subTotal - selectedItem.flavors[index].priceAdditional!
      const valueTotal = valueSubTotal * order.quantity
      setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
    }
    selectedItem.flavors.splice(index, 1)
    setSelectedItem({ ...selectedItem, flavors: selectedItem.flavors.map((flavor) => flavor) })
  }

  const select = (item: IItem, type: 'flavors' | 'bud' | 'soda' | 'border'): void => {
    const filterFlavor = selectedItem.flavors.filter((flavor) => flavor.name == item.name)
    if (type === 'flavors') {
      if (
        (selectedItem.flavors.length <= 2 && (Object(itemSelect.slice) >= 9 || typeSelect === 'combo')) ||
        (selectedItem.flavors.length <= 1 && Object(itemSelect.slice) == 6) ||
        (selectedItem.flavors.length == 0 && Object(itemSelect.slice) <= 4)
      ) {
        setSelectedItem({ ...selectedItem, [type]: [...selectedItem.flavors, item] })
      } else {
        const firstItem = selectedItem.flavors[0]
        selectedItem.flavors.shift()
        setSelectedItem({ ...selectedItem, flavors: [...selectedItem.flavors, item] })
        const previewFlavors: object[] = selectedItem.flavors
        previewFlavors.push(item)
        const checkFlavorRemoved = previewFlavors.filter((flavor: any) => flavor.name == firstItem.name)
        if (checkFlavorRemoved.length == 0) {
          const valueSubTotal = order.subTotal - firstItem.priceAdditional!
          const valueTotal = valueSubTotal * order.quantity
          setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
        }
      }
    } else {
      setSelectedItem({ ...selectedItem, [type]: item })
    }

    if (Object(item.priceAdditional) >= 0 && filterFlavor.length == 0) {
      const objectSelected = Object(selectedItem[type])
      if (objectSelected.priceAdditional != item.priceAdditional) {
        if (Object(item.priceAdditional) < objectSelected.priceAdditional) {
          const valueSubTotal =
            order.subTotal - (objectSelected.priceAdditional - Object(item.priceAdditional))
          const valueTotal = valueSubTotal * order.quantity
          setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
        } else {
          const valueSubTotal = order.subTotal + Object(item.priceAdditional)
          const valueTotal = valueSubTotal * order.quantity
          setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
        }
      }
    }
  }

  const handleQuantity = (quantity: number): void => {
    if (quantity <= 1) {
      setOrder({ ...order, quantity: 1, total: order.subTotal })
    } else {
      const value = order.subTotal * quantity
      setOrder({ ...order, quantity: quantity, total: value })
    }
  }

  const handleAccountAccess = () => {
    const value: boolean = accountAccess.hasAccount ? false : true
    dispatch(manageAccountAcess(value))
  }

  if (typeof document !== 'undefined') {
    document.body.classList.toggle('noScroll', modalFullScreen || accountAccess.modal)
  }

  return (
    <main id="main" className={styles.container}>
      <ItemList items={combos} open={(combo): void => open(combo, 'combo')} type="Combos" />
      <ItemList items={pizzas} open={(pizza): void => open(pizza, 'pizza')} type="Pizzas" />
      <ItemList items={{ sodas, juices }} open={(drink): void => open(drink, 'drink')} type="Bebidas" />
      {modalFullScreen && (
        <ModalFullScreen
          type={typeSelect}
          item={itemSelect}
          openModalFull={(event: boolean): void => closeModalFullScreen(event)}
          openModalListProducts={(event: boolean): void => setModalListProducts(event)}
          remove={(index: number): void => removeFlavor(index)}
          data={{ buds, borders, sodas }}
          select={(item: IItem, type: 'border' | 'bud' | 'soda'): void => select(item, type)}
          selectedItem={selectedItem}
          total={order.total}
          handleQuantity={(quantity: number): void => handleQuantity(quantity)}
          quantity={order.quantity}
        />
      )}
      {modalListProducts && (
        <ModalListProducts
          search={(text: string): void => searchFlavor(text)}
          items={flavorItems}
          open={(event: boolean): void => setModalListProducts(event)}
          selected={selectedItem}
          select={(item: IItem, type: 'flavors'): void => select(item, type)}
          remove={(index: number): void => removeFlavor(index)}
        />
      )}
      {accountAccess.modal && (
        <ModalAccountAccess
          handleChangeInput={() => {}}
          handleAccountAccess={handleAccountAccess}
          closeModal={(event: boolean): void => {
            dispatch(openModal(event))
          }}
          hasAccount={accountAccess.hasAccount}
        />
      )}
    </main>
  )
}
