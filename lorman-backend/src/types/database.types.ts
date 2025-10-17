export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      carrito: {
        Row: {
          fecha_ultima_modificacion: string | null
          id_carrito: number
          id_usuario: number
        }
        Insert: {
          fecha_ultima_modificacion?: string | null
          id_carrito?: number
          id_usuario: number
        }
        Update: {
          fecha_ultima_modificacion?: string | null
          id_carrito?: number
          id_usuario?: number
        }
        Relationships: [
          {
            foreignKeyName: "carrito_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      cotizaciones: {
        Row: {
          estado_cotizacion: string
          fecha_solicitud: string | null
          id_cliente: number
          id_cotizacion: number
          nombre_empresa: string | null
          notas_generales: string | null
        }
        Insert: {
          estado_cotizacion?: string
          fecha_solicitud?: string | null
          id_cliente: number
          id_cotizacion?: number
          nombre_empresa?: string | null
          notas_generales?: string | null
        }
        Update: {
          estado_cotizacion?: string
          fecha_solicitud?: string | null
          id_cliente?: number
          id_cotizacion?: number
          nombre_empresa?: string | null
          notas_generales?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      detalles_carrito: {
        Row: {
          cantidad: number
          id_carrito: number
          id_detalle_carrito: number
          id_producto: number
        }
        Insert: {
          cantidad: number
          id_carrito: number
          id_detalle_carrito?: number
          id_producto: number
        }
        Update: {
          cantidad?: number
          id_carrito?: number
          id_detalle_carrito?: number
          id_producto?: number
        }
        Relationships: [
          {
            foreignKeyName: "detalles_carrito_id_carrito_fkey"
            columns: ["id_carrito"]
            isOneToOne: false
            referencedRelation: "carrito"
            referencedColumns: ["id_carrito"]
          },
          {
            foreignKeyName: "detalles_carrito_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
        ]
      }
      detalles_cotizacion: {
        Row: {
          cantidad_solicitada: number
          id_cotizacion: number
          id_detalle_cotizacion: number
          id_producto: number
          notas_personalizacion_producto: string | null
        }
        Insert: {
          cantidad_solicitada: number
          id_cotizacion: number
          id_detalle_cotizacion?: number
          id_producto: number
          notas_personalizacion_producto?: string | null
        }
        Update: {
          cantidad_solicitada?: number
          id_cotizacion?: number
          id_detalle_cotizacion?: number
          id_producto?: number
          notas_personalizacion_producto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detalles_cotizacion_id_cotizacion_fkey"
            columns: ["id_cotizacion"]
            isOneToOne: false
            referencedRelation: "cotizaciones"
            referencedColumns: ["id_cotizacion"]
          },
          {
            foreignKeyName: "detalles_cotizacion_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
        ]
      }
      detalles_pedido: {
        Row: {
          cantidad: number
          id_detalle_pedido: number
          id_pedido: number
          id_producto: number
          id_promocion_aplicada: number | null
          precio_al_momento: number
        }
        Insert: {
          cantidad: number
          id_detalle_pedido?: number
          id_pedido: number
          id_producto: number
          id_promocion_aplicada?: number | null
          precio_al_momento: number
        }
        Update: {
          cantidad?: number
          id_detalle_pedido?: number
          id_pedido?: number
          id_producto?: number
          id_promocion_aplicada?: number | null
          precio_al_momento?: number
        }
        Relationships: [
          {
            foreignKeyName: "detalles_pedido_id_pedido_fkey"
            columns: ["id_pedido"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id_pedido"]
          },
          {
            foreignKeyName: "detalles_pedido_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
          {
            foreignKeyName: "detalles_pedido_id_promocion_aplicada_fkey"
            columns: ["id_promocion_aplicada"]
            isOneToOne: false
            referencedRelation: "promociones"
            referencedColumns: ["id_promocion"]
          },
        ]
      }
      pedidos: {
        Row: {
          direccion_entrega: string
          estado_entrega: string
          fecha_pedido: string | null
          id_cliente: number
          id_pedido: number
          monto_total: number
        }
        Insert: {
          direccion_entrega: string
          estado_entrega?: string
          fecha_pedido?: string | null
          id_cliente: number
          id_pedido?: number
          monto_total?: number
        }
        Update: {
          direccion_entrega?: string
          estado_entrega?: string
          fecha_pedido?: string | null
          id_cliente?: number
          id_pedido?: number
          monto_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      preguntas_frecuentes: {
        Row: {
          fecha_pregunta: string | null
          fecha_respuesta: string | null
          id_admin_respuesta: number | null
          id_cliente_pregunta: number
          id_pregunta: number
          pregunta: string
          respuesta: string | null
          visible_publicamente: boolean | null
        }
        Insert: {
          fecha_pregunta?: string | null
          fecha_respuesta?: string | null
          id_admin_respuesta?: number | null
          id_cliente_pregunta: number
          id_pregunta?: number
          pregunta: string
          respuesta?: string | null
          visible_publicamente?: boolean | null
        }
        Update: {
          fecha_pregunta?: string | null
          fecha_respuesta?: string | null
          id_admin_respuesta?: number | null
          id_cliente_pregunta?: number
          id_pregunta?: number
          pregunta?: string
          respuesta?: string | null
          visible_publicamente?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "preguntas_frecuentes_id_admin_respuesta_fkey"
            columns: ["id_admin_respuesta"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
          {
            foreignKeyName: "preguntas_frecuentes_id_cliente_pregunta_fkey"
            columns: ["id_cliente_pregunta"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      productos: {
        Row: {
          descripcion: string | null
          disponible: boolean
          id_producto: number
          nombre_producto: string
          precio_unitario: number
          stock: number
        }
        Insert: {
          descripcion?: string | null
          disponible?: boolean
          id_producto?: number
          nombre_producto: string
          precio_unitario: number
          stock?: number
        }
        Update: {
          descripcion?: string | null
          disponible?: boolean
          id_producto?: number
          nombre_producto?: string
          precio_unitario?: number
          stock?: number
        }
        Relationships: []
      }
      promocion_producto: {
        Row: {
          id_producto: number
          id_promocion: number
        }
        Insert: {
          id_producto: number
          id_promocion: number
        }
        Update: {
          id_producto?: number
          id_promocion?: number
        }
        Relationships: [
          {
            foreignKeyName: "promocion_producto_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
          {
            foreignKeyName: "promocion_producto_id_promocion_fkey"
            columns: ["id_promocion"]
            isOneToOne: false
            referencedRelation: "promociones"
            referencedColumns: ["id_promocion"]
          },
        ]
      }
      promociones: {
        Row: {
          activa: boolean | null
          descripcion: string | null
          fecha_fin: string
          fecha_inicio: string
          id_promocion: number
          nombre_promocion: string
          tipo_descuento: string
          valor_descuento: number
        }
        Insert: {
          activa?: boolean | null
          descripcion?: string | null
          fecha_fin: string
          fecha_inicio: string
          id_promocion?: number
          nombre_promocion: string
          tipo_descuento: string
          valor_descuento: number
        }
        Update: {
          activa?: boolean | null
          descripcion?: string | null
          fecha_fin?: string
          fecha_inicio?: string
          id_promocion?: number
          nombre_promocion?: string
          tipo_descuento?: string
          valor_descuento?: number
        }
        Relationships: []
      }
      resenas: {
        Row: {
          calificacion: number
          comentario: string | null
          fecha_resena: string | null
          id_cliente: number
          id_producto: number | null
          id_resena: number
        }
        Insert: {
          calificacion: number
          comentario?: string | null
          fecha_resena?: string | null
          id_cliente: number
          id_producto?: number | null
          id_resena?: number
        }
        Update: {
          calificacion?: number
          comentario?: string | null
          fecha_resena?: string | null
          id_cliente?: number
          id_producto?: number | null
          id_resena?: number
        }
        Relationships: [
          {
            foreignKeyName: "resenas_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
          {
            foreignKeyName: "resenas_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
        ]
      }
      usuarios: {
        Row: {
          dias_entrega_preferidos: string | null
          direccion: string
          email: string
          fecha_registro: string | null
          id_usuario: number
          nombre_completo: string
          password_hash: string
          rol: string
          telefono: string | null
        }
        Insert: {
          dias_entrega_preferidos?: string | null
          direccion: string
          email: string
          fecha_registro?: string | null
          id_usuario?: number
          nombre_completo: string
          password_hash: string
          rol?: string
          telefono?: string | null
        }
        Update: {
          dias_entrega_preferidos?: string | null
          direccion?: string
          email?: string
          fecha_registro?: string | null
          id_usuario?: number
          nombre_completo?: string
          password_hash?: string
          rol?: string
          telefono?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
