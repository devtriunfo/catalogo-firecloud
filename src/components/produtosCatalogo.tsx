"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export interface Produto {
  src: string;
  nome: string;
  descricao?: string;
  preco: string;
}

const formatPriceBRL = (price: string) => {
  const normalized = price.trim();
  return normalized.toLowerCase().startsWith("r$") ? normalized : `R$ ${normalized}`;
};

interface ProdutosCatalogoProps {
  jsonPath: string;
  categoria: string;
  categoriaId: string;
  id: string;
  onAddToCart: (produto: Produto, categoria: string) => void;
}

export default function ProdutosCatalogo({
  jsonPath,
  categoria,
  categoriaId,
  id,
  onAddToCart,
}: ProdutosCatalogoProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const loadProducts = async () => {
      const supabase = getSupabaseBrowserClient();

      if (supabase) {
        const { data, error } = await supabase
          .from("produtos")
          .select("nome, descricao, preco, src")
          .eq("categoria", categoriaId)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setProdutos(data);
          return;
        }
      }

      fetch(jsonPath)
        .then((res) => res.json())
        .then((data) => setProdutos(data))
        .catch(() => setProdutos([]));
    };

    loadProducts();
  }, [jsonPath, categoriaId]);

  return (
    <Box
      id={id}
      sx={{
        py: isMobile ? 3 : 4,
        px: isMobile ? 2 : isTablet ? 4 : 6,
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {/* Título da categoria */}
      <Typography
        variant="h4"
        sx={{
          color: "#d4af37",
          fontWeight: 600,
          mb: 3,
          fontSize: isMobile ? "1.5rem" : "2rem",
          fontStyle: "italic",
        }}
      >
        {categoria}
      </Typography>

      <Grid container spacing={isMobile ? 2 : 3}>
        {produtos.map((produto, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                transition: "transform 0.2s, border-color 0.2s",
                "&:hover": {
                  ...(isDesktop
                    ? { transform: "translateY(-4px)", borderColor: "#3a3a3a" }
                    : {}),
                },
              }}
            >
              {/* Área da imagem */}
              <Box
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProduct(produto)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedProduct(produto);
                  }
                }}
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "100%",
                  backgroundColor: "#141414",
                  cursor: "zoom-in",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={produto.src}
                    alt={produto.nome}
                    fill
                    sizes={isMobile ? "50vw" : isTablet ? "33vw" : "25vw"}
                    style={{ objectFit: "contain", padding: "16px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/unavailable.webp";
                    }}
                  />
                </Box>
              </Box>

              {/* Conteúdo do card */}
              <CardContent
                sx={{
                  p: isMobile ? 1.5 : 2,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  "&:last-child": { pb: isMobile ? 1.5 : 2 },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#d4af37",
                    fontWeight: 600,
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    lineHeight: 1.3,
                    mb: 0.5,
                  }}
                >
                  {produto.nome}
                </Typography>
                
                {produto.descricao && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#888888",
                      fontSize: isMobile ? "0.75rem" : "0.85rem",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 1.5,
                      flexGrow: 1,
                    }}
                  >
                    {produto.descricao}
                  </Typography>
                )}

                {/* Preço e botão */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#d4af37",
                      fontWeight: 700,
                      fontSize: isMobile ? "1rem" : "1.15rem",
                    }}
                  >
                    {formatPriceBRL(produto.preco)}
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon sx={{ fontSize: isMobile ? 16 : 18 }} />}
                    onClick={() => onAddToCart(produto, categoria)}
                    sx={{
                      borderColor: "#d4af37",
                      color: "#d4af37",
                      textTransform: "none",
                      fontSize: isMobile ? "0.75rem" : "0.85rem",
                      px: isMobile ? 1 : 1.5,
                      py: 0.5,
                      minWidth: "auto",
                      "&:hover": {
                        borderColor: "#e5c349",
                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                      },
                    }}
                  >
                    Adicionar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de visualização do produto */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
          },
        }}
      >
        <DialogContent sx={{ p: 2.5, position: "relative" }}>
          <IconButton
            aria-label="Fechar"
            onClick={() => setSelectedProduct(null)}
            sx={{ 
              position: "absolute", 
              top: 8, 
              right: 8, 
              zIndex: 2,
              color: "#888888",
              "&:hover": { color: "#ffffff" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedProduct && (
            <>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 280, sm: 420 },
                  mt: 1,
                  backgroundColor: "#141414",
                  borderRadius: 1,
                }}
              >
                <Image
                  src={selectedProduct.src}
                  alt={selectedProduct.nome}
                  fill
                  sizes="(max-width: 600px) 90vw, 560px"
                  style={{ objectFit: "contain", padding: "16px" }}
                />
              </Box>

              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#d4af37", 
                  fontWeight: "bold", 
                  mt: 2 
                }}
              >
                {selectedProduct.nome}
              </Typography>
              {selectedProduct.descricao && (
                <Typography 
                  variant="body2" 
                  sx={{ color: "#888888", mt: 0.8 }}
                >
                  {selectedProduct.descricao}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
