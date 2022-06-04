import classes from './form.module.css';

const SelectedTypeFood = ({ type, changeTypeFood }) => {
  const typeFoodHandler = (e) => {
    changeTypeFood(e.target.value);
  };
  return (
    <div className={classes.container}>
      <label htmlFor="type">Choose type:</label>

      <select id="type" onChange={typeFoodHandler} value={type}>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
    </div>
  );
};

export default SelectedTypeFood;
