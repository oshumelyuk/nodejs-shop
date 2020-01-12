function deleteProduct(productId){
  return fetch(`/admin/product/${productId}`, {
    method: 'delete'
  }).then( (data) => {
    location = "/admin/products";
  } )
}

function deleteProductFromCart(productId){
  return fetch(`/cart/products/${productId}`, {
    method: 'delete'
  }).then( (data) => {
    location = "/cart";
  } )
}

function checkout(){
  return fetch(`/order`, {
    method: 'post'
  }).then( (data) => {
    location = "/orders";
  } )
}