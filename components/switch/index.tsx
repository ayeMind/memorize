import classes from "./switch.module.css"

interface Props {
    text: string;
    name: string;
    onChange: () => void;
    value: string;
}

export const Switch = ({text, name, onChange, value}) => {

  const sliderClass = classes.slider + ' ' + classes.round;


  return (
    <div className="flex gap-2 memorize">
        <div>      
            <label className={classes["switch"]}>
            <input checked={value} name={name} type="checkbox" role="switch" onChange={onChange} />
            <span className={sliderClass}></span>
            </label>
        </div>
        <label>{text}</label>
    </div> 
  );
};


