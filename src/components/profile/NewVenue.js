import { useDispatch, useSelector } from "react-redux";
import { addNewVenue } from "../../store/modules/VenueSlice";
import { useFormik, FormikProvider, useField, Field } from "formik";
import * as yup from "yup"; 
import React from "react";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const TextInputLiveFeedback = ({ label, helpText, type, ...props }) => {
    const [field, meta] = useField(props);
  
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const handleChange = () => handleChange();
    const showFeedback =
    type !== 'number' && type !== 'checkbox' ?  (!!didFocus && field.value.trim().length > 2) || meta.touched : !!didFocus || meta.touched;
     
  
    return (
      <div
        className={`form-control ${
          showFeedback ? (meta.error ? "invalid" : "valid") : ""
        }`}
      >
        <div className="flex items-center justify-between flex-row text-lg font-semibold my-3">
          <label htmlFor={props.id} className={type== 'checkbox' ? 'uppercase' : ''}>{label} </label>
          <div
            className="text-sm font-light text-gray-600 "
            id={`${props.id}-help`}
            tabIndex="-1"
          >
            <div className="relative">
                <div className="min-w-fit whitespace-nowrap bg-white absolute bottom-2 right-8 z-2">
                  {helpText}
                </div>
    
            </div>
          </div>
        </div>

        {field.name &&
          <div>
             {type == 'textarea' &&
                <textarea
                className="border border-gray-200 px-2 rounded-md w-full h-40 "
                {...props}
                {...field}
                maxLength={500}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
                    />}
            {type === 'text' &&
            <input
              className="border border-gray-200 px-2 rounded-md w-full h-10 "
              {...props}
              {...field}
              aria-describedby={`${props.id}-feedback ${props.id}-help`}
              onFocus={handleFocus}
              
            />}
             {type === 'number' &&
            <input
              className="border border-gray-200 px-2 rounded-md w-full h-10 "
              {...props}
              type="number"
              {...field}
              aria-describedby={`${props.id}-feedback ${props.id}-help`}
              onFocus={handleFocus}
              
            />}
            
          </div>} 


        <div className="h-6 pt-1 ">
          {" "}
          {showFeedback ? (
            <div
              id={`${props.id}-feedback`}
              aria-live="polite"
              className="feedback text-sm pl-1 text-orange-600"
            >
              {meta.error ? meta.error : "✓"}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

const NewVenue = () => {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);
    const { singleProfile } = useSelector((state) => state.profiles);
  


    let [imgArray, setimgArray] = useState([]);
    let [venueImg, setVenueImg] = useState("");


      
      const validationSchema = yup.object({
        name: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .required("Title is required"),

        description: yup
          .string()
          .min(3, "Must be at least 20 characters")
          .required("Description is required"),
      
        media: yup
          .array()
          .min(1)
          .required('You need to provide at least one image')
          .min(1),
      
          price: yup
          .number()
          .required("The venue can not be for free")
          .positive('The price must be a number and above 0')
          .round('floor'),

          maxGuests: yup
          .number()
          .required('At least one guest')
          .positive('Number of guests has to be above zero')
          .round('trunc'),

          rating: yup
          .number()
          .min(1)
          .max(5)
          .positive()
          .round('trunc'),

          

        
  


      });


      let initMeta = {'wifi': false , 'parking': false, 'breakfast': false ,'pets': false}

      const [isForm, setForm] = useState(true);
      const [isConfirmation, setConfirmation] = useState(false);
    
      const formik = useFormik({
        initialValues: {
            "name": "",
            "description": "",
            "media": [
              ""
            ],
            "price": 0,
            "maxGuests": 1,
            "rating": 1,
            "meta": initMeta,
            "location": {
              "address": null,
              "city": null,
              "zip": null,
              "country": null,
              "continent": null,
              "lat": 0,
              "lng": 0
            }
            
            
          }, 
        validationSchema,
        onSubmit: (values) => {
           
            console.log(imgArray)
            imgArray = formik.values.media

            let newP = parseInt(values.price, 10)
            console.log(newP)
          //api callet ved ekte skjema, vi konsoller bare submiten. Så vil typisk vøre async
          console.log(values);
          //setForm(false);
          //setConfirmation(true);
        },
        enableReinitialize: true
      });
    

      const [imgId, setImgId] = useState(0);

    return ( 
        <>
       
            <FormikProvider value={formik}>
              <form
                  onSubmit={formik.handleSubmit}
                onChange={formik.handleChange}
                className="my-16 lg:mt-8 mx-8"
              >
                <div className="flex flex-col gap-12">
                  <div className="">
                    <TextInputLiveFeedback
                      label="Title"
                      id="name"
                      name="name"
                      helpText="Sell your venues with an exiting title"
                      type="text"
                      value={formik.values.name}
                    />
                    </div>
                    <div className="">
                    <TextInputLiveFeedback
                      label="Description"
                      id="description"
                      name="description"
                      helpText="Sell your venues with an exiting title"
                      type="textarea"
                      value={formik.values.description}
                    />
                    </div>
                    <div className="flex flex-col gap-8">
                        <h3 className="text-left">Add images</h3>
                        <div className="flex flex-col ">
                            <label className=""> Image url</label>
                            <div className="flexR">
                                <input onChange={(e) => setVenueImg(e.target.value)} className="border border-black w-2/3">
                                </input>
                                <button type="button" onClick={() =>  {
                                    setImgId(n => n+1);
                                    {venueImg && setimgArray([
                                        ...imgArray,
                                        { id: imgId, url: venueImg }
                                    ]);formik.values.media.push(venueImg)//! Får en tom img element først i arrayen og fjernes ikke ved deleteknapp.. må være annen måte å si at formik verdien er denne arrayen
                                    }
                                    }}>
                                    Add img
                                </button>
                            </div>
                        </div>
                    </div>
                    {imgArray.length > 0 && 
                    <ul className="flex flex-wrap items-center justify-between gap-y-12">
                        {imgArray.map((img) => (
                            
                            <li key={img.id} className="relative">
                            <img src={img.url} className="w-80 h-80 object-cover"/>
                            <button type="button"
                            onClick={() => {setimgArray(imgArray.filter(a => a.id !== img.id));}}
                            className="absolute -top-4 -right-4">
                                <img src="/delete_button.svg" className="w-10" />
                            </button>
                            </li>)
                        )}
                    </ul>}
                  </div>
                  <TextInputLiveFeedback
                      label="Price"
                      id="price"
                      name="price"
                      helpText="Price for renting the venue per night"
                      type="number"
                      value={formik.values.price}
                    />
                     <TextInputLiveFeedback
                      label="Number of guests"
                      id="maxGuests"
                      name="maxGuests"
                      helpText="Price for renting the venue per night"
                      type="number"
                      value={formik.values.maxGuests}
                    />
                     <TextInputLiveFeedback
                      label="Rating"
                      id="rating"
                      name="rating"
                      helpText="Price for renting the venue per night"
                      type="number"
                      value={formik.values.rating}
                    />

                    <div>
                        <h3>Fascilities</h3>
                        {initMeta.map((fac) => (
                            <span>
                            <label>{fac}</label>
                            <input
                            className="border border-gray-200 px-2 rounded-md w-full h-10 "
                      id={fac}
                      name={fac}
                      type="checkbox"
                      value={`formik.values.meta.${fac}`}
                    />
                    </span>
                        )
                       

                        )}
                    
                   
                    </div>

                    <button type="submit">Send</button>
          </form>
        </FormikProvider>
        
        </>
     );
}
 
export default NewVenue;

/*  

          
          meta: yup
          .object() ({
            wifi: yup.boolean().required(),
            parking: yup.boolean().required(),
            breakfast: yup.boolean().required(),
            pets: yup.boolean().required()
          }),

          location: yup
          .object() ({
            address: yup.string().required(), 
            city: yup.string().required(),
            zip: yup.number().positive(),
            country: yup.string().required(),
            continent: yup.string(),
            lat: yup.number().positive(),
            lng: yup.number().positive()
          })

 */