namespace InventoryManagement.Models
{
    public class DatabaseSettings:IDatabaseSettings
    {
        public string OrdersCollectionName { get; set; }=string.Empty;
        public string ProductCollectionName { get; set; } = string.Empty;
        public string UserCollectionName { get; set; } = string.Empty;
        public string SupplierCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}
