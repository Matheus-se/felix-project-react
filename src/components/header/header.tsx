import FelixLogo from "../felixLogo/felixLogo";
import LocaleMenu from "../localeMenu/localeMenu";

const Header = () => {
  return (
    <div className="sticky top-0 mx-auto flex h-20 w-full max-w-6xl items-center justify-between bg-white">
      <div className="flex w-auto items-center justify-between">
        <FelixLogo />
      </div>
      <LocaleMenu />
    </div>
  );
};

export default Header;