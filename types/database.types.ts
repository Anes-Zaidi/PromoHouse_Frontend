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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          average_price: number | null
          category: Database["public"]["Enums"]["category"]
          commune_id: number
          country_id: number
          created_at: string | null
          description: string | null
          email: string | null
          id: number
          is_active: boolean | null
          is_verified: boolean | null
          name: string
          phone: string | null
          rating: number | null
          updated_at: string | null
          website: string | null
          wilaya_id: number
        }
        Insert: {
          address?: string | null
          average_price?: number | null
          category: Database["public"]["Enums"]["category"]
          commune_id: number
          country_id: number
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          name: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          website?: string | null
          wilaya_id: number
        }
        Update: {
          address?: string | null
          average_price?: number | null
          category?: Database["public"]["Enums"]["category"]
          commune_id?: number
          country_id?: number
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          name?: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
          website?: string | null
          wilaya_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "businesses_commune_id_fkey"
            columns: ["commune_id"]
            isOneToOne: false
            referencedRelation: "communes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_wilaya_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilayas"
            referencedColumns: ["id"]
          },
        ]
      }
      communes: {
        Row: {
          id: number
          name: string
          name_ar: string | null
          postal_code: string | null
          wilaya_id: number
        }
        Insert: {
          id?: number
          name: string
          name_ar?: string | null
          postal_code?: string | null
          wilaya_id: number
        }
        Update: {
          id?: number
          name?: string
          name_ar?: string | null
          postal_code?: string | null
          wilaya_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "communes_wilaya_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilayas"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string | null
          id: number
          iso_code: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          iso_code?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          iso_code?: string | null
          name?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          available_from: string
          available_until: string
          business_id: number
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          original_price: number | null
          pickup_end: string | null
          pickup_start: string | null
          price: number
          quantity_remaining: number
          quantity_total: number
          surplus_type: Database["public"]["Enums"]["surplus_type"]
          title: string
          updated_at: string | null
        }
        Insert: {
          available_from: string
          available_until: string
          business_id: number
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          original_price?: number | null
          pickup_end?: string | null
          pickup_start?: string | null
          price: number
          quantity_remaining: number
          quantity_total: number
          surplus_type: Database["public"]["Enums"]["surplus_type"]
          title: string
          updated_at?: string | null
        }
        Update: {
          available_from?: string
          available_until?: string
          business_id?: number
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          original_price?: number | null
          pickup_end?: string | null
          pickup_start?: string | null
          price?: number
          quantity_remaining?: number
          quantity_total?: number
          surplus_type?: Database["public"]["Enums"]["surplus_type"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      wilayas: {
        Row: {
          code: string | null
          country_id: number
          id: number
          name: string
        }
        Insert: {
          code?: string | null
          country_id: number
          id?: number
          name: string
        }
        Update: {
          code?: string | null
          country_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "wilayas_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      category:
        | "restaurant"
        | "cafe"
        | "bakery"
        | "fast_food"
        | "supermarket"
        | "grocery"
        | "hotel"
        | "catering"
        | "other"
        | "test_value"
      surplus_type:
        | "meal_box"
        | "pastries_box"
        | "mixed_box"
        | "raw_ingredients"
        | "ready_meals"
        | "desserts"
        | "other"
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
    Enums: {
      category: [
        "restaurant",
        "cafe",
        "bakery",
        "fast_food",
        "supermarket",
        "grocery",
        "hotel",
        "catering",
        "other",
        "test_value",
      ],
      surplus_type: [
        "meal_box",
        "pastries_box",
        "mixed_box",
        "raw_ingredients",
        "ready_meals",
        "desserts",
        "other",
      ],
    },
  },
} as const
