import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllNavTabs from './components/AllNavTabs';
import PageMetaData from '@/components/PageTitle';
const Tabs = () => {
  return <>
      <PageMetaData title="Nav Tabs" />
      <Row>
        <Col xl={9}>
          <AllNavTabs />
        </Col>

        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#default',
          label: 'Nav Tabs'
        }, {
          link: '#tab-justify',
          label: 'Tabs Justify'
        }, {
          link: '#nav-pills',
          label: 'Nav Pills'
        }, {
          link: '#pills-justify',
          label: 'Pills Justified'
        }, {
          link: '#tab-vertical-left',
          label: 'Tabs Vertical Left'
        }, {
          link: '#tab-vertical-right',
          label: 'Tabs Vertical right'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Tabs;