#clickOut

A jQuery plugin for handling the event of clicking outside of any particular element(s)

This event is compatible with jQuery's standard event API. Note that the `clickout` event does **not** bubble up the DOM.

For the sake of efficiency, this plugin does make some slight modifications to the jQuery internals. Otherwise, this plugin would have to traverse your entire DOM for every click! If this causes any compatability issues, please open an issue or submit a pull request.

There are two ways to register a `clickout` handler. One strategy is to register it with the [`on`](https://api.jquery.com/on/) method.

    $('#foo').on('clickout', function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

The other way is to use the helper method.

    $('#foo').clickOut(function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

Note that the order in which you attach the handlers matters. The handlers will be executed in a depth-first-search manner with the order in which it searches defined by the order in which the handlers are attached.

There are three ways to trigger the event. One strategy is to use the [`trigger`](https://api.jquery.com/trigger/) method.

    $('#foo').trigger('clickout');

The second way is to the the helper method.

    $('#foo').clickOut();

Finally, simply clicking outside of the element will trigger the event as well.

