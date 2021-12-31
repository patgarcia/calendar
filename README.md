# Monthly Calendar Generator

Using javascript's [`Date` built-in object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and CSS `grid` to generate a monthly calendar.

Type a date in a loose format _(e.g. 2006 12 Mar)_ and get its monthly calendar.

[Live demo](https://patricio.work/calendar/) <br />

### Initial ideas:

- Leverage `Date` object constructor to allow date input in loose format.
- Find out all days of the month for the selected day using only the `Date` object.
- Provide immediate visual feedback as the user types the date.
- Use a single CSS rule to format the calendar structure. `grid-template-columns: repeat(7, auto);`

### Future work:

- Convert to date-range picker
