using InventoryManagement.Models;
using InventoryManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private IUserService UserService;

        public UsersController(IUserService UserService)
        {
            this.UserService = UserService;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return UserService.GetUsers();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            var User = UserService.Get(id);

            if (User == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            return User;
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult<User> Post([FromBody] User User)
        {
            User.Id = ObjectId.GenerateNewId().ToString();
            UserService.Create(User);

            return CreatedAtAction(nameof(Get), new { id = User.Id }, User);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] User User)
        {
            var existingUser = UserService.Get(id);

            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            UserService.Update(id, User);

            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var User = UserService.Get(id);

            if (User == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            UserService.Delete(User.Id);

            return Ok($"User with Id = {id} deleted");
        }

    }
}
