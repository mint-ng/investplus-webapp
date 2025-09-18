"use client";
import React from 'react'
import Button from '@/components/Button/Button';
import LightImage from "@/public/Frame.png"
import DarkImage from "@/public/Framee.png"
import Exclamation from "@/public/exclamation.svg"
import Investments from '../apis/mutations/queries/get-investments';
import DashboardStatCard from '@/components/Card/Card';
import MoneyIcon from "@/public/moneys.svg"
import GraphIcon from "@/public/graph.svg"
import DiagramIcon from "@/public/diagram.svg"
import Banner from '@/components/Card/Banner';
import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';
import Pagination from '@/components/Pagination/Pagination';
export default function page() {
  const { data, isLoading } = Investments();
 if (isLoading) {
    return <ScreenLoader />;
  }
  return (
    <div>
      <div className='flex justify-end mb-3'>
        <Button intent='primary' href='/Dashboard/Create' className='w-[200px] h-[43px] text-sm font-medium'>
          + Create investment
        </Button>
      </div>
      <div className='max-w-[400px] p-1 bg-[#0000000D] text-[10px] rounded-[10px] flex gap-1 items-center'>
        <Exclamation />
       <p>A temporary account will be created prior to setting up the Mintyn account, <br/>
        after which your investment will be transferred to the Mintyn account'</p> 
      </div>

      <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
         <DashboardStatCard
  title="Total Amount Invested"
  value={data?.data?.totalAmount}
  icon={<MoneyIcon />}
  coverImage={DarkImage}
  isDarkImage={true}
/>

<DashboardStatCard
  title="Expected Returns"
  value={data?.data?.totalReturns}
  icon={<GraphIcon />}
  coverImage={LightImage}
  isDarkImage={false}
          />
<DashboardStatCard
  title="Number of Active Investments"
  value={data?.data?.totalRecords}
  icon={<DiagramIcon />}
  coverImage={LightImage}
  isDarkImage={false}
/>
      </div>
      </div>
       <Pagination
        data={data?.data?.records || []}
        itemsPerPage={3}
        render={(currentRecords) => <Banner data={currentRecords} />}
      />
    </div>
  )
}