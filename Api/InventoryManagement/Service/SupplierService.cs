using InventoryManagement.Models;
using MongoDB.Driver;

namespace InventoryManagement.Service
{
    public class SupplierService : ISupplierService
    {
        private readonly IMongoCollection<Supplier> _supplier;
        public SupplierService(IMongoClient? mongoClient, IDatabaseSettings? databaseSettings)
        {
            var database = mongoClient.GetDatabase(databaseSettings.DatabaseName);
            _supplier = database.GetCollection<Supplier>(databaseSettings.SupplierCollectionName);
        }
        public async Task<Supplier> Create(Supplier supplier)
        {
            await _supplier.InsertOneAsync(supplier);
            return supplier;
        }

        public void Delete(string id)
        {
            _supplier.DeleteOne(student => student.Id == id);
        }

        public Supplier Get(string id)
        {
            return _supplier.Find(student => student.Id == id).FirstOrDefault();
        }

        public List<Supplier> GetSupplier()
        {
            return _supplier.Find(supplier => true).ToList();
        }

        public void Update(string id, Supplier supplier)
        {
            supplier.Id = id;

            _supplier.ReplaceOne(student => student.Id == id, supplier);
        }

        public void PushProduct(string id, string pid)
        {
            //Push pid inside product array of the supplier of id
            var reqSupplier= _supplier.Find(student => student.Id == id).FirstOrDefault();
            reqSupplier.Products.Add(pid);

            _supplier.ReplaceOne(student => student.Id == id, reqSupplier);
        }


    }
}
