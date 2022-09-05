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
