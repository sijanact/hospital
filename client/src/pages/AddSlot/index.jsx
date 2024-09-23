import './addslot.css';
import axios from '../../utils/axios';
import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';

const Slot = () => {
  // const [date, setDate] = useState(null);
  const [slot, setSlot] = useState({
    date: '',
    from: '',
    to: '',
    availableSlots: '',
  });

  // const handleDateChange = (date, dateString) => {
  //   setDate(dateString);
  // };

  const onChange = (e, key) => {
    setSlot({ ...slot, [key]: e.target.value });
    console.log(slot);
  };

  const addSlot = async () => {
    const response = await axios.post('/slot', {
      ...slot,
      doctorId: localStorage.getItem('ID'),
    });
    setSlot(response.data);

    toast('Slot added successfully! ');

    setSlot({
      date: '',
      from: '',
      to: '',
      availableSlots: '',
    });
  };

  return (
    <>
      <div className="mainslot">
        <Sidebar />

        <ToastContainer />

        <div className="slotbg">
          <div className="slots">
            <div className="slotdet">
              <label>Date:</label>
              <Input
                value={slot.date}
                type="date"
                onChange={e => onChange(e, 'date')}
              />
              {/* <DatePicker onChange={handleDateChange} /> */}
              <label>From:</label>
              <Input
                value={slot.from}
                type="time"
                onChange={e => onChange(e, 'from')}
              />
              <label>To:</label>
              <Input
                value={slot.to}
                type="time"
                onChange={e => onChange(e, 'to')}
              />
              <label>Number of Slots:</label>
              <Input
                value={slot.availableSlots}
                onChange={e => onChange(e, 'availableSlots')}
              />
            </div>
            <div className="slotbtn">
              <Button onClick={addSlot}>ADD SLOT</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slot;
