import { ICustomAlert } from '@/components/modals/customAlert/customAlert'

export interface IAlert extends ICustomAlert {
  modal: boolean
}

export const initialValueAlert: IAlert = {
  modal: false,
  status: '',
  message: '',
}
