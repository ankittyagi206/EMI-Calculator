import "../index.css";

const Slider = ({
  heading,
  amountCalulatedText,
  amount,
  setSliderValue,
  value,
  min,
  max,
}: any) => {
  return (
    <>
      <h2>{heading}</h2>
      <h3>{amountCalulatedText}</h3>
      <div style={{ marginTop: "30px", marginBottom: "50px" }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          className="slider"
          id="myRange"
          onChange={setSliderValue}
        ></input>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{amount ? "0RS" : "0%"}</h3>
          <h3>{value} Rs</h3>
          <h3>{amount ? max : "100%"}</h3>
        </div>
      </div>
    </>
  );
};

export default Slider;
