
const dateTimeFormat = () => {
    const datatime = new Date.now().toISOString().slice(0, 19).replace('T', " ")
    return datatime
}

module.exports = {dateTimeFormat}