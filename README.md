# sitename.js `1.0.0`

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

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the
[GNU General Public License](https://www.gnu.org/licenses/gpl.html) for more
details.

## See also

[jQuery](https://github.com/jquery/jquery)
