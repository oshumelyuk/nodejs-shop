function deleteProduct(productId){
  return fetch(`/admin/product/${productId}`, {
    method: 'delete'
  }).then( (data) => {
    location = "/admin/products";
  } )
};

function deleteProductFromCart(productId){
  return fetch(`/cart/products/${productId}`, {
    method: 'delete'
  }).then( (data) => {
    location = "/cart";
  } )
};

function checkout(){
  return fetch(`/order`, {
    method: 'POST'
  }).then( (data) => {
    location = "/orders";
  } )
};

function logout(){
  return fetch(`/logout`, {
    method: 'POST'
  }).then( (data) => {
    location = "/login";
  } )
};