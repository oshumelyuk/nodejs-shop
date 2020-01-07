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