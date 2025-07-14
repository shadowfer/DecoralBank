"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Zap, AlertCircle, CheckCircle, Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { CoralIcon } from "@/components/coral-icon"

interface LoginFormProps {
  onLoginSuccess: (userData: {
    address: string
    mnemonic?: string
    loginMethod: "metamask" | "created_account"
  }) => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")
  const [mnemonic, setMnemonic] = useState("")
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [mnemonicConfirmed, setMnemonicConfirmed] = useState(false)
  const [email, setEmail] = useState("")

  const connectMetaMask = async () => {
    setIsConnecting(true)
    setError("")

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask no está instalado. Por favor instala MetaMask para continuar.")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No se pudo conectar con MetaMask")
      }

      // Simulate Core DAO network check/switch
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x45c" }], // Core DAO Mainnet
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x45c",
                chainName: "Core DAO",
                nativeCurrency: {
                  name: "CORE",
                  symbol: "CORE",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.coredao.org"],
                blockExplorerUrls: ["https://scan.coredao.org"],
              },
            ],
          })
        }
      }

      onLoginSuccess({
        address: accounts[0],
        loginMethod: "metamask",
      })
    } catch (err: any) {
      setError(err.message || "Error al conectar con MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  const generateMnemonic = () => {
    const words = [
      "abandon",
      "ability",
      "able",
      "about",
      "above",
      "absent",
      "absorb",
      "abstract",
      "absurd",
      "abuse",
      "access",
      "accident",
      "account",
      "accuse",
      "achieve",
      "acid",
      "acoustic",
      "acquire",
      "across",
      "act",
      "action",
      "actor",
      "actress",
      "actual",
      "adapt",
      "add",
      "addict",
      "address",
      "adjust",
      "admit",
      "adult",
      "advance",
      "advice",
      "aerobic",
      "affair",
      "afford",
      "afraid",
      "again",
      "against",
      "age",
      "agent",
      "agree",
      "ahead",
      "aim",
      "air",
      "airport",
      "aisle",
      "alarm",
      "album",
      "alcohol",
      "alert",
      "alien",
      "all",
      "alley",
      "allow",
      "almost",
      "alone",
      "alpha",
      "already",
      "also",
      "alter",
      "always",
      "amateur",
      "amazing",
      "among",
      "amount",
      "amused",
      "analyst",
      "anchor",
      "ancient",
      "anger",
      "angle",
      "angry",
      "animal",
      "ankle",
      "announce",
      "annual",
      "another",
      "answer",
      "antenna",
      "antique",
      "anxiety",
      "any",
      "apart",
      "apology",
      "appear",
      "apple",
      "approve",
      "april",
      "arch",
      "arctic",
      "area",
      "arena",
      "argue",
      "arm",
      "armed",
      "armor",
      "army",
      "around",
      "arrange",
      "arrest",
      "arrive",
      "arrow",
      "art",
      "article",
      "artist",
      "artwork",
      "ask",
      "aspect",
      "assault",
      "asset",
      "assist",
      "assume",
      "asthma",
      "athlete",
      "atom",
      "attack",
      "attend",
      "attitude",
      "attract",
      "auction",
      "audit",
      "august",
      "aunt",
      "author",
      "auto",
      "autumn",
      "average",
      "avocado",
      "avoid",
    ]

    const randomWords = []
    for (let i = 0; i < 12; i++) {
      randomWords.push(words[Math.floor(Math.random() * words.length)])
    }

    return randomWords.join(" ")
  }

  const createNewAccount = async () => {
    setIsCreatingAccount(true)
    setError("")

    try {
      const newMnemonic = generateMnemonic()
      setMnemonic(newMnemonic)

      // Simulate account creation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a mock address
      const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      // Don't login immediately, wait for mnemonic confirmation
      setIsCreatingAccount(false)
    } catch (err: any) {
      setError("Error al crear la cuenta")
      setIsCreatingAccount(false)
    }
  }

  const confirmAccount = () => {
    if (mnemonic && mnemonicConfirmed) {
      const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      onLoginSuccess({
        address: mockAddress,
        mnemonic: mnemonic,
        loginMethod: "created_account",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const regenerateMnemonic = () => {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
    setMnemonicConfirmed(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <CoralIcon className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DecoralBank</h1>
            <p className="text-gray-600">Crypto Banking del Futuro</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-rose-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-900">Acceder a tu Cuenta</CardTitle>
            <CardDescription>Conecta tu wallet o crea una nueva cuenta segura</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="connect" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-rose-100">
                <TabsTrigger value="connect" className="data-[state=active]:bg-white data-[state=active]:text-rose-600">
                  Conectar Wallet
                </TabsTrigger>
                <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-rose-600">
                  Crear Cuenta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="connect" className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <Button
                    onClick={connectMetaMask}
                    disabled={isConnecting}
                    className="w-full h-12 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-lg"
                  >
                    {isConnecting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Conectando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-5 h-5" />
                        <span>Conectar con MetaMask</span>
                      </div>
                    )}
                  </Button>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-rose-500" />
                      <span>Conexión segura con tu wallet existente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-rose-500" />
                      <span>Acceso instantáneo a Core DAO</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-rose-500" />
                      <span>Sin custodia - Tú controlas tus fondos</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!mnemonic ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (opcional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                      <p className="text-xs text-gray-500">Solo para notificaciones importantes. No es requerido.</p>
                    </div>

                    <Button
                      onClick={createNewAccount}
                      disabled={isCreatingAccount}
                      className="w-full h-12 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-lg"
                    >
                      {isCreatingAccount ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creando cuenta...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span>Crear Nueva Cuenta</span>
                        </div>
                      )}
                    </Button>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-rose-500" />
                        <span>Wallet completamente descentralizada</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-rose-500" />
                        <span>Control total de tus fondos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-rose-500" />
                        <span>Frase semilla de 12 palabras</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        <div className="space-y-3">
                          <p className="font-medium text-green-800">¡Cuenta creada exitosamente!</p>
                          <p className="text-sm text-green-700">
                            Guarda esta frase semilla en un lugar seguro. Es la única forma de recuperar tu cuenta.
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Tu Frase Semilla</Label>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowMnemonic(!showMnemonic)}
                            className="h-8 w-8 p-0"
                          >
                            {showMnemonic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(mnemonic)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={regenerateMnemonic} className="h-8 w-8 p-0">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="grid grid-cols-3 gap-2 font-mono text-sm">
                          {(showMnemonic ? mnemonic : "••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• •••")
                            .split(" ")
                            .map((word, index) => (
                              <div key={index} className="bg-white p-2 rounded text-center border">
                                <span className="text-xs text-gray-500">{index + 1}.</span>
                                <div className="font-medium">{word}</div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          <div className="space-y-2">
                            <p className="font-medium">⚠️ Importante:</p>
                            <ul className="text-xs space-y-1 list-disc list-inside">
                              <li>Guarda estas palabras en orden y en un lugar seguro</li>
                              <li>No las compartas con nadie</li>
                              <li>DecoralBank nunca te pedirá tu frase semilla</li>
                              <li>Si pierdes estas palabras, perderás acceso a tu cuenta</li>
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="confirm"
                          checked={mnemonicConfirmed}
                          onChange={(e) => setMnemonicConfirmed(e.target.checked)}
                          className="rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                        />
                        <Label htmlFor="confirm" className="text-sm">
                          He guardado mi frase semilla en un lugar seguro
                        </Label>
                      </div>

                      <Button
                        onClick={confirmAccount}
                        disabled={!mnemonicConfirmed}
                        className="w-full h-12 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Confirmar y Acceder
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-rose-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Seguro</p>
            <p className="text-xs text-gray-500">Encriptación avanzada</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-rose-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Rápido</p>
            <p className="text-xs text-gray-500">Transacciones instantáneas</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto">
              <Wallet className="w-6 h-6 text-rose-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Descentralizado</p>
            <p className="text-xs text-gray-500">Tú controlas todo</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-rose-600 hover:underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-rose-600 hover:underline">
              Política de Privacidad
            </a>
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs border-rose-200 text-rose-600">
              Core DAO
            </Badge>
            <Badge variant="outline" className="text-xs border-rose-200 text-rose-600">
              Web3
            </Badge>
            <Badge variant="outline" className="text-xs border-rose-200 text-rose-600">
              DeFi
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
