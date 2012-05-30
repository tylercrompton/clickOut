/*!
 * Author: Tyler Crompton
 * http://tylercrompton.com/
 *
 * Licensed under the DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE.
 * http://sam.zoy.org/wtfpl/COPYING
 *
 * Date: Wed May 30 15:10:00 -0600
 */

(function ($) {
	'use strict';

	$.fn.clickOut = function (data, fn) {
		$(document).click(
			// We don't want the following function's this.
			$.proxy(function (event) {
				// Child elements are still in the element so we must account for them.
				if (!$(event.target).is(this) && this.has(event.target).length === 0) {
					// Because we are invoking on $(document).click(), we must fix this value.
					event.delegateTarget = this.get();

					if (fn === undefined) {
						data.call(this, event);
					} else {
						fn.call(this, event);
					}
				}
			}, this)
		);
	};
}(jQuery));