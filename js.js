var $window = $(window);

$(document).ready(function() {
  var stateObj = { foo: 'bar' };
  function change_my_url(url) {
    history.pushState(stateObj, 'page 2', url);
  }
  var link = document.getElementById('click');

  var page_num = 0;
  var scrollstatus = false;

  function check_if_in_view(e) {
    if (scrollstatus == true) return;

    setTimeout(function() {
      scrollstatus = false;
    }, 200);
    if (e.originalEvent.wheelDelta / 120 > 0) {
      //mouse scroll up
      if (page_num === 3) {
        var toLoad = 'index.html #content';
        func_load(toLoad, 'index.html');
        page_num = 0;
        scrollstatus = true;
        change_my_url('index.html');
        return;
      }
      $('#nav li a').each(function(i, ele) {
        if (scrollstatus === true) return;
        if (page_num + 1 == i) {
          var toLoad = $(this).attr('title') + ' #content';
          func_load(toLoad, $(this).attr('title'));
          page_num++;
          scrollstatus = true;
          change_my_url($(this).attr('title'));
          return;
        }
      });
    } else {
      //mouse scroll down
      if (page_num == 0) {
        var toLoad = 'legal.html #content';
        func_load(toLoad, 'legal.html');
        page_num = 3;
        scrollstatus = true;
        change_my_url('legal.html');
        return;
      }
      $('#nav li a').each(function(i, ele) {
        if (scrollstatus === true) return;
        if (page_num - 1 == i) {
          var toLoad = $(this).attr('title') + ' #content';
          func_load(toLoad, $(this).attr('title'));
          page_num--;
          scrollstatus = true;
          change_my_url($(this).attr('title'));
          return;
        }
      });
    }
  }

  $window.on('mousewheel', check_if_in_view);

  var hash = window.location.hash.substr(1);

  // var href = $('#nav li a').each(function() {
  //   var href = $(this).attr('title');
  //   if (hash == href.substr(0, href.length - 5)) {
  //     var toLoad = hash + '.html #content';
  //     $('#content').load(toLoad);
  //   }
  // });

  $('#nav li a').click(function() {
    var toLoad = $(this).attr('title') + ' #content';

    $('#content').hide('fast', function() {
      loadContent(toLoad);
    });
    $('#load').remove();
    $('#wrapper').append('<span id="load">LOADING...</span>');
    $('#load').fadeIn('normal');
    window.location.hash = toLoad.substr(0, toLoad.length - 5);
    change_my_url($(this).attr('title'));
    return false;

    // func_load(toLoad, $(this).atrr('href'));
  });

  function func_load(toLoad, h) {
    $('#content').hide('fast', function() {
      loadContent(toLoad);
    });
    $('#load').remove();
    $('#wrapper').append('<span id="load">LOADING...</span>');
    $('#load').fadeIn('normal');
    window.location.hash = h.substr(0, h.length - 5);
    return false;
  }

  function loadContent(toLoad) {
    $('#content').load(toLoad, '', showNewContent());
  }
  function showNewContent() {
    $('#content').show('normal', hideLoader());
  }
  function hideLoader() {
    $('#load').fadeOut('normal');
  }
  // function createRequestObject() {
  //   var returnObj = false;

  //   if (window.XMLHttpRequest) {
  //     returnObj = new XMLHttpRequest();
  //   } else if (window.ActiveXObject) {
  //     try {
  //       returnObj = new ActiveXObject('Msxml2.XMLHTTP');
  //     } catch (e) {
  //       try {
  //         returnObj = new ActiveXObject('Microsoft.XMLHTTP');
  //       } catch (e) {}
  //     }
  //   }
  //   return returnObj;
  // }

  // var http = createRequestObject();
  // var target;

  // // This is the function to call, give it the script file you want to run and
  // // the div you want it to output to.
  // function sendRequest(scriptFile, targetElement) {
  //   target = targetElement;
  //   try {
  //     http.open('get', scriptFile, true);
  //   } catch (e) {
  //     document.getElementById(target).innerHTML = e;
  //     return;
  //   }
  //   http.onreadystatechange = handleResponse;
  //   http.send();
  // }

  // function handleResponse() {
  //   if (http.readyState == 4) {
  //     try {
  //       var strResponse = http.responseText;
  //       document.getElementById(target).innerHTML = strResponse;
  //       change_my_url();
  //     } catch (e) {
  //       document.getElementById(target).innerHTML = e;
  //     }
  //   }
  // }
});
