process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require('../app');
const Item = require("../item");
let ITEMS = require('../fakedb')


let pickles = new Item('Pickle', 3.99)

beforeEach( ()=>{
    ITEMS.length = 0

    ITEMS.push(pickles)
})

afterEach(()=>{
    ITEMS.length = 0
})


describe(' GET /items', ()=>{
    test("Gets all items", async ()=>{
       const res = await request(app).get('/items')
       expect(res.statusCode).toBe(200)
       expect(res.body).toEqual({items: [pickles]})
    })

})


describe(' Post /items', ()=>{
    test("Creates a new item", async()=>{
       const res = await request(app).post('/items').send({
           name: "Water",
           price: 2.99
       });
       expect(res.statusCode).toBe(200)
       expect(res.body).toEqual({item:{name: "Water",
       price: 2.99}})

    })

})


describe('PATCH /items/:name', ()=>{
    test('Updates item', async ()=>{
       const res = await request(app).patch(`/items/${pickles.name}`).send({
           name: "DillPickle", price:4
       });
       expect(res.statusCode).toBe(200)
       expect(res.body).toEqual({item:{name: "DillPickle",
       price: 4}})
    })
    test("responds with 404 for invalid name", async ()=>{
        const res = await request(app).patch(`/items/${test}`).send({
            name: "DillPickle", price:4
        });
       expect(res.statusCode).toBe(404)


    })

})

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

 describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
      const resp = await request(app).delete(`/items/${pickles.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });