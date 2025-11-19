"use client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useState, useEffect, useRef } from "react"
import { View, ActivityIndicator } from "react-native"
import { UserType } from "@/interfaces/IUser"
import { getUserByEmail, updateUser } from "@/api/users" 
import Toast from "react-native-toast-message"

export interface ProfileData {
  fullName: string
  email: string
  address: string
  phone: string
  deliveryDays: string
}

interface ProfileCardProps {
  user: UserType | null
}

export function ProfileCard({ user }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isMounted = useRef(true)

  const initialData: ProfileData = {
    fullName: '',
    email: '',
    address: '',
    phone: '',
    deliveryDays: '',
  }

  const [formData, setFormData] = useState<ProfileData>(initialData)

  useEffect(() => {
    isMounted.current = true
    
    const loadUserData = async () => {
      if (!user?.email) {
        setIsFetching(false)
        return
      }

      try {
        setIsFetching(true)
        setError(null)
        
        const userData = await getUserByEmail(user.email)

        if (userData) {
          setFormData({
            fullName: userData.user.nombre_completo || '',
            email: userData.user.email || '',
            address: userData.user.direccion || '',
            phone: userData.user.telefono || '',
            deliveryDays: userData.user.dias_entrega_preferidos || '',
          })
        }
      } catch (err) {
        console.error('Error loading user data:', err)
        if (isMounted.current) {
          setError('Error al cargar los datos del perfil')
        }
      } finally {
        if (isMounted.current) {
          setIsFetching(false)
        }
      }
    }

    loadUserData()

    return () => {
      isMounted.current = false
    }
  }, [user])

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
      await updateUser(user!.id_usuario, formData)
      
      Toast.show({
        type: 'success',
        text1: 'Perfil actualizado exitosamente',
      })
      setIsEditing(false)
    } catch (err) {
      console.error("Error updating profile:", err)
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el perfil',
      })
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
    
    if (user?.email) {
      getUserByEmail(user.email).then((userData) => {
        if (isMounted.current && userData) {
          setFormData({
            fullName: userData.user.nombre_completo || '',
            email: userData.user.email || '',
            address: userData.user.direccion || '',
            phone: userData.user.telefono || '',
            deliveryDays: userData.user.dias_entrega_preferidos || '',
          })
        }
      })
    }
  }

  if (isFetching) {
    return (
      <Card className="w-full max-w-md p-8 shadow-lg">
        <View className="flex items-center justify-center py-12">
          <ActivityIndicator size="large" color="#1a9bcc" />
          <Text className="mt-4 text-gray-600">Cargando perfil...</Text>
        </View>
      </Card>
    )
  }

  const getInitial = () => {
    return formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'
  }

  return (
    <Card className="w-full max-w-md p-8 shadow-lg">
      {/* Avatar and Header */}
      <View className="flex flex-col items-center mb-8">
        <View className="w-20 h-20 rounded-full bg-[#1a4d7a] flex items-center justify-center mb-4">
          <Text className="text-white text-3xl font-semibold">{getInitial()}</Text>
        </View>
        <Text className="text-xl font-semibold text-gray-900">
          {formData.fullName || 'Usuario'}
        </Text>
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
          <Text className="text-sm text-gray-900">{value || 'No especificado'}</Text>
        </View>
      )}
    </View>
  )
}