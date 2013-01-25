/**
 * A class for determining a website’s canonical domain name
 * (<samp>disconnect.me</samp>, <samp>abc.net.au</samp>, even
 * <samp>byoogle.appspot.com</samp>).
 * <br />
 * <br />
 * Copyright 2012, 2013 Disconnect, Inc.
 * <br />
 * <br />
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at <a
 * href="https://mozilla.org/MPL/2.0/">https://mozilla.org/MPL/2.0/</a>.
 * <br />
 * @constructor
 * @author <a href="https://github.com/byoogle">Brian Kennish</a>
 */
function Sitename() {
  /**
   * Indicates whether the reference TLDs are loaded.
   * @return {boolean} True if the reference TLDs are loaded or false if not.
   */
  this.isInitialized = function() { return initialized; };

  /**
   * Determines a canonical domain name.
   * @param  {string} url A website’s absolute URL.
   * @return {string}     A domain name or IP address.
   */
  this.get = function(url) {
    anchor.href = url;
    var domain = anchor.hostname;
    var labels = domain.split('.');
    var labelCount = labels.length - 1;

    // IP addresses shouldn’t be munged.
    if (isNaN(parseFloat(labels[labelCount]))) {
      domain = labels.slice(-2).join('.');
      for (var i = labelCount; i > 1; i--)
          if (tlds[labels.slice(-i).join('.')])
              domain = labels.slice(-i - 1).join('.');
    }

    return domain;
  };

  var version = '1.4.0';
  var tldList =
      'https://mxr.mozilla.org/mozilla-central/source/netwerk/dns/effective_tld_names.dat?raw=1';
  var altTldList = 'data/effective_tld_names.dat';
  var tldPatch = 'data/tldpatch.json';
  var undeclared = 'undefined';
  var initialized = false;
  var anchor = document.createElement('a');
  var tlds = localStorage.tlds;

  function parseTldList(data) {
    data = data.split('\n');
    var lineCount = data.length;
    initialized = false;
    tlds = {};

    for (var i = 0; i < lineCount; i++) {
      var line = jQuery.trim(data[i]);

      if (line && line.slice(0, 2) != '//') {
        // Fancy syntax is fancy.
        var prefix = line.charAt(0);
        if (prefix == '*' || prefix == '!') line = line.slice(1);

        if (line.charAt(0) == '.') line = line.slice(1);
        tlds[line] = true;
      }
    }

    jQuery.getJSON(tldPatch, function(data) {
      var tldCount = data.length;
      for (var i = 0; i < tldCount; i++) tlds[data[i]] = true;
      initialized = true;
      localStorage.tlds = JSON.stringify(tlds);
    });
  }

  if (typeof jQuery == undeclared) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'vendor/jquery.js');
    script.onload = function() { jQuery.noConflict(); };
    document.head.appendChild(script);
  }

  if (tlds) {
    tlds = JSON.parse(tlds);
    initialized = true;
  } else tlds = {};

  var id = setInterval(function() {
    if (typeof jQuery != undeclared) {
      clearInterval(id);
      var fetch = jQuery.get;

      fetch(tldList, function(data) { parseTldList(data); }).fail(function() {
        fetch(altTldList, function(data) { parseTldList(data); });
      });
    }
  }, 100);

  return this;
}
