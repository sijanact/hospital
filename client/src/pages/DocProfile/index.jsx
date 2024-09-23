import './docprofile.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';
import { Button, Input, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const DocProfile = () => {
  const { id } = useParams();

  const [myslot, setMySlot] = useState([]);
  const [date, setDate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slotToBook, setSlotToBook] = useState(null);

  //get slot

  const getMySlotDetails = async () => {
    const response = await axios.get(`slot/${id}`, myslot);
    setMySlot(response.data);
  };

  const onChange = (e, key) => {
    setDate({ ...date, [key]: e.target.value });
  };

  const onSearch = () => {};

  const onBook = slotId => {
    console.log(slotId);
    setSlotToBook(slotId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const selectedSlot = myslot.find(slot => slot._id === slotToBook);

    // Check if the slot has available slots
    if (selectedSlot.availableSlots === 0) {
      toast.error('No slots available for this booking.');
      return;
    }
    const response = await axios.post(`slot/bookslot/${slotToBook}`, {
      userId: localStorage.getItem('ID'),
    });
    if (response.status === 200) {
      // Update the state to reduce the availableSlots count for the booked slot
      setMySlot(prevSlots =>
        prevSlots.map(slot =>
          slot._id === slotToBook
            ? { ...slot, availableSlots: slot.availableSlots - 1 }
            : slot
        )
      );

      // Show success message
      toast.success('Slot booked successfully!');
    } else {
      toast.error('Failed to book the slot. Please try again.');
    }

    setIsModalOpen(false);
    setSlotToBook(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getMySlotDetails();
  }, []);
  return (
    <>
      <div className="profmain">
        <UserSidebar />
        <ToastContainer />

        <div className="docbook">
          <div className="myslotdiv">
            <div className="search">
              <div className="src">
                <label>Search by Date:</label>
                <Input type="date" onChange={e => onChange(e, 'date')} />
              </div>
              <div className="srcbtn">
                <Button className="btncolor" onClick={onSearch}>
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
                    <div className="myslotbtn">
                      <Button
                        onClick={() => onBook(item._id)}
                        className="btncolor"
                      >
                        BOOK
                      </Button>
                      <Modal
                        title="Book Slot"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <p>Do you want to book ?</p>
                      </Modal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocProfile;
