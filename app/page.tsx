"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  CreditCard,
  ArrowDownLeft,
  Plus,
  Send,
  DollarSign,
  PiggyBank,
  Shield,
  RefreshCw,
  Settings,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Bell,
  User,
  Eye,
  EyeOff,
  ArrowUpDown,
  Gift,
  Star,
  Trophy,
  Camera,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Menu,
  X,
  Home,
  Wallet,
  HelpCircle,
  LogOut,
  Repeat,
  Copy,
} from "lucide-react"
import { CoralIcon } from "@/components/coral-icon"
import { CoreIcon } from "@/components/core-icon"
import { BitcoinIcon } from "@/components/bitcoin-icon"

interface UserData {
  address: string
  mnemonic?: string
  loginMethod: "metamask" | "created_account"
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [cardFrozen, setCardFrozen] = useState(false)
  const [dailyLimit, setDailyLimit] = useState(5000)
  const [monthlyLimit, setMonthlyLimit] = useState(50000)
  const [currency, setCurrency] = useState("USDT")
  const [showBalance, setShowBalance] = useState(true)
  const [convertAmount, setConvertAmount] = useState("")
  const [fromCrypto, setFromCrypto] = useState("BTC")
  const [toCurrency, setToCurrency] = useState("MXN")
  const [showMenu, setShowMenu] = useState(false)
  const [cardData, setCardData] = useState({
    number: "4532 1234 5678 9012",
    expiry: "12/28",
    cvc: "123",
    name: "MARIA GONZALEZ",
  })

