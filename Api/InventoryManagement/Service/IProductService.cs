using InventoryManagement.Models;

namespace InventoryManagement.Service
{
    public interface IProductService
    {
        List<Product> GetProducts();
        Product Get(string id);
        Product Create(Product product);
        void Update(string id,Product product);
        void Delete(string id);
    }
}
