export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invites: {
        Row: {
          creator: string | null
          id: string
          invitee: string | null
          team: string | null
        }
        Insert: {
          creator?: string | null
          id?: string
          invitee?: string | null
          team?: string | null
        }
        Update: {
          creator?: string | null
          id?: string
          invitee?: string | null
          team?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          discordId: string
          id: string
          ign: string | null
        }
        Insert: {
          discordId?: string
          id: string
          ign?: string | null
        }
        Update: {
          discordId?: string
          id?: string
          ign?: string | null
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
      team_profiles: {
        Row: {
          created_at: string | null
          discordServer: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          discordServer?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string | null
          discordServer?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      team_ratings: {
        Row: {
          rating: number | null
          rd: number | null
          team_id: string
          volitility: number | null
        }
        Insert: {
          rating?: number | null
          rd?: number | null
          team_id: string
          volitility?: number | null
        }
        Update: {
          rating?: number | null
          rd?: number | null
          team_id?: string
          volitility?: number | null
        }
        Relationships: []
      }
      team_registry: {
        Row: {
          team_id: string | null
          user_id: string
        }
        Insert: {
          team_id?: string | null
          user_id: string
        }
        Update: {
          team_id?: string | null
          user_id?: string
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
