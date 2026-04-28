/**
 * Swizzle of Navbar/MobileSidebar/SecondaryMenu.
 *
 * The secondary menu is what users see when they tap the hamburger button
 * while on a docs page — it defaults to showing the docs sidebar. The
 * top-level navbar links (Blog, Community) are hidden behind a
 * "Back to main menu" button, making them impossible to discover on mobile.
 *
 * This override pins the labeled navbar items at the top of the secondary
 * menu so that Blog and Community are immediately visible without an extra
 * navigation step.
 */
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';
import NavbarItem from '@theme/NavbarItem';

function SecondaryMenuBackButton(props) {
  return (
    <button {...props} type="button" className="clean-btn navbar-sidebar__back">
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
        ← Back to main menu
      </Translate>
    </button>
  );
}

export default function NavbarMobileSidebarSecondaryMenu() {
  const {
    navbar: {items},
  } = useThemeConfig();
  const isPrimaryMenuEmpty = items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();
  const mobileSidebar = useNavbarMobileSidebar();

  // Exclude icon-only items (e.g. GitHub link) that have no visible label.
  const labeledItems = items.filter((item) => item.label);

  return (
    <>
      {labeledItems.length > 0 && (
        <ul className="menu__list">
          {labeledItems.map((item, i) => (
            <NavbarItem
              key={i}
              mobile
              {...item}
              onClick={() => mobileSidebar.toggle()}
            />
          ))}
        </ul>
      )}
      {/* Back button lets users reach any remaining items (e.g. GitHub icon) */}
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {secondaryMenu.content}
    </>
  );
}
