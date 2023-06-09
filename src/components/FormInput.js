import { useField } from "formik";

const FormInput = ({ label, value, type, page, errors, ...props }) => {
    const [field, meta] = useField(props);


  
    return (
      <>
        <div className={"flex flex-col gap-2"}>
          <label className={` tracking-wide text-base bg-opacity-40 pl-1
          ${label == "Ending date" ? "self-end" : ""}
          ${page == "login" ? "text-white" : ""}`}>
            {label}
          </label>
          <input
        
            type={props.type}
            {...field}
            {...props}
            value={value}
            className={` bg-white h-14 px-4 w-fit text-center rounded-md
          ${type == "date" ? "area-input" : ""}
          ${type == "number" ? "number-input" : ""}
          ${page == "login" ? "w-full text-start" : ""}
          ${meta.touched && meta.error ? "input-error" : ""}
          ${meta.touched && !meta.error && "input-ok"}`}
          />
        </div>
        <div className="h-8 text-right pr-2 text-white">
          { meta.touched && meta.error && (
            <p className={`  ${page == "login" ? "text-white" : ""} `}>{meta.error}</p>
          )}
          {meta.touched && !meta.error && <p className="text-white ">&#x2713;</p>}
        </div>
      </>
    );
  };

  export default FormInput;