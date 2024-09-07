function Navbar() {
  return (
    <nav className="p-4">
      <ul className="flex justify-between items-center list-none px-20">
        <li>
          <img src="/logo.svg" alt="Logo" className="w-10" />
        </li>
        <li>
          <a
            className="px-8 py-2 font-bold text-lg no-underline text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-background transition-colors duration-300"
            href="#"
          >
            SIGN UP
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
