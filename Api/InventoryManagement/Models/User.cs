using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InventoryManagement.Models
{
    public class User {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }=string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } =String.Empty;
        [BsonElement("email")]
        public string Email { get; set; }=String.Empty;
        [BsonElement("password")]
        public string Password { get; set; }=string.Empty;
        [BsonElement("role")]
        public string Role { get; set; } =string.Empty;
    }

}
