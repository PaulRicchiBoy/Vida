"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Menu,
  Dumbbell,
  Heart,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  Check,
  CreditCard,
  Loader2,
  Facebook,
  MessageCircle,
  Award,
  Instagram,
  Youtube,
  Clock,
  Shield,
  Trophy,
  Zap,
  Target,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Definición de tipos
interface Translation {
  [key: string]: any
}

interface Translations {
  en: Translation
  es: Translation
}

interface ClassItem {
  key: string
  icon: React.ComponentType
  color: 'green' | 'blue' | 'red' | 'purple'
  image: string
}

interface ValueItem {
  key: string
  icon: React.ComponentType
  color: 'green' | 'blue' | 'purple'
}

interface PlanItem {
  key: string
  popular: boolean
  icon: React.ComponentType
}

const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      classes: "Classes",
      membership: "Membership",
      about: "About Us",
      contact: "Contact",
      testimonials: "Reviews",
    },
    hero: {
      title: "Sacred Valley Wellness Experience",
      subtitle: "Ancient wisdom meets modern fitness in Peru's mystical Sacred Valley",
      cta: "Begin Sacred Journey",
      cta2: "Explore Classes",
      stats: {
        members: "500+ Happy Members",
        classes: "20+ Weekly Classes",
        experience: "5+ Years Experience",
      },
    },
    classes: {
      title: "Sacred Wellness Programs",
      subtitle: "Unique classes inspired by Andean traditions and modern science",
      yoga: {
        title: "Andean Yoga Flow",
        description: "Connect with Pachamama through ancient postures",
        duration: "60 min",
        level: "All Levels",
      },
      taichi: {
        title: "Mountain Tai Chi",
        description: "Flowing movements inspired by sacred peaks",
        duration: "45 min",
        level: "Beginner",
      },
      gym: {
        title: "Inca Warrior Training",
        description: "Functional strength like ancient builders",
        duration: "50 min",
        level: "Intermediate",
      },
      dance: {
        title: "Andean Fusion Dance",
        description: "Celebrate life through traditional rhythms",
        duration: "55 min",
        level: "All Levels",
      },
    },
    about: {
      title: "Our Sacred Mission",
      subtitle: "Transforming lives through ancestral wisdom and modern wellness",
      story:
        "Founded in the heart of Peru's Sacred Valley, VIDA combines ancient Incan traditions with contemporary fitness science.",
      values: {
        tradition: {
          title: "Ancient Wisdom",
          description: "Honoring Andean traditions in every practice",
        },
        community: {
          title: "Sacred Community",
          description: "Building connections that heal and inspire",
        },
        transformation: {
          title: "Personal Growth",
          description: "Guiding your journey to complete wellness",
        },
      },
    },
    membership: {
      title: "Sacred Membership Paths",
      subtitle: "Choose your transformation journey",
      condor: {
        title: "Condor Path",
        price: "$49",
        period: "/month",
        description: "Perfect for beginners starting their wellness journey",
        features: [
          "Gym equipment access",
          "2 group classes weekly",
          "Locker facilities",
          "Sacred Valley meditation sessions",
        ],
      },
      puma: {
        title: "Puma Path",
        price: "$89",
        period: "/month",
        description: "Most popular - Complete wellness transformation",
        features: [
          "Unlimited gym access",
          "All group classes included",
          "Monthly personal training",
          "Nutrition consultation",
          "Andean wellness ceremonies",
        ],
      },
      serpent: {
        title: "Serpent Path",
        price: "$129",
        period: "/month",
        description: "Premium experience with exclusive benefits",
        features: [
          "All Puma benefits included",
          "Weekly personal training",
          "Therapeutic massage sessions",
          "Priority class reservations",
          "Sacred ceremony participation",
          "Wellness retreat discounts",
        ],
      },
    },
    testimonials: {
      title: "Sacred Transformations",
      subtitle: "Real stories from our wellness community",
    },
    contact: {
      title: "Connect With Us",
      subtitle: "Ready to begin your sacred wellness journey?",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Your Message",
        submit: "Send Message",
        interest: "I'm interested in learning more about VIDA",
      },
      info: {
        location: "Sacred Valley, Cusco, Peru",
        phone: "+51 984 123 456",
        email: "hola@vidawellness.pe",
        hours: "Mon-Sun: 6:00 AM - 9:00 PM",
      },
    },
    purchase: {
      title: "Complete Your Membership",
      subtitle: "Join the VIDA wellness community today",
      form: {
        personal: "Personal Information",
        payment: "Payment Details",
        confirmation: "Confirmation",
      },
      processing: "Processing your membership...",
      success: "Welcome to VIDA! Check your email for details.",
      error: "Payment failed. Please try again.",
    },
    social: {
      follow: "Follow Our Journey",
      facebook: "Facebook Community",
      whatsapp: "WhatsApp Support",
      tripadvisor: "TripAdvisor Reviews",
      instagram: "Instagram Stories",
      youtube: "YouTube Classes",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      classes: "Clases",
      membership: "Membresías",
      about: "Nosotros",
      contact: "Contacto",
      testimonials: "Testimonios",
    },
    hero: {
      title: "Experiencia de Bienestar del Valle Sagrado",
      subtitle: "La sabiduría ancestral se encuentra con el fitness moderno en el místico Valle Sagrado del Perú",
      cta: "Comenzar Viaje Sagrado",
      cta2: "Explorar Clases",
      stats: {
        members: "500+ Miembros Felices",
        classes: "20+ Clases Semanales",
        experience: "5+ Años de Experiencia",
      },
    },
    classes: {
      title: "Programas de Bienestar Sagrado",
      subtitle: "Clases únicas inspiradas en tradiciones andinas y ciencia moderna",
      yoga: {
        title: "Flujo de Yoga Andino",
        description: "Conéctate con la Pachamama a través de posturas ancestrales",
        duration: "60 min",
        level: "Todos los Niveles",
      },
      taichi: {
        title: "Tai Chi de Montaña",
        description: "Movimientos fluidos inspirados en picos sagrados",
        duration: "45 min",
        level: "Principiante",
      },
      gym: {
        title: "Entrenamiento Guerrero Inca",
        description: "Fuerza funcional como los antiguos constructores",
        duration: "50 min",
        level: "Intermedio",
      },
      dance: {
        title: "Danza Fusión Andina",
        description: "Celebra la vida a través de ritmos tradicionales",
        duration: "55 min",
        level: "Todos los Niveles",
      },
    },
    about: {
      title: "Nuestra Misión Sagrada",
      subtitle: "Transformando vidas a través de la sabiduría ancestral y el bienestar moderno",
      story:
        "Fundado en el corazón del Valle Sagrado del Perú, VIDA combina tradiciones incas ancestrales con ciencia del fitness contemporáneo.",
      values: {
        tradition: {
          title: "Sabiduría Ancestral",
          description: "Honrando las tradiciones andinas en cada práctica",
        },
        community: {
          title: "Comunidad Sagrada",
          description: "Construyendo conexiones que sanan e inspiran",
        },
        transformation: {
          title: "Crecimiento Personal",
          description: "Guiando tu viaje hacia el bienestar completo",
        },
      },
    },
    membership: {
      title: "Senderos de Membresía Sagrada",
      subtitle: "Elige tu viaje de transformación",
      condor: {
        title: "Sendero Cóndor",
        price: "$49",
        period: "/mes",
        description: "Perfecto para principiantes que inician su viaje de bienestar",
        features: [
          "Acceso a equipos de gimnasio",
          "2 clases grupales semanales",
          "Instalaciones de casilleros",
          "Sesiones de meditación Valle Sagrado",
        ],
      },
      puma: {
        title: "Sendero Puma",
        price: "$89",
        period: "/mes",
        description: "Más popular - Transformación completa de bienestar",
        features: [
          "Acceso ilimitado al gimnasio",
          "Todas las clases grupales incluidas",
          "Entrenamiento personal mensual",
          "Consulta nutricional",
          "Ceremonias de bienestar andinas",
        ],
      },
      serpent: {
        title: "Sendero Serpiente",
        price: "$129",
        period: "/mes",
        description: "Experiencia premium con beneficios exclusivos",
        features: [
          "Todos los beneficios Puma incluidos",
          "Entrenamiento personal semanal",
          "Sesiones de masaje terapéutico",
          "Reservas prioritarias de clases",
          "Participación en ceremonias sagradas",
          "Descuentos en retiros de bienestar",
        ],
      },
    },
    testimonials: {
      title: "Transformaciones Sagradas",
      subtitle: "Historias reales de nuestra comunidad de bienestar",
    },
    contact: {
      title: "Conéctate Con Nosotros",
      subtitle: "¿Listo para comenzar tu viaje sagrado de bienestar?",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        phone: "Número de Teléfono",
        message: "Tu Mensaje",
        submit: "Enviar Mensaje",
        interest: "Estoy interesado en aprender más sobre VIDA",
      },
      info: {
        location: "Valle Sagrado, Cusco, Perú",
        phone: "+51 984 123 456",
        email: "hola@vidawellness.pe",
        hours: "Lun-Dom: 6:00 AM - 9:00 PM",
      },
    },
    purchase: {
      title: "Completa Tu Membresía",
      subtitle: "Únete a la comunidad de bienestar VIDA hoy",
      form: {
        personal: "Información Personal",
        payment: "Detalles de Pago",
        confirmation: "Confirmación",
      },
      processing: "Procesando tu membresía...",
      success: "¡Bienvenido a VIDA! Revisa tu email para más detalles.",
      error: "El pago falló. Por favor intenta de nuevo.",
    },
    social: {
      follow: "Sigue Nuestro Viaje",
      facebook: "Comunidad Facebook",
      whatsapp: "Soporte WhatsApp",
      tripadvisor: "Reseñas TripAdvisor",
      instagram: "Historias Instagram",
      youtube: "Clases YouTube",
    },
  },
}

