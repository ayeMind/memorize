import classes from "./switch.module.css"

interface Props {
    text: string;
    name: string;
    onChange: () => void;
    defaultValue: string;
}

export const Switch = ({text, name, onChange, defaultValue}) => {

  const sliderClass = classes.slider + ' ' + classes.round;

  return (
    <div className="flex gap-2">
        <div>      
            <label className={classes["switch"]}>
            <input defaultValue={defaultValue} name={name} type="checkbox" role="switch" onChange={onChange} />
            <span className={sliderClass}></span>
            </label>
        </div>
        <label>{text}</label>
    </div> 
  );
};


