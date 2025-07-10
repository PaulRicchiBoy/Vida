# VIDA Wellness Center - Configuración

## 🚀 Configuración de Google Sheets

### 1. Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra las columnas en la primera fila:
   - A1: "Fecha"
   - B1: "Nombre"
   - C1: "Email" 
   - D1: "Teléfono"
   - E1: "Plan"
   - F1: "Clases de Interés"
   - G1: "Mensaje"
   - H1: "Idioma"

### 2. Obtener Sheet ID
- En la URL de tu sheet: `https://docs.google.com/spreadsheets/d/SHEET_ID_AQUI/edit`
- Copia el SHEET_ID

### 3. Configurar API de Google Sheets
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Crea credenciales (API Key)
5. Configura las variables de entorno

### 4. Variables de Entorno
Crea un archivo `.env.local`:

\`\`\`env
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
STRIPE_PUBLISHABLE_KEY=pk_test_tu_stripe_key
STRIPE_SECRET_KEY=sk_test_tu_stripe_secret
\`\`\`

## 💳 Configuración de Stripe

1. Crea cuenta en [Stripe](https://stripe.com)
2. Obtén las claves de prueba
3. Configura webhooks para confirmación de pagos

## 📧 Email configurado para: waldiamio16000@gmail.com

El sistema está preconfigurado para enviar notificaciones a tu email.

## 🎨 Características Implementadas

✅ **Bilingüe** (Español/Inglés)
✅ **Animaciones** con Framer Motion
✅ **Google Sheets** integración
✅ **Pasarela de pago** Stripe
✅ **Imágenes** del Valle Sagrado
✅ **Responsive** design
✅ **Formularios** avanzados
✅ **Email** notifications

## 🏃‍♂️ Ejecutar el proyecto

\`\`\`bash
npm install
npm run dev
\`\`\`

Visita: http://localhost:3000
