const nextConfig = {
  reactStrictMode: true,
  // Configuración para producción
  output: 'standalone',
  // Asegurar que las páginas se generen correctamente
  experimental: {
    // Habilitar la generación estática optimizada
    optimizePackageImports: ['react', 'react-dom'],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://back-ecolink-3.onrender.com';
    
    // Asegúrate de que la URL no termine con /
    const formattedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    
    return [
      {
        source: '/api/:path*',
        destination: `${formattedApiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

