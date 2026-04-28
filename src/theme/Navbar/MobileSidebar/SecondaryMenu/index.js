/**
 * Swizzle of Navbar/MobileSidebar/SecondaryMenu.
 *
 * The secondary menu is what users see when they tap the hamburger button
 * while on a docs page — it defaults to showing the docs sidebar. The
 * top-level navbar links (Blog, Community) were not visible at all, making
 * them impossible to discover on mobile.
 *
 * This override pins the labeled navbar items at the top of the secondary
 * menu so that Blog and Community are immediately visible. The "Back to main
 * menu" button is removed since all labeled nav items are now shown inline.
 */
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';

export default function NavbarMobileSidebarSecondaryMenu() {
  const {
    navbar: {items},
  } = useThemeConfig();
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
      {secondaryMenu.content}
    </>
  );
}
