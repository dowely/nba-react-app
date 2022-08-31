export function parseSearchParams(params) {
  return Array.from(params.entries())
    .filter(([param]) => ["seasons[]", "team_ids[]", "start_date"].includes(param))
    .reduce((prevEntry, [currParam, currValue]) => {
      if (prevEntry[currParam]) {
        prevEntry[currParam].push(currValue)
      } else if (currParam.endsWith("[]")) {
        prevEntry[currParam] = [currValue]
      } else {
        prevEntry[currParam] = currValue
      }
      return prevEntry
    }, {})
}
