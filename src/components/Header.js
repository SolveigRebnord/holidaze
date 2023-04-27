const Header = () => {
    return ( <header className="h-28 w-full bg-transparent mb-12 absolute top-0 flex flex-row justify-between px-16 items-center">
        <p className="text-3xl text-white">Holidaze</p>
        <ul className="flex flex-row gap-12">
            <li>Venues</li>
            <li>Bookings</li>
            <li>Profile</li>
        </ul>
    </header> );
}
 
export default Header;