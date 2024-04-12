import styles from './index.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// API's
// GET's
import { getCombo } from '@/api/get/combo'
import { getPizzaSize } from '@/api/get/pizzaSize'
import { getJuices, getSodas } from '@/api/get/drink'
import { getFlavor } from '@/api/get/flavor'
import { getBorder } from '@/api/get/border'
import { getBud } from '@/api/get/bud'

// POST
import fetchPostCreateUser from '@/api/post/createUser'
import fetchAuthUser from '@/api/post/authUser'

// Components
import ItemList from '@/components/itemList/itemList'
import ModalListProducts from '@/components/modals/listProducts/listProducts'
import ModalFullScreen from '@/components/modals/fullScreen/fullScreen'
import ModalAccountAccess from '@/components/modals/accountAccess/accountAccess'
import CustomAlert from '@/components/modals/customAlert/customAlert'

// Interfaces
import { ISelected, initialValueSelected } from '@/interfaces/selected'
import { IItem } from '@/interfaces/item'
import { IOrder, initialValueOrder } from '@/interfaces/order'
import { ICreateUser, initialValueCreateUser } from '@/interfaces/user/create'
import { IAuthUser, initialValueAuthUser } from '@/interfaces/user/auth'
import { IValidationRule } from '@/interfaces/validationRule'
import { IActionValidation } from '@/interfaces/actionValidation'
import { ISliceValidation } from '@/interfaces/sliceValidation'
import { IAlert, initialValueAlert } from '@/interfaces/alert'
import { IResponse } from '@/interfaces/response'
import { IValidationStatus } from '@/interfaces/statusValidation'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { manageAccountAccess, openModal, useAccountAccess } from '@/redux/accountAccess/slice'
import { addUserData, IUser } from '@/redux/user/slice'

// Masks
import { maskCPF } from '@/utils/masks/cpf'
import { maskPHONE } from '@/utils/masks/phone'
import { validateToken } from '@/api/get/validateToken'
import { maskBirthDate } from '@/utils/masks/birthDate'

type TApiData = {
  pizzas: IItem[]
  combos: IItem[]
  sodas: IItem[]
  juices: IItem[]
  flavors: IItem[]
  borders: IItem[]
  buds: IItem[]
}

export async function getStaticProps(context: any) {
  const [pizzas, combos, sodas] = await Promise.all([getPizzaSize(), getCombo(), getSodas()])

  const [juices, flavors, borders, buds] = await Promise.all([
    getJuices(),
    getFlavor(),
    getBorder(),
    getBud(),
  ])

  return {
    props: {
      pizzas: pizzas,
      combos: combos,
      sodas: sodas,
      juices: juices,
      flavors: flavors,
      borders: borders,
      buds: buds,
    },
  }
}

