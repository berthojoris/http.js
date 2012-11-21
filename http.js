/**
 * Copyright (C) 2012 James Blashill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var http = (function () {
  var ajax = function (method, url, headers, data, success, error) {
    var xmlhttp = new XMLHttpRequest();
    var postBody;

    xmlhttp.onreadystatechange = function () {
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
    ajax:ajax,

    get:function (url, success, error) {
      ajax("GET", url, false, false, success, error);
    },

    post:function (url, data, success, error) {
      ajax("POST", url, false, data, success, error);
    },

    put:function (url, data, success, error) {
      ajax("PUT", url, false, data, success, error);
    },

    delete:function (url, success, error) {
      ajax("DELETE", url, false, false, success, error);
    }
  };
})();