var http = (function() {
  var ajax = function(method, url, headers, data, success, error) {
    var xmlhttp = new XMLHttpRequest();
    var postBody;

    xmlhttp.onreadystatechange = function() {
      var response = false;
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.responseText) {
          if (xmlhttp.getResponseHeader("Content-Type") === "application/json") {
            response = JSON.parse(xmlhttp.responseText);
          } else {
            response = xmlhttp.responseText;
          }
        }
        if (xmlhttp.status == 200) {
          success && success.call(null, response);
        } else {
          error && error.call(null, response);
        }
      }
    };
    xmlhttp.open(method, url, true);
    if (data) {
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      postBody = 'json=' + encodeURIComponent(JSON.stringify(data));
    }
    if (headers) {
      for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
          var headerValue = headers[header];
          xmlhttp.setRequestHeader(header, headerValue);
        }
      }
    }
    xmlhttp.send(postBody);
  };
  return {
    ajax: ajax,

    get : function(url, success, error) {
      ajax("GET", url, false, false, success, error);
    },

    post : function(url, data, success, error) {
      ajax("POST", url, false, data, success, error);
    },

    put : function(url, data, success, error) {
      ajax("PUT", url, false, data, success, error);
    },

    delete : function(url, success, error) {
      ajax("DELETE", url, false, false, success, error);
    }
  };
})();