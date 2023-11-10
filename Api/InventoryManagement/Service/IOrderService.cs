using InventoryManagement.Models;
using System.Collections.Generic;

namespace InventoryManagement.Service
{
    public interface IOrderService
    {
        List<Orders> GetOrders();
        Orders Get(string id);
        Orders Create(Orders user);
        void Update(string id, Orders order);
        void Delete(string id);
    }

}

