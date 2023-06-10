import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Input from "./components/Input";
import { data } from "./constants";
import Tenure from "./components/Tenure";
import Slider from "./components/Slider";

const App = () => {
  const {
    title,
    assetCost,
    interestRate,
    processingFees,
    downPayment,
    loanPerMonth,
    tenure,
  } = data;

  const [assetCostVal, setAssetCostVal] = useState(assetCost.defaultValue);
  const [interestRateVal, setInterestRateVal] = useState(
    interestRate.defaultValue
  );
  const [processingRateVal, setProcessingRateVal] = useState(
    interestRate.defaultValue
  );
  const [downPaymentVal, setDownPaymentVal] = useState(
    downPayment.defaultValue
  );
  const [tenureVal, setTenureVal] = useState(tenure.defaultValue);
  const [emi, setEmi] = useState<number>(loanPerMonth.defaultValue);
  const calculateEMI = useCallback(
    (downPayment: any) => {
      if (!assetCostVal) return 0;
      const loanAmt = assetCostVal - downPayment;
      const rateOfInterest = interestRateVal / 100;
      const numOfYears = tenureVal / 12;

      const emi =
        (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
        ((1 + rateOfInterest) ** numOfYears - 1);

      return Number(Number(emi / 12).toFixed(0));
    },
    [assetCostVal, interestRateVal, tenureVal]
  );

  const updateEMI = (e: any) => {
    if (!assetCostVal) return;
    const dp = Number(e.target.value);
    setDownPaymentVal(Number(dp.toFixed(0)));
    const emival = calculateEMI(dp);
    setEmi(Number(emival));
  };
  const calculateDP = (emi: any) => {
    if (!assetCostVal) return;
    const downpaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downpaymentPercent / 100) * assetCostVal).toFixed(0);
  };
  useEffect(() => {
    if (!(assetCostVal > 0)) {
      setDownPaymentVal(0);
      setEmi(0);
    }
    const EMI = calculateEMI(downPaymentVal);
    setEmi(Number(EMI));
  }, [tenure, assetCostVal, calculateEMI, downPaymentVal]);

  const updateDownPayment = (e: any) => {
    if (!assetCostVal) return;
    const emi = Number(e.target.value);
    setEmi(Number(emi.toFixed(0)));
    const DOWN_PAYMENT = calculateDP(emi);
    setDownPaymentVal(Number(DOWN_PAYMENT));
  };
  const handleTenure = (val: any) => {
    setTenureVal(val);
  };
  function numberWithCommas(x: any) {
    if (x) return `₹ ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  const totalDownPayment = () => {
    return numberWithCommas(
      (
        Number(downPaymentVal) +
        (assetCostVal - downPaymentVal) * (processingRateVal / 100)
      ).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenureVal).toFixed(0));
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>{title}</h1>
      <Input
        heading={assetCost.heading}
        value={assetCostVal}
        placeholderText={assetCost.placeholder}
        onChange={(e: any) => setAssetCostVal(e.target.value)}
      />
      <Input
        heading={interestRate.heading}
        value={interestRateVal}
        placeholderText={interestRate.placeholder}
        onChange={(e: any) => setInterestRateVal(e.target.value)}
      />
      <Input
        heading={processingFees.heading}
        value={processingRateVal}
        placeholderText={processingFees.placeholder}
        onChange={(e: any) => setProcessingRateVal(e.target.value)}
      />
      <Slider
        min={0}
        max={assetCostVal}
        value={downPaymentVal}
        heading={downPayment.heading}
        amountCalulatedText={`${
          downPayment.calculatedDownPaymentText
        }-${totalDownPayment()}`}
        amount={false}
        setSliderValue={updateEMI}
      />
      <Slider
        min={calculateEMI(assetCostVal)}
        max={calculateEMI(0)}
        value={emi}
        setSliderValue={updateDownPayment}
        heading={loanPerMonth.heading}
        amountCalulatedText={`${
          loanPerMonth.calculatedDownPaymentText
        }-${totalEMI()}`}
        amount={true}
      />
      <Tenure
        heading={tenure.heading}
        intervals={tenure.intervals}
        setTenure={handleTenure}
        tenure={tenureVal}
      />
    </div>
  );
};

export default App;
