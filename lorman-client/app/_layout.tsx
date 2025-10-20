import Header from '@/components/custom/Header';
import { AuthProvider } from '@/context/AuthContext';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { View, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Head from 'expo-router/head';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      {/* Meta tags globales - Solo para Web */}
      {Platform.OS === 'web' && (
        <Head>
          {/* Básicos */}
          <title>Lorman SLP</title>
          <meta name="description" content="Lorman es tu distribuidora de confianza de agua purificada en México. Ofrecemos garrafones de 20L, 10L y botellas con entrega a domicilio. Calidad garantizada y servicio excepcional." />
          <meta name="keywords" content="agua purificada, garrafones, distribuidora agua, agua a domicilio, Lorman, agua embotellada, garrafón 20L, garrafón 10L, agua de calidad, México" />
          <meta name="author" content="Lorman Distribuidora" />
          <meta charSet="utf-8" />
          
          {/* Viewport y responsividad */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          
          {/* Theme color */}
          <meta name="theme-color" content="#17a2b8" />
          <meta name="msapplication-TileColor" content="#17a2b8" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Lorman" />
          <meta property="og:title" content="Lorman - Distribuidora de Agua Purificada" />
          <meta property="og:description" content="Agua purificada de calidad premium. Garrafones de 20L, 10L y botellas con entrega a domicilio en toda la región." />
          <meta property="og:locale" content="es_MX" />
          <meta property="og:url" content="https://lorman.com" />
          <meta property="og:image" content="https://lorman.com/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Lorman - Agua Purificada de Calidad" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@Lorman" />
          <meta name="twitter:creator" content="@Lorman" />
          <meta name="twitter:title" content="Lorman - Distribuidora de Agua Purificada" />
          <meta name="twitter:description" content="Agua purificada de calidad con entrega a domicilio. Garrafones y botellas para tu hogar y negocio." />
          <meta name="twitter:image" content="https://lorman.com/twitter-image.jpg" />
          
          {/* SEO adicional */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
          <meta name="language" content="Spanish" />
          <meta name="geo.region" content="MX" />
          <meta name="geo.placename" content="México" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://lorman.com" />
          
          {/* Favicons */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#17a2b8" />
          
          {/* Preconnect para optimización */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          {/* PWA */}
          <meta name="application-name" content="Lorman" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Lorman" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* Microsoft */}
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-tap-highlight" content="no" />
          
          {/* Schema.org para Google */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Lorman",
                "url": "https://lorman.com",
                "logo": "https://lorman.com/logo.png",
                "description": "Distribuidora de agua purificada de calidad en México",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "MX",
                  "addressRegion": "México"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+52-xxx-xxx-xxxx"
                },
                "sameAs": [
                  "https://facebook.com/lorman",
                  "https://twitter.com/lorman",
                  "https://instagram.com/lorman"
                ]
              }
            `}
          </script>
          
          {/* LocalBusiness Schema */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Lorman",
                "image": "https://lorman.com/logo.png",
                "priceRange": "$$",
                "servesCuisine": "Agua Purificada",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "MX"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "LATITUDE",
                  "longitude": "LONGITUDE"
                },
                "url": "https://lorman.com",
                "telephone": "+52-xxx-xxx-xxxx",
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "18:00"
                  }
                ]
              }
            `}
          </script>
        </Head>
      )}

      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <AuthProvider>
          <View className="flex h-screen w-screen items-center justify-center">
            <View style={{ flex: 1 }} className="w-full">
              <Stack screenOptions={{ headerShown: false }} />
              <PortalHost />
            </View>
          </View>
        </AuthProvider>
        <Toast position="bottom" />
      </ThemeProvider>
    </>
  );
}
