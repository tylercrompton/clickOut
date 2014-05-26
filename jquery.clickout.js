/*!
 * Author: Tyler Crompton
 * http://tylercrompton.com/
 *
 * Licensed under the DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE.
 * http://sam.zoy.org/wtfpl/COPYING
 */

(function ($) {
	'use strict';

	var isTarget = function (delegateTarget, target) {
		return $(target).is(delegateTarget);
	};

	var isChildTarget = function (currentTarget, target) {
		return !!$(currentTarget).has(target).length;
	}

	$.fn.clickOut = function (data, fn) {
		if (arguments.length === 0) {
			return this.trigger('clickout');
		} else if (arguments.length === 1) {
			fn = data;
			data = undefined;
		}

		$(document).click(
			$.proxy(function (event) {
				var target = event.target;
				if (!isTarget(this, target) && !isChildTarget(this, target)) {
					this.trigger($.Event('clickout', {target: this}));
				}
			}, this)
		);

		return this.on('clickout', function (event) {
			event.stopPropagation();

			fn.call(this, event);
		});
	};
}(jQuery));
