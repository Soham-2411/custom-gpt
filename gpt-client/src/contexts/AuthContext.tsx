import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { Session } from '@supabase/supabase-js'

type AuthContextType = {
    session: Session | null
    user: any
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`Supabase auth event: ${event}`)
            setSession(session)
            setUser(session?.user ?? null)

            if (session) {
                console.log('User logged in:', session.user)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)