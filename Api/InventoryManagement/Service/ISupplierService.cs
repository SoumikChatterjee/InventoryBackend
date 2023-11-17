using InventoryManagement.Models;

namespace InventoryManagement.Service
{
    public interface ISupplierService
    {
        List<Supplier> GetSupplier();
        Supplier Get(string id);
        Supplier GetSupplierByName(string name);
        Task<Supplier> Create(Supplier supplier);
        void Update(string id, Supplier supplier);
        void Delete(string id);

        void PushProduct(string name, string pid);
        void DeleteProduct(string name, string pid);
    }
}
