<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
    {
        try {
            $orders = Order::with(['user', 'item.product'])->get();

            return response()->json([
                'status' => true,
                'data' => $orders
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id'      => 'required|exists:users,id',
                'order_date'   => 'required|date',
                'total_amount' => 'required|numeric|min:0',
                'status'       => 'required|string',
                'item'        => 'required|array|min:1',
                'item.*.product_id' => 'required|exists:products,id',
                'item.*.quantity'   => 'required|integer|min:1',
                'item.*.price'      => 'required|numeric|min:0'
            ]);

            // Create order
            $order = new Order();
            $order->user_id = $data['user_id'];
            $order->order_date = $data['order_date'];
            $order->total_amount = $data['total_amount'];
            $order->status = $data['status'];
            $order->save();

            // Create order items
            foreach ($data['item'] as $item) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $item['product_id'];
                $orderItem->quantity = $item['quantity'];
                $orderItem->price = $item['price'];
                $orderItem->save();
            }

            return response()->json([
                'status' => true,
                'message' => 'Order created successfully',
                'data' => $order->load(['items.product', 'user'])
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
     public function show($id)
    {
        try {
            $order = Order::with(['user', 'items.product'])->findOrFail($id);

            return response()->json([
                'status' => true,
                'data' => $order
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
       public function update(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);

            $data = $request->validate([
                'user_id'      => 'sometimes|exists:users,id',
                'order_date'   => 'sometimes|date',
                'total_amount' => 'sometimes|numeric|min:0',
                'status'       => 'sometimes|string'
            ]);

            $order->update($data);

            return response()->json([
                'status' => 'update successfully',
                'data' => $order->load(['items.product', 'user'])
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
       public function destroy($id)
    {
        try {
            $order = Order::findOrFail($id);

            // Delete related items first
            $order->items()->delete();

            // Delete order
            $order->delete();

            return response()->json([
                'status' => true,
                'message' => 'Order deleted successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
