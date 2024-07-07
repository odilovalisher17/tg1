import React, { useEffect, useState } from "react";
import "./ViewOrder.css";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ViewOrder = () => {
  const selectedProducts = useSelector((state) => state.selectedProducts);
  const [allSum, setAllSum] = useState(0);

  /* eslint-disable */
  useEffect(() => {
    let sum = selectedProducts
      .filter((p) => p.num > 0)
      .reduce((t, cv) => {
        return t + cv.details.unit_price * cv.num;
      }, 0);

    setAllSum(sum);
  }, []);
  /* eslint-enable */

  const handleOrderPay = async () => {
    try {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      const cart = await axios.post(`http://127.0.0.1:8000/carts/`, {
        telegram_id: userId,
      });
      console.log(cart.data.id);

      async function fetchSequentially(sP, c) {
        const promises = sP.map((item) =>
          axios
            .post(`http://127.0.0.1:8000/carts/${c}/items/`, {
              product_id: item.details.id,
              quantity: item.num,
            })
            .catch((error) => {
              console.error(`Failed to fetch ${item}:`, error);
            })
        );

        return Promise.all(promises);
      }

      await fetchSequentially(selectedProducts || [], cart.data.id);

      await window.Telegram.WebApp.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="view-order-card">
      <Container>
        <div className="view-order-header">
          <div>Your order</div>

          <div>
            <NavLink to={"/"}>Edit</NavLink>
          </div>
        </div>

        {selectedProducts.length === 0 && (
          <div>
            <h5>You have not chosen a product!</h5>
            <NavLink to={"/"}>Click here!</NavLink>
          </div>
        )}

        <div className="view-order-products">
          {selectedProducts
            .filter((p) => p.num > 0)
            .map((s) => (
              <div className="view-order-product">
                <div className="view-order-product-left">
                  <div>
                    <img src={s.details.image} alt="" />
                  </div>

                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                      {s.details.title}{" "}
                      <span style={{ color: "rgba(248, 169, 23)" }}>
                        {s.num}x
                      </span>
                    </div>
                    {/* <div>Cat Stor</div> */}
                  </div>
                </div>

                <div className="view-order-product-right">
                  ${s.details.unit_price * s.num}
                </div>
              </div>
            ))}
        </div>
      </Container>

      {selectedProducts.length > 0 && (
        <div className="view-order-pay" onClick={handleOrderPay}>
          PAY <span>${allSum}</span>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
