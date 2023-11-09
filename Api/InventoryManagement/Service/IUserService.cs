using InventoryManagement.Models;

namespace InventoryManagement.Service
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Get(string id);
        User Create(User user);
        void Update(string id,User user);
        void Delete(string id);
    }
}
