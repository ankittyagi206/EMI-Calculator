type InputProps = {
  heading: string;
  value: number;
  placeholderText: string;
  onChange: (e: any) => void;
};
const Input = ({ heading, value, placeholderText, onChange }: InputProps) => {
  return (
    <>
      <h2>{`${heading} (In %)`}</h2>
      <input
        style={{
          width: "100%",
          padding: "20px",
          fontSize: "18px",
          border: "none",
          borderBottom: "1px solid gray",
        }}
        type="number"
        className="input-style"
        value={value}
        placeholder={placeholderText}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
