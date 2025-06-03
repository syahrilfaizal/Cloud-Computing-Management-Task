import { Col, Row } from 'react-bootstrap';
import PageMetaData from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import AllScatterCharts from './components/AllScatterCharts';
const ScatterCharts = () => {
  return <>
      <PageMetaData title="Scatter Charts" />

      <Row>
        <Col xl={9}>
          <AllScatterCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Scatter (XY) Chart'
        }, {
          link: '#datetime',
          label: 'Scatter Chart - Datetime'
        }, {
          link: '#images',
          label: 'Scatter - Images'
        }]} />
        </Col>
      </Row>
    </>;
};
export default ScatterCharts;