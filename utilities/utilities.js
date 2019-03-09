//page counting function
function numberPages(list) {
    let quantity = (list.length)/12;
    let rounding = Math.ceil(quantity)
    return rounding
}
//page counting function

//cut list with data on page
function cutPages(list) {
    let List = [...list]
    let numberPage = numberPages(List)
    let listPage = [];
    for(let i=0; i<numberPage;i++) {
        let startIndex = i*12;
        let endIndex = i*12+12;
        let newList = List.slice(startIndex, endIndex);
        listPage.push(newList)
    }
    return listPage 
}
//cut list with data on page

//filter list by rating
function filterList(list) {
    let newList = [...list]
    newList.sort(function(a, b) {
        return b.counter_like - a.counter_like;
    })
    return newList
}
//filter list by rating

export {
    numberPages, cutPages, filterList,
}