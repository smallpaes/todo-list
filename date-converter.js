module.exports = {
  convertDate(originalDate) {
    const formatedDate = new Date(originalDate)
    let month = formatedDate.getMonth() + 1
    month = month.toString().padStart(2, '0')
    const date = formatedDate.getDate().toString().padStart(2, '0')
    const year = formatedDate.getFullYear()
    return `${year}-${month}-${date}`
  }
}