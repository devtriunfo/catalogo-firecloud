"use client";

import { Box, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { WhatsApp, Instagram } from "@mui/icons-material";

interface SocialButtonsProps {
  whatsapp: string;
  instagram: string;
  location?: string;
}

const SocialButtons = ({ whatsapp, instagram }: SocialButtonsProps) => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 960px
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // > 960px

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: isMobile ? 5 : 20,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 1 : 1.5, // Reduz espaçamento no mobile
        zIndex: 10,
      }}
    >
      {/* Botão do Instagram */}
      <Tooltip title="Instagram">
        <IconButton
          component="a"
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            color: "white",
            width: isMobile ? 48 : 56, 
            height: isMobile ? 48 : 56, 
            boxShadow: "0 4px 15px rgba(225, 48, 108, 0.4)",
            "&:hover": { 
              background: "linear-gradient(45deg, #e08323 0%, #d5572c 25%, #cb1633 50%, #bb1256 75%, #ab0778 100%)",
            },
          }}
        >
          <Instagram fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
      </Tooltip>

      {/* Botão do WhatsApp */}
      <Tooltip title="WhatsApp">
        <IconButton
          component="a"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#25D366",
            color: "white",
            width: isMobile ? 48 : 56,
            height: isMobile ? 48 : 56, 
            boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
            "&:hover": { backgroundColor: "#1DA851" },
          }}
        >
          <WhatsApp fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialButtons;
