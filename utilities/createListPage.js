createListPage =()=> {

    if(this.linkElementGrig.checked) {

        let listPage = this.cutPages(this.state.data)

        this.setState({pages: listPage})

        this.props.dispatch(change_mode_gallery(2)) 
    } else {

        this.props.dispatch(change_mode_gallery(1)) 
    }
}
// -------------------------------------------
cutPages =(list)=> {
    let numberPage = numberPages(this.props.data)

    let listPage = [];
    for(let i=0; i<numberPage;i++) {
        let startIndex = i*12;
        let endIndex = i*12+12;
        let newList = list.slice(startIndex, endIndex);
        listPage.push(newList)
    }
    return listPage 
}