import { Navbar as NextraNavBar } from "nextra-theme-docs";
import { UserButton } from "./UserButton";
import { FingridLogo } from "./FingridLogo";

export const NavBar = () => {
    return (<NextraNavBar
    logo={
      <div className="fingrid_logo flex align-center items-center">
        <a href="https://www.fingrid.fi/"><FingridLogo width={"100%"} /></a>
        <p className="pl-3 ml-3 border-l-[1px] border-l-[var(--color-separator)] dark:border-l-[var(--color-dark-separator)]">
            <a href="https://developers.fingrid.fi/">Developer&nbsp;Portal</a>
        </p>
      </div>
    }
    logoLink={false}
  >
    <UserButton />
  </NextraNavBar>);
}
