function filterLogsByEnv(logs, env) {
  const filteredLogs = []

  logs.forEach((log) => {
    
    if (log.environment === env) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

function filterLogsOnDate(logs, dateFilter) {
  const filteredLogs = []
  const parsedDateFilter = new Date(dateFilter)

  logs.forEach((log) => {
    let timestampDateTime = new Date(log.timestamp)
    const timestampDate =new Date(
      Date.UTC(timestampDateTime.getUTCFullYear()
      ,timestampDateTime.getMonth()
      ,timestampDateTime.getDate(), 0, 0, 0)
      )

    if (parsedDateFilter.toGMTString() === timestampDate.toGMTString()) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

module.exports.filterLogs = function (logs, env, dateFilter) {
  const envLogs = filterLogsByEnv(logs, env)

  if (dateFilter) {
    return filterLogsOnDate(envLogs, dateFilter)
  } else {
    return envLogs
  }
}
