/*!
 * Author: Tyler Crompton
 * http://tylercrompton.com/
 *
 * Licensed under the DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE.
 * http://sam.zoy.org/wtfpl/COPYING
 */

(function ($) {
	'use strict';

	var removeClickHandler = $.event.special.click.remove,
		listeners = [],
		visitedListeners = [],
		isChild = function (parent, child) {
			return $(parent).has(child).length > 0;
		},
		documentClickHandler = function (event) {
			var i, j, node;

			while (listeners.length > 0) {
				i = 0;

				for (j = 1; j < listeners.length; j += 1) {
					if (isChild(listeners[i], listeners[j])) {
						i = j;
					}
				}

				node = listeners[i];

				if (!$(node).is(event.target) && !isChild(node, event.target) && visitedListeners.indexOf(node) === -1 && $(node).is(':visible')) {
					$(node).trigger($.Event('clickout', {
						target: event.target
					}));
				}

				i = listeners.indexOf(node);
				if (i !== -1) {
					visitedListeners.push(listeners.splice(i, 1)[0]);
				}
			}

			listeners = visitedListeners;
			visitedListeners = [];
		},
		addDocumentClickHandler = function () {
			var handler, clickEvents;

			$(document).on('click.clickout', documentClickHandler);
			clickEvents = $._data(document).events.click;
			clickEvents.splice(0, 0, clickEvents.splice(-1, 1)[0]);
		};

	$.event.special.clickout = {
		'noBubble': true,
		'add': function (handleObj) {
			listeners.push(this);
		},
		'remove': function (handleObj) {
			listeners.splice(listeners.indexOf(this), 1);
		}
	};

	$.fn.clickOut = function (eventData, fn) {
		if (arguments.length > 0) {
			this.on('clickout', null, eventData, fn)
		} else if (this.is(':visible')) {
			this.trigger('clickout');
		}

		return this;
	};

	$.event.special.click.remove = function (handleObj) {
		// Disable removal of the click handler that fires the clickout events.
		if (handleObj.handler === documentClickHandler) {
			addDocumentClickHandler();
		}

		if (removeClickHandler !== undefined) {
			removeClickHandler(handleObj);
		}
	};

	$(function () {
		addDocumentClickHandler();
	});
}(jQuery));
