using InventoryManagement.Models;
using MongoDB.Driver;

namespace InventoryManagement.Service
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        public UserService(IMongoClient? mongoClient, IDatabaseSettings? databaseSettings)
        {
            var database = mongoClient.GetDatabase(databaseSettings.DatabaseName);
            _users = database.GetCollection<User>(databaseSettings.UserCollectionName);
        }

        public async Task<User> Create(User user)
        {
            user.Password=BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _users.InsertOneAsync(user);
            return user;
        }

        public void Delete(string id)
        {
            _users.DeleteOne(student => student.Id == id);
        }

        public User Get(string id)
        {
            return _users.Find(student => student.Id == id).FirstOrDefault();
        }

        public List<User> GetUsers()
        {
            return _users.Find(user => true).ToList();
        }

        public void Update(string id, User user)
        {
            user.Id=id;
            //I want the user with this id here.
            var existingUser = _users.Find(user => user.Id == id).FirstOrDefault();
            user.Password=existingUser.Password; 

            _users.ReplaceOne(student => student.Id == id, user);
        }

        public User GetLogin(string email)
        {
            return _users.Find(student => student.Email == email).FirstOrDefault();
        }
    }
}