  useEffect(() => {
    // Check if user is already logged in
    const savedUserData = localStorage.getItem("decoralbank_user")
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData)
        setUserData(parsedData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("decoralbank_user")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = (data: UserData) => {
    setUserData(data)
    setIsLoggedIn(true)
    localStorage.setItem("decoralbank_user", JSON.stringify(data))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null)
    localStorage.removeItem("decoralbank_user")
    setActiveTab("overview")
    setShowMenu(false)
  }

  // Tasas de cambio
  const exchangeRates = {
    USDTMXN: 17.5,
    BTCUSDT: 67000,
    COREUSDT: 67000,
    USDTUSDT: 1,
    USDCUSDT: 1,
  }

  // Función para convertir criptomonedas
  const convertCrypto = (amount: number, from: string, to: string) => {
    let usdtValue = 0

    switch (from) {
      case "BTC":
        usdtValue = amount * exchangeRates.BTCUSDT
        break
      case "CORE":
        usdtValue = amount * exchangeRates.COREUSDT
        break
      case "USDT":
      case "USDC":
        usdtValue = amount * exchangeRates.USDTUSDT
        break
      default:
        usdtValue = amount
    }

    if (to === "MXN") {
      return usdtValue * exchangeRates.USDTMXN
    }
    return usdtValue
  }

  // Función para formatear moneda
  const formatCurrency = (amount: number, currencyType = currency) => {
    if (currencyType === "MXN") {
      return `$${amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`
    }
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDT`
  }

  // Función para generar nuevo CVC dinámico
  const generateNewCVC = () => {
    const newCVC = Math.floor(Math.random() * 900 + 100).toString()
    setCardData((prev) => ({ ...prev, cvc: newCVC }))
  }

  // Generar nuevo CVC cada 30 segundos
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(generateNewCVC, 30000)
      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  // Mock data
  const balances = {
    bitcoin: 0.15234567,
    core: 2.45678901,
    lstCORE: 1.23456789,
    usdt: 15420.5,
    usdc: 8750.25,
  }

  const stakingRewards = {
    daily: 0.00012345,
    monthly: 0.0037035,
    apy: 5.2,
  }

  const loanData = {
    borrowed: 12500,
    collateral: 1.8,
    ltv: 65,
    interestRate: 8.5,
    nextPayment: 125.5,
  }

  const userRewards = {
    totalPoints: 2450,
    level: "Gold",
    nextLevel: "Platinum",
    pointsToNext: 550,
    weeklyStreak: 5,
    monthlyBonus: 150,
    availableRewards: [
      { name: "Cashback 2%", cost: 500, type: "cashback" },
      { name: "Fee Gratis", cost: 300, type: "fee" },
      { name: "Staking Boost", cost: 800, type: "boost" },
    ],
  }

  const userProfile = {
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    address: "Ciudad de México, México",
    joinDate: "Enero 2024",
    verified: true,
    kycLevel: "Nivel 3",
  }

  const toggleCardFreeze = () => {
    setCardFrozen(!cardFrozen)
  }

  // Calcular valor total del portafolio
  const totalPortfolioValue =
    balances.bitcoin * exchangeRates.BTCUSDT +
    balances.core * exchangeRates.COREUSDT +
    balances.lstCORE * exchangeRates.COREUSDT +
    balances.usdt +
    balances.usdc

  // Opciones del menú
  const menuItems = [
    {
      section: "Navegación",
      items: [
        { title: "Inicio", url: "overview", icon: Home },
        { title: "Convertir", url: "convert", icon: ArrowUpDown },
        { title: "Mi Tarjeta", url: "card", icon: CreditCard },
        { title: "Staking", url: "staking", icon: PiggyBank },
        { title: "Préstamos", url: "loans", icon: Wallet },
        { title: "Rewards", url: "rewards", icon: Gift, badge: userRewards.totalPoints },
        { title: "Actividad", url: "transactions", icon: Repeat },
      ],
    },
    {
      section: "Cuenta",
      items: [
        { title: "Perfil", url: "profile", icon: User },
        { title: "Configuración", url: "settings", icon: Settings },
        { title: "Notificaciones", url: "notifications", icon: Bell },
        { title: "Seguridad", url: "security", icon: Shield },
        { title: "Ayuda", url: "help", icon: HelpCircle },
      ],
    },
  ]

  const handleMenuItemClick = (url: string) => {
    setActiveTab(url)
    setShowMenu(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <CoralIcon className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-gray-600">Cargando DecoralBank...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || !userData) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 max-w-sm mx-auto relative">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-3 py-2 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-400 rounded-md flex items-center justify-center">
                <CoralIcon className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base font-bold text-gray-900">DecoralBank</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs border-rose-200 text-rose-600">
              {userData.loginMethod === "metamask" ? "MetaMask" : "Cuenta Nueva"}
            </Badge>
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={() => setActiveTab("profile")}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Menú Desplegable */}
      {showMenu && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 max-h-96 overflow-y-auto">
          {/* Perfil del Usuario en el menú */}
          <div className="px-4 py-3 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {userData.address.slice(2, 4).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{userProfile.name}</div>
                <div className="text-xs text-gray-600 font-mono">
                  {userData.address.slice(0, 6)}...{userData.address.slice(-4)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Trophy className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-700">{userRewards.level}</span>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0">
                    {userRewards.totalPoints} pts
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Opciones del menú */}
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="py-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{section.section}</h3>
              </div>
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleMenuItemClick(item.url)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.url ? "bg-rose-50 border-r-2 border-rose-400" : ""
                  }`}
                >
                  <item.icon className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">{item.title}</span>
                  {item.badge && <Badge className="ml-auto bg-yellow-100 text-yellow-800 text-xs">{item.badge}</Badge>}
                </button>
              ))}
            </div>
          ))}

          {/* Progreso de Rewards en el menú */}
          <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Racha: {userRewards.weeklyStreak} días</span>
            </div>
            <div className="text-xs text-yellow-700 mb-2">
              {userRewards.pointsToNext} pts para {userRewards.nextLevel}
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(userRewards.totalPoints / (userRewards.totalPoints + userRewards.pointsToNext)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Cerrar Sesión */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el menú */}
      {showMenu && <div className="fixed inset-0 bg-black bg-opacity-20 z-30" onClick={() => setShowMenu(false)}></div>}

      {/* Contenido principal */}
      <div className="px-3 py-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview" className="space-y-3 mt-0">
            {/* Welcome Message */}
            <Card className="bg-gradient-to-r from-rose-400 to-pink-400 text-white">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs opacity-90">Bienvenido de vuelta</span>
                    <div className="text-sm font-semibold">
                      {userData.loginMethod === "metamask" ? "Usuario MetaMask" : userProfile.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-white hover:bg-white/20 p-1 h-6 w-6"
                    >
                      {showBalance ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrency(currency === "USDT" ? "MXN" : "USDT")}
                      className="text-white hover:bg-white/20 text-xs px-1 py-0 h-6"
                    >
                      {currency}
                    </Button>
                  </div>
                </div>
                <div className="text-xs opacity-90 mb-1">Patrimonio Total</div>
                <div className="text-2xl font-bold mb-1">
                  {showBalance ? formatCurrency(totalPortfolioValue) : "••••••"}
                </div>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{formatCurrency(3250.5)} (1.85%)</span>
                </div>
              </CardContent>
            </Card>

            {/* Connection Status */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800 text-sm">
                      Conectado via {userData.loginMethod === "metamask" ? "MetaMask" : "Cuenta Nueva"}
                    </div>
                    <div className="text-xs text-green-700 font-mono">
                      {userData.address.slice(0, 8)}...{userData.address.slice(-6)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Card */}
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800 text-sm">Rewards {userRewards.level}</span>
                  </div>
                  <Badge className="bg-yellow-200 text-yellow-800 text-xs">{userRewards.totalPoints} pts</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-yellow-700">Progreso a {userRewards.nextLevel}</span>
                    <span className="text-yellow-800 font-medium">{userRewards.pointsToNext} pts restantes</span>
                  </div>
                  <Progress
                    value={(userRewards.totalPoints / (userRewards.totalPoints + userRewards.pointsToNext)) * 100}
                    className="h-1.5"
                  />
                  <div className="flex items-center gap-3 text-xs text-yellow-700">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>Racha: {userRewards.weeklyStreak} días</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      <span>Bonus: +{userRewards.monthlyBonus} pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="h-14 flex-col gap-1 text-xs p-2">
                <Plus className="w-4 h-4" />
                Depositar
              </Button>
              <Button variant="outline" className="h-14 flex-col gap-1 text-xs p-2">
                <Send className="w-4 h-4" />
                Enviar
              </Button>
              <Button
                variant="outline"
                className="h-14 flex-col gap-1 text-xs p-2"
                onClick={() => setActiveTab("convert")}
              >
                <ArrowUpDown className="w-4 h-4" />
                Convertir
              </Button>
              <Button
                variant="outline"
                className="h-14 flex-col gap-1 text-xs p-2"
                onClick={() => setActiveTab("staking")}
              >
                <PiggyBank className="w-4 h-4" />
                Staking
              </Button>
            </div>

            {/* Balance de Activos */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mis Activos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <BitcoinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Bitcoin</div>
                      <div className="text-xs text-gray-500">{balances.bitcoin.toFixed(8)} BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {showBalance ? formatCurrency(balances.bitcoin * exchangeRates.BTCUSDT) : "••••••"}
                    </div>
                    <div className="text-xs text-green-600">+3.2%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <CoreIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Core</div>
                      <div className="text-xs text-gray-500">{balances.core.toFixed(4)} CORE</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {showBalance ? formatCurrency(balances.core * exchangeRates.COREUSDT) : "••••••"}
                    </div>
                    <div className="text-xs text-green-600">+2.4%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full flex items-center justify-center">
                      <CoreIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">lstCORE</div>
                      <div className="text-xs text-gray-500">{balances.lstCORE.toFixed(4)} lstCORE</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {showBalance ? formatCurrency(balances.lstCORE * exchangeRates.COREUSDT) : "••••••"}
                    </div>
                    <div className="text-xs text-green-600">+{stakingRewards.apy}% APY</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      $
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Stablecoins</div>
                      <div className="text-xs text-gray-500">USDT + USDC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {showBalance ? formatCurrency(balances.usdt + balances.usdc) : "••••••"}
                    </div>
                    <div className="text-xs text-gray-500">Estable</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Staking y Préstamos */}
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <PiggyBank className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium">Staking</span>
                  </div>
                  <div className="text-base font-bold text-green-600">+{stakingRewards.apy}%</div>
                  <div className="text-xs text-gray-500">APY anual</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium">Préstamo</span>
                  </div>
                  <div className="text-base font-bold">{formatCurrency(loanData.borrowed)}</div>
                  <div className="text-xs text-gray-500">Activo</div>
                </CardContent>
              </Card>
            </div>

            {/* Transacciones Recientes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    type: "reward",
                    description: "Reward Points",
                    amount: "+50 pts",
                    date: "Hace 1h",
                    icon: <Star className="w-4 h-4 text-yellow-600" />,
                    bg: "bg-yellow-100",
                  },
                  {
                    type: "staking_reward",
                    description: "Recompensa Staking",
                    amount: "+0.00012 CORE",
                    date: "Hace 2h",
                    icon: <TrendingUp className="w-4 h-4 text-green-600" />,
                    bg: "bg-green-100",
                  },
                  {
                    type: "card_payment",
                    description: "Amazon México",
                    amount: "-$89.99",
                    date: "Ayer",
                    icon: <CreditCard className="w-4 h-4 text-red-600" />,
                    bg: "bg-red-100",
                  },
                  {
                    type: "bitcoin_buy",
                    description: "Compra Bitcoin",
                    amount: "+0.001 BTC",
                    date: "2 días",
                    icon: <BitcoinIcon className="w-4 h-4" />,
                    bg: "bg-orange-100",
                  },
                ].map((tx, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.bg}`}>{tx.icon}</div>
                      <div>
                        <div className="font-medium text-xs">{tx.description}</div>
                        <div className="text-xs text-gray-500">{tx.date}</div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold text-xs ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resto de las tabs con funcionalidad completa */}
          <TabsContent value="convert" className="space-y-4 mt-0">
            {/* Convertidor de Criptomonedas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5" />
                  Convertir Criptomonedas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Cantidad</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={convertAmount}
                      onChange={(e) => setConvertAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm font-medium">De</Label>
                      <select
                        value={fromCrypto}
                        onChange={(e) => setFromCrypto(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="CORE">Core (CORE)</option>
                        <option value="USDT">Tether (USDT)</option>
                        <option value="USDC">USD Coin (USDC)</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">A</Label>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="MXN">Pesos Mexicanos (MXN)</option>
                        <option value="USDT">Tether (USDT)</option>
                      </select>
                    </div>
                  </div>

                  {convertAmount && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-blue-700 mb-1">Resultado</div>
                        <div className="text-2xl font-bold text-blue-800">
                          {formatCurrency(
                            convertCrypto(Number.parseFloat(convertAmount), fromCrypto, toCurrency),
                            toCurrency,
                          )}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          1 {fromCrypto} = {formatCurrency(convertCrypto(1, fromCrypto, toCurrency), toCurrency)}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Convertir
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tasas de Cambio Actuales */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tasas de Cambio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BitcoinIcon className="w-8 h-8" />
                    <div>
                      <div className="font-semibold">Bitcoin</div>
                      <div className="text-sm text-gray-500">BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(exchangeRates.BTCUSDT)}</div>
                    <div className="text-sm text-green-600">+2.4%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CoreIcon className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="font-semibold">Core</div>
                      <div className="text-sm text-gray-500">CORE</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(exchangeRates.COREUSDT)}</div>
                    <div className="text-sm text-green-600">+1.8%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      $
                    </div>
                    <div>
                      <div className="font-semibold">USDT/MXN</div>
                      <div className="text-sm text-gray-500">Tipo de cambio</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${exchangeRates.USDTMXN.toFixed(2)} MXN</div>
                    <div className="text-sm text-red-600">-0.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historial de Conversiones */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversiones Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      from: "0.001 BTC",
                      to: "$1,175.00 MXN",
                      date: "Hace 1h",
                      icon: <BitcoinIcon className="w-4 h-4" />,
                    },
                    {
                      from: "0.5 CORE",
                      to: "$586.25 USDT",
                      date: "Ayer",
                      icon: <CoreIcon className="w-4 h-4 text-orange-600" />,
                    },
                    {
                      from: "100 USDT",
                      to: "$1,750.00 MXN",
                      date: "2 días",
                      icon: <DollarSign className="w-4 h-4 text-green-600" />,
                    },
                  ].map((conversion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {conversion.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {conversion.from} → {conversion.to}
                          </div>
                          <div className="text-xs text-gray-500">{conversion.date}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Completado
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-0">
            {/* Perfil del Usuario */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {userData.address.slice(2, 4).toUpperCase()}
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-600 hover:text-gray-800"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {userData.loginMethod === "metamask" ? "Usuario MetaMask" : userProfile.name}
                  </h2>
                  <p className="text-gray-600 mb-2 font-mono text-sm">
                    {userData.address.slice(0, 8)}...{userData.address.slice(-6)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      {userData.loginMethod === "metamask" ? "MetaMask Verificado" : userProfile.kycLevel}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Trophy className="w-3 h-3 mr-1" />
                      {userRewards.level}
                    </Badge>
                  </div>
                </div>

                {/* Información de la wallet */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Dirección de Wallet</div>
                        <div className="text-sm text-gray-600 font-mono">{userData.address}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(userData.address)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Método de Conexión</div>
                        <div className="text-sm text-gray-600">
                          {userData.loginMethod === "metamask" ? "MetaMask Wallet" : "Cuenta Creada"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {userData.mnemonic && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="font-medium text-yellow-800">Frase Semilla</div>
                          <div className="text-sm text-yellow-700">Guardada de forma segura</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-yellow-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Teléfono</div>
                        <div className="text-sm text-gray-600">{userProfile.phone}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-gray-600">{userProfile.email}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Ubicación</div>
                        <div className="text-sm text-gray-600">{userProfile.address}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Miembro desde</div>
                        <div className="text-sm text-gray-600">{userProfile.joinDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas del Usuario */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Mis Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userRewards.totalPoints}</div>
                    <div className="text-sm text-blue-700">Puntos Totales</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userRewards.weeklyStreak}</div>
                    <div className="text-sm text-green-700">Días de Racha</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-sm text-purple-700">Transacciones</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-orange-700">Meses Activo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones del Perfil */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Verificar Identidad
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración de Cuenta
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="card" className="space-y-4 mt-0">
            {/* Estado de la tarjeta */}
            {cardFrozen && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <div>
                      <div className="font-semibold text-orange-800 text-sm">Tarjeta Congelada</div>
                      <div className="text-xs text-orange-700">Temporalmente desactivada</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tarjeta Virtual Mobile */}
            <Card className="bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 text-white border-0 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

              <CardContent className="p-5 relative z-10">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <CoralIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">DecoralBank</div>
                        <div className="text-xs opacity-80">VIRTUAL</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">VISA</div>
                      <div className="text-xs opacity-80">PLATINUM</div>
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="flex justify-start">
                    <div className="w-10 h-7 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md flex items-center justify-center">
                      <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Número */}
                  <div className="space-y-1">
                    <div className="text-xl font-mono tracking-wider font-light">
                      {showCardDetails ? cardData.number : "•••• •••• •••• 9012"}
                    </div>
                    {cardFrozen && (
                      <div className="flex items-center gap-1 text-orange-200">
                        <Lock className="w-3 h-3" />
                        <span className="text-xs">CONGELADA</span>
                      </div>
                    )}
                  </div>

                  {/* Info inferior */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80 tracking-wider">TITULAR</div>
                      <div className="font-semibold">{cardData.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80 tracking-wider">VÁLIDA</div>
                      <div className="font-semibold">{cardData.expiry}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controles de Tarjeta */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Control de Tarjeta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {cardFrozen ? (
                      <Lock className="w-4 h-4 text-red-500" />
                    ) : (
                      <Unlock className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium">Estado</span>
                  </div>
                  <Badge variant={cardFrozen ? "destructive" : "secondary"}>
                    {cardFrozen ? "Congelada" : "Activa"}
                  </Badge>
                </div>

                <Button
                  onClick={toggleCardFreeze}
                  variant={cardFrozen ? "default" : "destructive"}
                  className="w-full"
                  size="sm"
                >
                  {cardFrozen ? (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Descongelar
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Congelar
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mostrar detalles</span>
                  <Switch checked={showCardDetails} onCheckedChange={setShowCardDetails} />
                </div>
              </CardContent>
            </Card>

            {/* CVC Dinámico */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  CVC Dinámico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-green-600 mb-1">
                    {showCardDetails ? cardData.cvc : "•••"}
                  </div>
                  <div className="text-xs text-gray-500">Se actualiza cada 30s</div>
                </div>

                <Button variant="outline" onClick={generateNewCVC} className="w-full" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generar Nuevo
                </Button>
              </CardContent>
            </Card>

            {/* Límites */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Límites de Gasto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Límite Diario</Label>
                    <span className="text-sm text-gray-500">{currency}</span>
                  </div>
                  <Input
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="mb-2"
                  />
                  <div className="text-xs text-gray-500 mb-1">
                    Usado: {formatCurrency(127.49)} / {formatCurrency(dailyLimit)}
                  </div>
                  <Progress value={(127.49 / dailyLimit) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Límite Mensual</Label>
                    <span className="text-sm text-gray-500">{currency}</span>
                  </div>
                  <Input
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                    className="mb-2"
                  />
                  <div className="text-xs text-gray-500 mb-1">
                    Usado: {formatCurrency(3247.89)} / {formatCurrency(monthlyLimit)}
                  </div>
                  <Progress value={(3247.89 / monthlyLimit) * 100} className="h-2" />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Guardar Límites
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-4 mt-0">
            {/* Staking Overview */}
            <Card className="bg-gradient-to-r from-orange-100 to-red-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <CoreIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">lstCORE Staking</div>
                    <div className="text-sm text-gray-600">Gana rendimientos pasivos</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">+{stakingRewards.apy}% APY</div>
                <div className="text-sm text-gray-600">Rendimiento anual estimado</div>
                <div className="text-xs text-yellow-600 mt-1">+10 puntos diarios por staking activo</div>
              </CardContent>
            </Card>

            {/* Balance de Staking */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Mi Staking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Core Disponible</span>
                  <span className="font-semibold">{balances.core.toFixed(4)} CORE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En Staking</span>
                  <span className="font-semibold">{balances.lstCORE.toFixed(4)} lstCORE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valor Total</span>
                  <span className="font-semibold">{formatCurrency(balances.lstCORE * exchangeRates.COREUSDT)}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500">
                  <CoreIcon className="w-4 h-4 mr-2" />
                  Hacer Staking
                </Button>
              </CardContent>
            </Card>

            {/* Recompensas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recompensas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hoy</span>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">+{stakingRewards.daily.toFixed(8)} CORE</div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(stakingRewards.daily * exchangeRates.COREUSDT)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Este mes</span>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">+{stakingRewards.monthly.toFixed(6)} CORE</div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(stakingRewards.monthly * exchangeRates.COREUSDT)}
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Bonus de Rewards</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Ganas 10 puntos adicionales cada día que tengas staking activo
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4 mt-0">
            {/* Préstamo Activo */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Préstamo Activo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{formatCurrency(loanData.borrowed)}</div>
                  <div className="text-sm text-gray-600">Monto prestado</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Colateral</span>
                    <span className="font-semibold">{loanData.collateral} CORE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valor Colateral</span>
                    <span className="font-semibold">
                      {formatCurrency(loanData.collateral * exchangeRates.COREUSDT)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">LTV Ratio</span>
                      <span className="font-semibold">{loanData.ltv}%</span>
                    </div>
                    <Progress value={loanData.ltv} className="h-2" />
                    <div className="text-xs text-gray-500">Límite de liquidación: 80%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Próximo Pago */}
            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-rose-600" />
                  <span className="font-semibold text-rose-800">Próximo Pago</span>
                </div>
                <div className="text-xl font-bold text-rose-800 mb-1">{formatCurrency(loanData.nextPayment)}</div>
                <div className="text-sm text-rose-700">Vence en 15 días</div>
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Hacer Pago
                </Button>
              </CardContent>
            </Card>

            {/* Solicitar Préstamo */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Solicitar Préstamo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-800 font-semibold mb-1">Préstamos Garantizados</div>
                  <div className="text-xs text-purple-700">
                    Usa tu Core o Bitcoin como garantía para pedir prestado stablecoins
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Disponible</span>
                    <span className="font-semibold">
                      {(balances.core + balances.lstCORE + balances.bitcoin).toFixed(4)} crypto
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Máximo</span>
                    <span className="font-semibold">{formatCurrency(65000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tasa</span>
                    <Badge variant="outline">{loanData.interestRate}% APR</Badge>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Solicitar Préstamo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4 mt-0">
            {/* Estado de Rewards */}
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">{userRewards.level}</div>
                  <div className="text-sm text-yellow-700">Nivel actual</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-700">Puntos totales</span>
                    <span className="font-bold text-yellow-800">{userRewards.totalPoints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-700">Para {userRewards.nextLevel}</span>
                    <span className="font-bold text-yellow-800">{userRewards.pointsToNext} pts</span>
                  </div>
                  <Progress
                    value={(userRewards.totalPoints / (userRewards.totalPoints + userRewards.pointsToNext)) * 100}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Formas de ganar puntos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Gana Puntos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Usar tarjeta</div>
                      <div className="text-xs text-gray-500">1 punto por cada $10</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+1 pt</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <PiggyBank className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Hacer staking</div>
                      <div className="text-xs text-gray-500">10 puntos por día</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+10 pts</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Convertir crypto</div>
                      <div className="text-xs text-gray-500">5 puntos por conversión</div>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">+5 pts</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Racha diaria</div>
                      <div className="text-xs text-gray-500">Bonus por usar la app</div>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">+{userRewards.weeklyStreak} días</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recompensas Disponibles */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Canjear Puntos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userRewards.availableRewards.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{reward.name}</div>
                        <div className="text-xs text-gray-500">{reward.cost} puntos</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={userRewards.totalPoints >= reward.cost ? "default" : "outline"}
                      disabled={userRewards.totalPoints < reward.cost}
                      className="text-xs"
                    >
                      {userRewards.totalPoints >= reward.cost ? "Canjear" : "Insuficiente"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4 mt-0">
            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Todas
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Staking
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Tarjeta
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Crypto
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Rewards
              </Button>
            </div>

            {/* Lista de Transacciones */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Historial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      type: "reward",
                      description: "Reward Points",
                      amount: "+50 pts",
                      date: "Hace 1h",
                      icon: <Star className="w-4 h-4 text-yellow-600" />,
                      bg: "bg-yellow-100",
                    },
                    {
                      type: "staking_reward",
                      description: "Recompensa Staking",
                      amount: "+0.00012345 CORE",
                      date: "Hace 2h",
                      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
                      bg: "bg-green-100",
                    },
                    {
                      type: "card_payment",
                      description: "Amazon México",
                      amount: `-${formatCurrency(89.99)}`,
                      date: "Ayer",
                      icon: <CreditCard className="w-4 h-4 text-red-600" />,
                      bg: "bg-red-100",
                    },
                    {
                      type: "bitcoin_convert",
                      description: "BTC → MXN",
                      amount: "+$1,175.00 MXN",
                      date: "2 días",
                      icon: <BitcoinIcon className="w-4 h-4" />,
                      bg: "bg-orange-100",
                    },
                    {
                      type: "deposit",
                      description: "Depósito Bitcoin",
                      amount: "+0.001 BTC",
                      date: "3 días",
                      icon: <ArrowDownLeft className="w-4 h-4 text-blue-600" />,
                      bg: "bg-blue-100",
                    },
                    {
                      type: "loan_borrow",
                      description: "Préstamo",
                      amount: `+${formatCurrency(5000)}`,
                      date: "1 semana",
                      icon: <DollarSign className="w-4 h-4 text-purple-600" />,
                      bg: "bg-purple-100",
                    },
                  ].map((tx, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.bg}`}>
                          {tx.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{tx.description}</div>
                          <div className="text-xs text-gray-500">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold text-sm ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {tx.amount}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          completado
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
