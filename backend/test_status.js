import pool from "./src/config/db.js";
import Order from "./src/models/order.model.js";

async function testStatusUpdate() {
  try {
    // 1. Place a test order
    const order = await Order.create({
      customerId: 'u1',
      chefId: 'u3',
      foodItemId: 'f1',
      quantity: 1,
      totalPrice: 1250,
      deliveryDate: '2026-07-09',
      deliveryTime: '7 PM',
      mealDescription: 'Test order for status update'
    });
    console.log(`\n✅ Order placed: ${order.id} (status=${order.status})`);

    // 2. Try updating to 'Preparing'
    const updated1 = await Order.updateStatus(order.id, 'Preparing');
    console.log(`✅ Status -> Preparing: ${updated1?.status}`);

    // 3. Try updating to 'Ready'
    const updated2 = await Order.updateStatus(order.id, 'Ready');
    console.log(`✅ Status -> Ready: ${updated2?.status}`);

    // 4. Try updating to 'Delivered'
    const updated3 = await Order.updateStatus(order.id, 'Delivered');
    console.log(`✅ Status -> Delivered: ${updated3?.status}`);

    // 5. Cleanup
    await pool.query("DELETE FROM orders WHERE id = $1", [order.id]);
    console.log(`\n✅ Cleaned up test order ${order.id}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

testStatusUpdate();
