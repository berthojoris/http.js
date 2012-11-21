http.js
=======

Simple and small JavaScript ajax library

All this library does is provide a simple wrapper around the XMLHttpRequest object.

These methods should be fairly self-explanatory. 'headers' is an object with header key/value pairs. If provided, 'data' attributes will be sent as a 'application/x-www-form-urlencoded' body on the request. Lastly, if the response content type is 'application/json', the response will be parsed and the resulting object passed to the 'success' or 'error' callbacks. Otherwise the response text is passed to the 'success' or 'error' callbacks.

Method signatures:

http.ajax : function(method, url, headers, data, success, error)

http.get : function(url, success, error)

http.post : function(url, data, success, error)

http.put : function(url, data, success, error)

http.delete : function(url, success, error)

Usage example:

`
http.post("users/james", {
  name:"James Joyce",
  password:"Ulysses"
}, function (response) {
  alert("It worked");
}, function (response) {
  alert("Ooops!\n" + JSON.stringify(response));
});
`