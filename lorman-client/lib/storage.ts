import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

export const storage = {
    async setItem(key: string, value: string): Promise<void> {
        try {
            if (Platform.OS === "web") {
                await AsyncStorage.setItem(key, value)
            } else {
                await SecureStore.setItemAsync(key, value)
            }
        } catch (error) {
            console.error(`Error saving ${key}:`, error)
            throw error
        }
    },

    async getItem(key: string): Promise<string | null> {
        try {
            if (Platform.OS === "web") {
                return await AsyncStorage.getItem(key)
            } else {
                return await SecureStore.getItemAsync(key)
            }
        } catch (error) {
            console.error(`Error reading ${key}:`, error)
            return null
        }
    },

    async removeItem(key: string): Promise<void> {
        try {
            if (Platform.OS === "web") {
                await AsyncStorage.removeItem(key)
            } else {
                await SecureStore.deleteItemAsync(key)
            }
        } catch (error) {
            console.error(`Error removing ${key}:`, error)
            throw error
        }
    },

    async clear(): Promise<void> {
        try {
            if (Platform.OS === "web") {
                await AsyncStorage.clear()
            } else {
                // En SecureStore hay que eliminar cada key individualmente
                const keys = ["userToken", "userData"]
                await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)))
            }
        } catch (error) {
            console.error("Error clearing storage:", error)
            throw error
        }
    },
}

export const STORAGE_KEYS = {
    TOKEN: "userToken",
    USER_DATA: "userData",
} as const
