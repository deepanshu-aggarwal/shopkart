import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Dropdown, Icon, Loader, Table } from "semantic-ui-react";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/order/get-orders");
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

  const getActions = () => {
    return [
      { text: "Expand", icon: "expand" },
      { text: "Cancel", icon: "cancel" },
    ];
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loader active />
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders?.map((order, i) => (
              <Table.Row>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{moment(order.createdAt).fromNow()}</Table.Cell>
                <Table.Cell>{order.products.length}</Table.Cell>
                <Table.Cell>
                  {order.payment?.transaction?.amount || "NAN"}
                </Table.Cell>
                <Table.Cell>
                  {order.payment.success ? "Success" : "Failed"}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    trigger={<Icon name="ellipsis vertical" />}
                    icon={null}
                  >
                    <Dropdown.Menu>
                      {getActions().map((item, i) => (
                        <Dropdown.Item text={item.text} icon={item.icon} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default Orders;
