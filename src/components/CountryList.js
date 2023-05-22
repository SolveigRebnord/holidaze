import { useDispatch, useSelector } from 'react-redux';
import { getVenues } from '../store/modules/VenueSlice';
import { useEffect, React } from 'react';



const CountryList = (props) => {

    const dispatch = useDispatch();
    const { venues } = useSelector((state) => state.venues);
  
    useEffect(() => {
      dispatch(getVenues());
    }, [dispatch]);

    const allCountries = [];
    const filteresCountries = [];

    venues.map((place) => (
        place.location.country !== '' &&   place.location.country !== 'Unknown' &&
            allCountries.push(place.location.country)
    ));

    allCountries.map((place) => (
    !filteresCountries.includes(place) &&
        filteresCountries.push(place)
    ));

    const searchCountry = filteresCountries.filter((el) => {
        if (props.input === "") {
          return el;
        } else {
          return el.toLowerCase().includes(props.input);
        }
      });

   
   // Få til at ved klikk på landet så velger den det

    return ( 
        <>
        <ul className='bg-white absolute flex flex-col gap-4'>
        {searchCountry.map((country) => (
            <li key={country}>{country}</li>
        ))}
        </ul>
    
        </> );
}
 
export default CountryList;