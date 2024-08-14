import './docbooking.css';
import Sidebar from '../../components/Sidebar';
import { checkToken } from '../../utils/localfunctions';

const DocBooking = () => {
  return (
    <>
      <div className="doc-home">
        <Sidebar />
        <div className="contents">
          <h1>Your bookings</h1>
        </div>
      </div>
    </>
  );
};

export default DocBooking;
