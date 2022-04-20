const items = require("./fakedb")
class Item{
    constructor(name, price){
        this.name = name;
        this.price = price
        items.push(this)
    }

    static find(name) {
        const foundItem = items.find(v => v.name === name);
        if(foundItem === undefined){
          throw { message: "Not Found", status: 404 }
        }
        return foundItem
      }

      static remove(name){
          let idx = items.findIndex(v => v.name === name);
          if (idx === -1) {
            throw {message: "Not Found", status: 404}
          }
          items.splice(idx)

      }
}




module.exports = Item;