const nextConfig = {
  reactStrictMode: true,
  // Configuración básica para Vercel
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ecolink-backend.onrender.com';
    
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

