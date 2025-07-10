# Configuración de Google Sheets para VIDA Wellness

## 📊 Estructura de las Hojas de Cálculo

### Hoja 1: "Contactos"
Columnas:
- A: Fecha/Hora
- B: Tipo (contact)
- C: Nombre
- D: Email
- E: Teléfono
- F: Mensaje
- G: Interesado (Sí/No)
- H: Idioma
- I: Estado

### Hoja 2: "Compras"
Columnas:
- A: Fecha/Hora
- B: Tipo (purchase)
- C: Nombre Completo
- D: Email
- E: Teléfono
- F: Plan
- G: Precio
- H: Fecha Nacimiento
- I: Tarjeta (últimos 4 dígitos)
- J: Idioma
- K: Estado

### Hoja 3: "Pagos"
Columnas:
- A: Fecha/Hora
- B: Estado Pago
- C: Payment ID
- D: Monto
- E: Plan
- F: Cliente Email

## 🔧 Configuración Paso a Paso

### 1. Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "VIDA Wellness - Leads y Ventas"
4. Crea las 3 hojas con los nombres y columnas especificados

### 2. Obtener Sheet ID
- URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- Copia el SHEET_ID de la URL

### 3. Configurar Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto nuevo: "VIDA Wellness"
3. Habilita la API de Google Sheets
4. Crea credenciales (API Key)
5. Restringe la API Key solo a Google Sheets API

### 4. Configurar Variables de Entorno
\`\`\`env
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
\`\`\`

### 5. Hacer la Hoja Pública (Opcional)
- Clic en "Compartir"
- Cambiar a "Cualquier persona con el enlace puede ver"
- O añadir tu email de servicio como editor

## 📧 Configuración de Email

El sistema está configurado para enviar notificaciones a:
**waldiamio16000@gmail.com**

### Tipos de Notificaciones:
1. **Contacto**: Cuando alguien llena el formulario de contacto
2. **Compra**: Cuando alguien inicia una compra de membresía
3. **Confirmación**: Email de bienvenida al cliente

## 🔗 Enlaces de Redes Sociales Configurados:

- **WhatsApp**: https://wa.me/51984123456
- **Facebook**: https://facebook.com/vidawellnesscenter
- **Instagram**: https://instagram.com/vidawellnesscenter
- **YouTube**: https://youtube.com/@vidawellnesscenter
- **TripAdvisor**: https://tripadvisor.com/vidawellness

## 🚀 Funcionalidades Implementadas:

✅ **Formulario de Contacto** → Google Sheets + Email
✅ **Proceso de Compra Completo** → 3 pasos con validación
✅ **Pasarela de Pago Simulada** → Stripe integration ready
✅ **Notificaciones por Email** → A waldiamio16000@gmail.com
✅ **Redes Sociales** → Botones en nav y footer
✅ **Bilingüe** → Español/Inglés
✅ **Animaciones** → Framer Motion
✅ **Responsive** → Mobile-first design
✅ **Temática Valle Sagrado** → Imágenes y contenido peruano

## 📱 Redes Sociales Integradas:

Los botones de redes sociales están ubicados en:
- **Navegación desktop**: Iconos pequeños junto al selector de idioma
- **Navegación móvil**: En el menú hamburguesa
- **Sección de contacto**: Botones grandes con colores de marca
- **Footer**: Iconos con hover effects

Cada red social tiene su color característico y efectos de hover.
