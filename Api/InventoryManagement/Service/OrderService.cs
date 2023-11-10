using InventoryManagement.Models;
using MongoDB.Driver;

namespace InventoryManagement.Service
{
    public class OrderService : IOrderService
    {
        private readonly IMongoCollection<Orders> _orders;
        public OrderService(IMongoClient? mongoClient, IDatabaseSettings? databaseSettings)
        {
            var database = mongoClient.GetDatabase(databaseSettings.DatabaseName);
            _orders = database.GetCollection<Orders>(databaseSettings.OrdersCollectionName);
        }

        public Orders Create(Orders order)
        {
            _orders.InsertOne(order);
            return order;
        }

        public void Delete(string id)
        {
            _orders.DeleteOne(product => product.Id == id);
        }

        public Orders Get(string id)
        {
            return _orders.Find(product => product.Id == id).FirstOrDefault();
        }

        public List<Orders> GetOrders()
        {
            return _orders.Find(product => true).ToList();
        }
        public void Update(string id, Orders pro)
        {
            pro.Id = id;
            _orders.ReplaceOne(pro => pro.Id == id, pro);
        }
    }
}
