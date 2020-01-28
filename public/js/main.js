function deleteProduct(productId){
  return fetch(`/admin/product/${productId}`, {
    method: 'delete',
    headers: {
      'CSRF-Token': getToken()
    },
  }).then( (data) => {
    location = "/admin/products";
  } )
};

function deleteProductFromCart(productId){
  return fetch(`/cart/products/${productId}`, {
    method: 'delete',
    headers: {
      'CSRF-Token': getToken()
    },
  }).then( (data) => {
    location = "/cart";
  } )
};

function checkout(){
  return fetch(`/order`, {
    method: 'POST',
    headers: {
      'CSRF-Token': getToken()
    },
  }).then( (data) => {
    location = "/orders";
  } )
};

function logout(){
  return fetch(`/logout`, {
    method: 'POST',
    headers: {
      'CSRF-Token': getToken()
    },
  }).then( (data) => {
    location = "/login";
  } )
};

function getToken(){
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return token;
}