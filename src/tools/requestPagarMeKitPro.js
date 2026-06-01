import axios from "axios";
import { baseApiUrl } from "src/global";

export const requestPagarMe = async () => {
  const data = {
    items: [
      {
        id: "9e6d5252-35ff-4f14-891f-6b1ab16dde5b", //homologação
        // id: "5fca32d9-2abd-42a1-9043-2920ef156530", //Produção
        title: "Kit Realocação Pró",
        unit_price: "2990",
        tangible: false,
        quantity: 1,
      },
    ],
    amount: "2990",
  };

  const token = localStorage.getItem("token");

  if (token) {
    let config = {
      method: "POST",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
      url: `${baseApiUrl}${"/orders/pagarme"}`,
    };

    let paymentOrderCreated = await axios(config)
      .then((created) => {
        return created;
      })
      .catch((err) => {
        return showError(err);
      });

    paymentOrderCreated.data.userId = localStorage.getItem("userId");
    paymentOrderCreated.data.pagarMeOrderId = paymentOrderCreated.data.id;
    paymentOrderCreated.data.status = "CREATED";
    paymentOrderCreated.data.dateCreated = new Date();
    paymentOrderCreated.data.expiresAt = new Date(
      paymentOrderCreated.data.expires_at
    );

    delete paymentOrderCreated.data.id;

    config = {
      method: "POST",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: paymentOrderCreated.data,
      url: `${baseApiUrl}${"/orders"}`,
    };

    await axios(config)
      .then((created) => {
        paymentOrderCreated.data.orderId = created.data.id;

        return created;
      })
      .catch((err) => {
        return showError(err);
      });

    const newOrderItem = {
      orderId: paymentOrderCreated.data.orderId,
      productId: "9e6d5252-35ff-4f14-891f-6b1ab16dde5b",
      amount: "2990",
      quantity: "1",
    };

    config = {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: newOrderItem,
      url: `${baseApiUrl}${"/orders/item"}`,
    };

    await axios(config).catch((err) => showError(err));

    return true;
  } else {
    return false;
  }
};
