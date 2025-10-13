export const BANNER_CONFIG = {
  sizes: {
    small: 400,
    medium: 550,
    large: 700,
  },
  overlay: {
    backgroundColor: "rgba(0, 40, 80, 0.6)", // Puedes cambiar el color aquí
  },
  button: {
    backgroundColor: "#3b9fc9", // Color del botón
    borderRadius: 8,
  },
  typography: {
    small: {
      title: 32,
      subtitle: 14,
      lineHeight: 40,
    },
    medium: {
      title: 40,
      subtitle: 16,
      lineHeight: 48,
    },
    large: {
      title: 48,
      subtitle: 18,
      lineHeight: 56,
    },
  },
} as const;