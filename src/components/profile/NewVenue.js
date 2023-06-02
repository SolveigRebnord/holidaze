import { useDispatch, useSelector } from "react-redux";
import { addNewVenue } from "../../store/modules/VenueSlice";
import {
  useFormik,
  FormikProvider,
  useField,
  Field,
  Formik,
  Form,
  FieldArray,
} from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import NewVenueSchema from "../../schemas/NewVenueSchema";
import {
  getSingleProfile,
  isVenueManager,
} from "../../store/modules/ProfilesSlice";
import { current } from "@reduxjs/toolkit";

const FormInput = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className={`flex flex-col  ${field.name == "zip" ? "zip-input" : ""}`}
      >
        <label className="text-white font-bold tracking-wide font-montS text-lg bg-opacity-40">
          {label}
        </label>
        <input
          type={type}
          {...field}
          {...props}
          className={`form-input
        ${type == "textarea" ? "area-input" : ""}
        ${type == "number" ? "number-input" : ""}
        ${type == "checkbox" ? "check-input" : ""}
        ${meta.touched && meta.error ? "input-error" : ""}
        ${meta.touched && !meta.error && "input-ok"}`}
        />
      </div>
      <div className="h-8">
        {meta.touched && meta.error && (
          <p className="text-white text-right ">{meta.error}</p>
        )}
      </div>
    </>
  );
};

const FormArray = ({ label, name, type, ...props }) => {
  const [field, meta] = useField(props);
  console.log(field.value.media);

  const [imgSrc, setImgSrc] = useState("");

  return (
    <>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>
            {field.value.media &&
              meta.value.media.length > 0 &&
              field.value.media.map((img, index) => (
                <div key={index}>
                  <img
                    name={`media.${index}`}
                    src={field.value.media[index]}
                    {...field.value.media}
                    {...props}
                  />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  >
                    -
                  </button>
                </div>
              ))}
            <div>
              <input
                value={imgSrc}
                onChange={(e) => setImgSrc(e.target.value)}
                type="text"
              ></input>
              <button
                type="button"
                onClick={() => {
                  imgSrc && arrayHelpers.push(imgSrc);
                  setImgSrc("");
                }}
              >
                {/* show this when user has removed all friends from the list */}
                Add img
              </button>
            </div>
          </div>
        )}
      />
    </>
  );
};

const NewVenue = ({ ...props }) => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);

  let [imgArray, setimgArray] = useState([]);
  let [venueImg, setVenueImg] = useState("");

  const validationSchema = NewVenueSchema;

  let initMeta = ["wifi", "parking", "breakfast", "pets"];

  const [isForm, setForm] = useState(true);
  const [isConfirmation, setConfirmation] = useState(false);

  const onSubmit = (values, actions) => {
    console.log(values.name);
    let newVenueBody = {
      name: values.name,
      description: values.description,
      media: values.media,
      price: values.price,
      maxGuests: values.maxGuests,
      rating: values.rating ? values.rating : null,
      meta: {
        wifi: values.wifi,
        parking: values.parking,
        breakfast: values.breakfast,
        pets: values.pets,
      },
      location: {
        address: values.address,
        city: values.city,
        zip: values.zip ? values.zip : "",
        country: values.country,
        continent: values.continent ? values.continent : "",
        lat: values.lat ? values.lat : "",
        lat: values.lat ? values.lat : "",
      },
    };
    console.log(newVenueBody);
    dispatch(addNewVenue(newVenueBody))
      .then((data) => {
        //props.setRefreshState(false)
        dispatch(isVenueManager(currentUser.name, true));
        dispatch(getSingleProfile(currentUser.name));
        setTimeout(() => props.goToSection(3), 3000);

        //setTimeout(() => props.setRefreshState(true), 2000)

        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [imgId, setImgId] = useState(0);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",

        media: [],
        price: 3,
        maxGuests: 3,
        rating: 3,
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 1,
        lng: 1,
      }}
      validationSchema={NewVenueSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-12 bg-purpleBlack lg:w-1/2 mx-auto">
          <div className="flex flex-col gap-4 justify-start">
            <div className="">
              <FormInput label="Title" id="name" name="name" type="text" />
            </div>
            <div className="">
              <FormInput
                label="Description"
                id="description"
                name="description"
                type="textarea"
              />
            </div>
            <div className="flex flex-col gap-8"></div>
            <FormInput label="Price" id="price" name="price" type="number" />
            <FormInput
              label="Maximum number of guests"
              id="maxGuests"
              name="maxGuests"
              type="number"
            />
            <FormInput label="Rating" id="rating" name="rating" type="number" />
          </div>

          <div className="flexR my-12">
            {initMeta.map((fac) => (
              <FormInput label={fac} id={fac} name={fac} type="checkbox" />
            ))}
          </div>

          <div>
            <FormInput
              label="Address"
              id="address"
              name="address"
              type="text"
            />
            <FormInput label="City" id="city" name="city" type="text" />
            <FormInput label="Zip Code" id="zip" name="zip" type="number" />
            <FormInput
              label="Country"
              id="country"
              name="country"
              type="text"
            />
            <FormInput
              label="Continent"
              id="continent"
              name="continent"
              type="text"
            />

            <FormInput
              label="Lng Coordinate"
              id="lng"
              name="lng"
              type="number"
            />
            <FormInput
              label="Lat Coordinate"
              id="lat"
              name="lat"
              type="number"
            />
            <FormArray name="media" />
          </div>

          <button type="submit" className="text-white">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewVenue;

/*  

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
                    <div>
                    <h3>Fascilities</h3>
                   
                
               
                </div>


 */
