import Order from "../models/orderModel.js";

export const getOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-pic")
      .populate("buyer")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({ success: true, message: "All orders fetched", orders });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Somthing went wrong", error });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-pic")
      .populate("buyer")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .send({ success: true, message: "All orders fetched", orders });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Somthing went wrong", error });
  }
};

export const updateOrderStatusController = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    const orders = await Order.find({})
      .populate("products", "-pic")
      .populate("buyer")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .send({ success: true, message: "All orders fetched", orders });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Somthing went wrong", error });
  }
};
