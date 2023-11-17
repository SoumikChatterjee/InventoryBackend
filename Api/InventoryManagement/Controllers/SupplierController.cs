using InventoryManagement.Models;
using InventoryManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private ISupplierService supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            this.supplierService = supplierService;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult<List<Supplier>> Get()
        {
            return supplierService.GetSupplier();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult<Supplier> Get(string id)
        {
            var User = supplierService.Get(id);

            if (User == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            return User;
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Supplier supplier)
        {
            supplier.Id = ObjectId.GenerateNewId().ToString();

            var newUser = await supplierService.Create(supplier);

            return Ok(newUser);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Supplier supplier)
        {
            var existingSupplier= supplierService.Get(id);

            if (existingSupplier == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            supplierService.Update(id, supplier);

            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var User = supplierService.Get(id);

            if (User == null)
            {
                return NotFound($"Supplier with Id = {id} not found");
            }

            supplierService.Delete(User.Id);

            return Ok($"User with Id = {id} deleted");
        }

        [HttpPatch("push")]
        public ActionResult AddProduct(string id,string pid)
        {
            var User=supplierService.Get(id);
            if(User == null)
            {
                return NotFound($"Supplier with Id = {id} not found");
            }
            supplierService.PushProduct(id,pid);
            return Ok($"Supplier with Id = {id} updated");

        }
    }
}
