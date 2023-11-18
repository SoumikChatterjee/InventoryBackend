using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace InventoryManagement.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;
        [BsonElement("description")]
        public string Description { get; set; } = string.Empty;
        [BsonElement("sku")]
        public string SKU { get; set; } = string.Empty;
        [BsonElement("category")]
        public string Category { get; set; } = string.Empty;
        [BsonElement("menufacturer")]
        public string Manufacturer { get; set; } = string.Empty;

        [BsonElement("price")]
        public double Price { get; set; }

        [BsonElement("priceAgreement")]
        public double PriceAgreement { get; set; }

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("sold")]
        public int Sold { get; set; }
        [BsonElement("images")]
        public List<string> Images { get; set; }= new List<string>();
    }
}
