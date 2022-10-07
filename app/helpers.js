export function parseSearchParams(params) {
  return Array.from(params.entries())
    .filter(([param]) => ["seasons[]", "team_ids[]", "start_date", "end_date"].includes(param))
    .reduce((prevEntry, [currParam, currValue]) => {
      if (currParam.endsWith("[]") && prevEntry[currParam]) {
        if (!prevEntry[currParam].includes(currValue)) {
          prevEntry[currParam].push(currValue)
        }
        if (currParam === "team_ids[]") {
          prevEntry[currParam].splice(2)
        }
      } else if (currParam.endsWith("[]")) {
        prevEntry[currParam] = [currValue]
      } else {
        prevEntry[currParam] = currValue
      }

      if (
        prevEntry["seasons[]"] ||
        (prevEntry["start_date"] &&
          prevEntry["end_date"] &&
          new Date(prevEntry["start_date"]).getTime() > new Date(prevEntry["end_date"]).getTime())
      ) {
        delete prevEntry["start_date"]
        delete prevEntry["end_date"]
      }

      return prevEntry
    }, {})
}

export function enhancedDate(date) {
  date = new Date(date)

  return {
    weekDay: ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"][
      date.getDay()
    ],
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][date.getMonth()],
    monthDay: date.getDate(),
    year: date.getFullYear()
  }
}

export function timer(dateStr, timeStr) {
  console.log(dateStr, timeStr)

  const date = new Date(dateStr)

  const gmtOffset = nthSunday(2, 2) <= date.getTime() && date.getTime() <= nthSunday(1, 10) ? 4 : 5

  let hour = parseInt(timeStr.substring(0, timeStr.indexOf(":")))

  if (timeStr.charAt(timeStr.indexOf(" ") + 1) === "P") hour += 12

  const minutes = parseInt(timeStr.substring(timeStr.indexOf(":") + 1, timeStr.indexOf(":") + 3))

  date.setHours(date.getHours() + hour)
  date.setMinutes(date.getMinutes() + minutes)

  date.setTime(date.getTime() + gmtOffset * 3600 * 1000)

  console.log(date)

  function nthSunday(nthIn, month) {
    const switchDate = new Date(dateStr)

    switchDate.setMonth(month)
    switchDate.setDate(1)

    for (let nth = 0; nth < nthIn; nth++) {
      do switchDate.setDate(switchDate.getDate() + 1)
      while (switchDate.getDay() !== 0)
    }

    return switchDate.getTime()
  }
}
