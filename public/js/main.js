function deleteProduct(productId){
  return fetch(`/admin/product/${productId}`, {
    method: 'delete'
  }).then( (data) => {
    location = "/admin/products";
  } )
}

