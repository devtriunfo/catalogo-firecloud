"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { CATALOG_CATEGORIES } from "@/lib/catalog";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const MENU_ITEMS = [
  { label: "Todos", href: "#" },
  ...CATALOG_CATEGORIES.map((cat) => ({
    label: cat.title,
    href: `#${cat.sectionId}`,
  })),
];

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const sectionId = href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#0a0a0a",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "1400px",
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/logo-marrakech.png"
                alt="Marrakech Tabacaria"
                width={120}
                height={48}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </Box>

          {/* Menu Desktop */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              {MENU_ITEMS.map((item) => (
                <Box
                  key={item.label}
                  component="button"
                  onClick={() => scrollToSection(item.href)}
                  sx={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": {
                      color: "#d4af37",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          )}

          {/* Cart + Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={onCartClick}
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                p: 1,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0a0a0a",
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(item.href)}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    color: "#d4af37",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Spacer for fixed header */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </>
  );
};

export default Header;
