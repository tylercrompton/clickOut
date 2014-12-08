#clickOut

A jQuery plugin for handling the event of clicking outside of any particular element(s)

This event is compatible with jQuery's standard event API. Note that the `clickout` events do **not** bubble up the DOM tree and typically execute before all `click` event handlers.

For the sake of consistency, this plugin makes a slight modifications to the jQuery internals. Otherwise, the timing of the click event handlers would be less predictable! If this causes any compatability issues, please open an issue or submit a pull request.

There are two ways to register a `clickout` event handler. One strategy is to register it with the [`on`](https://api.jquery.com/on/) method.

    $('#foo').on('clickout', function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

The other way is to use the helper method.

    $('#foo').clickOut(function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

Note that the order in which you attach the event handlers matters. They will be executed in a depth-first-search manner in the order in which the handlers are attached.

There are three ways to trigger the event. One strategy is to use the [`trigger`](https://api.jquery.com/trigger/) method.

    $('#foo').trigger('clickout');

The second way is to the the helper method.

    $('#foo').clickOut();

Finally, simply clicking outside of the element will trigger the event as well.

