import './dochome.css';
import Sidebar from '../../components/Sidebar';
// import { checkToken } from '../../utils/localfunctions';

const DocHome = () => {
  // console.log(checkToken());
  return (
    <>
      <div className="doc-home">
        <Sidebar />
        <div className="hombg"></div>
      </div>
    </>
  );
};

export default DocHome;
