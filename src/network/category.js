import {request} from './request'

export function getCategoryInfo() {
  return request({
    url: '/category'
  })
}