using InventoryManagement.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace InventoryManagement.Service
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Get(string id);
        Task<User> Create(User user);
        void Update(string id,User user);
        void Delete(string id);

        User GetLogin(string email);
    }
}
