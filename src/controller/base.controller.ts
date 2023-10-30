import { IResponse } from '../types'

export abstract class BaseController {
  protected responseOK = ({
    data,
    message,
    status = 200,
    headers = undefined,
  }: IResponse) => ({
    status,
    headers,
    object: {
      success: false,
      data,
      message,
    },
  })

  protected responseError = ({
    data,
    message,
    status = 400,
    headers = undefined,
  }: IResponse) => ({
    status,
    headers,
    object: {
      success: false,
      data,
      message,
    },
  })
}
