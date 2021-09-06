export const handleDate = (dt) => {
    const parsedDate = new Date(dt)
    const day = parsedDate.getDate()
    const month = parsedDate.getMonth() + 1
    const year = parsedDate.getFullYear()
    const response = day + '/' + month + '/' + year
    return response
}

export const getDefaultTodayDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const today = Date.parse(`${year}/${month}/${day}`)
    return today
}

export const findDt = (createdAt) => {
    const parsedDate = handleDate(createdAt)
    const arrDate = parsedDate.split('/')
    const finalDate = Date.parse(`${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`)
    return finalDate
}

export const findLastEntries = (data) => {
    let allDates = data.map(d => findDt(d.createdAt))
    const lastDay = Math.max(...allDates)
    const lastEntries = data.filter(e => findDt(e.createdAt) === lastDay)

    allDates = allDates.filter(e => e < lastDay)
    const secondDay = Math.max(...allDates)
    const secondEntries = data.filter(e => findDt(e.createdAt) === secondDay)

    return [lastEntries, secondEntries]
}

// const day = 86400000 // milliseconds
