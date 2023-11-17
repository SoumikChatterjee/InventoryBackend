using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace InventoryManagement.Models
{
    public class Supplier
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;
        [BsonElement("email")]
        public string Email { get; set; } = String.Empty;
        [BsonElement("phone")]
        public string Phone { get; set; } = String.Empty;
        [BsonElement("products")]
        public List<string> Products { get; set; } = new List<string>();

    }
}
