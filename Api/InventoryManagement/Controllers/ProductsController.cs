using InventoryManagement.Models;
using InventoryManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IProductService ProductService;
        public ProductsController(IProductService ProductService)
        {
            this.ProductService = ProductService;
        }
        // GET: api/<ProductsController>
        [HttpGet]
        public ActionResult<List<Product>> Get()
        {
            return ProductService.GetProducts();
        }
        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public ActionResult<Product> Get(string id)
        {
            var product = ProductService.Get(id);

            if (product == null)
            {
                return NotFound($"User with Id = {id} not found");
            }
            return product;
        }

        // POST api/<ProductsController>
        [HttpPost]
        public ActionResult<Product> Post([FromBody]Product product)
        {
            product.Id = ObjectId.GenerateNewId().ToString();
            ProductService.Create(product);

            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Product product)
        {
            var existingUser = ProductService.Get(id);

            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            ProductService.Update(id, product);

            return NoContent();
        }
        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var product= ProductService.Get(id);

            if (product == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            ProductService.Delete(product.Id);

            return Ok($"User with Id = {id} deleted");
        }
    }
}
