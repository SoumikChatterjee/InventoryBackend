using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace InventoryManagement.Models
{
    public enum UserType
    {
        Customer,
        Supplier
    }
    public enum Status
    {
        Successfull,
        Pending,
        Failed
    }
    public class Orders
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userType")]
        [BsonRepresentation(BsonType.String)]
        public UserType UserType { get; set; }

        [BsonElement("orderDate")]
        public DateTime OrderDate { get; set; }

        [BsonElement("deliveryDate")]
        public DateTime DeliveryDate { get; set; }

        [BsonElement("person")]
        public Person Person { get; set; } = new Person();

        [BsonElement("items")]
        public List<ProductOrder> Items { get; set; } = new List<ProductOrder>();

        [BsonElement("status")]
        public Status Status { get; set; }
    }

    public class Person
    {
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("contact")]
        public string Contact { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
    }

    public class ProductOrder
    {
        [BsonElement("product_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("priceAgreement")]
        public double PriceAgreement { get; set; }
    }
}
