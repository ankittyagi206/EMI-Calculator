import "../index.css";
const Button = ({ interval, onClick, value }: any) => {
  return (
    <>
      <button
        onClick={() => onClick(interval)}
        className={interval === value ? "btn btn-active" : "btn"}
      >
        {interval}
      </button>
    </>
  );
};

export default Button;
