import React from "react";
import { InvestmentRecord } from "@/constants"; // ✅ already defined in your project
import Small from "@/public/small.svg"
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
type BannerProps = {
  data?: InvestmentRecord[]; // ✅ accepts the array of records
};

const Banner: React.FC<BannerProps> = ({ data }) => {
  const router = useRouter();

  const handleFundInvestment = (record: InvestmentRecord) => {
  // serialize record into query string
  const encoded = encodeURIComponent(JSON.stringify({ data: record }));
  router.push(`/Dashboard/Preview?data=${encoded}&fromDashboard=true`);
};

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No investment records available</p>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-[#18A23F]";
      case "INACTIVE":
        return "bg-yellow-100 text-[#E7AE00]";
      default:
        return "bg-gray-100 text-gray-700";
    }
    };

  return (
    <>
      {data.map((record: InvestmentRecord) => (
        <div
          key={record.expectedProfit}
          className="bg-white rounded-lg shadow-md p-15 pl-3 pt-6 my-4 border-l-4 border-blue-500"
        >
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-[18px] font-medium">
               Investment Details
            </h2>
           <div className="flex items-center gap-3">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
      record.investmentStatus
    )}`}
  >
    {record.investmentStatus.toLowerCase()}
  </span>

  {record.investmentStatus === "INACTIVE" && (
    <Button
    className='w-[180px] h-[40px] text-sm font-medium'
     onClick={() => handleFundInvestment(record)}
    >
      + Fund Investment
    </Button>
  )}
</div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Total Investment</p>
                <p className="font-semibold text-gray-900 mb-2">
                  ₦{record.amountInvested.toLocaleString()}
                </p>
                <p className="text-xs text-[#808080]">
  Started on{" "}
  {new Date(record.dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>

              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Estimated profit at maturity</p>
                <p className="font-semibold text-gray-900 mb-3">
                  ₦{record.expectedProfit.toLocaleString()}
                </p>
                <p className="text-xs text-[#808080]">
  matures{" "}
  {new Date(record.maturityDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accrued profit as at today</p>
                <p className="font-semibold text-gray-900">
                  
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expected investment returns</p>
                <p className="font-semibold text-gray-900">
                  ₦{record.expectedReturn.toLocaleString()}
                </p>
              </div>
             
            </div>
                <div>
                       <div className="mb-5">
                <span className="text-sm  rounded-[30px] bg-gray-100 p-2 text-[#111111]">
                    {`${record.durationInMonths} months at ${record.interestRate}% PA`}
                </span>
                      </div>
                      <div className="w-50 rounded-lg  flex flex-col items-center bg-gray-100 p-4">
              <p className="text-sm text-gray-500 mb-2">Total investment</p>
              <p className="text-3xl font-bold text-gray-900">
                ₦{record.amountInvested.toLocaleString()}
              </p>
            </div>
                  </div>  
           
          </div>

          <div className="mt-4 text-sm text-gray-500 flex items-center gap-1">
            <Small/>
            <p>{record.daysLeftToMaturity} days left for your investment to mature</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Banner;
