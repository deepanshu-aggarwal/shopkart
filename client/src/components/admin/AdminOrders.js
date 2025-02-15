import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Select, Table } from "semantic-ui-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const status = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/order/get-all-orders");
      if (data.success) {
        setOrders(data.orders);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, value) => {
    try {
      const { data } = await axios.post(
        `/api/v1/order/update-order-status/${orderId}`,
        { status: value }
      );
      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOptions = () => {
    return status.map((s, i) => ({
      key: i,
      value: s,
      text: s,
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Payment</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders?.map((order, i) => (
          <Table.Row>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>
              <Select
                defaultValue={order.status}
                options={getOptions()}
                onChange={(e, { value }) =>
                  handleStatusUpdate(order._id, value)
                }
              />
            </Table.Cell>
            <Table.Cell>{moment(order.createdAt).fromNow()}</Table.Cell>
            <Table.Cell>{order.products.length}</Table.Cell>
            <Table.Cell>
              {order.payment?.transaction?.amount || "NAN"}
            </Table.Cell>
            <Table.Cell>
              {order.payment.success ? "Success" : "Failed"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AdminOrders;
