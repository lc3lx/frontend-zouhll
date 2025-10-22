import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import useAddExchangeRateHook from "../../hook/exchangeRate/add-exchange-rate-hook";

const AdminAddExchangeRate = () => {
  const [
    fromCurrency,
    toCurrency,
    rate,
    loading,
    onChangeFromCurrency,
    onChangeToCurrency,
    onChangeRate,
    handleSubmit,
  ] = useAddExchangeRateHook();

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">إضافة سعر صرف جديد</div>
        <Col sm="8">
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={onChangeFromCurrency}
            className="select input-form-area px-2 py-3 mt-3 text-center"
          >
            <option value="USD">دولار أمريكي (USD)</option>
            <option value="SYP">ليرة سورية (SYP)</option>
            <option value="EUR">يورو (EUR)</option>
            <option value="GBP">جنيه إسترليني (GBP)</option>
          </select>

          <select
            name="toCurrency"
            value={toCurrency}
            onChange={onChangeToCurrency}
            className="select input-form-area px-2 py-3 mt-3 text-center"
          >
            <option value="SYP">ليرة سورية (SYP)</option>
            <option value="USD">دولار أمريكي (USD)</option>
            <option value="EUR">يورو (EUR)</option>
            <option value="GBP">جنيه إسترليني (GBP)</option>
          </select>

          <input
            value={rate}
            onChange={onChangeRate}
            type="number"
            step="0.01"
            min="0"
            className="input-form d-block mt-3 px-3"
            placeholder="سعر الصرف"
          />

          <div className="mt-3 text-muted">
            <small>مثال: إذا كان 1 دولار = 15000 ليرة سورية، أدخل 15000</small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button
            type="submit"
            className="btn-save d-inline mt-2 "
            onClick={handleSubmit}
          >
            حفظ سعر الصرف
          </button>
          {loading === true ? (
            <Spinner animation="border" variant="primary" />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddExchangeRate;
