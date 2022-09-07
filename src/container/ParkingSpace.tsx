import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ParkingSlots {
    isParked: boolean
    slotNum: number
    parkTime: number
    carNum: string
}
const ParkingSpace = () => {
    const [parkingSlots, setParkingSlots] = useState<ParkingSlots[] | []>([])
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);
    const [carNum, setCarNum] = useState<string>("")
    const [parkTime, setParkTime] = useState<number>(0)
    const [parkingCharge, setParkingCharge] = useState<any>("")

    const [enterTime, setEnterTime] = useState<any>("")
    const [exitNo, setExitNo] = useState<number>(0)

    const handleClose = () => setOpen(false);

    const handleOpenTwo = () => setOpenTwo(true);
    const handleCloseTwo = () => setOpenTwo(false);


    const slotsNum = useSelector((state: RootState) => state.slotsReducer.slots)


    useEffect(() => {

        for (let i = 1; i <= slotsNum; i++) {

            setParkingSlots((current: any) => [...current, {
                isParked: false,
                slotNum: i,
                parkTime: 0,
                carNum: ""
            }])

        }

        return () => {
            setParkingSlots([])
        }

    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {

        e.preventDefault()

        handleRandomSlot()

    }
    const handleOpen = () => {
        let today = new Date()

        let CurrentTimeSec = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()
        setOpen(true)

        setParkTime(CurrentTimeSec)
        setCarNum("")
        setEnterTime(`${today.getHours()}:${today.getMinutes()}`)
    };


    const handleRandomSlot = () => {

        let allocateSlots: any[] = []

        for (let i = 0; i < parkingSlots.length; i++) {
            if (!parkingSlots[i].isParked) {
                allocateSlots.push(parkingSlots[i].slotNum)

            }

        }


        if (allocateSlots.length === 0) {

            toast('Parking Slots Full');
        } else {


            let randomNumber: any = Math.floor(Math.random() * allocateSlots.length)

            let randomslot: any = allocateSlots[randomNumber]


            setParkingSlots(parkingSlots.map((item: ParkingSlots) => {

                if (item.slotNum == randomslot) {

                    return {
                        ...item,
                        isParked: true,
                        parkTime: parkTime,
                        carNum: carNum
                    }
                } else {

                    return item

                }
            }))

        }
        handleClose()

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCarNum(e.target.value)
    }


    const handleExit = (item: ParkingSlots) => {
        setExitNo(item.slotNum)
        let today = new Date()

        let CurrentTimeSec = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()


        let parkingHour = CurrentTimeSec - item.parkTime

        let hours = Math.floor(parkingHour / 3600); // get hours
        let minutes = Math.floor((parkingHour - (hours * 3600)) / 60); // get minutes
        let seconds = parkingHour - (hours * 3600) - (minutes * 60); //  get seconds
        let charge: any;


        charge = hours >= 2 ? (hours * 10) - 10 : 10
        setParkingCharge(charge)

        handleOpenTwo()


    }


    const handlePayment = () => {

        let exitedCar: any = parkingSlots.filter((item: any) => item.slotNum == exitNo)
        console.log(exitedCar)
        let carNumber = exitedCar[0].carNum
        let body: any = { "car-registration": carNumber, charge: parkingCharge }


        axios.post("https://httpstat.us/200", body)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        setParkingSlots(parkingSlots.map((item: ParkingSlots) => {

            if (item.slotNum == exitNo) {

                return {
                    ...item,
                    isParked: false,
                    parkTime: 0,
                    carNum: ""
                }
            } else {

                return item

            }

        }))

        handleCloseTwo()
    }
    return (
        <div>

            <h1 data-testid="heading">Parking Slots</h1>
            <br />
            <Button onClick={handleOpen} variant="contained" color="primary" data-testid="allocat-btn" >allocate random space</Button>
            <br />
            <br />
            <br />


            <Grid container spacing={2}>


                {parkingSlots && parkingSlots.map((item: ParkingSlots) => (

                    <Grid item xs={4} key={item.slotNum}>
                        <Card sx={{ minHeight: 200 }} id={`parking-drawing-space-${item.slotNum}`}>
                            <CardContent>
                                <Typography sx={{ fontSize: 20, fontWeight: 700 }} color="secondary" gutterBottom>
                                    Car Parking
                                </Typography>

                                <Typography sx={{ mb: 1 }} color="primary" id={`parking-drawing-space-number-${item.slotNum}`}>
                                    Parking Slot: {item.slotNum}
                                </Typography>

                            </CardContent>
                            {item.isParked &&
                                <CardContent sx={{ m: 0, pb: 0 }}>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom id={`parking-drawing-registered-${item.slotNum}`}>
                                        Car Number : {item.carNum}
                                    </Typography>

                                    <CardActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleExit(item)}>Exit Car</Button>
                                    </CardActions>

                                </CardContent>
                            }

                        </Card>
                    </Grid>

                ))}

            </Grid>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography variant="h5" component="h5" sx={{ my: 2, fontWeight: 600, color: "violet" }} >
                        Park Car
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField id="parking-drawing-registration-input" label="Enter Car Number" variant="outlined" type={"text"} value={carNum} onChange={handleChange} />

                        </div>
                        <br />

                        <div>
                            <Button variant="contained" color="primary" type='submit' id="parking-drawing-add-car-button"> ADD CAR</Button>
                        </div>
                    </form>

                    <Typography variant="h6" component="h6" sx={{ my: 2 }}>
                        Enter Car:{enterTime}
                    </Typography>

                </Box>
            </Modal>


            <Modal
                open={openTwo}
                onClose={handleCloseTwo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h2" component="h2" id="deregister-car-registration" data-testid="deregister-car-heading">
                        Exit Car
                    </Typography>
                    <Typography id="deregister-charge" variant="h6" component="h2" >
                        Parking Charge :{parkingCharge} $
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button id="deregister-payment-button" variant="contained" color="primary" onClick={handlePayment}>  Payment</Button>
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button id="deregister-back-button" variant="contained" color="primary" onClick={handleCloseTwo}>  back</Button>
                    </Typography>
                </Box>
            </Modal>


            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );
};

export default ParkingSpace;