"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  SmokingRooms,
  RiceBowl,
  Whatshot,
  ContentCut,
  Delete,
  Inventory,
  LocalOffer,
  Receipt,
} from "@mui/icons-material";
import { CATALOG_CATEGORIES } from "@/lib/catalog";

const ICON_MAP: Record<string, React.ReactNode> = {
  Narguiles: <SmokingRooms sx={{ fontSize: 28 }} />,
  Cuias: <RiceBowl sx={{ fontSize: 28 }} />,
  Isqueiros: <Whatshot sx={{ fontSize: 28 }} />,
  Piteiras: <ContentCut sx={{ fontSize: 28 }} />,
  Cinzeiros: <Delete sx={{ fontSize: 28 }} />,
  Sedas: <Receipt sx={{ fontSize: 28 }} />,
  Slicks: <Inventory sx={{ fontSize: 28 }} />,
  Tabaco: <LocalOffer sx={{ fontSize: 28 }} />,
  Tesouras: <ContentCut sx={{ fontSize: 28 }} />,
  Bandejas: <Inventory sx={{ fontSize: 28 }} />,
};

const CategoryCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0a0a0a",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "white",
          fontStyle: "italic",
          fontWeight: 500,
          mb: { xs: 3, md: 4 },
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Navegue por Categoria
      </Typography>

      {/* Cards Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 1.5, md: 2 },
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {CATALOG_CATEGORIES.map((category) => (
          <Box
            key={category.id}
            onClick={() => scrollToSection(category.sectionId)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "calc(33.33% - 12px)", sm: "120px", md: "140px" },
              height: { xs: 80, md: 100 },
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#2a2a2a",
                borderColor: "#d4af37",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box sx={{ color: "white", mb: 1 }}>
              {ICON_MAP[category.title] || <Inventory sx={{ fontSize: 28 }} />}
            </Box>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "11px", md: "13px" },
                fontWeight: 500,
                textAlign: "center",
                px: 1,
              }}
            >
              {category.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryCards;
