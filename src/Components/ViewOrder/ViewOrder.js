import React, { useEffect, useState } from "react";
import "./ViewOrder.css";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewOrder = () => {
  const selectedProducts = useSelector((state) => state.selectedProducts);
  const [allSum, setAllSum] = useState(0);

  useEffect(() => {
    let sum = selectedProducts
      .filter((p) => p.num > 0)
      .reduce((t, cv) => {
        return t + cv.details.unit_price.replace(",", ".") * cv.num;
      }, 0);

    setAllSum(sum);
  }, []);

  return (
    <div className="view-order-card">
      <Container>
        <div className="view-order-header">
          <div>Your order</div>

          <div>
            <NavLink to={"/cat/4"}>Edit</NavLink>
          </div>
        </div>

        <div className="view-order-products">
          {selectedProducts
            .filter((p) => p.num > 0)
            .map((s) => (
              <div className="view-order-product">
                <div className="view-order-product-left">
                  <div>
                    <img src="/image/cat.png" alt="" />
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
                  ${s.details.unit_price.replace(",", ".") * s.num}
                </div>
              </div>
            ))}
        </div>
      </Container>

      <div
        className="view-order-pay"
        onClick={() => window.Telegram.WebApp.close()}>
        PAY <span>${allSum}</span>
      </div>
    </div>
  );
};

export default ViewOrder;
