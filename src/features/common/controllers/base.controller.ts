import { ResponseFunction } from '@common/types'

export abstract class BaseController {
  protected responseOK: ResponseFunction = ({
    data,
    message = undefined,
    status = 200,
    headers = undefined,
  }) => ({
    status,
    headers,
    object: {
      success: true,
      data,
      message,
    },
  })

  protected responseError: ResponseFunction = ({
    data = undefined,
    message = undefined,
    status = 400,
    headers = undefined,
  }) => ({
    status,
    headers,
    object: {
      success: false,
      data,
      message,
    },
  })
}
