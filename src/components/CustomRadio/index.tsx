import { useState } from 'react';
import classes from './style.module.css';

type CustomRadioProps = {
  checked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
};

export default function CustomRadio(props: CustomRadioProps) {
  const [checked, setChecked] = useState(props.checked);

  function handleOnChange() {
    setChecked((prev) => {
      props.onChange?.(!prev);
      return !prev;
    });
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.radio} onClick={handleOnChange}>
        <div className={classes.inner} data-checked={checked}></div>
      </div>
      <span>{props.label}</span>
    </div>
  );
}
