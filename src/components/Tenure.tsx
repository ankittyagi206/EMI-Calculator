import Button from "./Button";

type TenureProps = {
  heading: string;
  intervals: Array<number>;
  setTenure: any;
  tenure: number;
};
const Tenure = ({ heading, intervals, setTenure, tenure }: TenureProps) => {
  return (
    <>
      <h2>{heading}</h2>
      {intervals.map((interval, index) => (
        <Button
          key={index}
          interval={interval}
          onClick={setTenure}
          value={tenure}
        />
      ))}
    </>
  );
};

export default Tenure;
