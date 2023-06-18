export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          alpha: string
          alpha_score: number | null
          bravo: string | null
          bravo_score: number | null
          created_at: string | null
          id: string
        }
        Insert: {
          alpha?: string
          alpha_score?: number | null
          bravo?: string | null
          bravo_score?: number | null
          created_at?: string | null
          id?: string
        }
        Update: {
          alpha?: string
          alpha_score?: number | null
          bravo?: string | null
          bravo_score?: number | null
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          discord_id: string | null
          discord_tag: string | null
          email: string | null
          friend_code: string | null
          id: string
          team: string | null
        }
        Insert: {
          avatar_url?: string | null
          discord_id?: string | null
          discord_tag?: string | null
          email?: string | null
          friend_code?: string | null
          id: string
          team?: string | null
        }
        Update: {
          avatar_url?: string | null
          discord_id?: string | null
          discord_tag?: string | null
          email?: string | null
          friend_code?: string | null
          id?: string
          team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          discord_server_invite: string | null
          rating: number
          rd: number
          submitted_matches: Json[] | null
          tag: string
          volitility: number
        }
        Insert: {
          discord_server_invite?: string | null
          rating?: number
          rd?: number
          submitted_matches?: Json[] | null
          tag: string
          volitility?: number
        }
        Update: {
          discord_server_invite?: string | null
          rating?: number
          rd?: number
          submitted_matches?: Json[] | null
          tag?: string
          volitility?: number
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
