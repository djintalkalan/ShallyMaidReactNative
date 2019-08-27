
export function checkRedux(state, action, value) {
    console.log("COMMON_FUNCTION_STATE:" + JSON.stringify(state))
    console.log("COMMON_FUNCTION_VALUE:" + value)

}

export function initializeBasket(basketData, action, restDetail, product) {
    action(null)
    addItemInBasket(basketData, action, restDetail, product)
}

export function addItemInBasket(basketData, action, restDetail, product) {

    const restId = restDetail.id
    const totalQuantity = getTotalQuantity(basketData,product)
    const totalPrice = this.getTotalPrice()
    const totalCgst = quantity * parseInt(restDetail.cgst)
    const totalSgst = quantity * parseInt(restDetail.sgst)
}


function getTotalQuantity(basketData,product) {
    let products = []
    let quantity = 0
    if(basketData && basketData.products && basketData.products.length>0){
        products = [...basketData.products,...[product]]
    }else{
        products = [product]
    }
    console.log("PRODUCTS:",JSON.stringify(products))
    products.forEach(element => {
        quantity += element.quantity
    });
}

