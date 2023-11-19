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

        [BsonElement("userEmail")]
        public string UserEmail { get; set; }

        [BsonElement("userType")]
        public string UserType { get; set; }

        [BsonElement("orderDate")]
        public string OrderDate { get; set; }


        [BsonElement("item")]
        public string Item { get; set; } = string.Empty;

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("isPaid")]
        public Boolean IsPaid { get; set; }=false;
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
        public string ProductId { get; set; }

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("priceAgreement")]
        public double PriceAgreement { get; set; }
    }
}
