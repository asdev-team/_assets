const asdev_datetime = {
	element: function () {
		return document.querySelector( '.asdev-datetime > span' )
	},
	defaultLang: function () {
		return 'ru-RU'
	},
	currentLang: function () {
		return asdev_datetime_var.lang || asdev_datetime.defaultLang()
	},
	getDate: function ( mask, timeZone ) {
		const options = {
			year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone
		}

		const formattedDate          = new Date().toLocaleString( asdev_datetime.defaultLang(), options )
		const [ datePart, timePart ] = formattedDate.split( ', ' )

		const [ day, month, year ]        = datePart.split( '.' )
		const [ hours, minutes, seconds ] = timePart.split( ':' )

		return mask
		.replace( 'dd', day.padStart( 2, '0' ) )
		.replace( 'mm', month.padStart( 2, '0' ) )
		.replace( 'yyyy', year )
		.replace( 'HH', hours.padStart( 2, '0' ) )
		.replace( 'MM', minutes.padStart( 2, '0' ) )
		.replace( 'ss', seconds.padStart( 2, '0' ) )
	},
	update: function () {
		const langTimeZones = {
			'ru-RU': 'Europe/Moscow', 'sr-RS': 'Europe/Belgrade'
		}
		const timeZone      = langTimeZones[ asdev_datetime.currentLang() ] || 'UTC'

		const now                            = asdev_datetime.getDate( 'dd.mm.yyyy, HH:MM:ss', timeZone )
		asdev_datetime.element().textContent = now
	},
	start: function () {
		setInterval( asdev_datetime.update, 1000 )
	}
}
asdev_datetime.update()
document.addEventListener( 'DOMContentLoaded', asdev_datetime.start )
