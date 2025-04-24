export default function Home (){
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Nav setSelectedPage={setSelectedPage}/>
      <div >
        {renderComponent()}
      </div>
      <Footer/>
    </div>
  );
}