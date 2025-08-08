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
      projects: {
        Row: {
          id: number
          title: string
          description: string
          technologies: string[]
          github_url: string | null
          live_url: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          technologies: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          id: number
          title: string
          company: string
          location: string
          start_date: string
          end_date: string
          description: string
          skills: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          company: string
          location: string
          start_date: string
          end_date: string
          description: string
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          company?: string
          location?: string
          start_date?: string
          end_date?: string
          description?: string
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
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
