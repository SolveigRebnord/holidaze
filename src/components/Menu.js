const Menu = ({ title, children, isActive, amount }) => {
  if (amount == 0) {
    amount = "0";
  }
  return (
    <div className="">
      {isActive ? (
        <section>
          <h3 className="font-passionOne uppercase text-xl tracking-wide">
            {title} {amount && `(${amount})`}
          </h3>
          <hr className="bg-black h-1 border-none shadow-none mt-4"></hr>
          <div>{children} </div>
        </section>
      ) : (
        <p className="hidden">tomt</p>
      )}
    </div>
  );
};

export default Menu;
