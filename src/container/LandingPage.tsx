import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSlots } from '../redux/actions/action';


const LandingPage = () => {


    const [slotNum, setSlotNum] = useState<number>(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e: React.SyntheticEvent) => {

        e.preventDefault()

        dispatch(addSlots(slotNum))

        navigate("/parkspcae")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSlotNum(Number(e.target.value))
    }
    return (
        <div>


            <h1 data-testid="heading">ADD SLOTS NUMBER </h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField data-testid="text-input" id="parking-create-text-input" label="Enter Slot Number" variant="outlined" type={"number"} value={slotNum} onChange={handleChange} />

                </div>
                <br />

                <div>
                    <Button data-testid="sub-btn" variant="contained" color="primary" type='submit' id="parking-create-submit-button">add slots</Button>
                </div>
            </form>
        </div>
    );
};

export default LandingPage;