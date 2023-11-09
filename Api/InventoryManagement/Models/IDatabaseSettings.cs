namespace InventoryManagement.Models
{
    public interface IDatabaseSettings
    {
        //string OrdersCollectionName { get; set; }
        //string ProductCollectionName { get; set; }
        string UserCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