export default function VidaWellnessLanding() {
  const [language, setLanguage] = useState<"en" | "es">("es")
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [purchaseStep, setPurchaseStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: false,
  })

  const [purchaseForm, setPurchaseForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  })

  const t = translations[language]

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          language,
          type: "contact",
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        alert(language === "en" ? "Thank you! We'll contact you soon." : "¡Gracias! Te contactaremos pronto.")
        setContactForm({ name: "", email: "", phone: "", message: "", interest: false })
      }
    } catch (error) {
      alert(language === "en" ? "Error sending message" : "Error enviando mensaje")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePurchase = (planType: string) => {
    setSelectedPlan(planType)
    setIsPurchaseOpen(true)
    setPurchaseStep(1)
  }

  const handlePurchaseSubmit = async () => {
    setIsProcessing(true)

    try {
      await fetch("/api/submit-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...purchaseForm,
          plan: selectedPlan,
          language,
          type: "purchase",
          timestamp: new Date().toISOString(),
        }),
      })

      await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: selectedPlan === "condor" ? 49 : selectedPlan === "puma" ? 89 : 129,
          customer: purchaseForm,
        }),
      })

      setPurchaseStep(3)
      setTimeout(() => {
        setIsPurchaseOpen(false)
        setPurchaseStep(1)
        setPurchaseForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          birthDate: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardName: "",
          address: "",
          city: "",
          country: "",
          zipCode: "",
        })
      }, 3000)
    } catch (error) {
      alert(t.purchase.error)
    } finally {
      setIsProcessing(false)
    }
  }

  const socialLinks = {
    whatsapp: "https://wa.me/51984123456",
    facebook: "https://facebook.com/vidawellnesscenter",
    tripadvisor: "https://tripadvisor.com/vidawellness",
    instagram: "https://instagram.com/vidawellnesscenter",
    youtube: "https://youtube.com/@vidawellnesscenter",
  }

  // Mapa de colores para Tailwind
  const colorMap = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600'
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
              <Image src="/vida-logo.png" alt="VIDA Wellness Center" width={50} height={50} className="rounded-full" />
              <span className="text-xl font-bold text-gray-800">VIDA</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {Object.entries(t.nav).map(([key, value]) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.1 }}
                >
                  {value}
                </motion.a>
              ))}

              {/* Social Icons in Nav */}
              <div className="flex items-center space-x-3 ml-4 border-l pl-4">
                <motion.a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  className="text-green-600 hover:text-green-700"
                  whileHover={{ scale: 1.2 }}
                  rel="noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.facebook}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700"
                  whileHover={{ scale: 1.2 }}
                  rel="noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.tripadvisor}
                  target="_blank"
                  className="text-green-700 hover:text-green-800"
                  whileHover={{ scale: 1.2 }}
                  rel="noreferrer"
                >
                  <Award className="w-5 h-5" />
                </motion.a>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                  EN
                </Button>
                <Button variant={language === "es" ? "default" : "outline"} size="sm" onClick={() => setLanguage("es")}>
                  ES
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-8">
                    {Object.entries(t.nav).map(([key, value]) => (
                      <a key={key} href={`#${key}`} className="text-lg font-medium">
                        {value}
                      </a>
                    ))}

                    <div className="flex space-x-4 pt-4 border-t">
                      <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </a>
                      <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </a>
                      <a href={socialLinks.tripadvisor} target="_blank" rel="noreferrer">
                        <Award className="w-6 h-6 text-green-700" />
                      </a>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        variant={language === "en" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLanguage("en")}
                      >
                        EN
                      </Button>
                      <Button
                        variant={language === "es" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLanguage("es")}
                      >
                        ES
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Sacred Valley Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
          <motion.div
            className="text-white max-w-4xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/vida-logo.png"
                alt="VIDA Wellness Center"
                width={100}
                height={100}
                className="rounded-full shadow-2xl border-4 border-white/20"
              />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.cta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
                onClick={() => document.getElementById("classes")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.cta2}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {Object.entries(t.hero.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-green-400">{value.split(" ")[0]}</div>
                  <div className="text-sm text-gray-300">{value.split(" ").slice(1).join(" ")}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.classes.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.classes.subtitle}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                key: "yoga",
                icon: Heart,
                color: "green",
                image:
                  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                key: "taichi",
                icon: Users,
                color: "blue",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                key: "gym",
                icon: Dumbbell,
                color: "red",
                image:
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                key: "dance",
                icon: Star,
                color: "purple",
                image:
                  "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
            ].map((item: ClassItem) => {
              const IconComponent = item.icon
              const classData = t.classes[item.key as keyof typeof t.classes]

              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={classData.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800">{classData.level}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{classData.duration}</span>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`${colorMap[item.color].bg} w-10 h-10 rounded-full flex items-center justify-center`}>
                          <IconComponent className={`${colorMap[item.color].text} w-5 h-5`} />
                        </div>
                        <CardTitle className="text-lg">{classData.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{classData.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.subtitle}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { key: "tradition", icon: Shield, color: "green" },
              { key: "community", icon: Users, color: "blue" },
              { key: "transformation", icon: Target, color: "purple" },
            ].map((value: ValueItem) => {
              const IconComponent = value.icon
              const valueData = t.about.values[value.key as keyof typeof t.about.values]

              return (
                <motion.div key={value.key} variants={fadeInUp} className="text-center">
                  <div className={`${colorMap[value.color].bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`${colorMap[value.color].text} w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{valueData.title}</h3>
                  <p className="text-gray-600">{valueData.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.membership.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.membership.subtitle}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { key: "condor", popular: false, icon: Zap },
              { key: "puma", popular: true, icon: Trophy },
              { key: "serpent", popular: false, icon: Star },
            ].map((plan: PlanItem) => {
              const IconComponent = plan.icon
              const planData = t.membership[plan.key as keyof typeof t.membership]

              return (
                <motion.div key={plan.key} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="relative">
                  <Card className={`relative overflow-hidden ${plan.popular ? "border-green-500 border-2 shadow-2xl" : "shadow-lg"} bg-white`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-600 text-white px-4 py-1">
                          {language === "en" ? "Most Popular" : "Más Popular"}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-2">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <IconComponent className="w-6 h-6 text-green-600" />
                        <CardTitle className="text-2xl font-bold">{planData.title}</CardTitle>
                      </div>
                      <div className="text-center py-4">
                        <span className="text-5xl font-bold text-green-600">{planData.price}</span>
                        <span className="text-gray-600 text-lg">{planData.period}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{planData.description}</p>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {planData.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        }`}
                        onClick={() => handlePurchase(plan.key)}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        {language === "en" ? "Choose Plan" : "Elegir Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-xl text-green-200 max-w-2xl mx-auto">{t.contact.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="contact-name" className="text-white">
                        {t.contact.form.name}
                      </Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-email" className="text-white">
                        {t.contact.form.email}
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-phone" className="text-white">
                        {t.contact.form.phone}
                      </Label>
                      <Input
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-message" className="text-white">
                        {t.contact.form.message}
                      </Label>
                      <Textarea
                        id="contact-message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="contact-interest"
                        checked={contactForm.interest}
                        onCheckedChange={(checked) =>
                          setContactForm((prev) => ({ ...prev, interest: checked as boolean }))
                        }
                        className="border-white/30 data-[state=checked]:bg-green-600"
                      />
                      <Label htmlFor="contact-interest" className="text-white text-sm">
                        {t.contact.form.interest}
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {language === "en" ? "Sending..." : "Enviando..."}
                        </>
                      ) : (
                        t.contact.form.submit
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  {language === "en" ? "Visit Our Sacred Space" : "Visita Nuestro Espacio Sagrado"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-green-400" />
                    <span>{t.contact.info.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-green-400" />
                    <span>{t.contact.info.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-green-400" />
                    <span>{t.contact.info.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-green-400" />
                    <span>{t.contact.info.hours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">{t.social.follow}</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title={t.social.whatsapp}
                    rel="noreferrer"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.facebook}
                    target="_blank"
                    className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title={t.social.facebook}
                    rel="noreferrer"
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.instagram}
                    target="_blank"
                    className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title={t.social.instagram}
                    rel="noreferrer"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.youtube}
                    target="_blank"
                    className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title={t.social.youtube}
                    rel="noreferrer"
                  >
                    <Youtube className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={socialLinks.tripadvisor}
                    target="_blank"
                    className="bg-green-700 p-3 rounded-full hover:bg-green-800 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title={t.social.tripadvisor}
                    rel="noreferrer"
                  >
                    <Award className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.purchase.title}</DialogTitle>
            <DialogDescription>{t.purchase.subtitle}</DialogDescription>
          </DialogHeader>

          <Tabs value={purchaseStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1" disabled={purchaseStep < 1}>
                {t.purchase.form.personal}
              </TabsTrigger>
              <TabsTrigger value="2" disabled={purchaseStep < 2}>
                {t.purchase.form.payment}
              </TabsTrigger>
              <TabsTrigger value="3" disabled={purchaseStep < 3}>
                {t.purchase.form.confirmation}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{language === "en" ? "First Name" : "Nombre"}</Label>
                  <Input
                    id="firstName"
                    value={purchaseForm.firstName}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{language === "en" ? "Last Name" : "Apellido"}</Label>
                  <Input
                    id="lastName"
                    value={purchaseForm.lastName}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="purchase-email">{language === "en" ? "Email" : "Correo"}</Label>
                <Input
                  id="purchase-email"
                  type="email"
                  value={purchaseForm.email}
                  onChange={(e) => setPurchaseForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchase-phone">{language === "en" ? "Phone" : "Teléfono"}</Label>
                  <Input
                    id="purchase-phone"
                    value={purchaseForm.phone}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">{language === "en" ? "Birth Date" : "Fecha de Nacimiento"}</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={purchaseForm.birthDate}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, birthDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <Button
                onClick={() => setPurchaseStep(2)}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  !purchaseForm.firstName || !purchaseForm.lastName || !purchaseForm.email || !purchaseForm.phone
                }
              >
                {language === "en" ? "Continue to Payment" : "Continuar al Pago"}
              </Button>
            </TabsContent>

            <TabsContent value="2" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="cardName">{language === "en" ? "Cardholder Name" : "Nombre del Titular"}</Label>
                <Input
                  id="cardName"
                  value={purchaseForm.cardName}
                  onChange={(e) => setPurchaseForm((prev) => ({ ...prev, cardName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">{language === "en" ? "Card Number" : "Número de Tarjeta"}</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={purchaseForm.cardNumber}
                  onChange={(e) => setPurchaseForm((prev) => ({ ...prev, cardNumber: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">{language === "en" ? "Expiry Date" : "Fecha de Vencimiento"}</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={purchaseForm.expiryDate}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={purchaseForm.cvv}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, cvv: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  {language === "en" ? "Order Summary" : "Resumen del Pedido"}
                </h3>
                <div className="flex justify-between">
                  <span>{t.membership[selectedPlan as keyof typeof t.membership]?.title}</span>
                  <span className="font-bold">
                    {t.membership[selectedPlan as keyof typeof t.membership]?.price}/mes
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePurchaseSubmit}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  isProcessing ||
                  !purchaseForm.cardName ||
                  !purchaseForm.cardNumber ||
                  !purchaseForm.expiryDate ||
                  !purchaseForm.cvv
                }
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.purchase.processing}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {language === "en" ? "Complete Purchase" : "Completar Compra"}
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="3" className="text-center py-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  {language === "en" ? "Welcome to VIDA!" : "¡Bienvenido a VIDA!"}
                </h3>
                <p className="text-gray-600">{t.purchase.success}</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/vida-logo.png"
                  alt="VIDA Wellness Center"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold">VIDA Wellness Center</span>
              </div>
              <p className="text-gray-400 mb-4">
                {language === "en"
                  ? "Sacred Valley wellness transformation through ancient wisdom and modern fitness."
                  : "Transformación de bienestar del Valle Sagrado a través de sabiduría ancestral y fitness moderno."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Quick Links" : "Enlaces Rápidos"}</h3>
              <div className="space-y-2 text-gray-400">
                {Object.entries(t.nav).map(([key, value]) => (
                  <div key={key}>
                    <a href={`#${key}`} className="hover:text-white transition-colors">
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Contact" : "Contacto"}</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{t.contact.info.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{t.contact.info.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t.contact.info.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.social.follow}</h3>
              <div className="flex space-x-3">
                <motion.a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  rel="noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.facebook}
                  target="_blank"
                  className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  rel="noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.instagram}
                  target="_blank"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  rel="noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.tripadvisor}
                  target="_blank"
                  className="bg-green-700 p-2 rounded-full hover:bg-green-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  rel="noreferrer"
                >
                  <Award className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.youtube}
                  target="_blank"
                  className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  rel="noreferrer"
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 VIDA Wellness Center.{" "}
              {language === "en" ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}