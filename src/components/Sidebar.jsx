import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faClinicMedical,
  faDonate,
  faCog,
  faCloud,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../components/saferuselogo.png';

function Sidebar({ handleLogout }) {  // Add handleLogout as a prop
  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col justify-between rounded-lg">
      <nav>
        <div className="p-4 pt-1 flex items-center justify-center space-x-2">
          <img src={logo} alt="Logo" className="h-36 w-36" />
        </div>
        <ul className="flex flex-col ml-8 pt-4">
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/dashboard" className="w-full flex items-center">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard
            </Link>
          </li>
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/clinic" className="w-full flex items-center">
              <FontAwesomeIcon icon={faClinicMedical} className="mr-3" /> Clinic
            </Link>
          </li>
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/quotes" className="w-full flex items-center">
              <FontAwesomeIcon icon={faCloud} className="mr-3" /> Quotes
            </Link>
          </li>
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/donations" className="w-full flex items-center">
              <FontAwesomeIcon icon={faDonate} className="mr-3" /> Donations
            </Link>
          </li>
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/settings" className="w-full flex items-center">
              <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
            </Link>
          </li>
          <li className="p-4 hover:bg-darkblue-800 text-left flex items-center">
            <Link to="/login" onClick={handleLogout} className="w-full flex items-center">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
