window.Utils = window.Utils || {};

Utils.popupWindow = function (url, width, height) {
	var newwindow;
  var  screenX     = typeof window.screenX     != 'undefined' ? window.screenX     : window.screenLeft,
       screenY     = typeof window.screenY     != 'undefined' ? window.screenY     : window.screenTop,
       outerWidth  = typeof window.outerWidth  != 'undefined' ? window.outerWidth  : document.body.clientWidth,
       outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
       width    = width,
       height   = height,
       left     = parseInt(screenX + ((outerWidth - width) / 2), 10),
       top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
       features = (
          'width='   + width +
          ',height=' + height +
          ',left='   + left +
          ',top='    + top +
          ', scrollbars=no, menubar=no, toolbar=no, status=no, location=no, directories=no'
        );

  newwindow=window.open(url,'',features);

  if (window.focus) {
    newwindow.focus();
  }
  return newwindow;
}


function ucfirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}




function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
};





Handlebars.registerHelper('displayDateTime', function () {
  var datetime = new Date();
  lang = document.getElementById('#__USER_LOCALE__');
  switch (lang) {
    case 'fr' : return ucfirst(moment(datetime).format("dddd, Do MMMM, h:mm a"));
    case 'en' : 
    default   : return ucfirst(moment(datetime).format("dddd, MMMM Do, h:mm a"));
  }
})





window.qsi = window.qsi || {};

// qsi.alert = function (options) {

//   var $modal = $('#alert');
//   var lang = $('html').attr('lang');
//   var template = Handlebars.compile(options.message + '[lang="' + lang + '"]').html();
//   var message = template(options)

//   $modal.find('.message').html(options.message);
//   $modal.modal('show');
// }


// qsi.confirm = function (options) {
//   var confirmCallback = typeof options.confirm !== 'undefined' ? options.confirm : function () {};
//   var closeCallback   = typeof options.close !== 'undefined' ? options.close : function () {};
//   $modal = $('#confirm');
//   $modal.find('.message').html(options.message);
//   $close   = $modal.find('.close-button');
//   $confirm = $modal.find('.confirm-button');
//   $modal.on('hide.bs.modal', function () {
//     $close.off('click');
//     $confirm.off('click');
//   });
//   $close.on('click', function (e) {
//     e.preventDefault();
//     closeCallback(false);
//   });
//   $confirm.on('click', function (e) {
//     e.preventDefault();
//     $modal.modal('hide');
//     confirmCallback(true);
//   });
//   $modal.modal('show');
// }



// qsi.alert()

qsi.alert = function () {
  var $modal = $('#alert');
  var $message = $modal.find('.message');

  return {

    setMessage: function (selector, variables) {
      var lang = $('html').attr('lang');
      var variables = typeof variables !== 'undefined' ? variables : {};

      var source = $(selector+'[lang="'+lang+'"]').html();
      var template = Handlebars.compile(source);
      $message.html(template(variables));
    },

    show: function () {
      $modal.modal('show');
    },

  }
};



// var WindowInfo = function () {
//   var $modal = $('#info');
//   var $message = $modal.find('#infoMessage');

//   return {

//     setMessage: function (selector, variables) {
//       var lang = $('html').attr('lang');
//       var variables = typeof variables !== 'undefined' ? variables : {};

//       var source = $(selector+'[lang="'+lang+'"]').html();
//       var template = Handlebars.compile(source);
//       $message.html(template(variables));
//     },

//     show: function () {
//       $modal.modal('show');
//     },

//   }
// };



qsi.confirm = function () {
  var $modal = $('#confirm');
  var $message = $('.message');
  var $close = $modal.find('.close-button');
  var $confirm = $modal.find('.confirm-button');

  var confirmCallback = function () {};
  var closeCallback   = function () {};

  $modal.on('hide.bs.modal', function () {
    $close.off('click');
    $confirm.off('click');
  })


  $confirm.on('click', function (e) {
    e.preventDefault();
    $modal.modal('hide');
    confirmCallback(true)
  })


  $close.on('click', function (e) {
    e.preventDefault();
    $modal.modal('hide');
    closeCallback(false);
  });


  return {

    setMessage: function (selector, variables) {
      var lang = $('html').attr('lang');
      var variables = typeof variables !== 'undefined' ? variables : {};

      var source = $(selector+'[lang="'+lang+'"]').html();
      var template = Handlebars.compile(source);
      $message.html(template(variables));
    },

    setConfirm: function (cb) {
      confirmCallback = cb;
      // var cb = typeof cb !== 'undefined' ? cb : function () {};
      // $confirm.on('click', function (e) {
      //   e.preventDefault();
      //   $modal.modal('hide');
      //   cb(true);
      // })
    },

    setClose: function (cb) {
      closeCallback = cb;
      // var cb = typeof cb !== 'undefined' ? cb : function () {};
      // $close.on('click', function (e) {
      //   e.preventDefault();
      //   $modal.modal('hide');
      //   cb(false);
      // });
    },

    show: function () {
      $modal.modal('show');
    },

  }


};








// var WindowPrompt = function () {
//   var $modal = $('#prompt');
//   var $message = $('#promptMessage');

//   $modal.on('hide.bs.modal', function () {
//     $('#promptConfirmButton').off('click');
//     $('#promptCloseButton').off('click');
//   })

//   return {

//     setMessage: function (selector, variables) {
//       var lang = $('html').attr('lang');
//       var variables = typeof variables !== 'undefined' ? variables : {};

//       var source = $(selector+'[lang="'+lang+'"]').html();
//       var template = Handlebars.compile(source);
//       $message.html(template(variables));
//     },

//     setConfirm: function (cb) {
//       var cb = typeof cb !== 'undefined' ? cb : function () {};
//       $('#confirmConfirmButton').on('click', function (e) {
//         e.preventDefault();
//         $modal.modal('hide');
//         cb(true);
//       })
//     },

//     setClose: function (cb) {
//       var cb = typeof cb !== 'undefined' ? cb : function () {};
//       $('#confirmCloseButton').on('click', function (e) {
//         e.preventDefault();
//         cb(false);
//         $modal.modal('hide');
//       });
//     },

//     show: function () {
//       $modal.modal('show');
//     },

//   }


// };





// var handlebar_message = function (selector, variables) {
//   var lang = $('html').attr('lang');
//   var variables = typeof variables !== 'undefined' ? variables : {};

//   var source = $(selector+'[lang="'+lang+'"]').html();
//   var template = Handlebars.compile(source);
//   return template(variables);

// }








/* HANDLEBARS HELPERS */
// Handlebars.registerHelper('formatTime', function (date) {
//   var date = new Date(date);
//   return moment(date).format('h:mm a');
// });

// Handlebars.registerHelper('formatDate', function (date, lang) {
//   var date = new Date(date);
//   switch (lang) {
//     case 'en' : return capitaliseFirstLetter(moment(date).format("dddd, MMMM Do, h:mm a"));
//     case 'fr' : return capitaliseFirstLetter(moment(date).format("dddd, Do MMMM, h:mm a"));
//   }
// });

// Handlebars.registerHelper('titleDate', function (date, lang) {
//   var date = new Date(date);
//   switch (lang) {
//     case 'en' : return capitaliseFirstLetter(moment(date).format("dddd, MMMM Do"));
//     case 'fr' : return capitaliseFirstLetter(moment(date).format("dddd, Do MMMM"));
//   }
// });


// Handlebars.registerHelper('ifCond', function(v1, v2, options) {
//   if(v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

















