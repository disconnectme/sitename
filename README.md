# sitename.js `1.4.0`

Determines a website’s canonical domain name (`disconnect.me`, `abc.net.au`,
even `byoogle.appspot.com`).

## Example

```html
<script type="text/javascript" src="sitename.js"></script>
<script type="text/javascript">
  var sitename = new Sitename;

  var id = setInterval(function() {
    if (sitename.isInitialized()) {
      clearInterval(id);
      jQuery('#sitename').html(sitename.get('https://disconnect.me/'));
          // sitename.js automagically loads jQuery.
    }
  }, 100);
</script>
<span id="sitename">A canonical domain name.</span>
```

## Constructor

### Sitename()

A class for determining a website’s canonical domain name.

## Methods

### {boolean} isInitialized()

Indicates whether the reference TLDs are loaded.

#### Return value

True if the reference TLDs are loaded or false if not.

### {string} get({string} url)

Determines a canonical domain name.

#### Parameter

`url` A website’s absolute URL.

#### Return value

A domain name or IP address.

## Author

[Brian Kennish](https://github.com/byoogle)

## License

Copyright 2012 Disconnect, Inc.

This Source Code Form is subject to the terms of the Mozilla Public License, v.
2.0. If a copy of the MPL was not distributed with this file, You can obtain one
at https://mozilla.org/MPL/2.0/.

## See also

[jQuery](https://github.com/jquery/jquery)
