import '../scss/layout.scss'
import { editBooking } from '../store/modules/BookingSlice'
import EditBooking from './EditBooking'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const MyBookings = (props) => {
    let bookings = props.singleProfile.bookings
    let dayjs = props.dayjs
    let timeDiff = props.timeDiff
    const [changeBooking, setChangeBooking] = useState(false);
    const dispatch = useDispatch();

 


    return (
        bookings.map((booking) => (
            
                <div className="bg-white h-fit p-2 shadow-div flex flex-col shadow-md">
                    <div className='flex flew-row gap-4'>
                    <img
                                src={booking.venue.media}
                                alt={booking.id}
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/no_image.png";
                                }}
                                className="w-40 h-40 object-cover rounded-md"
                            />
                            <div className='place-self-end'>
                                <p className='font-medium'>{booking.venue.name}</p>
                                <p>{booking.venue.location.city}</p>
                            </div>
                    </div>
                               
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col'>
                                <p>
                                {timeDiff(booking.dateFrom, booking.dateTo)}{" "}{timeDiff > 1 ? 'night' : 'nights'}
                              </p>
                                <p>
                                {dayjs(booking.dateFrom).format("DD/MM/YYYY")} -{" "}
                                {dayjs(booking.dateTo).format("DD/MM/YYYY")}{" "}
                              </p>
                              
                                </div>
                           
                         
                            <div>
                            <p className="font-passionOne font-normal tracking-wide text-xl text-passionOrange">
                                  {booking.venue.price} NOK
                                </p>
                                </div>
                            </div>
                            
                            <div className='flex flex-row justify-evenly'>
                                <button className='round-outline-btn' onClick={() => setChangeBooking(true)}>Edit</button>
                                <button className='round-outline-btn'>Cancel</button>

                            </div>

                 {changeBooking && 
                 <EditBooking booking={booking} />
                 }
                
                </div>
           
            
           
                
          
          ))
    )
    
}
 
export default MyBookings;