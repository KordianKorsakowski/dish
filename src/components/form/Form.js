import { useState } from 'react';
import useInput from '../../hooks/use-input';

import Spinner from '../spinner/Spinner';
import SelectedTypeFood from './SelectedFoodType';

import classes from './form.module.css';

let formIsValid = false;
let DATA = {};
const Form = ({ sendData, sending }) => {
  const [type, setType] = useState('pizza');

  //******* ---------- create whole logic for input fileds -------*********
  const {
    value: enteredDishName,
    isValid: enteredDishNameIsValid,
    hasError: dishNameInputHasError,
    valueChangeHandler: dishNameChangedHandler,
    inputBlurHandler: dishNameBlurHandler,
    reset: resetDishNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPreparationTime,
    isValid: enteredPreparationTimeIsValid,
    hasError: preparationTimeInputHasError,
    valueChangeHandler: preparationTimeChangedHandler,
    inputBlurHandler: preparationTimeBlurHandler,
    reset: resetPreparationTimeInput,
  } = useInput((value) => value.trim() !== '');

  // ************** ----------- PIZZA input fileds ----------- ***********
  const {
    value: enteredSlices,
    isValid: enteredSlicesIsValid,
    hasError: slicesInputHasError,
    valueChangeHandler: slicesChangedHandler,
    inputBlurHandler: slicesBlurHandler,
    reset: resetSlicesInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDiameter,
    isValid: enteredDiameterIsValid,
    hasError: diameterInputHasError,
    valueChangeHandler: diameterChangedHandler,
    inputBlurHandler: diameterBlurHandler,
    reset: resetDiameterInput,
  } = useInput((value) => value.trim() !== '');

  // ************** ----------- Soup input fileds ----------- ***********
  const {
    value: enteredSpicinessScale,
    isValid: enteredSpicinessScaleIsValid,
    hasError: spicinessScaleInputHasError,
    valueChangeHandler: spicinessScaleChangedHandler,
    inputBlurHandler: spicinessScaleBlurHandler,
    reset: resetSpicinessScaleInput,
  } = useInput((value) => value.trim() !== '');

  // ************** ----------- Sandwich input fileds ----------- ***********
  const {
    value: enteredBread,
    isValid: enteredBreadIsValid,
    hasError: breadInputHasError,
    valueChangeHandler: breadChangedHandler,
    inputBlurHandler: breadBlurHandler,
    reset: resetBreadInput,
  } = useInput((value) => value.trim() !== '');
  // ********** ------- change type food ----------

  const changeTypeFoodHandler = (type) => {
    setType(type);
  };

  //****** ----------- whole form is valid or not --------------

  if (
    enteredDishNameIsValid &&
    enteredPreparationTimeIsValid &&
    ((enteredSlicesIsValid && enteredDiameterIsValid) ||
      enteredSpicinessScaleIsValid ||
      enteredBreadIsValid)
  )
    formIsValid = true;

  // ***** ---------- submitForm  ---------
  const sendFormHandler = async (e) => {
    e.preventDefault();

    if (type === 'pizza')
      DATA = {
        name: enteredDishName,
        preparation_time: enteredPreparationTime,
        type: type,
        no_of_slices: Number(enteredSlices),
        diameter: Number(enteredDiameter),
      };

    if (type === 'soup')
      DATA = {
        name: enteredDishName,
        preparation_time: enteredPreparationTime,
        type: type,
        spiciness_scale: Number(enteredSpicinessScale),
      };

    if (type === 'sandwich')
      DATA = {
        name: enteredDishName,
        preparation_time: enteredPreparationTime,
        type: type,
        slices_of_bread: Number(enteredBread),
      };

    ///****** try send */
    sendData(DATA);
    //reset DATA
    DATA = {};

    // reset field
    resetPreparationTimeInput();
    resetDishNameInput();

    resetSlicesInput();
    resetDiameterInput();

    resetSpicinessScaleInput();
    resetBreadInput();

    setType('pizza');
    formIsValid = false;
  };

  return (
    <form onSubmit={sendFormHandler}>
      <div className={classes.container}>
        <label htmlFor="dishName">Dish name</label>
        <input
          id="dishName"
          type="text"
          value={enteredDishName}
          onBlur={dishNameBlurHandler}
          onChange={dishNameChangedHandler}
        />
        {dishNameInputHasError && <p>Error --- filed cant't be empty</p>}
      </div>

      <div className={classes.container}>
        <label htmlFor="preparationTime">Preparation Time</label>
        <input
          id="preparationTime"
          type="time"
          step="1"
          value={enteredPreparationTime ? enteredPreparationTime : '00:00:00'}
          onBlur={preparationTimeBlurHandler}
          onChange={preparationTimeChangedHandler}
        />
        {preparationTimeInputHasError && <p>Error --- filed cant't be empty</p>}
      </div>
      {/*--------- select food ---------  */}
      <SelectedTypeFood changeTypeFood={changeTypeFoodHandler} type={type} />

      {/*---------- pizza -------------- */}

      {type === 'pizza' && enteredDishNameIsValid && enteredPreparationTimeIsValid && (
        <>
          <div className={classes.container}>
            <label htmlFor="slices">Number of slices </label>
            <input
              id="slices"
              type="number"
              min={1}
              step={1}
              value={enteredSlices}
              onBlur={slicesBlurHandler}
              onChange={slicesChangedHandler}
            />
            {slicesInputHasError && <p>Error --- filed cant't be empty</p>}
          </div>
          <div className={classes.container}>
            <label htmlFor="diameter">Diameter </label>
            <input
              id="slices"
              type="number"
              min={10}
              step={0.1}
              value={enteredDiameter}
              onBlur={diameterBlurHandler}
              onChange={diameterChangedHandler}
            />
            {diameterInputHasError && <p>Error --- filed cant't be empty</p>}
          </div>
        </>
      )}

      {/*---------- soup -------------- */}
      {type === 'soup' && enteredDishNameIsValid && enteredPreparationTimeIsValid && (
        <div className={classes.container}>
          <label htmlFor="spicinessScale">Spiciness scale</label>
          <input
            id="spicinessScale"
            type="number"
            min={0}
            max={10}
            step={1}
            value={enteredSpicinessScale}
            onBlur={spicinessScaleBlurHandler}
            onChange={spicinessScaleChangedHandler}
          />
          {spicinessScaleInputHasError && <p>Error --- filed cant't be empty</p>}
        </div>
      )}

      {/*---------- sandiwch -------------- */}
      {type === 'sandwich' && enteredDishNameIsValid && enteredPreparationTimeIsValid && (
        <div className={classes.container}>
          <label htmlFor="bread">Slices of bread</label>
          <input
            id="bread"
            type="number"
            min={0}
            step={1}
            value={enteredBread}
            onBlur={breadBlurHandler}
            onChange={breadChangedHandler}
          />
          {breadInputHasError && <p>Error --- filed cant't be empty</p>}
        </div>
      )}

      {sending ? (
        <Spinner />
      ) : (
        <button disabled={!formIsValid} className={classes.btn}>
          Send 🚀
        </button>
      )}
    </form>
  );
};

export default Form;