export default function Home({ pizzas, combos, sodas, juices, flavors, borders, buds }: TApiData) {
  const [modalFullScreen, setModalFullScreen] = useState<boolean>(false)
  const [modalListProducts, setModalListProducts] = useState<boolean>(false)
  const [itemSelect, setItemSelect] = useState<IItem>({ id: 0, name: '' })
  const [flavorItems, setFlavorItems] = useState<object[]>(flavors)
  const [selectedItem, setSelectedItem] = useState<ISelected>(initialValueSelected)
  const [textOfSelectionOfFlavor, setTextOfSelectionOfFlavor] = useState<string>('')
  const [order, setOrder] = useState<IOrder>(initialValueOrder)
  const [typeSelect, setTypeSelect] = useState<string>('')
  const [createUser, setCreateUser] = useState<ICreateUser>(initialValueCreateUser)
  const [authUser, setAuthUser] = useState<IAuthUser>(initialValueAuthUser)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [customAlert, setCustomAlert] = useState<IAlert>(initialValueAlert)
  const accountAccess = useAppSelector(useAccountAccess)
  const dispatch = useAppDispatch()

  useEffect(() => {
    handleValidateToken()
    window.addEventListener('load', handleLoad)
    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  const handleLoad = () => {
    const LINK_FONTAWESOME = process.env.NEXT_PUBLIC_LINK_FONTAWESOME
    const script = document.createElement('script')
    script.src = LINK_FONTAWESOME!
    script.crossOrigin = 'anonymous'
    document.body.appendChild(script)
  }

  const handleValidateToken = async () => {
    const response: IResponse = await validateToken()
    if (response.statusCode === 200) {
      dispatch(addUserData(response.data! as IUser))
    }
  }

  const open = (item: IItem, type: string): void => {
    setItemSelect({ ...item })
    setTypeSelect(type)
    setOrder({ ...order, subTotal: Object(item.price), total: Object(item.price) })
    setModalFullScreen(true)
    const filterFlavorByType = (filterType: string): IItem[] =>
      flavors.filter((flavor: any) => flavor.type === filterType)
    const validateSlice: ISliceValidation = {
      2: (): void => {
        setTextOfSelectionOfFlavor('Selecione 1 sabor')
        return setFlavorItems(filterFlavorByType('Doce'))
      },
      4: (): void => {
        setTextOfSelectionOfFlavor('Selecione 1 sabor')
        return setFlavorItems(filterFlavorByType('Salgada'))
      },
      6: (): void => {
        setTextOfSelectionOfFlavor('Selecione 2 sabores')
        return setFlavorItems(flavors)
      },
    }
    if (validateSlice[Number(item.slice)]) {
      validateSlice[Number(item.slice)]()
    } else {
      setTextOfSelectionOfFlavor('Selecione 3 sabores')
      setFlavorItems(flavors)
    }
  }

  const closeModalFullScreen = (event: boolean): void => {
    setModalFullScreen(event)
    setSelectedItem(initialValueSelected)
    setOrder(initialValueOrder)
  }

  const searchFlavor = (event: string): void => {
    const search = flavors.filter((item: IItem) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    )
    setFlavorItems(search)
  }

  const handleOrderValue = (
    action: string,
    order: IOrder,
    objectSelected: IItem,
    item?: IItem | undefined
  ): IOrder => {
    const priceItem: number = item?.priceAdditional ? Object(item.priceAdditional) : 0
    const priceObjectSelect: number = Object(objectSelected!.priceAdditional)
    let newSubTotal = 0
    const condition: boolean = priceItem < priceObjectSelect
    const subtractDifference: number = order.subTotal - (priceObjectSelect - priceItem)
    const sum: number = order.subTotal + priceItem
    const validateActions: IActionValidation = {
      select: (): number => (condition ? subtractDifference : sum),
      remove: (): number => order.subTotal - priceObjectSelect,
    }
    newSubTotal = validateActions[action]()
    return { ...order, subTotal: newSubTotal, total: newSubTotal * order.quantity }
  }

  const removeFlavor = (index: number): void => {
    const flavorSelected: IItem = selectedItem.flavors[index]
    const filterFlavor: IItem[] = selectedItem.flavors.filter((flavor) => flavor.id == flavorSelected.id)
    if (filterFlavor.length == 1) {
      setOrder(handleOrderValue('remove', order, flavorSelected))
    }
    selectedItem.flavors.splice(index, 1)
    setSelectedItem({ ...selectedItem, flavors: selectedItem.flavors.map((flavor) => flavor) })
  }

  const select = (item: IItem, type: 'flavors' | 'bud' | 'soda' | 'border'): void => {
    const isTypeFlavor = type === 'flavors'
    const isExistFlavor = (item: IItem): boolean =>
      selectedItem.flavors.some((flavor) => flavor.name == item.name)
    const canAdd =
      (selectedItem.flavors.length <= 2 && (Object(itemSelect.slice) >= 9 || typeSelect === 'combo')) ||
      (selectedItem.flavors.length <= 1 && Object(itemSelect.slice) == 6) ||
      (selectedItem.flavors.length == 0 && Object(itemSelect.slice) <= 4)
    if (isTypeFlavor) {
      if (canAdd) {
        setSelectedItem({ ...selectedItem, flavors: [...selectedItem.flavors, item] })
      } else {
        const removedFirstItem = selectedItem.flavors.shift()
        setSelectedItem({ ...selectedItem, flavors: [...selectedItem.flavors, item] })
        if (!isExistFlavor(removedFirstItem!)) {
          setOrder(handleOrderValue('remove', order, removedFirstItem!))
        }
      }
    } else {
      setSelectedItem({ ...selectedItem, [type]: item })
    }
    if (Object(item.priceAdditional) >= 0 && !isExistFlavor(item)) {
      const objectSelected = Object(selectedItem[type])
      if (objectSelected.priceAdditional != item.priceAdditional) {
        setOrder(handleOrderValue('select', order, objectSelected, item))
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

  const closeModalAccountAccess = (event: boolean): void => {
    setAuthUser(initialValueAuthUser)
    setCreateUser(initialValueCreateUser)
    setErrorMessage('')
    dispatch(openModal(event))
  }

  const handleAccountAccess = (): void => {
    const hasAccount: boolean = accountAccess.hasAccount
    setAuthUser(initialValueAuthUser)
    setCreateUser(initialValueCreateUser)
    setErrorMessage('')
    dispatch(manageAccountAccess(!hasAccount))
  }

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const name: string = event.target.name
    const value: string = event.target.value
    const regex: RegExp = /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ '-]/g
    const validationRules: IValidationRule = {
      name: (value: string) => value.replace(regex, ''),
      cpf: (value: string) => maskCPF(value),
      phone: (value: string) => maskPHONE(value),
      birthDate: (value: string) => maskBirthDate(value),
    }
    if (accountAccess.hasAccount) {
      setAuthUser({ ...authUser, [name]: value })
    } else {
      if (validationRules[name]) {
        setCreateUser({ ...createUser, [name]: validationRules[name](value) })
      } else {
        setCreateUser({ ...createUser, [name]: value })
      }
    }
  }

  const updateInputValidationState = (
    input: HTMLInputElement,
    isValid: boolean,
    validationMessage: string = ''
  ): void => {
    if (isValid) {
      input.classList.remove('noValid')
      input.classList.add('valid')
      input.setCustomValidity('')
    } else {
      input.classList.remove('valid')
      input.classList.add('noValid')
      input.setCustomValidity(validationMessage)
    }
  }

  const isEmailValid = (email: string) => {
    const re =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    return re.test(email)
  }

  const handleAuthUser = async (
    form: HTMLFormElement | null,
    inputs: NodeListOf<HTMLInputElement> | undefined
  ): Promise<void> => {
    let login = {}
    const validateInput = (input: HTMLInputElement): void => {
      const value = input.value
      const name = input.name
      let validationMessage = ''
      if (!value.trim()) {
        validationMessage = `O campo "${input.placeholder}" é obrigatório!`
      } else if (name === 'password' && value.length < 5) {
        validationMessage = 'A senha deve conter no minimo 5 caracteres.'
      } else if (name === 'user') {
        const valueFormated = value.replace(/[.-]/g, '')
        const isNumeric = /^\d+$/.test(valueFormated)
        const type = isNumeric && (value.length == 14 || value.length == 11) ? 'cpf' : 'email'
        const validatedValue = type === 'cpf' ? maskCPF(value) : value
        login = { ...login, user: validatedValue }
      } else {
        validationMessage = ''
      }
      const isValid = validationMessage === ''
      updateInputValidationState(input, isValid, validationMessage)
    }
    const validationCall = (input: HTMLInputElement) => {
      validateInput(input)
      input.reportValidity()
    }
    const inputsInvalid: string[] = []
    const storeInputInvalid = ({ name }: HTMLInputElement, isValidity: boolean) => {
      isValidity ? null : inputsInvalid.push(name)
    }
    inputs?.forEach((input) => {
      input.setCustomValidity('')
      validationCall(input)
      const isValidity = input.checkValidity()
      storeInputInvalid(input, isValidity)
      input.addEventListener('input', () => {
        validationCall(input)
        storeInputInvalid(input, isValidity)
      })
    })
    if (inputsInvalid.length != 0) {
      return setErrorMessage('Preencha todos os campos!')
    } else {
      setErrorMessage('')
    }
    login = { ...login, password: authUser.password }
    setCustomAlert({ message: 'Aguarde! Conferindo credenciais.', status: 'await', modal: true })
    const results: IResponse = await fetchAuthUser(login)
    const inputUser: HTMLInputElement = form?.querySelector('input[name="user"]')!
    const inputPassword: HTMLInputElement = form?.querySelector('input[name="password"]')!
    const validationStatus: IValidationStatus = {
      200: () => {
        setCustomAlert({ message: 'Conta conectada com sucesso!', status: 'success', modal: true })
        closeModalAccountAccess(false)
        dispatch(addUserData(results.data! as IUser))
        setTimeout(() => setCustomAlert(initialValueAlert), 2000)
      },
      401: () => {
        setCustomAlert({ message: results.message!, status: 'error', modal: true })
        updateInputValidationState(inputPassword, false, results.message!)
        setErrorMessage(results.message!)
        setTimeout(() => setCustomAlert(initialValueAlert), 2000)
      },
      404: () => {
        setCustomAlert({ message: results.message!, status: 'error', modal: true })
        updateInputValidationState(inputUser, false, results.message!)
        setErrorMessage(results.message!)
        setTimeout(() => setCustomAlert(initialValueAlert), 2000)
      },
    }
    if (validationStatus[results.statusCode]) {
      validationStatus[results.statusCode]()
    }
  }

  const handleCreatingUser = async (
    form: HTMLFormElement | null,
    inputs: NodeListOf<HTMLInputElement> | undefined
  ): Promise<void> => {
    const messageRequiredField: string = 'Campo obrigatório!*'
    const validationRules: IValidationRule = {
      firstName: (value: string) => (value.length >= 3 ? '' : 'Nome deve conter no mínimo 3 caracteres'),
      lastName: (value: string) => (value.length >= 3 ? '' : 'Sobrenome deve conter no mínimo 3 caracteres'),
      cpf: (value: string) => (value.length == 14 ? '' : 'CPF Inválido!'),
      phone: (value: string) => (value.length >= 14 ? '' : 'Telefone Inválido!'),
      email: (value: string) => (isEmailValid(value) ? '' : 'Email Inválido!'),
      birthDate: (value: string) => (value.length == 10 ? '' : 'Data de Nascimento Inválida!'),
    }
    const validateInput = (input: HTMLInputElement): void => {
      const value = input.value
      const name = input.name
      let validationMessage = ''
      if (!value.trim()) {
        validationMessage = messageRequiredField
      } else if (validationRules[name]) {
        validationMessage = validationRules[name](value)
      }
      const isValid = validationMessage === ''
      updateInputValidationState(input, isValid, validationMessage)
    }
    const checkedPassword = (): void => {
      const inputPassword: HTMLInputElement = form?.querySelector('input[name="password"]')!
      const inputConfirmPassword: HTMLInputElement = form?.querySelector('input[name="confirmPassword"]')!
      const updateInputState = (isValid: boolean, validationMessage: string) => {
        updateInputValidationState(inputPassword!, isValid, validationMessage)
        updateInputValidationState(inputConfirmPassword!, isValid, validationMessage)
      }
      const fieldBlank = !inputPassword?.value.trim() && !inputConfirmPassword?.value.trim()
      const isValueDifferent = inputPassword?.value !== inputConfirmPassword?.value
      if (fieldBlank) {
        updateInputState(false, messageRequiredField)
      } else if (inputPassword!.value.length < 5) {
        updateInputState(false, 'A senha deve conter no minimo 5 caracteres.')
      } else if (isValueDifferent) {
        updateInputState(false, 'As senhas não coincidem!')
      } else {
        updateInputState(true, '')
      }
    }
    const inputsInvalid: string[] = []
    const storeInputInvalid = ({ name }: HTMLInputElement, isValidity: boolean) => {
      isValidity ? null : inputsInvalid.push(name)
    }
    const validationCall = (input: HTMLInputElement) => {
      validateInput(input)
      checkedPassword()
      input.reportValidity()
    }
    inputs?.forEach((input: HTMLInputElement): void => {
      input.setCustomValidity('')
      validationCall(input)
      const isValidity = input.checkValidity()
      storeInputInvalid(input, isValidity)
      input.addEventListener('input', () => {
        validationCall(input)
        storeInputInvalid(input, isValidity)
      })
    })
    if (inputsInvalid.length != 0) {
      return setErrorMessage('Preencha todos os campos obrigatórios!*')
    }
    const date: string = new Date().toLocaleDateString('pt-BR')
    const time: string = new Date().toLocaleTimeString('pt-BR', { hour12: false })
    createUser.dateCreated = date
    createUser.timeCreated = time
    setCustomAlert({ message: 'Aguarde! Sua conta está sendo criada.', status: 'await', modal: true })
    const response: IResponse = await fetchPostCreateUser(createUser)
    if (response!.statusCode !== 201) {
      return setCustomAlert({ message: 'Erro ao criar conta.', status: 'error', modal: true })
    }
    setCreateUser(initialValueCreateUser)
    setCustomAlert({ message: 'Conta criada com sucesso.', status: 'success', modal: true })
    dispatch(manageAccountAccess(true))
    setErrorMessage('')
    setTimeout(() => setCustomAlert(initialValueAlert), 2000)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form: HTMLFormElement = document.querySelector('form')!
    const inputs: NodeListOf<HTMLInputElement> | undefined = form?.querySelectorAll('input')
    if (accountAccess.hasAccount) {
      handleAuthUser(form, inputs)
    } else {
      handleCreatingUser(form, inputs)
    }
  }

  if (typeof document !== 'undefined') {
    document.body.classList.toggle('noScroll', modalFullScreen)
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
          openModalFull={closeModalFullScreen}
          openModalListProducts={setModalListProducts}
          remove={removeFlavor}
          data={{ buds, borders, sodas }}
          select={select}
          selectedItem={selectedItem}
          total={order.total}
          handleQuantity={handleQuantity}
          quantity={order.quantity}
          textOfSelectionOfFlavor={textOfSelectionOfFlavor}
        />
      )}
      {modalListProducts && (
        <ModalListProducts
          search={searchFlavor}
          items={flavorItems}
          open={setModalListProducts}
          selected={selectedItem}
          select={select}
          remove={removeFlavor}
          textOfSelectionOfFlavor={textOfSelectionOfFlavor}
        />
      )}
      {accountAccess.modal && (
        <ModalAccountAccess
          handleChangeInput={handleChangeInput}
          handleAccountAccess={handleAccountAccess}
          closeModal={closeModalAccountAccess}
          handleSubmit={handleSubmit}
          authUser={authUser}
          createUser={createUser}
          hasAccount={accountAccess.hasAccount}
          errorMessage={errorMessage}
        />
      )}
      {customAlert.modal && <CustomAlert message={customAlert.message} status={customAlert.status} />}
    </main>
  )
}
