'use client';
import Nav from '@/components/home/Nav';
import Content from '@/components/home/Content';
import Footer from '@/components/home/Footer';
import Characters from '@/components/home/Characters';
import Spells from '@/components/home/Spells';
import Languages from '@/components/home/Languages';
import { useState } from 'react';

export default function Home (){
  const [selectedPage, setSelectedPage] = useState('/');

  const renderComponent=()=>{
    switch (selectedPage) {
      case 'characters':
        return <Characters />;
      case 'spells':
        return <Spells />;
      case 'languages':
        return <Languages />;
      case 'icon':
        return <Content />;
      default:
        return <Content />;
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Nav setSelectedPage={setSelectedPage}/>
      <div className='flex flex-col  justify-center p-2'>
        {renderComponent()}
      </div>
      <Footer/>
    </div>
  );
}