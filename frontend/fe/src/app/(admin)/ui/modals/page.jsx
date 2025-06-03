import { Col, Row } from 'react-bootstrap';
import PageMetaData from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import AllModals from './components/AllModals';
const Modals = () => {
  return <>
      <PageMetaData title="Modals" />

      <Row>
        <Col xl={9}>
          <AllModals />
        </Col>

        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#default',
          label: 'Default Example'
        }, {
          link: '#static-backdrop',
          label: 'Static Backdrop'
        }, {
          link: '#scrolling-long-content',
          label: 'Scrolling Long Content'
        }, {
          link: '#toggle-between-modals',
          label: 'Toggle Between Modals'
        }, {
          link: '#optional-sizes',
          label: 'Optional Sizes'
        }, {
          link: '#fullscreen-modal',
          label: 'Fullscreen Modal'
        }, {
          link: '#modal-alerts',
          label: 'Modal Based Alerts'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Modals;