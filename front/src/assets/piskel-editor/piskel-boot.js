(function () {

  /**
   * See @Gruntfile.js => after build, -2015-09-02-11-47 is replaced by the build version
   */
  var version = '-2015-09-02-11-47';
  var versionHasNotBeenReplaced = version.indexOf('@@') === 0;
  if (versionHasNotBeenReplaced)  {
    version = '';
  }

  window.onPiskelReady = function () {
    var loadingMask = document.getElementById('loading-mask');
    loadingMask.style.opacity = 0;
    window.setTimeout(function () {loadingMask.parentNode.removeChild(loadingMask);}, 600);
    pskl.app.init();
    // cleanup
    delete window.pskl_exports;
    delete window.loadDebugScripts;
    delete window.done;
  };

  var prefixPath = function (path) {
    if (window.pskl && window.pskl.appEngineToken_) {
      return '../' + path;
    } else {
      return path;
    }
  };

  var loadScript = function (src, callback) {
    src = prefixPath(src);
    var script = window.document.createElement('script');
    script.setAttribute('src',src);
    script.setAttribute('onload',callback);
    window.document.body.appendChild(script);
  };

  var loadStyle = function (src) {
    src = prefixPath(src);
    var link = document.createElement('link');
    link.setAttribute('href', src);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    document.head.appendChild(link);
  };

  if (window.location.href.indexOf('debug') != -1) {
    window.pskl_exports = {};
    var scriptIndex = 0;
    window.loadNextScript = function () {
      if (scriptIndex == window.pskl_exports.scripts.length) {
        window.onPiskelReady();
      } else {
        loadScript(window.pskl_exports.scripts[scriptIndex], 'loadNextScript()');
        scriptIndex ++;
      }
    };
    loadScript('piskel-script-list.js', 'loadNextScript()');

    window.loadStyles = function () {
      var styles = window.pskl_exports.styles;
      for (var i = 0 ; i < styles.length ; i++) {
        loadStyle(styles[i]);
      }
    };
    loadScript('piskel-style-list.js', 'loadStyles()');
  } else {
    var script;
    // if (window.location.href.indexOf('pack') != -1) {
      script = 'js/piskel-packaged' + version + '.js';
    // } else {
    //   script = 'js/piskel-packaged-min' + version + '.js';
    // }
    loadStyle('css/piskel-style-packaged' + version + '.css');

    var loaderInterval = window.setInterval(function () {
      if (document.querySelectorAll('[data-iframe-loader]').length === 0) {
        window.clearInterval(loaderInterval);
        loadScript(script, 'onPiskelReady()');
      } else {
        window.console.log('waiting for templates to load ....');
      }
    }, 100);
  }
})();