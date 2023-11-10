using InventoryManagement.Models;
using InventoryManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService OrderService;
        public OrderController(IOrderService orderService)
        {
            this.OrderService = orderService;
        }
        // GET: api/<ProductsController>
        [HttpGet]
        public ActionResult<List<Orders>> Get()
        {
            return OrderService.GetOrders();
        }
        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public ActionResult<Orders> Get(string id)
        {
            var order = OrderService.Get(id);

            if (order == null)
            {
                return NotFound($"User with Id = {id} not found");
            }
            return order;
        }

        // POST api/<ProductsController>

        [HttpPost]
        public ActionResult<Orders> Post([FromBody] Orders order)
        {
            order.Id = ObjectId.GenerateNewId().ToString();
            OrderService.Create(order);

            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }
        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Orders order)
        {
            var existingUser = OrderService.Get(id);

            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            OrderService.Update(id, order);

            return NoContent();
        }
        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var order = OrderService.Get(id);

            if (order == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            OrderService.Delete(order.Id);

            return Ok($"User with Id = {id} deleted");
        }
    }
}
