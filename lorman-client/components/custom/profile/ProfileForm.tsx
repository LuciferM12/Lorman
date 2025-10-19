"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useState, useEffect, useRef } from "react"
import { View } from "react-native"
import axios from "axios"

interface ProfileData {
  fullName: string
  email: string
  address: string
  phone: string
  deliveryDays: string
}

export function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isMounted = useRef(true)

  const [formData, setFormData] = useState<ProfileData>({
    fullName: "Juan Pérez",
    email: "juan.perez@email.com",
    address: "Av. Siempre Viva 742, Col. Centro, C.P. 78000",
    phone: "444 123 4567",
    deliveryDays: "Lunes, Miércoles y Viernes",
  })

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.put("/api/profile", formData, {
        headers: { "Content-Type": "application/json" },
      })

      console.log("Profile updated successfully:", response.data)
      
      if (isMounted.current) {
        setSuccess(true)
        setIsEditing(false)

        // Reset success message after 3 seconds
        setTimeout(() => {
          if (isMounted.current) {
            setSuccess(false)
          }
        }, 3000)
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      
      if (isMounted.current) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? "Error al actualizar el perfil")
        } else {
          setError("Error al actualizar el perfil")
        }
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    setSuccess(false)
  }

  return (
    <Card className="w-full max-w-md p-8 shadow-lg">
      {/* Avatar and Header */}
      <View className="flex flex-col items-center mb-8">
        <View className="w-20 h-20 rounded-full bg-[#1a4d7a] flex items-center justify-center mb-4">
          <Text className="text-white text-3xl font-semibold">J</Text>
        </View>
        <Text className="text-xl font-semibold text-gray-900">{formData.fullName}</Text>
        <Text className="text-sm text-teal-600 mt-1">Cliente</Text>
      </View>

      {success && (
        <View className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <Text className="text-sm text-green-800">Perfil actualizado exitosamente</Text>
        </View>
      )}

      {error && (
        <View className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <Text className="text-sm text-red-800">{error}</Text>
        </View>
      )}

      <View className="space-y-4">
        <FormField
          label="Nombre Completo"
          value={formData.fullName}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("fullName", value)}
        />
        <FormField
          label="Correo Electrónico"
          value={formData.email}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("email", value)}
          type="email"
        />
        <FormField
          label="Dirección de Envío"
          value={formData.address}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("address", value)}
        />
        <FormField
          label="Teléfono"
          value={formData.phone}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("phone", value)}
          type="tel"
        />
        <FormField
          label="Días de Entrega Preferidos"
          value={formData.deliveryDays}
          isEditing={isEditing}
          onChange={(value) => handleInputChange("deliveryDays", value)}
        />
      </View>

      <View className="flex-row gap-3 mt-8">
        {!isEditing ? (
          <>
            <Button 
              className="flex-1 bg-[#1a9bcc]" 
              onPress={() => setIsEditing(true)}
            >
              <Text className="text-white font-semibold">Editar Perfil</Text>
            </Button>
            <Button 
              className="flex-1 border border-red-500 bg-transparent"
            >
              <Text className="text-red-500 font-semibold">Cerrar Sesión</Text>
            </Button>
          </>
        ) : (
          <>
            <Button
              className="flex-1 bg-[#1a9bcc]"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold">
                {isLoading ? "Guardando..." : "Guardar"}
              </Text>
            </Button>
            <Button
              className="flex-1 border border-gray-300 bg-transparent"
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text className="text-gray-700 font-semibold">Cancelar</Text>
            </Button>
          </>
        )}
      </View>
    </Card>
  )
}

function FormField({
  label,
  value,
  isEditing,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  isEditing: boolean
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <View className="mb-4">
      <Label className="text-xs font-medium text-gray-600 mb-1">{label}</Label>
      {isEditing ? (
        <Input
          value={value}
          onChangeText={onChange}
          keyboardType={type === "email" ? "email-address" : type === "tel" ? "phone-pad" : "default"}
          className="bg-white border-gray-300"
        />
      ) : (
        <View className="bg-gray-50 rounded-md px-4 py-3">
          <Text className="text-sm text-gray-900">{value}</Text>
        </View>
      )}
    </View>
  )
}
