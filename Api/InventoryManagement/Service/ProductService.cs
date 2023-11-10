using InventoryManagement.Models;
using MongoDB.Driver;

namespace InventoryManagement.Service
{
    public class ProductService : IProductService
    {
        private readonly IMongoCollection<Product> _products;
        public ProductService(IMongoClient? mongoClient, IDatabaseSettings? databaseSettings)
        {
            var database = mongoClient.GetDatabase(databaseSettings.DatabaseName);
            _products = database.GetCollection<Product>(databaseSettings.ProductCollectionName);
        }

        public Product Create(Product product)
        {
            _products.InsertOne(product);
            return product;
        }

        public void Delete(string id)
        {
            _products.DeleteOne(product => product.Id == id);
        }

        public Product Get(string id)
        {
            return _products.Find(product => product.Id == id).FirstOrDefault();
        }

        public List<Product> GetProducts()
        {
            return _products.Find(product => true).ToList();
        }

        public void Update(string id, Product pro)
        {
            pro.Id = id;
            _products.ReplaceOne(pro => pro.Id == id, pro);
        }

     }
}
