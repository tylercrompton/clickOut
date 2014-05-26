#clickOut

A jQuery plugin for adding events for clicking outside of any particular element(s)

The API for the `clickout` event is similar to that of the `click` event and others.

There are two way to register a `clickout` event. One strategy is to register it with the [`on`](https://api.jquery.com/on/) method.

    $('#foo').on('clickout', function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

The other way is to use the helper method.

    $('#foo').clickOut(function (event) {
    	window.alert('You clicked outside of the tag whose id attribute is "foo."');
    });

Similarly, there are two ways to trigger the event. One strategy is to use the [`trigger`](https://api.jquery.com/trigger/) method.

    $('#foo').trigger('clickout');

The other way is to the the helper method.

    $('#foo').clickOut();
