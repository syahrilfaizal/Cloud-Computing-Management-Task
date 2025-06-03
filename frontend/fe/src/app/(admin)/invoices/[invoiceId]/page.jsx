import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoiceById } from '@/helpers/data';
import { currency } from '@/context/constants';
import SubmissionButton from './components/SubmissionButton';
import PageMetaData from '@/components/PageTitle';
import logoDark from '@/assets/images/logo-dark-full.png';
import logoLight from '@/assets/images/logo-light-full.png';
const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState();
  const {
    invoiceId
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    ;
    (async () => {
      if (invoiceId) {
        const data = await getInvoiceById(invoiceId);
        if (data) setInvoice(data);else navigate('/pages/error-404-alt');
      }
    })();
  }, []);
  return <>
      <PageMetaData title={invoice?.id ?? 'Invoice Details'} />

      <Row>
        <Col xs={12}>
          {invoice && <Card>
              <CardBody>
                <div className="clearfix">
                  <div className="float-sm-end">
                    <div className="auth-logo">
                      <img className="logo-dark me-1" height={24} src={logoDark} alt="logo-dark" />
                      <img className="logo-light me-1" height={24} src={logoLight} alt="logo-dark" />
                    </div>
                    <address className="mt-3">
                      1729 Bangor St,
                      <br />
                      Houlton, ME, 04730 <br />
                      <abbr title="Phone">P:</abbr> (207) 532-9109
                    </address>
                  </div>
                  <div className="float-sm-start">
                    <CardTitle as={'h5'} className="mb-2">
                      Invoice: #{invoice.id}
                    </CardTitle>
                  </div>
                </div>
                <Row className="mt-3">
                  <Col md={6}>
                    <h6 className="fw-normal text-muted">Customer</h6>
                    <h6 className="fs-16">{invoice.customer?.name}</h6>
                    <address>
                      135 White Cemetery Rd,
                      <br />
                      Perryville, KY, 40468
                      <br />
                      <abbr title="Phone">P:</abbr> (304) 584-4345
                    </address>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="table-responsive table-borderless text-nowrap mt-3 table-centered">
                      <table className="table mb-0">
                        <thead className="bg-light bg-opacity-50">
                          <tr>
                            <th className="border-0 py-2">Product Name</th>
                            <th className="border-0 py-2">Quantity</th>
                            <th className="border-0 py-2">Price</th>
                            <th className="text-end border-0 py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>G15 Gaming Laptop</td>
                            <td>3</td>
                            <td>{currency}240.59</td>
                            <td className="text-end">{currency}721.77</td>
                          </tr>
                          <tr>
                            <td>Sony Alpha ILCE 6000Y 24.3 MP Mirrorless Digital SLR Camera</td>
                            <td>5</td>
                            <td>{currency}135.99</td>
                            <td className="text-end">{currency}679.95</td>
                          </tr>
                          <tr>
                            <td>Sony Over-Ear Wireless Headphone with Mic</td>
                            <td>1</td>
                            <td>{currency}99.49</td>
                            <td className="text-end">{currency}99.49</td>
                          </tr>
                          <tr className="border-bottom">
                            <td>Adam ROMA USB-C / USB-A 3.1 (2-in-1 Flash Drive) – 128GB</td>
                            <td>2</td>
                            <td>{currency}350.19</td>
                            <td className="text-end">700.38</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={7}>
                    <div className="clearfix pt-xl-3 pt-0">
                      <h6 className="text-muted">Notes:</h6>
                      <small className="text-muted">
                        All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment
                        online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged
                        the agreed quoted fee noted above.
                      </small>
                    </div>
                  </Col>
                  <Col sm={5}>
                    <div className="float-end">
                      <p>
                        <span className="fw-medium">Sub-total :</span>
                        <span className="float-end">{currency}2266.59</span>
                      </p>
                      <p>
                        <span className="fw-medium">Discount (10%) :</span>
                        <span className="float-end">
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {currency}226.659
                        </span>
                      </p>
                      <h3>{currency}2039.931 USD</h3>
                    </div>
                    <div className="clearfix" />
                  </Col>
                </Row>
                <div className="mt-5 mb-1">
                  <SubmissionButton />
                </div>
              </CardBody>
            </Card>}
        </Col>
      </Row>
    </>;
};
export default InvoiceDetail;