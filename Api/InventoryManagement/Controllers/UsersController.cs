using BCrypt.Net;
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
        public async Task<IActionResult> Post([FromBody] User User)
        {
            User.Id = ObjectId.GenerateNewId().ToString();
                
             var newUser=await UserService.Create(User);

            return Ok(newUser);
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

        [HttpGet("login")]
        public ActionResult<User> GetLogin(string email,string password)
        {
            var User = UserService.GetLogin(email);

            if (User == null)
            {
                return NotFound($"Email Id not found");
            }
            else if (password != null && BCrypt.Net.BCrypt.Verify(password, User.Password))
            {
               return User;                
            }
            else
            return NotFound($"Password is wrong");
        }
    }
}
