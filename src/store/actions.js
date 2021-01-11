import {
  ADD_COUNTER,
  Add_TO_CART
} from './mutation-types';

export default {
  addCart(context, payload) {

    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      } else {
        
        context.commit(Add_TO_CART, payload)
        // state.cartList.push(payload)
        resolve('添加了新的商品')
      }
    })
  }
}