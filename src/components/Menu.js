const Menu = ({ title, children, isActive, amount }) => {
  
  return (
    <div className="">
  
      {isActive ? 
      <section>
        <h3 className="font-passionOne uppercase text-xl tracking-wide">{title} ({amount})</h3>
        <hr className="bg-black h-1 border-none shadow-none mt-4"></hr>
        <div>{children}</div>
      </section> 
      : <p className="hidden">tomt</p>}
    </div>
  );
};

export default Menu;
/*
<li onClick={() => dispatch(clickMenu({menu1}))}
className="cursor-pointer text-red-900">
&#9993; Upcoming bookings
</li>*/
