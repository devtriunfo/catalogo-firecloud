"use client";

import { Box, Typography, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

const CatalogoFireCloud = () => {
  const scrollToProducts = () => {
    const firstSection = document.getElementById("armazenar");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: { xs: "500px", md: "600px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-04-16%20at%2017.47.07-3HspEm4ytxIQreEFRPtfVrknZ54pv7.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: 3,
          maxWidth: "800px",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: "relative",
            width: { xs: 180, md: 250 },
            height: { xs: 80, md: 100 },
            mb: 3,
          }}
        >
          <Image
            src="/brands/Logo1.png"
            alt="Marrakech Tabacaria"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>

        {/* Headline */}
        <Typography
          variant="h4"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontWeight: 300,
            fontSize: { xs: "1.25rem", md: "1.75rem" },
            mb: 2,
          }}
        >
          Experiencia premium em produtos para fumo
        </Typography>

        {/* Badge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: { xs: 40, md: 60 },
              height: "1px",
              backgroundColor: "#d4af37",
            }}
          />
          <Typography
            sx={{
              color: "#d4af37",
              fontSize: { xs: "0.875rem", md: "1rem" },
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            DESDE 2020
          </Typography>
          <Box
            sx={{
              width: { xs: 40, md: 60 },
              height: "1px",
              backgroundColor: "#d4af37",
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: { xs: "0.875rem", md: "1rem" },
            lineHeight: 1.6,
            maxWidth: "600px",
            mb: 4,
          }}
        >
          Oferecemos os melhores produtos do mercado: sedas, piteiras artesanais,
          narguiles, tabacos importados e muito mais. Qualidade e atendimento
          diferenciado para voce.
        </Typography>

        {/* CTA Button */}
        <Button
          onClick={scrollToProducts}
          variant="contained"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: "#d4af37",
            color: "#000",
            fontWeight: 600,
            fontSize: { xs: "0.875rem", md: "1rem" },
            px: { xs: 3, md: 4 },
            py: { xs: 1.25, md: 1.5 },
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#c4a030",
            },
          }}
        >
          Ver Produtos
        </Button>
      </Box>
    </Box>
  );
};

export default CatalogoFireCloud;
