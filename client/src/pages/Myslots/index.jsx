import './myslots.css';
import axios from '../../utils/axios';
import { Button, Input, Modal } from 'antd';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';

const MySlot = () => {
  const [myslot, setMySlot] = useState([]);
  const [date, setDate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  const [slotToEdit, setSlotToEdit] = useState(null);
  const [slotToEditChange, setSlotToEditChange] = useState({
    date: '',
    from: '',
    to: '',
    availableSlots: '',
  });

  const doctorID = localStorage.getItem('ID');
  const getMySlotDetails = async () => {
    const response = await axios.get(`slot/${doctorID}`, myslot);
    setMySlot(response.data);
  };

  const onChange = (e, key) => {
    setDate(e.target.value);
    console.log(date);
  };

  const onSearch = () => {};

  const onEditChange = (e, key) => {
    setSlotToEditChange({ ...slotToEditChange, [key]: e.target.value });
  };

  const onDelete = slotId => {
    setSlotToDelete(slotId);

    setIsModalOpen(true);
  };

  const onEdit = slotEditId => {
    setSlotToEdit(slotEditId);
    console.log(slotToEdit);
    setIsEditModalOpen(true);
  };

  const handleOk = async () => {
    const response = await axios.delete(`slot/${slotToDelete}`);
    const filteredSlot = myslot.filter(slot => slot._id !== slotToDelete);
    setMySlot(filteredSlot);
    toast('Slot deleted successfully!');

    setIsModalOpen(false);
  };

  const editHandleOk = async () => {
    const response = await axios.patch(`slot/${slotToEdit}`, slotToEditChange);
    if (response.status === 200) {
      setMySlot(prevSlots =>
        prevSlots.map(slot =>
          slot._id === slotToEdit ? { ...slot, ...slotToEditChange } : slot
        )
      );

      // Show a success message
      toast.success('Slot edited successfully!');
      setSlotToEditChange({
        date: '',
        from: '',
        to: '',
        availableSlots: '',
      });
    } else {
      toast.error('Failed to edit the slot.');
    }

    // Close the edit modal
    setIsEditModalOpen(false);
    setSlotToEdit(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    getMySlotDetails();
  }, []);

  return (
    <div className="myslotmain">
      <Sidebar />
      <ToastContainer />
      <div className="myslotdiv">
        <div className="search">
          <div className="src">
            <label>Search by Date:</label>
            <Input type="date" onChange={e => onChange(e, 'date')} />
          </div>
          <div className="srcbtn">
            <Button onClick={onSearch} className="btncolor">
              SEARCH
            </Button>
          </div>
        </div>
        <div className="myslots">
          {myslot.map((item, index) => {
            return (
              <div className="myslotcard">
                <div className="myslot">
                  <p>Date: {item.date}</p>
                  <p>From: {item.from}</p>
                  <p>To: {item.to}</p>
                  <p>Number of slots: {item.availableSlots}</p>
                </div>
                <div className="myslotbtns">
                  <Button onClick={() => onEdit(item._id)} className="btncolor">
                    EDIT{' '}
                  </Button>

                  <Modal
                    title="Edit Slot"
                    open={isEditModalOpen}
                    onOk={editHandleOk}
                    onCancel={editHandleCancel}
                  >
                    <p>Do you want to edit ?</p>

                    <label>Date:</label>
                    <Input
                      value={slotToEditChange.date}
                      type="date"
                      onChange={e => onEditChange(e, 'date')}
                    />
                    <label>From:</label>
                    <Input
                      value={slotToEditChange.from}
                      type="time"
                      onChange={e => onEditChange(e, 'from')}
                    />
                    <label>To:</label>
                    <Input
                      value={slotToEditChange.to}
                      type="time"
                      onChange={e => onEditChange(e, 'to')}
                    />
                    <label>Number of Slots:</label>
                    <Input
                      value={slotToEditChange.availableSlots}
                      onChange={e => onEditChange(e, 'availableSlots')}
                    />
                  </Modal>

                  <Button
                    onClick={() => onDelete(item._id)}
                    className="btncolor"
                  >
                    DELETE{' '}
                  </Button>
                </div>
                <Modal
                  title="Delete Slot"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Do you want to delete ?</p>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MySlot;
