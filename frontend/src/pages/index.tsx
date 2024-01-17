import { useState } from 'react'
import styles from './index.module.scss'

// API's
import { getCombo } from '@/api/combo'
import { getPizzaSize } from '@/api/pizzaSize'
import { getJuices, getSodas } from '@/api/drink'
import { getFlavor } from '@/api/flavor'
import { getBorder } from '@/api/border'
import { getBud } from '@/api/bud'

//Components
import Pizza from '@/components/pizza/pizza'
import Combo from '@/components/combo/combo'
import Drink from '@/components/drink/drink'
import ModalPartialScreen from '@/components/modals/modalPartial/modalPartial'
import ModalFullScreen from '@/components/modals/modalFullScreen/modalFullScreen'

//Interfaces
import { IComponentsItem, ISelected } from '@/interfaces/selected'

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
  soda: { id: 0, name: '' },
}

const orderInitialValue = {
  quantity: 1,
  subTotal: 0,
}

export default function Home({ pizzas, combos, sodas, juices, flavors, borders, buds }: any) {
  const [modalFullScreen, setModalFullScreen] = useState<boolean>(false)
  const [modalPartialScreen, setModalPartialScreen] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const [itemSelect, setItemSelect] = useState<any>({})
  const [flavorItems, setFlavorItems] = useState<object[]>(flavors)
  const [selectedItem, setSelectedItem] = useState<ISelected>(selectedItemInitialValue)
  const [order, setOrder] = useState<any>(orderInitialValue)

  const open = (item: any, type: string) => {
    setItemSelect({ ...item })
    setOrder({ ...order, subTotal: item.price, total: item.price })
    setType(type)
    setModalFullScreen(true)
  }

  const closeModalFullScreen = (event: boolean): void => {
    setModalFullScreen(event)
    setSelectedItem(selectedItemInitialValue)
  }

  const searchFlavor = (event: string) => {
    const search = flavors.filter((item: any) => item.name.toLowerCase().includes(event.toLocaleLowerCase()))
    setFlavorItems(search)
  }

  const removeFlavor = (index: number) => {
    const flavorSelected: IComponentsItem = selectedItem.flavors[index]
    const filterFlavor: IComponentsItem[] = selectedItem.flavors.filter(
      (flavor) => flavor.id == flavorSelected.id
    )
    if (filterFlavor.length == 1) {
      const valueSubTotal = order.subTotal - selectedItem.flavors[index].priceAdditional!
      const valueTotal = valueSubTotal * order.quantity
      setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
    }
    selectedItem.flavors.splice(index, 1)
    setSelectedItem({ ...selectedItem, flavors: selectedItem.flavors.map((flavor) => flavor) })
  }

  const select = (item: any, type: 'flavors' | 'bud' | 'soda' | 'border'): void => {
    const filterFlavor = selectedItem.flavors.filter((flavor) => flavor.name == item.name)
    if (type === 'flavors') {
      if (selectedItem.flavors.length <= 2) {
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

    if (item.priceAdditional >= 0 && filterFlavor.length == 0) {
      const objectSelected = Object(selectedItem[type])
      if (objectSelected.priceAdditional != item.priceAdditional) {
        if (item.priceAdditional < objectSelected.priceAdditional) {
          const valueSubTotal = order.subTotal - (objectSelected.priceAdditional - item.priceAdditional)
          const valueTotal = valueSubTotal * order.quantity
          setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
        } else {
          const valueSubTotal = order.subTotal + item.priceAdditional
          const valueTotal = valueSubTotal * order.quantity
          setOrder({ ...order, subTotal: valueSubTotal, total: valueTotal })
        }
      }
    }
  }

  const onChangeQuantity = (quantity: number): void => {
    if (quantity <= 1) {
      setOrder({ ...order, quantity: 1, total: order.subTotal })
    } else {
      const value = order.subTotal * quantity
      setOrder({ ...order, quantity: quantity, total: value })
    }
  }

  if (typeof document !== 'undefined') {
    document.body.classList.toggle(`${styles.noScroll}`, modalFullScreen)
  }

  return (
    <main id="main" className={styles.container}>
      <Combo combos={combos} open={(combo): any => open(combo, 'combo')} />
      <Pizza pizzas={pizzas} open={(pizza): any => open(pizza, 'pizza')} />
      <Drink sodas={sodas} juices={juices} open={(drink): any => open(drink, 'drink')} />
      {modalFullScreen && (
        <ModalFullScreen
          item={itemSelect}
          type={type}
          openModalFull={(event: boolean): any => closeModalFullScreen(event)}
          openModalPartial={(event: boolean): any => setModalPartialScreen(event)}
          remove={(index: number): any => removeFlavor(index)}
          borders={borders}
          buds={buds}
          sodas={sodas}
          select={(item: object, type: 'border' | 'bud' | 'soda'): any => select(item, type)}
          selectedItem={selectedItem}
          total={order.total}
          onChangeQuantity={(quantity: number): any => onChangeQuantity(quantity)}
          quantity={order.quantity}
        />
      )}
      {modalPartialScreen && (
        <ModalPartialScreen
          searchFlavor={(text: any): any => searchFlavor(text)}
          items={flavorItems}
          open={(event: boolean): any => setModalPartialScreen(event)}
          selectedFlavors={selectedItem.flavors}
          select={(item: object, type: 'flavors'): any => select(item, type)}
          remove={(index: number): any => removeFlavor(index)}
        />
      )}
    </main>
  )
}
