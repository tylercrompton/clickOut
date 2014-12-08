/*!
 * Author: Tyler Crompton
 * http://tylercrompton.com/
 *
 * Licensed under the DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE.
 * http://sam.zoy.org/wtfpl/COPYING
 */

(function ($) {
	'use strict';

	var isChild = function (parent, child) {
		return !!$(parent).has(child).length;
	};

	var addEvent = $.event.add,
		removeEvent = $.event.remove,
		listeners = [],
		visitedListeners = [],
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

				if (!$(node).is(event.target) && !isChild(node, event.target) && visitedListeners.indexOf(node) === -1) {
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
		};

	$(function () {
		$(document).on('click', documentClickHandler);
	});

	$.event.special.clickout = {
		'noBubble': true
	};

	$.event.add = function (elem, types, handler, data, selector) {
		var splitTypes = (types || '').match(/\S+/g) || [''],
			i;

		for (i = 0; i < splitTypes.length; i += 1) {
			if (/^clickout\b/.test(splitTypes[i])) {
				listeners.push(elem);
			}
		}

		addEvent(elem, types, handler, data, selector);
	};

	$.event.remove = function (elem, types, handler, selector, mappedTypes) {
		var splitTypes = (types || '').match(/\S+/g) || [''],
			index,
			i;

		if (handler === documentClickHandler) {
			return;
		}

		for (i = 0; i < splitTypes.length; i += 1) {
			if (/^clickout\b/.test(splitTypes[i])) {
				index = listeners.indexOf(elem);
				if (index !== -1) {
					listeners.splice(index, 1);
					i -= 1;
				}
			}
		}

		removeEvent(elem, types, handler, selector, mappedTypes);
	};

	$.fn.clickOut = function (eventData, fn) {
		return arguments.length > 0 ? this.on('clickout', null, eventData, fn) : this.trigger('clickout');
	};
}(jQuery));
