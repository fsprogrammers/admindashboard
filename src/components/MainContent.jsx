import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faClinicMedical, faCloud, faDonate, faEdit, faTrash, faFolder } from '@fortawesome/free-solid-svg-icons';
import CircularProgressBar from './CircularProgressBar';

function MainContent() {
  const [clinics, setClinics] = useState([
    { name: 'Clinic A', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic B', address: '123 Main St',date: new Date().toLocaleDateString() },
    { name: 'Clinic C', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic D', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic E', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic F', address: '123 Main St', date: new Date().toLocaleDateString() },
  ]);
  const [newClinicData, setNewClinicData] = useState({
    name: '',
    address: '',
    description: '',
    coordinates: '',
    mobile: '',
    website: '',
    officeTime: { from: '', to: '' },
    date: new Date().toLocaleDateString(),
    image: null,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    address: '',
    description: '',
    mobile: '',
    website: '',
    officeTimeFrom: '',
    officeTimeTo: '',
    image: '',
  });

  const [editingClinic, setEditingClinic] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', address: '', date: '' });
  const [deletingClinic, setDeletingClinic] = useState(null);
  

  const data = [
    { label: 'Clinic', value: 12, color: '#f87171' },
    { label: 'Quotes', value: 9, color: '#60a5fa' },
    { label: 'Donations', value: 3, color: '#34d399' },
  ];
  const handleImageChange = (e) => {
    setNewClinicData({ ...newClinicData, image: e.target.files[0] });
  };

  const handleCoordinateChange = (e) => {
    setNewClinicData({
      ...newClinicData,
      coordinates: e.target.value,
    });
  };
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setNewClinicData({
      ...newClinicData,
      officeTime: { ...newClinicData.officeTime, [name]: value },
    });
  };

  const totalData = data.reduce((acc, curr) => acc + curr.value, 0);
  const clinicProgress = (data[0].value / totalData) * 100; // Example: Clinic progress based on Clinic data

  const handleEditClick = (clinic) => {
    setEditingClinic(clinic.name);
    setEditedData(clinic);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClinicData({ ...newClinicData, [name]: value });
  };

  const handleDeleteClick = (clinicName) => {
    setDeletingClinic(clinicName);
  };

  const confirmDelete = () => {
    setClinics(clinics.filter(clinic => clinic.name !== deletingClinic));
    setDeletingClinic(null);
  };

  const cancelDelete = () => {
    setDeletingClinic(null);
  };

  const handleSaveEdit = () => {
    setClinics(clinics.map(clinic => (clinic.name === editingClinic ? editedData : clinic)));
    setEditingClinic(null);
    setEditedData({ name: '', address: '', date: '' });
  };
  const cancelEdit = () => {
    setEditingClinic(null);
  };

  return (
    <div className="flex flex-col p-4">
      
    
        
        <div className="flex-1 grid grid-cols-3 gap-12 h-28 px-8">
          
          {/* Cards for Clinics, Quotes, Donations */}
          <Link to="/clinic" className="p-3 pt-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-700">Clinics</h4>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faClinicMedical} className="text-red-500 text-xl" />
              </div>
            </div>
          </Link>
          <Link to="/quotes" className="p-6 pt-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-700">Quotes</h4>
                <p className="text-xl font-bold text-gray-900">9</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faCloud} className="text-blue-500 text-xl" />
              </div>
            </div>
          </Link>

          <Link to="/donations" className="p-6 pt-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
              <h4 className="text-xl font-bold text-gray-700">Donations</h4>
                <p className="text-xl font-bold text-gray-900">3</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faDonate} className="text-green-500 text-xl" />
              </div>
            </div>
          </Link>
          
        </div>
   

      <div className="flex">
  
  <div className="flex flex-col items-center justify-center mt-8 px-8 py-2 m-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-1/5">
    <div className="flex mb-4">
      <CircularProgressBar progress={clinicProgress} value={75} text="75%" size={110} strokeWidth={6} />
    </div>
    
    <div className="flex flex-row space-x-4">
      {data.map((item) => (
        <div key={item.label} className="relative flex flex-col items-center group">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
          <div className="absolute bottom-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {item.label}
          </div>
        </div>
      ))}
    </div>
    <p className="text-gray-500 text-sm mt-4">
      <FontAwesomeIcon icon={faFolder} className="text-md text-gray-700 pr-1" />
      Total Data: {totalData}
    </p>
  </div>

  {/* 80% Width - Table Section */}
  <div className="mt-8 w-4/5">
    <table className="min-w-full bg-white border text-gray-500">
      <thead>
        <tr>
          <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Clinic Name</th>
          <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Clinic Address</th>
          <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Date</th>
          <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {clinics.map((clinic) => (
          <tr key={clinic.name}>
            <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.name}</td>
            <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.address}</td>
            <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.date}</td>
            <td className="py-2 px-2 text-center border-b text-gray-700">
              <button className="text-blue-600 mr-2" onClick={() => handleEditClick(clinic)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-red-500" onClick={() => handleDeleteClick(clinic.name)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      
      
      {/* Edit Form */}
      {editingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4">Edit Clinic</h2>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />

            <input
              type="text"
              placeholder="Address"
              name="address"
              value={editedData.address}
              onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />


              
            <textarea
              placeholder="Description"
              name="description"
              value={newClinicData.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}

            <input
              type="text"
              placeholder="Coordinates (Latitude, Longitude)"
              name="coordinates"
              value={newClinicData.coordinates}
              onChange={handleCoordinateChange}
              pattern="^-?\d{1,2}\.\d{1,6},\s?-?\d{1,2}\.\d{1,6}$"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.coordinates && <p className="text-red-500">{formErrors.coordinates}</p>}

            <div className="flex justify-between mb-2">
              <input
                type="time"
                placeholder="Office Time From"
                name="from"
                value={newClinicData.officeTime.from}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
              <input
                type="time"
                placeholder="Office Time To"
                name="to"
                value={newClinicData.officeTime.to}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
            </div>
            {formErrors.officeTime && <p className="text-red-500">{formErrors.officeTime}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={newClinicData.mobile}
              onChange={handleInputChange}
              pattern="\d*"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.mobile && <p className="text-red-500">{formErrors.mobile}</p>}

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newClinicData.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

            <input
              type="url"
              placeholder="Website URL"
              name="website"
              value={newClinicData.website}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.website && <p className="text-red-500">{formErrors.website}</p>}

            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}

            <div className="flex justify-between mt-4">
              <button onClick={cancelEdit} className="bg-gray-300 p-2 rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white p-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      

      {/* Delete Confirmation Dialog */}
      {deletingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {deletingClinic}?</p>
            <div className="mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Delete
              </button>
              <button onClick={cancelDelete} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
